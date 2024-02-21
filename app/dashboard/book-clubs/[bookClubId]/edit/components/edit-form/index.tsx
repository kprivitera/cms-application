'use client';
import { useState } from 'react';

import { BookClub } from '../../../../../../../types';
import Button from '../../../../../../../components/button';
import ContentWrapper from '../../../../../../../components/content-wrapper';
import Field from '../../../../../../../components/field';

type EditBookClubFormProps = {
  bookClubData: BookClub;
  onSubmit: (formData: FormData) => Promise<void>;
};

const EditBookClubForm = ({ onSubmit, bookClubData }: EditBookClubFormProps) => {
  const [form, setForm] = useState({
    description: bookClubData.description,
    name: bookClubData.name,
    theme: bookClubData.theme,
  });
  console.log(form);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <ContentWrapper>
      <form action={onSubmit}>
        <fieldset>
          <Field id="name" label="Name" name="name" type="input" value={form.name} onChange={handleChange} required />
          <Field
            id="description"
            label="Description"
            name="description"
            type="textarea"
            value={form.description}
            onChange={handleChange}
            required
          />
          <Field
            id="theme"
            label="Theme"
            name="theme"
            type="input"
            value={form.theme}
            onChange={handleChange}
            required
          />
          <Button>Submit</Button>
        </fieldset>
      </form>
    </ContentWrapper>
  );
};

export default EditBookClubForm;
