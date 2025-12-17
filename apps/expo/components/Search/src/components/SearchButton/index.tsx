import { ButtonProps } from "@mobilestock-native/button";
import { Clickable } from "@mobilestock-native/clickable";
import { Icon } from "@mobilestock-native/icons";
import { useSearch } from "../../hooks/useSearch";

export function SearchButton(props: Omit<ButtonProps, "onPress">) {
  const Search = useSearch();

  return (
    <Clickable
      onPress={() => Search.search(Search.inputContentRef.current || "")}
      isLoading={!Search.searchWhenTyping && Search.isLoading}
      style={{
        backgroundColor: "gray",
        padding: 8,
      }}
      {...props}
    >
      <Icon name="Search" size="MD" />
    </Clickable>
  );
}
