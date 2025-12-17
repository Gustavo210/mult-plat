import { KeyboardAvoidingView } from "react-native";

import { Container } from "@mobilestock-native/container";

import { Input } from "../Input";
import { SearchButton } from "../SearchButton";
import { SuggestionArea } from "../SuggestionArea";

export function Detached() {
  return (
    <Container.Vertical
      style={{
        position: "relative",
        zIndex: 1000,
      }}
    >
      <KeyboardAvoidingView behavior="padding">
        <Container.Horizontal gap="2XS">
          <Container.Vertical
            full
            gap="2XS"
            style={{
              position: "relative",
            }}
          >
            <Container.Horizontal
              style={{
                borderColor: "#cecece",
                borderWidth: 1,
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              <Input />
            </Container.Horizontal>
            <SuggestionArea />
          </Container.Vertical>
          <Container.Vertical>
            <SearchButton />
          </Container.Vertical>
        </Container.Horizontal>
      </KeyboardAvoidingView>
    </Container.Vertical>
  );
}
