'use server';
import { Suspense } from 'react';
import { format, parseISO } from 'date-fns';
import { get, isEmpty, map, times } from 'lodash/fp';
import Image from 'next/image';
import parse from 'html-react-parser';
import type { NextPage } from 'next';

import { GET_BOOK_BY_ID } from '../../../../queries';
import { getClient } from '../../../../apollo-client';
import ContentWrapper from '../../../../components/content-wrapper';
import LinkButton from '../../../../components/link-button';
import RatingSummary from '../../../../components/rating-summary';
import Ratings from '../../../../components/ratings';
import SingleReview from '../../../../components/single-review';
import getUserId from '../../../../utils/get-user-id';

const formatDescription = (descriptionText: string) => {
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
  console.log('book', book);

  const userReviewDate = book?.userReview?.timestamp ? parseISO(book?.userReview?.timestamp) : null;
  const userReviewReadableDate = userReviewDate ? format(userReviewDate, 'MMMM dd, yyyy') : null;
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

            <h2>Ratings</h2>
            <ContentWrapper>
              <RatingSummary
                averageRating={book.ratings.averageRating}
                bookId={parseInt(bookId)}
                count={book.ratings.count}
                ratingsBreakdown={book.ratings.ratingsBreakdown}
                hasUserRated={book.ratings.hasUserRated}
              />
            </ContentWrapper>

            <h2>User review</h2>
            {book.userReview && (
              <SingleReview
                bookId={bookId}
                firstName={book.userReview.firstName}
                lastName={book.userReview.lastName}
                review={book.userReview.review}
                rating={book.userReview.rating}
                profileImage={book.userReview.profileImage}
                date={userReviewReadableDate}
                id={book.userReview.id}
                username={book.username}
              />
            )}
            {!book.userReview && (
              <ContentWrapper>
                <LinkButton href={`/dashboard/books/${bookId}/review/add`}>Write a review</LinkButton>
              </ContentWrapper>
            )}

            <h2>Community reviews</h2>
            {book.reviews &&
              map((review) => {
                const timeStampDate = book?.userReview?.timestamp ? parseISO(book?.userReview?.timestamp) : null;
                const readableDate = timeStampDate ? format(timeStampDate, 'MMMM dd, yyyy') : null;
                return (
                  <SingleReview
                    bookId={bookId}
                    firstName={review.firstName}
                    lastName={review.lastName}
                    review={review.review}
                    rating={review.rating}
                    profileImage={review.profileImage}
                    date={readableDate}
                    comments={review.comments}
                    id={review.id}
                    username={review.username}
                  />
                );
              }, book.reviews)}
            {book.reviews && book.reviews.length === 0 && (
              <ContentWrapper>
                <div>No reviews</div>
              </ContentWrapper>
            )}
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default BooksDetail;
