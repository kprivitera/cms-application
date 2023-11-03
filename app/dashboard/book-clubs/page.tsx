import { get } from 'lodash/fp';
import { revalidatePath } from 'next/cache';
import Image from 'next/image';

const BookClubs = async () => {
  return (
    <div>
      <h1>Book clubs</h1>
    </div>
  );
};

export default BookClubs;
