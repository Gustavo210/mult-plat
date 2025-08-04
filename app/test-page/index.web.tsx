import { SubHeader } from "@/Header-Web/src";
import { Container } from "@mobilestockweb/container";
import { Typography } from "@mobilestockweb/typography";

export default function IndexWeb() {
  return (
    <>
      <SubHeader.Horizontal>
        <SubHeader.Button icon="Cart" text="Carrinho" />
        <SubHeader.Button icon="TruckFastOutline" text="Entregas" />
        <SubHeader.Button icon="AttachMoney" text="LookPay" />
        <SubHeader.Button icon="CreditCard" text="Cartão" />
      </SubHeader.Horizontal>
      <Container.Vertical>
        <Typography>Rota Web para Test</Typography>
      </Container.Vertical>
    </>
  );
}
