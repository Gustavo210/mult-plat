import { ButtonProps } from "@mobilestock-native/button";
import { Clickable } from "@mobilestock-native/clickable";
import { Icon } from "@mobilestock-native/icons";
import tools from "@mobilestock-native/tools";
import { useTheme } from "styled-components/native";
import { useSearch } from "../../hooks/useSearch";
export function SearchButton(props: Omit<ButtonProps, "onPress">) {
  const Search = useSearch();
  const Theme = useTheme();

  return (
    <Clickable
      onPress={() => Search.search(Search.inputContentRef.current || "")}
      isLoading={!Search.searchWhenTyping && Search.isLoading}
      disabled={Search.isLoading}
      style={{
        backgroundColor: Theme.colors.button.default,
        padding: 10,
        borderRadius: 6,
      }}
      {...props}
    >
      <Icon
        name={Search.iconSearchButton || "Search"}
        size="SM"
        color={tools.defineTextColor(Theme.colors.button.default)}
      />
    </Clickable>
  );
}
