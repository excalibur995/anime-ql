import { container } from "@/styles/global";
import styled from "@emotion/styled";
import Link from "next/link";

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  z-index: 50;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #efefefef;
  width: 100%;
  background-color: #ffffff;
  --bg-opacity: 0.5;
  backdrop-filter: blur(8px);
`;

const Container = styled.div`
  display: flex;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0 1rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const Href = styled(Link)`
  display: inline-flex;
  align-items: center;
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <Container className={container}>
        <ContentWrapper>
          <Href href="/">Anime-QL</Href>
        </ContentWrapper>
      </Container>
    </HeaderWrapper>
  );
};

export default Header;
