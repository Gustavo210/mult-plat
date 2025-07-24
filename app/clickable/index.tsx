import React from 'react';
import { styled } from 'styled-components/native';

const FallbackContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
`;

const FallbackText = styled.Text`
  font-size: 24px;
  color: #333;
`;

export default function Index() {
  return (
    <FallbackContainer>
      <FallbackText>Fallback para clickable</FallbackText>
    </FallbackContainer>
  );
}
