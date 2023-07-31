import Modal, { ModalHandle } from "@/components/common/Modal";
import { useRef } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { AnimeCollection } from "../context/AnimeCollectionContext";
import EditCollectionForm from "./EditCollectionForm";

const EditCollectionName = (props: AnimeCollection) => {
  const editCollectionRef = useRef<ModalHandle>(null);

  return (
    <>
      <div role="button" onClick={() => editCollectionRef.current?.openModal()}>
        <RiEdit2Fill />
      </div>
      <Modal title="Edit Collection" ref={editCollectionRef}>
        <EditCollectionForm
          collection={props}
          onHandleEditCollection={() => editCollectionRef.current?.closeModal()}
        />
      </Modal>
    </>
  );
};

export default EditCollectionName;
