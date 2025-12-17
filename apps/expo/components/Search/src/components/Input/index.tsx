import { TextInput } from "react-native";
import { useSearch } from "../../hooks/useSearch";

export function Input() {
  const Search = useSearch();
  return (
    <TextInput
      style={{
        height: 40,
        backgroundColor: "white",
        padding: 10,
        width: "100%",
        outline: "none",
      }}
      onChangeText={Search.search}
      placeholder="Digite"
      clearButtonMode="always"
    />
  );
}
