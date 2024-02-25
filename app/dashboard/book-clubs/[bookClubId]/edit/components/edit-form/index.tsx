'use client';
import { useState } from 'react';

import { BookClub } from '../../../../../../../types';
import Button from '../../../../../../../components/button';
import ContentWrapper from '../../../../../../../components/content-wrapper';
import Field from '../../../../../../../components/field';

type EditBookClubFormProps = {
  bookClubData: BookClub;
};

const EditBookClubForm = ({ bookClubData }: EditBookClubFormProps) => {
  const [form, setForm] = useState({
    description: bookClubData.description,
    name: bookClubData.name,
    theme: bookClubData.theme,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <ContentWrapper>
      <form action={`/dashboard/book-clubs/edit?bookClubId=${bookClubData.id}`} method="POST">
        <fieldset>
          <Field value={form.name} onChange={handleChange} id="name" label="Name" name="name" type="input" required />
          <Field
            value={form.description}
            onChange={handleChange}
            id="description"
            label="Description"
            name="description"
            type="textarea"
            required
          />
          <Field
            value={form.theme}
            onChange={handleChange}
            id="theme"
            label="Theme"
            name="theme"
            type="input"
            required
          />
          <Button>Submit</Button>
        </fieldset>
      </form>
    </ContentWrapper>
  );
};

export default EditBookClubForm;
