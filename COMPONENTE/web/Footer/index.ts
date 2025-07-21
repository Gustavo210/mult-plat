import { FooterComponent } from "./src";
import { ContentArea } from "./src/components/ContentArea";
import { FloatArea } from "./src/components/FloatArea";
import { Title } from "./src/components/FooterTitle";

export const Footer = Object.assign(FooterComponent, {
  FloatArea,
  Title,
  ContentArea,
});
