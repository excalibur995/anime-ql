import Button from "@/components/common/Button";
import Modal, { ModalHandle } from "@/components/common/Modal";
import styled from "@emotion/styled";
import { useRef } from "react";
import { RxTrash } from "react-icons/rx";
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

const DeleteCollection = (props: AnimeCollection) => {
  const deleteCollectionRef = useRef<ModalHandle>(null);
  const { removeCollection } = useCollectionContext();
  const onDeleteModal = () => {
    removeCollection(props.collectionId);
    deleteCollectionRef.current?.openModal();
  };

  return (
    <>
      <div
        role="button"
        onClick={() => deleteCollectionRef.current?.openModal()}
      >
        <RxTrash />
      </div>
      <Modal title="Delete Confirmation" ref={deleteCollectionRef}>
        <p>
          Are you sure you want to delete &quot;{props.collectionName}&quot;
          collection?
        </p>
        <Inline>
          <button
            style={{ all: "unset" }}
            onClick={() => deleteCollectionRef.current?.closeModal()}
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

export default DeleteCollection;
