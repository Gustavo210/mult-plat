import { SubHeader } from "@/Header-Native/src";
import { Container } from "@mobilestock-native/container";
import { Typography } from "@mobilestock-native/typography";

export default function IndexAndroid() {
  return (
    <>
      <SubHeader.Horizontal>
        <SubHeader.Button icon="Cart" text="Carrinho" />
        <SubHeader.Button icon="TruckFastOutline" text="Entregas" />
        <SubHeader.Button icon="AttachMoney" text="LookPay" />
        <SubHeader.Button icon="CreditCard" text="Cartão" />
      </SubHeader.Horizontal>
      <Container.Vertical>
        <Typography>Rota Android para teste</Typography>
      </Container.Vertical>
    </>
  );
}
