import Button from "@/components/common/Button";
import Modal, { ModalHandle } from "@/components/common/Modal";
import styled from "@emotion/styled";
import { useRef } from "react";
import { RxTrash } from "react-icons/rx";
import { Media } from "../../anime/types/media";
import {
  AnimeCollection,
  useCollectionContext,
} from "../context/AnimeCollectionContext";

const Inline = styled.section`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const Flex = styled.button`
  all: unset;
  display: flex;
  background: white;
  padding: 12px;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  z-index: 35;
`;

interface RemoveAnimeFromCollectionProps {
  collection: AnimeCollection;
  anime: Media;
}
const RemoveAnimeFromCollection = (props: RemoveAnimeFromCollectionProps) => {
  const removeFromCollectionRef = useRef<ModalHandle>(null);
  const { removeFromCollection } = useCollectionContext();
  const onDeleteModal = () => {
    removeFromCollection(props.collection.collectionId, props.anime);
    removeFromCollectionRef.current?.openModal();
  };

  return (
    <>
      <Flex
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          removeFromCollectionRef.current?.openModal();
        }}
      >
        <RxTrash />
      </Flex>
      <Modal title="Delete Confirmation" ref={removeFromCollectionRef}>
        <p>
          Are you sure you want to remove &quot;
          {props.anime.title.userPreferred}&quot; from &quot;
          {props.collection.collectionName}&quot; collection?
        </p>
        <Inline>
          <button
            style={{ all: "unset" }}
            onClick={() => removeFromCollectionRef.current?.closeModal()}
          >
            Cancel
          </button>
          <Button
            style={{ background: "red", color: "white" }}
            onClick={onDeleteModal}
          >
            Delete Collection
          </Button>
        </Inline>
      </Modal>
    </>
  );
};

export default RemoveAnimeFromCollection;
