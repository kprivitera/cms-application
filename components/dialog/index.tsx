interface DialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmDisabled: boolean; // Add this line
}

const Dialog: React.FC<DialogProps> = ({ isOpen, title, message, onConfirm, onCancel, confirmDisabled }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed text-black inset-0 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-base">{message}</p>
        <button className="border py-1 px-3 rounded mr-2" onClick={onConfirm} disabled={confirmDisabled}>
          Confirm
        </button>
        <button className="border py-1 px-3 rounded" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Dialog;
