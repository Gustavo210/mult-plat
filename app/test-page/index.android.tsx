import { Container } from "@mobilestock-native/container";
import { SubHeader } from "@mobilestock-native/header";
import { Typography } from "@mobilestock-native/typography";

export default function IndexAndroid() {
  return (
    <>
      <SubHeader.Horizontal align="BETWEEN_CENTER" overflow="SCROLL">
        <Container.Vertical>
          <SubHeader.Button
            icon="Box"
            text="Produtos"
            iconAlign="BEFORE-TEXT"
            variant="TRANSPARENT"
          />
          <SubHeader.Button
            icon="CreditCard"
            text="LookPay"
            iconAlign="BEFORE-TEXT"
            variant="TRANSPARENT"
          />
          <SubHeader.Button
            icon="Cart"
            text="Carrinho"
            iconAlign="BEFORE-TEXT"
            notification={4}
            variant="TRANSPARENT"
          />
        </Container.Vertical>
        <Container.Vertical>
          <SubHeader.Button
            icon="UserOutline"
            text="Perfil"
            iconAlign="BEFORE-TEXT"
            variant="TRANSPARENT"
          />
          <SubHeader.Button
            icon="Whatsapp"
            text="Dúvidas"
            iconAlign="BEFORE-TEXT"
            variant="TRANSPARENT"
          />
          <SubHeader.Button
            icon="Settings"
            text="Configurações"
            iconAlign="BEFORE-TEXT"
            variant="TRANSPARENT"
          />
        </Container.Vertical>
      </SubHeader.Horizontal>
      <Container.Vertical>
        <Typography>Rota Android para teste</Typography>
      </Container.Vertical>
    </>
  );
}
