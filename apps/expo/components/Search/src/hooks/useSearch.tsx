import { Container } from "@mobilestock-native/container";
import Fuse from "fuse.js";
import { get } from "lodash";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Platform, View } from "react-native";
import { v4 as uuid } from "uuid";
import { dataType, LeafObjectKeyPath } from "..";

interface SearchContextType<T extends dataType> {
  debounceSearch: (query: string) => void;
  searchResults: {
    id: string;
    item: T;
    value: string;
  }[];
  isLoading: boolean;
  clearResults: () => void;
  cancelOngoingRequest: () => void;
}
const SearchContext = createContext<SearchContextType<dataType> | null>(null);

export interface SearchProviderProps<T extends dataType> {
  children: React.ReactNode;
  fetchOnQuery?: (query?: string, signal?: AbortSignal) => Promise<T[]>;
  valueSuggestionKey?: T extends object ? LeafObjectKeyPath<T> : never;
  defaultData?: T[];
  cancelOngoingRequest?: () => void;
}
export function SearchProvider<T extends dataType>({
  children,
  fetchOnQuery,
  valueSuggestionKey,
  defaultData = [],
}: SearchProviderProps<T>) {
  const [isLoading, setIsLoading] = useState(false);
  const [cachedData, setCachedData] = useState<T[]>(defaultData ?? []);
  const [searchResults, setSearchResults] = useState<
    {
      id: string;
      item: T;
      value: string;
    }[]
  >([]);
  const debouncedTimeoutSearch = useRef<number | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const componentAreaRef = useRef<View>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (componentAreaRef.current) {
      const area = componentAreaRef.current as unknown as HTMLElement;
      if (!area.contains(event.target as Node)) {
        setSearchResults([]);
      }
    }
  }, []);

  useEffect(() => {
    if (Platform.OS === "web") {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [handleClickOutside]);

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

  function clearResults() {
    setSearchResults([]);
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

  function cancelOngoingRequest() {
    if (debouncedTimeoutSearch.current) {
      abortControllerRef.current?.abort();
      clearTimeout(debouncedTimeoutSearch.current);
    }
  }

  function debounceSearch(query: string) {
    cancelOngoingRequest();

    if (query.trim().length <= 2) {
      return;
    }

    debouncedTimeoutSearch.current = setTimeout(() => {
      search(query);
    }, 300);
  }

  async function search(query: string) {
    try {
      setSearchResults([]);
      setIsLoading(true);

      if (cachedData.length > 0) {
        const filteredCachedResults = filterData(cachedData, query);

        if (filteredCachedResults.length > 0) {
          saveSearchResults(filteredCachedResults);
          return;
        }
      }

      if (typeof fetchOnQuery === "undefined") {
        return;
      }

      if (typeof fetchOnQuery !== "function") {
        throw new Error("fetchOnQuery function is not provided");
      }

      if (fetchOnQuery.length === 0) {
        const fetchedData = await fetchOnQuery();

        if (!fetchedData) {
          setCachedData([]);
          setSearchResults([]);
          return;
        }

        setCachedData(fetchedData);

        const filteredFetchedResults = filterData(fetchedData, query);

        if (filteredFetchedResults.length === 0) {
          setSearchResults([]);
          return;
        }

        saveSearchResults(filteredFetchedResults);
        return;
      }

      setCachedData([]);

      let fetchedData: T[];

      if (fetchOnQuery.length === 2) {
        abortControllerRef.current = new AbortController();
        fetchedData = await fetchOnQuery(
          query,
          abortControllerRef.current.signal
        );
      } else {
        fetchedData = await fetchOnQuery(query);
      }

      if (!fetchedData) {
        setSearchResults([]);
        return;
      }

      saveSearchResults(fetchedData);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SearchContext.Provider
      value={{
        cancelOngoingRequest,
        debounceSearch,
        clearResults,
        searchResults,
        isLoading,
      }}
    >
      <Container.Vertical ref={componentAreaRef}>{children}</Container.Vertical>
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
