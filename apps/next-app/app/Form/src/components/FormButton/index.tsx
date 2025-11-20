"use client";

import { ButtonHTMLAttributes } from "react";

import { Button, ButtonProps } from "@mobilestockweb/button";

import { useForm } from "../../hooks/useForm";

export interface FormButtonProps extends Omit<ButtonProps, "type"> {
  type?: "SUBMIT" | "RESET" | "BUTTON";
}

export function FormButton({
  type = "SUBMIT",
  disabled,
  isLoading,
  onClick,
  ...props
}: FormButtonProps) {
  const { submitForm, clearForm, loading } = useForm();

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    switch (type) {
      case "SUBMIT":
        submitForm();
        break;
      case "RESET":
        clearForm();
        break;
      default:
        onClick?.(event);
    }
  }

  return (
    <Button
      {...props}
      onClick={handleClick}
      isLoading={(type === "SUBMIT" && loading) || isLoading}
      disabled={loading || isLoading || disabled}
      type={
        type.toLowerCase() as ButtonHTMLAttributes<HTMLButtonElement>["type"]
      }
    />
  );
}
