'use server';
import { Suspense } from 'react';
import { get, isEmpty, map, replace } from 'lodash/fp';
import Image from 'next/image';
import parse from 'html-react-parser';
import type { NextPage } from 'next';

import { GET_BOOK_BY_ID } from '../../../../queries';
import { getClient } from '../../../../apollo-client';
import ContentWrapper from '../../../../components/content-wrapper';
import RatingSummary from '../../../../components/rating-summary';
import Ratings from '../../../../components/ratings';
import getUserId from '../../../../utils/get-user-id';

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

const formatDescription = (descriptionText) => {
  const replacedNewLines = descriptionText.replace(/\\n|\n/g, '</p><p>');
  return `<p>${replacedNewLines}</p>`;
};

const BooksDetail: NextPage = async ({ params }) => {
  const bookId = get('bookId', params);
  const client = getClient();
  const userId = await getUserId();
  const bookData = await client.query<{ data: unknown }>({
    query: GET_BOOK_BY_ID,
    variables: { bookId, userId },
  });
  const book = get('data.book', bookData);
  return (
    <div>
      <h1>{book.title}</h1>
      <Suspense fallback={<p>Loading feed...</p>}>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/5">
            <ContentWrapper hasPadding={true}>
              <div className="aspect-[10/16] relative">
                <Image
                  className="absolute inset-0 w-full h-full object-cover"
                  src={`http://localhost:4000/${book.coverImage}`}
                  alt="Description of the image"
                  width={500}
                  height={300}
                />
              </div>
            </ContentWrapper>
          </div>
          <div className="w-full lg:w-4/5">
            <ContentWrapper hasPadding={true}>
              {get('series.title', book) && (
                <h3>
                  {book.series.title} #{book.series.seriesNumber}
                </h3>
              )}
              <h2 className="mb-4">
                {book.author.firstName} {book.author.lastName}
              </h2>
              <Ratings averageRating={book.ratings.averageRating} count={book.ratings.count} />
              <div className="mb-4">{parse(formatDescription(book.description))}</div>
              <div className="flex flex-row gap-2 items-center mb-4">
                {!isEmpty(book.genres) && <div>Genres:</div>}
                <ul className="flex flex-row gap-2">
                  {!isEmpty(book.genres) &&
                    map((genre) => {
                      return <div className="bg-pink-500 rounded-md p-1">{genre.title}</div>;
                    }, book.genres)}
                </ul>
              </div>
              {book.pageCount && <div>{book.pageCount} pages</div>}
            </ContentWrapper>
            <ContentWrapper>
              <RatingSummary
                averageRating={book.ratings.averageRating}
                bookId={parseInt(bookId)}
                count={book.ratings.count}
                ratingsBreakdown={book.ratings.ratingsBreakdown}
                hasUserRated={book.ratings.hasUserRated}
              />
            </ContentWrapper>
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default BooksDetail;
