import styled from "@emotion/styled";

const CardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #cbd5e0;
  background: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border-radius: 0.375rem;
  @media (prefers-color-scheme: dark) {
    border-color: #4a5568;
    background: #2d3748;
  }
`;

const SquareBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  border-radius: 0.375rem;
  background: #cbd5e0;
  @media (prefers-color-scheme: dark) {
    background: #4a5568;
  }
`;

const Icon = styled.svg`
  width: 3rem;
  height: 3rem;
  fill: #cbd5e0;
  @media (prefers-color-scheme: dark) {
    fill: #4a5568;
  }
`;

const Line = styled.div<{ width?: number | string }>`
  width: ${(props) => props.width || "100%"};
  height: 0.625rem;
  border-radius: 0.3125rem;
  background: #cbd5e0;
  @media (prefers-color-scheme: dark) {
    background: #4a5568;
  }
`;

const Section = styled.section`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ItemCardPlaceHolder = () => {
  return (
    <CardWrapper role="status">
      <SquareBox>
        <Icon
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 640 512"
        >
          <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 0.0006 486.1 0.0006 456.1L0 456.1z" />
        </Icon>
      </SquareBox>
      <Section>
        <Line width="75%" />
        <Line />
        <Line />
        <Line />
      </Section>
    </CardWrapper>
  );
};

export default ItemCardPlaceHolder;
