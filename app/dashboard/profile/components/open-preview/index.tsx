'use client';

import { useState } from 'react';

import Button, { ButtonType } from '../../../../../components/button';
import Modal from '../../../../../components/modal';
import UploadProfileForm from '../upload-profile-form';

const OpenPreview = ({ buttonText, onSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="pb-4">
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <UploadProfileForm onSubmit={onSubmit} setModalOpen={setIsOpen} />
      </Modal>
      <Button type={ButtonType.Button} onClick={() => setIsOpen(true)}>
        {buttonText}
      </Button>
    </div>
  );
};

export default OpenPreview;
