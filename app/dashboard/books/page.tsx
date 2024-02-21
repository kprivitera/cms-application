'use server';
import { Suspense } from 'react';
import { get, map } from 'lodash/fp';
import Image from 'next/image';
import type { NextPage } from 'next';

import { GET_BOOKS } from '../../../queries';
import { getClient } from '../../../apollo-client';
import ContentWrapper from '../../../components/content-wrapper';
import LinkButton from '../../../components/link-button';

type Genre = {
  title: string;
  id: number;
  description: string;
};

type Book = {
  title: string;
  genre: Genre[];
  id: number;
  pageCount: number;
  description: string;
};

const Books: NextPage = async () => {
  const client = getClient();
  const booksData = await client.query<{ data: unknown }>({
    query: GET_BOOKS,
  });
  const books = get('data.books', booksData);
  return (
    <div>
      <h1>Dictionary</h1>
      <Suspense fallback={<p>Loading feed...</p>}>
        <ContentWrapper hasPadding={true}>
          <div className="grid lg:grid-cols-6 md:grid-cols-3 gap-4">
            {map((book: Book) => {
              return (
                <div key={book.id}>
                  <a href={`/dashboard/books/${book.id}`}>
                    <div className="aspect-[10/16] relative">
                      <Image
                        className="inset-0 h-full object-cover"
                        src={`http://localhost:4000/${book.coverImage}`}
                        alt="Description of the image"
                        width={500}
                        height={300}
                      />
                    </div>
                  </a>
                  <span className="block">{book.title}</span>
                  <span>
                    {book.author.firstName} {book.author.lastName}
                  </span>
                </div>
              );
            }, books)}
          </div>
        </ContentWrapper>
      </Suspense>
    </div>
  );
};

export default Books;
