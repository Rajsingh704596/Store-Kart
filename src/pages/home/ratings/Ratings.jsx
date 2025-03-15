import { useEffect, useState } from "react";

const Ratings = ({defaultRating = 1,isEditable, onRatingChange=()=>{}}) => {     //here default Rating value or fun pass if not give in prop by parent component then execute 

  const [selectRating, setSelectRating] = useState(defaultRating);

  // Update selectRating when defaultRating changes
  useEffect(()=>{
    onRatingChange(selectRating);       // here Rating pass child to Parent    
  },[selectRating])

  return (
    // ratings
    <div className={`rating ${!isEditable && 'pointer-events-none'}`}>       {/* isEditable not get as prop so value false so it's true then pointer-event-none add in className so rating is only readOnly */}
      {[1, 2, 3, 4, 5].map((value) => (      //here we wrap in parenthesis so no need to use return 
        <input
          key={value}
          type="radio"
          name="rating-2"
          className={`mask mask-star-2 ${
            value <= selectRating ? "bg-orange-400" : "bg-orange-400/20"
          }`}
          aria-label={`${value} star`}
          checked={value === selectRating} // Set checked attribute
          onChange={() => setSelectRating(value)} // Handle rating change
        />
      ))}
    </div>
  );
};

export default Ratings;
