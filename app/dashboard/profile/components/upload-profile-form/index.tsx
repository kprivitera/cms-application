import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import Image from 'next/image';

import Button from '../../../../../components/button';
import Dialog from '../../../../../components/dialog';

type MyFormData = {
  file: File[];
};

const UploadProfileForm = ({ onSubmit, setModalOpen }) => {
  const { register, handleSubmit, setValue } = useForm<MyFormData>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);

  const [isDialogOpen, setDialogOpen] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setSelectedFile(acceptedFiles[0]);
      setValue('file', acceptedFiles);
    },
    [setValue],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    if (formData) {
      setDialogOpen(true);
    }
  }, [formData]);

  const onFormSubmit = (data: MyFormData) => {
    const formData2 = new FormData();
    formData2.append('file', data.file[0]);
    setFormData(formData2);
  };

  const handleConfirm = () => {
    if (formData) {
      onSubmit(formData);
      setDialogOpen(false);
      setModalOpen(false);
    }
  };

  const handleCancel = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <fieldset>
        <legend>Upload profile image</legend>
        <form method="post" encType="multipart/form-data" onSubmit={handleSubmit(onFormSubmit)}>
          {!selectedFile && (
            <div className="flex items-center justify-center w-full">
              <label
                {...getRootProps()}
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6 px-20">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5a5.5 5.5 0 0 0-10.793-.479C5.137 5.017 5.071 5 5"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <Field id="dropzone-file" {...getInputProps()} {...register('file')} type="file" className="hidden" />
              </label>
            </div>
          )}
          <Button>Submit</Button>
          {selectedFile && (
            <div>
              <h2>Preview:</h2>
              <Image width={300} height={300} src={URL.createObjectURL(selectedFile)} alt="Preview" />
            </div>
          )}
        </form>
      </fieldset>
      <Dialog
        isOpen={isDialogOpen}
        title="Confirm Action"
        message="Are you sure you want to perform this action?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        confirmDisabled={!formData}
      />
    </>
  );
};

export default UploadProfileForm;
