import styled from "@emotion/styled";
import { PropsWithChildren } from "react";

type RowStyledProps = Pick<
  React.CSSProperties,
  "justifyContent" | "alignItems" | "padding"
>;

const RowComponent = styled.div<RowStyledProps>`
  display: inline-flex;
  align-items: ${(props) => props.alignItems ?? "center"};
  justify-content: ${(props) => props.justifyContent ?? "flex-start"};
  padding: ${(props) => props.padding};
`;

const Row = (props: RowStyledProps & PropsWithChildren) => {
  const { children, ...rest } = props;
  return <RowComponent {...rest}>{children}</RowComponent>;
};

export default Row;
