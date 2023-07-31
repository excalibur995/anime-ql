import { grid } from "@/styles/global";
import styled from "@emotion/styled";
import ItemCardPlaceHolder from "./Placeholder";

interface RNProps<T> {
  data: T[];
  label?: string;
  isLoading: boolean;
  emptyText?: string;
  children: (data: T[]) => JSX.Element;
}

const GridView = styled.div`
  gap: 1rem;
`;

const PlaceholderWrapper = styled.div`
  width: 100%;
  padding: 1rem;
`;

const EmptyStateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 2rem;
  text-align: center;
`;

const LoadingState = <T,>({
  data = [],
  isLoading,
  emptyText,
  label = "Data",
  children,
}: RNProps<T>) => {
  if (isLoading) {
    return (
      <GridView className={grid}>
        {[...Array(10).fill(10)].map((_, i) => (
          <PlaceholderWrapper key={i}>
            <ItemCardPlaceHolder />
          </PlaceholderWrapper>
        ))}
      </GridView>
    );
  }

  if (!isLoading && data?.length > 0) {
    return <>{children(data)}</>;
  }

  if (!isLoading && data?.length === 0) {
    return (
      <EmptyStateWrapper>
        <div>{emptyText}</div>
      </EmptyStateWrapper>
    );
  }

  return (
    <EmptyStateWrapper>
      <div>No {label}</div>
    </EmptyStateWrapper>
  );
};

export default LoadingState;
