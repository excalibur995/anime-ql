import styled from "@emotion/styled";
import { PropsWithChildren } from "react";

type ColumnStyledProps = Pick<
  React.CSSProperties,
  "justifyContent" | "alignItems" | "padding" | "gap"
> & { className?: string };

const ColumnComponent = styled.div<ColumnStyledProps>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.alignItems ?? "start"};
  justify-content: ${(props) => props.justifyContent ?? "flex-start"};
  padding: ${(props) => props.padding};
  gap: ${(props) => props.gap};
`;

const Column = (props: ColumnStyledProps & PropsWithChildren) => {
  const { children, ...rest } = props;
  return <ColumnComponent {...rest}>{children}</ColumnComponent>;
};

export default Column;
