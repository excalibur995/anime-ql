import { css } from "@emotion/css";
import { PropsWithChildren } from "react";

import { baseAlignment, container } from "@/styles/global";
import { cva } from "class-variance-authority";
import Seo from "./Seo";

const wrapper = css`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;
const mainContainer = css`
  margin-top: 65px;
  flex-grow: 1;
`;
const contentContainer = cva([container, baseAlignment]);

type LayoutProps = PropsWithChildren & { className?: string };

export default function Layout({ children, className }: LayoutProps) {
  return (
    <Seo>
      <div className={wrapper}>
        <main className={mainContainer}>
          <div className={contentContainer({ className })}>{children}</div>
        </main>
      </div>
    </Seo>
  );
}
