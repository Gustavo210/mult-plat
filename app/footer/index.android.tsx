import React from 'react';
import { styled } from 'styled-components/native';
import { Typography } from "@mobilestock-native/typography";

export default function IndexAndroid() {
  return (
    <AndroidContainer>
      <Typography>Rota Android para footer</Typography>
    </AndroidContainer>
  );
}

const AndroidContainer = styled.View``;
