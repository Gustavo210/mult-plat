import { Clickable } from "@mobilestock-native/clickable";
import { Container } from "@mobilestock-native/container";
import { Icon } from "@mobilestock-native/icons";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, TextInput } from "react-native";
import { useSearch } from "../../hooks/useSearch";

export function Input({ hiddenLoadingIndicator = false }) {
  const Search = useSearch();
  const [showXButton, setShowXButton] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (Search.selectedItem) {
      setInputValue(String(Search.selectedItem));
      setShowXButton(true);
    }
  }, [Search.selectedItem]);

  function clearInput() {
    Search.clearResults();
    Search.cancelOngoingRequest();
    setInputValue("");
    setShowXButton(false);
    Search.debounceSearch("");
  }

  function onChangeText(text: string) {
    if (Search.format) {
      text = Search.format(text);
    }
    setInputValue(text);
    setShowXButton(text.length > 0);
    if (Search.searchWhenTyping && text.length > 0) {
      Search.debounceSearch(text);
    } else {
      Search.inputContentRef.current = text;
    }
    Search.configureSelectedItem(null);
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
        value={inputValue}
        selectTextOnFocus={!!Search.selectedItem}
        style={{
          height: 40,
          flex: 1,
          outline: "none",
        }}
        onChangeText={onChangeText}
        placeholder="Digite"
        clearButtonMode="never"
      />
      {!hiddenLoadingIndicator && Search.isLoading && (
        <ActivityIndicator color={"#cecece"} />
      )}
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
