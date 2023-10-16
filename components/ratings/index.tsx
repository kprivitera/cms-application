import Image from 'next/image';

type RatingProps = {
  averageRating: number;
  count: number;
};

const Ratings = ({ averageRating, count }: RatingProps) => {
  console.log(averageRating);
  if (!averageRating) {
    return null;
  }
  console.log('count', count);
  const fullStars = Math.floor(averageRating);
  const halfStars = averageRating % 1 >= 0.5 ? 1 : 0;
  return (
    <div className="mb-4">
      <div className="flex flex-row gap-2 items-center mb-1">
        {Array(fullStars).fill(
          <Image
            className="fill-[#e87400]"
            src="/images/star.svg"
            alt="Description of the image"
            width={20}
            height={20}
          />,
        )}
        {Array(halfStars).fill(<Image src="/images/half-star.svg" alt="Half Star" width={20} height={20} />)}
        <div>{averageRating}</div>
      </div>
      <div className="text-xs">{count} ratings</div>
    </div>
  );
};

export default Ratings;
