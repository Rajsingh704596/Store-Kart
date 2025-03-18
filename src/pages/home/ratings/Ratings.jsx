import { useEffect, useState } from "react";

const Ratings = ({
  defaultRating = 1,
  isEditable,
  onRatingChange = () => {},
  className = "",
}) => {
  const [selectRating, setSelectRating] = useState(defaultRating);

  // Update selectRating when defaultRating changes
  useEffect(() => {
    setSelectRating(defaultRating); // Sync selectRating with defaultRating
  }, [defaultRating]);

  // Notify parent when selectRating changes
  useEffect(() => {
    onRatingChange(selectRating);
  }, [selectRating]);

  return (
    <div
      className={`rating ${!isEditable && "pointer-events-none"} ${className}`}
    >
      {[1, 2, 3, 4, 5].map((value) => (
        <input
          key={value}
          type="radio"
          name="rating-2"
          className={`mask mask-star-2 ${
            value <= selectRating ? "bg-orange-400" : "bg-gray-300"
          }`}
          aria-label={`${value} star`}
          checked={value === selectRating} // Ensure the correct radio is checked
          onChange={() => isEditable && setSelectRating(value)} // Handle rating change only if editable
        />
      ))}
    </div>
  );
};

export default Ratings;
