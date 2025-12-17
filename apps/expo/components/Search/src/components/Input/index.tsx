import { Clickable } from "@mobilestock-native/clickable";
import { Container } from "@mobilestock-native/container";
import { Icon } from "@mobilestock-native/icons";
import { useRef, useState } from "react";
import { ActivityIndicator, TextInput } from "react-native";
import { useSearch } from "../../hooks/useSearch";

export function Input() {
  const Search = useSearch();
  const [showXButton, setShowXButton] = useState(false);
  const inputRef = useRef<TextInput>(null);

  function clearInput() {
    if (inputRef.current) {
      Search.clearResults();
      Search.cancelOngoingRequest();
      inputRef.current.clear();
      setShowXButton(false);
      Search.debounceSearch("");
    }
  }

  return (
    <Container.Horizontal
      full
      style={{
        backgroundColor: "white",
      }}
      padding="NONE_XS"
      gap="XS"
    >
      <TextInput
        ref={inputRef}
        style={{
          height: 40,
          width: "100%",
          outline: "none",
        }}
        onChangeText={(text) => {
          setShowXButton(text.length > 0);
          Search.debounceSearch(text);
        }}
        placeholder="Digite"
        clearButtonMode="never"
      />
      {Search.isLoading && <ActivityIndicator color={"#cecece"} />}
      {showXButton && (
        <Container.Horizontal align="CENTER">
          <Clickable onPress={clearInput}>
            <Icon name="X" size="XS" />
          </Clickable>
        </Container.Horizontal>
      )}
    </Container.Horizontal>
  );
}
