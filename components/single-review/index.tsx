import { get, isEmpty, map, times } from 'lodash/fp';
import React, { FC, TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  firstName: string;
  lastName: string;
  profileImage: string;
  rating: number;
  date: string;
  review: string;
}

const SingleReview: FC<TextAreaProps> = ({ firstName, lastName, profileImage, rating, date, review }) => (
  <div className="grid grid-cols-4 gap-4">
    <div className="col-span-1">
      <div>{firstName}</div>
      <div>{lastName}</div>
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
      <div>{review}</div>
    </div>
  </div>
);

export default SingleReview;
