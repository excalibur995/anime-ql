import styled from "@emotion/styled";
import { blackA, mauve, violet } from "@radix-ui/colors";
import { ComponentPropsWithoutRef, PropsWithChildren, forwardRef } from "react";

type ButtonProp = ComponentPropsWithoutRef<"button"> & PropsWithChildren;

const Button = forwardRef<HTMLButtonElement, ButtonProp>((props, ref) => {
  const { children, ...rest } = props;
  return (
    <ButtonComponent ref={ref} {...rest}>
      {children}
    </ButtonComponent>
  );
});

Button.displayName = "Button";

const ButtonComponent = styled.button({
  all: "unset",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  padding: "0 15px",
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
  height: 42,
  backgroundColor: "white",
  color: violet.violet11,
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
  "&:hover": { backgroundColor: mauve.mauve3 },
  "&:focus": { boxShadow: `0 0 0 2px black` },
});

export default Button;
