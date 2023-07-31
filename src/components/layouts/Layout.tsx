import { css } from "@emotion/css";
import { PropsWithChildren } from "react";

import { cva } from "class-variance-authority";
import Header from "./Header";
import Seo from "./Seo";

const wrapper = css`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;
const mainContainer = css`
  margin-top: 24px;
  flex-grow: 1;
`;
const contentContainer = cva(
  css`
    position: relative;
  `
);

type LayoutProps = PropsWithChildren & { className?: string };

export default function Layout({ children, className }: LayoutProps) {
  return (
    <Seo>
      <div className={wrapper}>
        <Header />
        <main className={mainContainer}>
          <div className={contentContainer({ className })}>{children}</div>
        </main>
      </div>
    </Seo>
  );
}
