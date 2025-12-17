import { Container } from "@mobilestock-native/container";
import { ActivityIndicator, TextInput } from "react-native";
import { useSearch } from "../../hooks/useSearch";

export function Input() {
  const Search = useSearch();
  return (
    <Container.Horizontal
      full
      style={{
        backgroundColor: "white",
      }}
      padding="NONE_XS"
    >
      <TextInput
        style={{
          height: 40,
          width: "100%",
          outline: "none",
        }}
        onChangeText={Search.debounceSearch}
        placeholder="Digite"
        clearButtonMode="always"
      />
      {Search.isLoading && <ActivityIndicator color={"#cecece"} />}
    </Container.Horizontal>
  );
}
