import React from 'react';
import Modal from 'react-responsive-modal';
import './ModalWindow.scss';
import { Loader } from '../Loader/Loader';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  fileType: 'image' | 'text';
  fileSrc: string;
  textContent?: string;
}

export const ModalWindow: React.FC<Props> = ({
  isOpen,
  onClose,
  fileType,
  fileSrc,
  textContent,
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      center
      closeOnOverlayClick
      classNames={{
        modal: 'ModalWindow',
        overlay: 'ModalWindow__overlay',
        modalAnimationIn: 'ModalWindow__animation',
        overlayAnimationIn: 'ModalWindow__animation',
      }}
      animationDuration={800}
    >
      {fileType === 'image' && <img src={fileSrc} alt="Attachment" />}

      {fileType === 'text'
        && (textContent
          ? (
            <pre>{textContent}</pre>
          )
          : (
            <Loader />
          ))}
    </Modal>
  );
};
