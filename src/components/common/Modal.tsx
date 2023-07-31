import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { Dialog, Portal, Transition } from "@headlessui/react";
import {
  Fragment,
  PropsWithChildren,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";

interface ModalProps extends PropsWithChildren {
  title?: string;
}

export type ModalHandle = {
  closeModal: () => void;
  openModal: () => void;
  isOpen: boolean;
};

const Modal = forwardRef<ModalHandle, ModalProps>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useImperativeHandle(ref, () => ({
    closeModal,
    openModal,
    isOpen,
  }));

  return (
    <Portal>
      <Transition appear show={isOpen} as={Fragment}>
        <DialogRoot
          as="div"
          onClose={closeModal}
          onClick={(event: {
            preventDefault: () => void;
            stopPropagation: () => void;
          }) => {
            event.preventDefault();
            event.stopPropagation();
          }}
        >
          <Transition.Child
            as={Fragment}
            enter={easeOut}
            enterFrom={hidden}
            enterTo={visible}
            leave={easeIn}
            leaveFrom={visible}
            leaveTo={hidden}
          >
            <OverlayBackground />
          </Transition.Child>

          <DialogContainer>
            <DialogContent>
              <Transition.Child
                as={Fragment}
                enter={easeOut}
                enterFrom={opacity0to95}
                enterTo={shown}
                leave={easeIn}
                leaveFrom={shown}
                leaveTo={opacity0to95}
              >
                <Panel>
                  <Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {props.title}
                  </Title>
                  {props.children}
                </Panel>
              </Transition.Child>
            </DialogContent>
          </DialogContainer>
        </DialogRoot>
      </Transition>
    </Portal>
  );
});

Modal.displayName = "Modal";
export default Modal;
const hidden = css`
  opacity: 0;
`;

const visible = css`
  opacity: 1;
`;

const shown = css`
  ${visible}
  transform: scale(1);
`;

const opacity0to95 = css`
  ${hidden}
  transform: scale(0.95);
`;

const easeOut = css`
  animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  animation-duration: 300ms;
`;

const easeIn = css`
  animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  animation-duration: 200ms;
`;

const DialogRoot = styled(Dialog)`
  position: relative;
  z-index: 10;
`;

const OverlayBackground = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 99;
`;

const DialogContainer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
`;

const DialogContent = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  padding: 16px;
  text-align: center;
`;

const Panel = styled(Dialog.Panel)`
  width: 100%;
  max-width: 400px; /* Adjust the width as needed */
  overflow: hidden;
  border-radius: 20px;
  background-color: #ffffff; /* Replace with the desired color */
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const Title = styled(Dialog.Title)`
  font-size: 18px;
  font-weight: 600;
  color: #333333; /* Replace with the desired text color */
  margin-bottom: 12px;
`;
