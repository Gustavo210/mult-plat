import { Button } from "@mobilestockweb/button";
import { useTheme } from "styled-components";

export function ImageAdd() {
  const Theme = useTheme();
  return (
    <Button
      icon="Plus"
      variant="OUTLINE"
      style={{
        height: Theme.sizeImage.sm,
        width: Theme.sizeImage.sm,
        minWidth: Theme.sizeImage.sm,
        minHeight: Theme.sizeImage.sm,
      }}
    />
  );
}
