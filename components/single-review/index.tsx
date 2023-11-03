'use client';
import { format, parseISO } from 'date-fns';
import { map } from 'lodash/fp';
import React, { FC, useState } from 'react';

import ContentWrapper from '../content-wrapper';
import ProfileCard from './components/profile-card';

interface SingleReviewProps {
  id: string;
  username: string;
  profileImage: string;
  rating: number;
  date: string;
  review: string;
}

const SingleReview: FC<SingleReviewProps> = ({ comments, profileImage, rating, date, review, username }) => {
  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <>
      <ProfileCard rating={rating} comment={review} profileImage={profileImage} username={username} date={date} />
      {comments && comments.length > 0 && (
        <div>
          <ContentWrapper hasPadding={false}>
            <button className="text-center w-full text-sm underline p-2" onClick={toggleComments}>
              {showComments ? 'Hide Comments' : 'Show Comments'}
            </button>
          </ContentWrapper>

          {showComments &&
            map((comment) => {
              if (comment.id == null) {
                return null;
              }
              const timeStampDate = comment.timestamp ? parseISO(comment.timestamp) : null;
              const readableDate = timeStampDate ? format(timeStampDate, 'MMMM dd, yyyy') : null;
              return (
                <div className="ml-8">
                  <ProfileCard
                    comment={comment.comment}
                    profileImage={comment.profileImage}
                    username={comment.username}
                    date={readableDate}
                    showAddComment={false}
                  />
                </div>
              );
            }, comments)}
        </div>
      )}
    </>
  );
};

export default SingleReview;
