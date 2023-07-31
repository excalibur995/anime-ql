import Modal, { ModalHandle } from "@/components/common/Modal";
import Layout from "@/components/layouts/Layout";
import CollectionCard from "@/lib/domain/collections/components/CollectionCard";
import CreateCollectionForm from "@/lib/domain/collections/components/CreateCollectionForm";
import { useCollectionContext } from "@/lib/domain/collections/context/AnimeCollectionContext";
import { baseAlignment, container, grid } from "@/styles/global";
import styled from "@emotion/styled";
import { cva } from "class-variance-authority";
import { useRef } from "react";

const AddNewCollectionButton = styled.button`
  all: unset;
  cursor: pointer;
`;

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

const Grid = styled.div`
  margin: 1em 0;
`;

const AddNewCollection = () => {
  const createCollectionRef = useRef<ModalHandle>(null);

  return (
    <>
      <AddNewCollectionButton
        onClick={() => {
          createCollectionRef.current?.openModal();
        }}
      >
        Add new Collection
      </AddNewCollectionButton>
      <Modal title="Create New Collection" ref={createCollectionRef}>
        <CreateCollectionForm
          onHandleCreateCollection={createCollectionRef.current?.closeModal}
        />
      </Modal>
    </>
  );
};

const CollectionPage = () => {
  const { collection } = useCollectionContext();
  if (collection.length < 1) {
    return (
      <NoCollectionLayout>
        <h3>No Collection yet...</h3>
        <AddNewCollection />
      </NoCollectionLayout>
    );
  }
  return (
    <Layout className={cva([container, baseAlignment])()}>
      <SectionList direction="row">
        <h3>Collection</h3>
        <AddNewCollection />
      </SectionList>
      <Grid className={grid}>
        {collection.map((coll) => (
          <CollectionCard key={coll.collectionId} {...coll} />
        ))}
      </Grid>
    </Layout>
  );
};

export default CollectionPage;
