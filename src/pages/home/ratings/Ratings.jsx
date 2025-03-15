import { useEffect, useState } from "react";

const Ratings = ({defaultRating = 1,isEditable, onRatingChange=()=>{}}) => {     //here default Rating value or fun pass if not give in prop by parent component then execute 

  const [selectRating, setSelectRating] = useState(defaultRating);

  useEffect(()=>{
    onRatingChange(selectRating);       // here Rating pass child to Parent    
  },[selectRating])

  return (
    // ratings
    <div className={`rating ${!isEditable && 'pointer-events-none'}`}>       {/* isEditable not get as prop so value false so it's true then pointer-event-none add in className so rating is only readOnly */}
      {[1, 2, 3, 4, 5].map((value) => {
        return (
          <>
            {value <= selectRating ? (
              <input
                type="radio"
                onClick={() => setSelectRating(value)}
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
                aria-label="1 star"
              />
            ) : (
              <input
                type="radio"
                onClick={() => setSelectRating(value)}
                name="rating-2"
                className="mask mask-star-2 bg-orange-400/40"
                aria-label="1 star"
              />
            )}
          </>
        );
      })}
    </div>
  );
};

export default Ratings;
