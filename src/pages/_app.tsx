import Layout from "@/components/layouts/Layout";
import Seo from "@/components/layouts/Seo";
import CollectionProvider from "@/lib/domain/collections/context/AnimeCollectionContext";
import ApolloWrapper from "@/lib/drivers/apollo/ApolloWrapper";
import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <Seo>
        <NextUIProvider>
          <ApolloWrapper>
            <CollectionProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </CollectionProvider>
          </ApolloWrapper>
        </NextUIProvider>
      </Seo>
    </>
  );
}
