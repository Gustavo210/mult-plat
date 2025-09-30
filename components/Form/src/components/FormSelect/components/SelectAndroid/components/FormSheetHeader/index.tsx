import { Container } from "@mobilestock-native/container";
import { GestureDetector, PanGesture } from "react-native-gesture-handler";
import { DragIndicator } from "../DragIndicator";
import { Placeholder } from "../Placeholder";

export function FormSheetHeader({
  placeholder,
  panGesture,
}: {
  placeholder: string;
  panGesture?: PanGesture;
}) {
  if (panGesture) {
    return (
      <GestureDetector gesture={panGesture}>
        <Container.Vertical padding="XS">
          <Container.Horizontal align="CENTER">
            <DragIndicator />
          </Container.Horizontal>
          <Container.Horizontal>
            <Placeholder text={placeholder} />
          </Container.Horizontal>
        </Container.Vertical>
      </GestureDetector>
    );
  }
  return (
    <Container.Vertical padding="XS">
      <Container.Horizontal>
        <Placeholder text={placeholder} />
      </Container.Horizontal>
    </Container.Vertical>
  );
}
