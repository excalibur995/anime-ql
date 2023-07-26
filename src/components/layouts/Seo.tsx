import Head from "next/head";
import { PropsWithChildren } from "react";

interface SeoProps extends PropsWithChildren {
  title?: string;
  description?: string;
  viewportContent?: string;
}

const Seo = (props: SeoProps) => {
  const {
    viewportContent = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
    title = "Anime-QL",
    description = "Best Anime Library",
  } = props;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content={viewportContent} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {props.children}
    </>
  );
};

export default Seo;
