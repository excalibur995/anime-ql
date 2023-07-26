import { css } from "@emotion/css";

export const breakpoints = {
  sm: "@media (min-width: 640px)",
  md: "@media (min-width: 768px)",
  lg: "@media (min-width: 1024px)",
  xl: "@media (min-width: 1280px)",
  "2xl": "@media (min-width: 1536px)",
  "3xl": "@media (min-width: 1800px)",
} as const;

// Emotion styles for the .container
export const container = css`
  ${breakpoints.sm} {
    max-width: 640px;
  }

  ${breakpoints.md} {
    max-width: 768px;
  }

  ${breakpoints.lg} {
    max-width: 1024px;
  }

  ${breakpoints.xl} {
    max-width: 1280px;
  }

  ${breakpoints["2xl"]} {
    max-width: 1536px;
  }

  ${breakpoints["3xl"]} {
    max-width: 1800px;
  }
`;

export const baseAlignment = css`
  margin: 0 auto;
  padding: 1rem;
`;

export const grid = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
  gap: 1rem;
`;
