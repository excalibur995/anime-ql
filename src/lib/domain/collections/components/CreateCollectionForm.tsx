import Button from "@/components/common/Button";
import styled from "@emotion/styled";
import { violet } from "@radix-ui/colors";
import { FormEvent } from "react";
import {
  AnimeCollection,
  useCollectionContext,
} from "../context/AnimeCollectionContext";

interface CreateCollectionFormProps {
  onHandleCreateCollection?: (collection: AnimeCollection) => void;
}

const CreateCollectionForm = (props: CreateCollectionFormProps) => {
  const { createCollection } = useCollectionContext();
  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const collectionName = form.get("collectionName");
    const collection = await createCollection(collectionName!.toString());
    props?.onHandleCreateCollection?.(collection);
  };
  return (
    <form onSubmit={handleSubmitForm}>
      <Fieldset>
        <Label htmlFor="collectionName">Name</Label>
        <Input
          id="collectionName"
          name="collectionName"
          required
          placeholder="Create Collection Name"
        />
      </Fieldset>
      <Button type="submit">Create Collection</Button>
    </form>
  );
};

const Fieldset = styled.fieldset({
  all: "unset",
  display: "flex",
  gap: 20,
  alignItems: "center",
  marginBottom: 15,
});

const Label = styled.label({
  fontSize: 15,
  color: violet.violet11,
});

const Input = styled.input({
  all: "unset",
  width: "100%",
  flex: "1",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  padding: "0 10px",
  fontSize: 15,
  lineHeight: 1,
  color: violet.violet11,
  boxShadow: `0 0 0 1px ${violet.violet7}`,
  height: 35,
  "&:focus": { boxShadow: `0 0 0 2px ${violet.violet8}` },
});

export default CreateCollectionForm;
