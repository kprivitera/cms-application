import { times } from 'lodash/fp';
import React, { FC } from 'react';

import ContentWrapper from '../../../content-wrapper';

interface ProfileCardProps {
  id: string;
  profileImage: string;
  rating: number;
  date: string;
  username: string;
  comment: string;
  showAddComment: boolean;
  bookId: number;
}

const ProfileCard: FC<ProfileCardProps> = ({
  id,
  bookId,
  profileImage,
  rating,
  date,
  comment,
  username,
  showAddComment = true,
}) => {
  return (
    <>
      <ContentWrapper>
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1">
            <div>{username}</div>
            <div>
              <img width="50" height="50" src={`http://localhost:4000/${profileImage}`} />
            </div>
          </div>
          <div className="col-span-3">
            <div className="flex flex-row justify-between mb-2">
              <div className="flex flex-row gap-2 items-center mb-1">
                {times(
                  () => (
                    <div>
                      <img
                        className="fill-[#e87400]"
                        src="/images/star.svg"
                        alt="Description of the image"
                        width={20}
                        height={20}
                      />
                    </div>
                  ),
                  rating,
                )}
              </div>
              <div>{date}</div>
            </div>
            <div>{comment}</div>
          </div>
          {showAddComment && (
            <div>
              <a href={`/dashboard/books/${bookId}/review/${id}/add-comment`}>Add comment</a>
            </div>
          )}
        </div>
      </ContentWrapper>
    </>
  );
};

export default ProfileCard;
