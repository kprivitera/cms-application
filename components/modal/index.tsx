import Button from '../button';
import ContentWrapper from '../content-wrapper';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
      <ContentWrapper>
        <Button onClick={onClose}>Close</Button>
        <div className="p-6">{children}</div>
      </ContentWrapper>
    </div>
  );
};

export default Modal;
