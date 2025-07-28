import { Container } from "@mobilestock-native/container";
import React, { useState } from "react";
import { Button, ButtonProps } from "../../COMPONENTE/native/Button/src";

import { Typography } from "@mobilestock-native/typography";

export default function IndexAndroid() {
  return (
    <>
      <Typography>Rota Android para button</Typography>

      <Container.Vertical gap="XS">
        {(["XS", "SM", "MD", "LG", "XL", "2XL", "3XL"] as ButtonProps["size"][])
          .map<ButtonProps>((item) => ({
            icon: "AlertCircle",
            circular: false,
            text: `OLA ${item}`,
            iconAlign: "ABOVE-TEXT",
            textAlign: "CENTER",
            notification: -1,
            variant: "DEFAULT",
            // notificationPosition: "END",
            size: item,
          }))
          .map((props, index) => (
            <MyButton key={index} {...props} />
          ))}
      </Container.Vertical>
    </>
  );
}
function MyButton(props: ButtonProps) {
  const [loading, setLoading] = useState("");
  return (
    <Button
      isLoading={loading === props.size}
      onPress={() => {
        setLoading(props.size);
        setTimeout(() => setLoading(""), 1500);
      }}
      {...props}
    />
  );
}
