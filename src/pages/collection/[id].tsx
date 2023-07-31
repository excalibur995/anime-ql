import Layout from "@/components/layouts/Layout";

import {
  AnimeCollection,
  useCollectionContext,
} from "@/lib/domain/collections/context/AnimeCollectionContext";
import { baseAlignment, container } from "@/styles/global";
import styled from "@emotion/styled";
import { cva } from "class-variance-authority";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { useMemo } from "react";

const EditCollectionName = dynamic(
  () => import("@/lib/domain/collections/components/EditCollectionName")
);

const AnimeList = dynamic(
  () => import("@/lib/domain/anime/components/AnimeList")
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const collectionId = context.params?.id as number | undefined;
  if (typeof collectionId === "undefined") {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      collectionId,
    },
  };
};

const SectionList = styled.section<{ direction?: "column" | "row" }>`
  display: flex;
  flex-direction: ${(props) => props.direction ?? "column"};
  gap: 1rem;
  text-align: left;
  align-items: center;
  justify-content: space-between;
`;

const NoCollectionLayout = styled(SectionList)`
  min-height: 100vh;
  justify-content: center;
`;

const CollectionDetail = (props: { collectionId: string }) => {
  const { collection } = useCollectionContext();
  const { collectionId } = props;
  const selectedCollection = useMemo<AnimeCollection>(() => {
    const data = collection.find(
      (item) => item.collectionId === Number(collectionId)
    );
    if (data) {
      return data;
    }
    return {
      collection: [],
      collectionId: 0,
      collectionName: "",
    };
  }, [collection, collectionId]);

  if (selectedCollection.collection.length < 1) {
    return (
      <NoCollectionLayout>
        <h3>Nothing to show here...</h3>
        <p>Add new Anime by go to Anime Detail Page</p>
      </NoCollectionLayout>
    );
  }

  return (
    <Layout className={cva([container, baseAlignment])()}>
      <SectionList direction="row">
        <h1>{selectedCollection.collectionName}</h1>
        <EditCollectionName {...selectedCollection} />
      </SectionList>
      <AnimeList
        list={selectedCollection.collection}
        collection={selectedCollection}
      />
    </Layout>
  );
};

export default CollectionDetail;
