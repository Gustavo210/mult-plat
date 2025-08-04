import { Button, ButtonProps } from "@mobilestockweb/button";

interface HeaderButtonProps extends Omit<ButtonProps, "icon" | "text"> {
  icon: ButtonProps["icon"];
  text: string;
}

export function HeaderButton({ icon, text, ...rest }: HeaderButtonProps) {
  return (
    <Button
      icon={icon}
      text={text}
      size="SM"
      variant="LINK"
      iconAlign="ABOVE-TEXT"
      {...rest}
    />
  );
}
