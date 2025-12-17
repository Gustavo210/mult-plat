import { Container } from "@mobilestock-native/container";
import { List } from "@mobilestock-native/list";
import { useSearch } from "../../hooks/useSearch";

export function SuggestionArea() {
  const Search = useSearch();

  return (
    <Container.Vertical
      style={{
        minWidth: "100%",
        top: 40 + 4,
        position: "absolute",
        borderBottomEndRadius: 5,
        borderBottomStartRadius: 5,
        borderWidth: 1,
        borderColor: "#cecece",
        borderRadius: 8,
        maxHeight: 150,
        backgroundColor: "white",
        overflow: "hidden",
        display: Search.searchResults.length > 0 ? "flex" : "none",
      }}
    >
      <List
        itemKey="id"
        data={Search.searchResults}
        renderItem={({ value }) => (
          <List.Item.Horizontal
            padding="SM_2XS"
            align="START_CENTER"
            onPress={console.log}
          >
            <List.Item.Text>{value}</List.Item.Text>
          </List.Item.Horizontal>
        )}
      />
    </Container.Vertical>
  );
}
