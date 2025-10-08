import { Clickable } from "@mobilestock-native/clickable";
import { Typography } from "@mobilestock-native/typography";
import { useEffect, useState } from "react";
import { TextInput } from "react-native";
import { useTheme } from "styled-components/native";
import { useCounter } from "../../hooks/useCount";
import { Slot } from "../Slot";

export function Display() {
  const Theme = useTheme();
  const { count, editable, setCount } = useCounter();
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(count.toString());

  useEffect(() => {
    setInputValue(count.toString());
  }, [count]);

  return (
    <Slot>
      {editable ? (
        <Clickable onPress={() => setIsEditing(true)}>
          {isEditing ? (
            <TextInput
              value={inputValue}
              keyboardType="numeric"
              style={{
                fontWeight: "bold",
                fontSize: Number(Theme.font.size.lg) || 16,
                textAlign: "center",
                width: 40,
                height: 40,
              }}
              autoFocus
              selectTextOnFocus
              onBlur={(e) => {
                setCount(
                  e.nativeEvent.text === "" ? 0 : Number(e.nativeEvent.text)
                );
                setIsEditing(false);
              }}
              onChangeText={(text) => setInputValue(text)}
              onEndEditing={(e) => {
                console.log(e.nativeEvent.text);
                setCount(Number(e.nativeEvent.text) || 0);
              }}
            />
          ) : (
            <Typography weight="BOLD" size="LG">
              {count}
            </Typography>
          )}
        </Clickable>
      ) : (
        <Typography weight="BOLD" size="LG">
          {count}
        </Typography>
      )}
    </Slot>
  );
}

Display.displayName = "FormCounter.Display";
