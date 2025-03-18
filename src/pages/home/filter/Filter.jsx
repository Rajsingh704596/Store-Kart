import { useEffect, useState } from "react";
import Ratings from "../ratings/Ratings";
import { useCustomContext } from "../../../context/cartContext/CartContext";

const Filter = () => {
  const initialState = {
    price: 5000, //initial state
    ratings: 1,
    sortingType: false, //byDefault false (means any order)             // sorting manage ascending or descending
    includeOutOfStock: true, // manage check attribute in checkbox  , default value true assign here (means all product show included out of stock) , false case - only show stock product
    fastDelivery: false, // default false , so all item show
  };
  const [filters, setFilters] = useState(initialState);

  const {
    state: { unfilteredProducts },
    dispatch,
  } = useCustomContext(); //state:{products ,cart}
  console.log("unfiltered Products in Body:", unfilteredProducts);

  console.log("filters value", filters);

  // fun that handle all input which is change
  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    console.log("for checkbox get check attribute", checked, type);
    setFilters((prev) => ({
      ...prev,
      // [name]:value
      [name]: type === "checkbox" ? checked : value, // now it's work with all input include checkbox
    }));
  };

  const handleClearFilter = () => {
    setFilters(initialState); //reset Filter
  };

  //  when filter change , product also change and show  // Note - we work with unfilteredProduct where all data exit and changes store products using dispatch so that products render that changes in UI
  useEffect(() => {
    let filterItems = unfilteredProducts?.filter((p) => {
      let priceCondition = p.price <= filters.price; // e.g 4000 price filter  , so product show which price equal and less than 4000
      let ratingCondition = p.ratings >= filters.ratings; // e.g 4 star rating filter , so product show which rating equal and greater than 4 star
      let includeOutOfStockCondition = filters.includeOutOfStock
        ? p
        : p.inStock; //e.g includeOutOfStock true so all product show else stock product show
      let fastDeliveryCondition = filters.fastDelivery ? p.fastDelivery : true; //here true || p  both are same work , show all product  , when default false , so false condition run it's true means all product show ,  if condition is true so all fast delivery data show

      return (
        priceCondition &&
        ratingCondition &&
        includeOutOfStockCondition &&
        fastDeliveryCondition
      ); // all filter together work
    });

    filterItems = filters.sortingType // if filters.sortingType true so sorting sting else filterItems pass
      ? filterItems?.sort((Pa, Pb) => {
          return filters.sortingType === "ascending"
            ? Pa.productName.localeCompare(Pb.productName) // string comparison this method use where sort use for sorting and localCompare return -1/0 , 1 .  e.g [a,c,b,e,d]  a , c k phle aata hai to -1 return means sort see and no swap ,  c,  b k baad aata hai to 1 return means swap , length base pr loop run here tim sort work (merge sort + insertion sort)
            : Pb.productName.localeCompare(Pa.productName);
        })
      : filterItems;

    dispatch({
      type: "SET_PRODUCTS",
      payload: filterItems,
    });
  }, [filters]);

  return (
    <div className="min-w-[15rem] border-r border-r-white/10 p-6 sticky top-[4rem]">
      {/* radio ascending or descending */}
      <div>
        <div className="form-control">
          <label className="label cursor-pointer gap-30">
            <span className="label-text w-30 my-2">Ascending</span>
            <input
              type="radio"
              name="sortingType"
              className="radio radio-info w-5 h-5"
              value="ascending"
              onChange={handleInputChange}
            />
          </label>
        </div>

        <div className="form-control">
          <label className="label cursor-pointer gap-30">
            <span className="label-text w-30">Descending</span>
            <input
              type="radio"
              name="sortingType"
              className="radio radio-info w-5 h-5"
              value="descending"
              onChange={handleInputChange}
            />
          </label>
        </div>
      </div>

      <div className="w-full h-[1px] bg-white/20 my-5 "></div>

      {/* checkbox for out of stock and fast delivery*/}
      <div>
        <div className="form-control">
          <label className="label cursor-pointer gap-30">
            <span className="label-text w-30 my-2">Include Out of Stock</span>
            <input
              type="checkbox"
              checked={filters.includeOutOfStock} // Note- in check box checked attribute use {true/false} , here value attribute not used
              name="includeOutOfStock"
              className="checkbox checkbox-primary checkbox-sm"
              onChange={handleInputChange} // when check box click checked attribute automatic value change true to false and false to true
            />
          </label>
        </div>

        <div className="form-control">
          <label className="label cursor-pointer gap-30">
            <span className="label-text w-30">Fast Delivery Only</span>
            <input
              type="checkbox"
              checked={filters.fastDelivery}
              name="fastDelivery"
              className="checkbox checkbox-primary checkbox-sm"
              onChange={handleInputChange}
            />
          </label>
        </div>
      </div>

      {/* Rating */}
      <div className="my-6">
        {/* Rating component which is editable */}
        <Ratings
          defaultRating={filters?.ratings}
          isEditable={true}
          onRatingChange={(Rating) =>
            setFilters((prev) => ({ ...prev, ratings: Rating }))
          }
        />
      </div>

      {/* Price Range */}
      <div className="my-8">
        <p className="my-4">
          Price: <strong>{filters?.price}</strong> Rs
        </p>
        <input
          name="price"
          type="range"
          min={100}
          max={5000}
          value={filters?.price}
          onChange={handleInputChange}
          className="range range-info range-xs"
        />
      </div>

      {/* clear filter Button */}
      <div className="mt-[50px]">
        <button className="btn btn-neutral w-full" onClick={handleClearFilter}>
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
