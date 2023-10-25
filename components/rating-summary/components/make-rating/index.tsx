'use client';

import { useState } from 'react';

const Star = ({ fill }: { fill: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill={fill} viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
    <path d="M24 9.63469C24 9.35683 23.7747 9.13158 23.4969 9.13158H15.0892L12.477 1.34327C12.4269 1.19375 12.3095 1.0764 12.16 1.02625C11.8966 0.937894 11.6114 1.07983 11.523 1.34327L8.91088 9.13158H0.503157C0.33975 9.13158 0.186521 9.21094 0.0922364 9.3444C-0.0680877 9.57134 -0.0140806 9.88529 0.212865 10.0456L7.00408 14.8432L4.40172 22.6166C4.35092 22.7683 4.37534 22.9352 4.46749 23.066C4.6275 23.2932 4.94137 23.3476 5.16853 23.1876L12 18.3758L18.8317 23.183C18.9625 23.2751 19.1293 23.2994 19.281 23.2486C19.5445 23.1604 19.6865 22.8752 19.5983 22.6117L16.996 14.8432L23.7872 10.0456C23.9206 9.95133 24 9.7981 24 9.63469Z"></path>
  </svg>
);

type MakeRatingProps = {
  bookId: number;
  makeRating: (rating: number, bookId: number) => void;
};

const MakeRating = ({ bookId, makeRating }: MakeRatingProps) => {
  const [rating, setRating] = useState<number>(0);
  const [selectedRating, setSelectedRating] = useState(0);

  return (
    <div className="inline-flex mb-4" onMouseLeave={() => setRating(selectedRating)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onMouseEnter={() => setRating(star)}
          onClick={async () => {
            setSelectedRating(star);
            await makeRating(rating, bookId);
          }}
          className="p-1"
        >
          <Star fill={star <= rating ? 'orange' : 'gray'} />
        </button>
      ))}
    </div>
  );
};

export default MakeRating;
