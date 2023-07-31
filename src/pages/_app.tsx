import Layout from "@/components/layouts/Layout";
import Seo from "@/components/layouts/Seo";
import CollectionProvider from "@/lib/domain/collections/context/AnimeCollectionContext";
import ApolloWrapper from "@/lib/drivers/apollo/ApolloWrapper";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Seo>
      <ApolloWrapper>
        <CollectionProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CollectionProvider>
      </ApolloWrapper>
    </Seo>
  );
}
