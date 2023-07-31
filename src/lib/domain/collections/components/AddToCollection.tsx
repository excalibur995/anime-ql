import Modal, { ModalHandle } from "@/components/common/Modal";
import { plural } from "@/lib/utils/utils";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { RxPlus } from "react-icons/rx";
import { Media } from "../../anime/types/media";
import { useCollectionContext } from "../context/AnimeCollectionContext";
import CreateCollectionForm from "./CreateCollectionForm";

interface AddToCollectionProps {
  anime: Media;
  onCallbackAdd?: () => void;
}
const AddToCollection = (props: AddToCollectionProps) => {
  const {
    collection,
    addToCollection,
    isAnimeInsideCollection,
    removeFromCollection,
  } = useCollectionContext();
  const ref = useRef<ModalHandle>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  return (
    <>
      <Container>
        {collection.map((item) => (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            key={item.collectionId}
          >
            <Link
              style={{ display: "flex" }}
              href={"/collection/" + item.collectionId}
            >
              <ListItem>
                <SectionList direction="row">
                  <ListImage
                    ref={imageRef}
                    width={80}
                    height={80}
                    src={item.collection?.[0]?.coverImage.large ?? ""}
                    alt={item.collectionName}
                    onError={(e) => {
                      if (imageRef.current) {
                        imageRef.current.src = "/placeholder.png";
                      }
                    }}
                  />
                  <SectionList direction="column">
                    <ListTitle>{item.collectionName}</ListTitle>
                    {item.collection.length > 0 && (
                      <ListDesc>
                        {item.collection.length}{" "}
                        {plural(item.collection.length, "Anime")}
                      </ListDesc>
                    )}
                  </SectionList>
                </SectionList>
              </ListItem>
            </Link>
            <AddRemoveButton
              isInside={isAnimeInsideCollection(item.collectionId, props.anime)}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const isInside = isAnimeInsideCollection(
                  item.collectionId,
                  props.anime
                );
                if (isInside) {
                  removeFromCollection(item.collectionId, props.anime);
                  return props?.onCallbackAdd?.();
                }
                addToCollection(item.collectionId, props.anime);
                props?.onCallbackAdd?.();
              }}
            >
              <RxPlus />
            </AddRemoveButton>
          </div>
        ))}

        <CreateNewButton as="button" onClick={() => ref.current?.openModal()}>
          <RxPlus />
          <ListTitle>Create new Collection</ListTitle>
        </CreateNewButton>
        <Modal ref={ref} title="Create New Collection">
          <CreateCollectionForm
            onHandleCreateCollection={(collection) => {
              ref.current?.closeModal();
              addToCollection(collection.collectionId, props.anime);
            }}
          />
        </Modal>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  position: relative;
  overflow-y: auto;
  max-height: 100vw;
`;

const ListItem = styled.div`
  all: unset;
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  transition: all 500ms;
  cursor: pointer;
  padding: 1rem;
  border-radius: 1rem;
  text-align: left;
  justify-content: space-between;
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: #f0f1f3;
    }
  }
`;

const CreateNewButton = styled(ListItem)`
  background-color: #f0f1f3;
  justify-content: flex-start;
  margin-bottom: 1em;
`;

const SectionList = styled.section<{ direction?: "column" | "row" }>`
  display: flex;
  flex-direction: ${(props) => props.direction ?? "column"};
  gap: 1rem;
  justify-content: center;
  text-align: left;
`;

const ListTitle = styled.span`
  font-weight: 700;
  font-size: 16px;
`;

const ListDesc = styled.span`
  font-weight: 500;
  font-size: 14px;
`;
const ListImage = styled(Image)`
  border-radius: 1rem;
`;

const AddRemoveButton = styled.button<{ isInside?: boolean }>`
  all: unset;
  padding: 8px;
  border-radius: 9999px;
  background-color: ${(props) => (props.isInside ? "red" : "#5b4ab080")};
  align-items: center;
  display: flex;
  color: #ffff;
  transition: all 500ms;
  svg {
    transform: rotate(${(props) => (props.isInside ? 135 : 90)}deg);
  }
`;

export default AddToCollection;
