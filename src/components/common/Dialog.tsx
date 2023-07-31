import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

import { blackA, mauve, violet } from "@radix-ui/colors";
import * as Dialog from "@radix-ui/react-dialog";
import { PropsWithChildren } from "react";
import { RxCross1 } from "react-icons/rx";

interface ModalProps extends PropsWithChildren {
  title?: string;
  desc?: string;
  content?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const DialogModal = (props: ModalProps) => (
  <Dialog.Root open={props.open} onOpenChange={props.onOpenChange}>
    <Dialog.Trigger
      asChild
      onClick={(event) => {
        event.stopPropagation();
        event.nativeEvent.preventDefault();
      }}
    >
      <TriggerContent>{props.children}</TriggerContent>
    </Dialog.Trigger>
    <Dialog.Portal>
      <DialogOverlay
        onClick={(event) => {
          event.stopPropagation();
          event.nativeEvent.preventDefault();
        }}
      />
      <DialogContent>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogDescription>{props.desc}</DialogDescription>
        {props.content}
        <Dialog.Close
          asChild
          onClick={(event) => {
            event.stopPropagation();
            event.nativeEvent.preventDefault();
          }}
        >
          <IconButton aria-label="Close">
            <RxCross1 />
          </IconButton>
        </Dialog.Close>
      </DialogContent>
    </Dialog.Portal>
  </Dialog.Root>
);

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const contentShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

const DialogOverlay = styled(Dialog.Overlay)({
  backgroundColor: blackA.blackA9,
  zIndex: 90,
  position: "fixed",
  inset: 0,
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
});

const TriggerContent = styled("button")({
  all: "unset",
});

const DialogContent = styled(Dialog.Content)({
  backgroundColor: "white",
  zIndex: 91,
  borderRadius: 6,
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  maxWidth: "450px",
  maxHeight: "85vh",
  padding: 25,
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  "&:focus": { outline: "none" },
});

const DialogTitle = styled(Dialog.Title)({
  margin: 0,
  fontWeight: 500,
  color: mauve.mauve12,
  fontSize: 17,
});

const DialogDescription = styled(Dialog.Description)({
  margin: "10px 0 20px",
  color: mauve.mauve11,
  fontSize: 15,
  lineHeight: 1.5,
});

const IconButton = styled.button({
  all: "unset",
  fontFamily: "inherit",
  borderRadius: "100%",
  height: 25,
  width: 25,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: violet.violet11,
  position: "absolute",
  top: 10,
  right: 10,

  "&:hover": { backgroundColor: violet.violet4 },
  "&:focus": { boxShadow: `0 0 0 2px ${violet.violet7}` },
});

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
  width: 90,
  textAlign: "right",
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

export default DialogModal;
