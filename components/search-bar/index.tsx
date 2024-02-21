'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import gql from 'graphql-tag';

type FormValues = {
  searchTerm: string;
};

const SEARCH_BOOKS = gql`
  query SearchBooks($searchTerm: String!) {
    searchBooks(searchTerm: $searchTerm) {
      authorFirstName
      authorLastName
      coverImage
      description
      id
      title
    }
  }
`;

export default function SearchBooks() {
  const { register, handleSubmit, watch } = useForm<FormValues>();
  const watchedSearchTerm = watch('searchTerm');

  const onSubmit: SubmitHandler<FormValues> = ({ searchTerm }) => {
    setSearchTerm(searchTerm);
  };

  useEffect(() => {
    if (watchedSearchTerm !== searchTerm) {
      setSearchTerm(watchedSearchTerm);
    }
  }, [watchedSearchTerm]);

  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const { data } = useSuspenseQuery(SEARCH_BOOKS, {
    skip: !searchTerm || searchTerm.length <= 2,
    variables: { searchTerm },
  });

  return (
    <div className="container w-[58rem] h-[2rem] mr-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-center relative h-full	">
        <input
          {...register('searchTerm')}
          autoComplete="off"
          className="h-full	shadow appearance-none border bg-[#cbcbcb] rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button
          type="submit"
          className="absolute h-full top-0 right-[0rem] bg-[#cbcbcb] px-2 text-white font-bold rounded focus:outline-none focus:shadow-outline"
        >
          <img width={20} height={20} src="/images/search.svg" />
        </button>
        <div className="absolute bg-[#2f3349e3] top-[2rem] left-0 w-[58rem] pt-2">
          {data?.searchBooks.map((book) => (
            <a href={`/dashboard/books/${book.id}`} key={book.id}>
              <div className="flex items-center space-x-4 pl-[0.5rem] border-[#434947] border-b">
                <div className="w-[3rem] h-[3rem] relative overflow-hidden">
                  <img
                    src={`http://localhost:4000/${book.coverImage}`}
                    alt={book.title}
                    className="absolute top-0 left-0 min-w-full min-h-full"
                  />
                </div>
                <div>
                  <h2 className="text-[0.75rem] mb-0 font-bold">{book.title}</h2>
                  <p className="text-[0.75rem] text-gray-500">{`${book.authorFirstName} ${book.authorLastName}`}</p>
                </div>
              </div>
            </a>
          ))}
          {data?.searchBooks && (
            <div className="p-2 text-center text-[0.75rem]">Show all results for &quot;{searchTerm}&quot;</div>
          )}
        </div>
      </form>
    </div>
  );
}
