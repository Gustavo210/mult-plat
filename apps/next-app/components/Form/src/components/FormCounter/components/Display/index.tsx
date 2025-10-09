import { Clickable } from "@mobilestockweb/clickable";
import { Typography } from "@mobilestockweb/typography";
import { useEffect, useState } from "react";
import { useTheme } from "styled-components";
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
        <Clickable onClick={() => setIsEditing(true)}>
          {isEditing ? (
            <input
              value={inputValue}
              style={{
                fontWeight: "bold",
                fontSize: Number(Theme.font.size.lg) || 16,
                textAlign: "center",
                width: 40,
                height: 40,
              }}
              autoFocus
              onBlur={(event) => {
                setCount(
                  event.nativeEvent.text === ""
                    ? 0
                    : Number(event.nativeEvent.text)
                );
                setIsEditing(false);
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

Display.displayName = "Form.FormCounter.Display";
