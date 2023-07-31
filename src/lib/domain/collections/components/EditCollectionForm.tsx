import Button from "@/components/common/Button";
import { FormEvent } from "react";

import styled from "@emotion/styled";
import { violet } from "@radix-ui/colors";
import {
  AnimeCollection,
  useCollectionContext,
} from "../context/AnimeCollectionContext";

interface EditCollectionProps {
  onHandleEditCollection?: () => void;
  collection: AnimeCollection;
}

const EditCollectionForm = (props: EditCollectionProps) => {
  const { editCollectionName } = useCollectionContext();
  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const collectionName = form.get("collectionName");
    const edited = editCollectionName(
      props.collection.collectionId,
      collectionName?.toString()!
    );
    if (!!edited) {
      props?.onHandleEditCollection?.();
    }
  };
  return (
    <form onSubmit={handleSubmitForm}>
      <Fieldset>
        <Label htmlFor="collectionName">Name</Label>
        <Input
          id="collectionName"
          name="collectionName"
          required
          defaultValue={props.collection.collectionName}
          placeholder="Create Collection Name"
        />
      </Fieldset>
      <Button type="submit">Edit Collection</Button>
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

export default EditCollectionForm;
