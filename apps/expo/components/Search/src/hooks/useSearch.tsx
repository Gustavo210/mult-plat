import Fuse from "fuse.js";
import { get } from "lodash";
import { createContext, useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import { dataType, LeafObjectKeyPath } from "..";

interface SearchContextType<T extends dataType> {
  search: (query: string) => Promise<void>;
  searchResults: {
    id: string;
    item: T;
    value: string;
  }[];
}
const SearchContext = createContext<SearchContextType<dataType> | null>(null);

export function SearchProvider<T extends dataType>({
  children,
  fetchOnQuery,
  valueSuggestionKey,
  defaultData = [],
}: {
  children: React.ReactNode;
  fetchOnQuery?: (query?: string) => Promise<T[]>;
  valueSuggestionKey?: T extends object ? LeafObjectKeyPath<T> : never;
  defaultData?: T[];
}) {
  const [cachedData, setCachedData] = useState<T[]>(defaultData ?? []);
  const [searchResults, setSearchResults] = useState<
    {
      id: string;
      item: T;
      value: string;
    }[]
  >([]);

  function getKeyPaths(obj: any, prefix = ""): string[] {
    let keys: string[] = [];
    for (const key in obj) {
      const path = prefix
        ? isNaN(key as unknown as number)
          ? `${prefix}.${key}`
          : `${prefix}`
        : key;
      keys.push(path);
      if (typeof obj[key] === "object" && obj[key] !== null) {
        keys = keys.concat(getKeyPaths(obj[key], path));
      }
    }
    return keys;
  }

  function filterData(currentData: T[], query: string) {
    const fieldsExample = currentData[0];
    const fuse = new Fuse(currentData, {
      threshold: 0.0,
      ignoreLocation: true,
      ignoreDiacritics: true,
      minMatchCharLength: 4,
      keys: valueSuggestionKey
        ? [
            String(valueSuggestionKey)
              .replace(/\[\d+\]/g, "")
              .replace(/\[\*\]/g, ""),
          ]
        : typeof fieldsExample === "string"
        ? []
        : getKeyPaths(fieldsExample).filter(
            (item, index, self) => self.indexOf(item) === index
          ),
    });

    const result = fuse.search(query.trim());
    console.log(
      "Filtering data with query:",
      query,
      currentData,
      result,
      typeof fieldsExample,
      valueSuggestionKey
        ? [
            String(valueSuggestionKey)
              .replace(/\[\d+\]/g, "")
              .replace(/\[\*\]/g, ""),
          ]
        : typeof fieldsExample === "string"
        ? []
        : getKeyPaths(fieldsExample).filter(
            (item, index, self) => self.indexOf(item) === index
          )
    );
    return result.map(({ item }) => item);
  }

  function isPrimitiveSuggestionValue(value: unknown) {
    return ["string", "number", "boolean"].includes(typeof value);
  }
  function getValueBySuggestionKeyPath(
    item: unknown,
    valueSuggestionKeyPath: string
  ) {
    if (!valueSuggestionKeyPath.includes("[*]")) {
      const resolvedValue = get(item as any, valueSuggestionKeyPath);
      return isPrimitiveSuggestionValue(resolvedValue)
        ? String(resolvedValue)
        : undefined;
    }

    const wildcardIndex = valueSuggestionKeyPath.indexOf("[*]");
    const arrayPath = valueSuggestionKeyPath.slice(0, wildcardIndex);
    const remainingPath = valueSuggestionKeyPath
      .slice(wildcardIndex + 3)
      .replace(/^\./, "");

    const resolvedArray = get(item as any, arrayPath);

    if (!Array.isArray(resolvedArray)) {
      return undefined;
    }

    for (const arrayItem of resolvedArray) {
      const resolvedValue = remainingPath
        ? get(arrayItem, remainingPath)
        : arrayItem;

      if (isPrimitiveSuggestionValue(resolvedValue)) {
        return String(resolvedValue);
      }
    }

    return undefined;
  }

  function getFirstPrimitiveKeyRecursively(item: T): string {
    if (isPrimitiveSuggestionValue(item)) {
      return String(item);
    }

    for (const key in item) {
      if (isPrimitiveSuggestionValue(item[key])) {
        return String(item[key]);
      } else if (typeof item[key] === "object" && item[key] !== null) {
        const nestedValue = getFirstPrimitiveKeyRecursively(item[key] as T);
        if (nestedValue !== null) {
          return nestedValue;
        }
      }
    }
    return String(item);
  }

  function saveSearchResults(results: T[]) {
    const resultsWithId = results.map((item) => ({
      id: uuid(),
      item,
      value: valueSuggestionKey
        ? getValueBySuggestionKeyPath(item, String(valueSuggestionKey)) ??
          getFirstPrimitiveKeyRecursively(item)
        : getFirstPrimitiveKeyRecursively(item),
    }));

    setSearchResults(resultsWithId);
  }

  async function search(query: string) {
    setSearchResults([]);
    let filteredResults: T[] = [];
    if (cachedData.length > 0) {
      filteredResults = filterData(cachedData, query);
      if (filteredResults.length > 0) {
        saveSearchResults(filteredResults);
        return;
      }
    }

    if (cachedData.length === 0 || filteredResults.length === 0) {
      console.log("Searching for:", query);
      if (typeof fetchOnQuery === "function") {
        if (fetchOnQuery.length === 0) {
          const fetchedData = await fetchOnQuery();
          if (!fetchedData) {
            setCachedData([]);
            setSearchResults([]);
            return;
          }
          setCachedData(fetchedData);
          const filteredResults = filterData(fetchedData, query);
          if (!filteredResults) {
            setSearchResults([]);
            return;
          }
          saveSearchResults(filteredResults);
          return;
        }

        setCachedData([]);
        const fetchedData = await fetchOnQuery(query);
        if (!fetchedData) {
          setSearchResults([]);
          return;
        }
        saveSearchResults(fetchedData);
        return;
      }
    }
  }

  return (
    <SearchContext.Provider
      value={{
        search,
        searchResults,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
