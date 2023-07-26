import Seo from "@/components/layouts/Seo";
import ApolloWrapper from "@/lib/drivers/apollo/ApolloWrapper";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Seo>
      <ApolloWrapper>
        <Component {...pageProps} />
      </ApolloWrapper>
    </Seo>
  );
}
