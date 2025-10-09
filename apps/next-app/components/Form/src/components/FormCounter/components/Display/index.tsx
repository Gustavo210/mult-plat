import { Clickable } from "@mobilestockweb/clickable";
import { Typography } from "@mobilestockweb/typography";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useCounter } from "../../hooks/useCount";
import { Slot } from "../Slot";

export function Display() {
  const { count, editable, setCount } = useCounter();
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(count.toString());
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(count.toString());
  }, [count]);

  function handleExitInput(event: React.FocusEvent<HTMLInputElement>) {
    setCount(Number(event.target.value) || 0);
    setIsEditing(false);
  }
  function handleClickEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      ref.current?.blur();
    }
  }

  if (editable) {
    return (
      <Clickable onClick={() => setIsEditing(true)} type="button">
        <Slot>
          {isEditing ? (
            <Input
              ref={ref}
              value={inputValue}
              autoFocus
              onKeyDown={handleClickEnter}
              type="number"
              onChange={(event) => setInputValue(event.target.value)}
              onFocus={(event) => event.target.select()}
              onBlur={handleExitInput}
            />
          ) : (
            <Typography weight="BOLD" size="LG">
              {count}
            </Typography>
          )}
        </Slot>
      </Clickable>
    );
  }

  return (
    <Slot>
      <Typography weight="BOLD" size="LG">
        {count}
      </Typography>
    </Slot>
  );
}
const Input = styled.input`
  &:focus {
    outline: none;
    box-shadow: none;
  }
  border: none;
  background-color: transparent;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  appearance: textfield;
  -moz-appearance: textfield;
  font-weight: bold;
  font-size: ${({ theme }) => theme.font.size.lg || 16}px;
  text-align: center;
  width: 40px;
  height: 40px;
`;

Display.displayName = "Form.FormCounter.Display";
