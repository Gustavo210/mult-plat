import { SubHeader } from "@/Header-Web/src";
import { Container } from "@mobilestockweb/container";
import { Typography } from "@mobilestockweb/typography";

export default function IndexWeb() {
  return (
    <>
      <SubHeader.Horizontal align="BETWEEN_CENTER">
        <Container.Horizontal>
          <SubHeader.Button
            icon="Box"
            text="Produtos"
            iconAlign="BEFORE-TEXT"
            variant="TRANSPARENT"
          />
          <SubHeader.Button
            icon="CreditCard"
            text="Look Pay"
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
          <SubHeader.Button
            icon="Whatsapp"
            text="Dúvidas"
            iconAlign="BEFORE-TEXT"
            variant="TRANSPARENT"
          />
        </Container.Horizontal>
        <Container.Horizontal>
          <SubHeader.Button
            icon="UserOutline"
            text="Perfil"
            iconAlign="BEFORE-TEXT"
            variant="TRANSPARENT"
          />
          <SubHeader.Button
            icon="Settings"
            text="Configurações"
            iconAlign="BEFORE-TEXT"
            variant="TRANSPARENT"
          />
        </Container.Horizontal>
      </SubHeader.Horizontal>
      <Container.Vertical>
        <Typography>Rota Web para Test</Typography>
      </Container.Vertical>
    </>
  );
}
