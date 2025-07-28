import { Icon } from "@mobilestock-native/icons";
import { Button, ButtonProps } from "@mobilestockweb/button";
import { Container } from "@mobilestockweb/container";
import { Typography } from "@mobilestockweb/typography";
import React, { useState } from "react";
import styled from "styled-components";

export default function IndexWeb() {
  return (
    <>
      <Typography>Rota Android para button</Typography>
      <Container.Vertical gap="XS">
        {(["XS", "SM", "MD", "LG", "XL", "2XL", "3XL"] as ButtonProps["size"][])
          .map<ButtonProps>((item) => ({
            icon: "AlertCircle",
            circular: false,
            text: `OLA ${item}`,
            // iconAlign: "ABOVE-TEXT",
            textAlign: "CENTER",
            // notification: 10,
            variant: "DEFAULT",

            // notificationPosition: "END",
            size: item,
          }))
          .map((props, index) => (
            <MyButton key={index} {...props} />
          ))}
        <MYBUTTON
          style={{
            backgroundColor: "black",
          }}
        >
          <Icon name="AlertCircle" />
          <Typography> OPA</Typography>
        </MYBUTTON>
      </Container.Vertical>
    </>
  );
}
function MyButton(props: ButtonProps) {
  const [loading, setLoading] = useState("");
  return (
    <Button
      isLoading={loading === props.size}
      onClick={() => {
        setLoading(props.size);
        setTimeout(() => setLoading(""), 1500);
      }}
      {...props}
    />
  );
}

const MYBUTTON = styled.button`
  background-color: black;

  display: flex;
  flex-direction: row;

  gap: 5px;

  justify-content: center;
  align-items: center;

  padding: 0.75rem 1rem;

  * {
    color: white;
  }
`;
