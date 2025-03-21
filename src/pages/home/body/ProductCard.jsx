import { useCustomContext } from "../../../context/cartContext/CartContext";
import Rating from "../ratings/Ratings";
import { LiaShippingFastSolid } from "react-icons/lia";

const ProductCard = ({ productDetails }) => {
  const {
    id,
    productName,
    productDescription,
    price,
    image,
    inStock,
    fastDelivery,
    isNew,
    ratings,
  } = productDetails;

  const {
    state: { cart },
    dispatch,
  } = useCustomContext();

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: productDetails });
  };

  const handleRemoveFromCart = () => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  return (
    <div className="card bg-base-100 shadow-xl border border-white/10 ">
      <figure>
        <img
          src={image}
          alt={productName}
          className="aspect-video object-cover w-full h-full"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title flex justify-between">
          <span className="line-clamp-1">{productName}</span>
          {!!isNew && (
            <div className="badge badge-secondary badge-sm ">NEW</div>
          )}
        </h2>
        <p className="line-clamp-2">{productDescription}</p>
        <p>
          Price : <strong>{price}</strong> Rs
        </p>
        {inStock ? (
          <p className="text-green-500">{inStock} items left...!!</p>
        ) : (
          <p className="text-red-500">Out of Stock...!!</p>
        )}
        {fastDelivery ? (
          <p className="text-blue-400 flex items-center gap-2">
            Fast Delivery
            <span className="mt-1">
              <LiaShippingFastSolid />
            </span>
          </p>
        ) : (
          <p className="text-blue-400">5 Days Delivery</p>
        )}
        <Rating defaultRating={ratings} isEditable={false} className={"w-20"} />
        {/*class pass as a props */}
        <div className="card-actions flex justify-between mt-5">
          {/* array.some() method Returns true if at least one element satisfies the condition else false.  here we match product inside cart(array), check if cart product id is equal to productDetail id yes or not   */}
          {cart.some((product) => product.id === id) ? (
            // true, so show Remove Cart
            <button
              className="btn btn-outline btn-error"
              onClick={handleRemoveFromCart}
            >
              Remove From Cart
            </button>
          ) : (
            // false ,so show Add Cart

            <button
              className="btn btn-outline btn-info"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
          )}
          <button className="btn btn-outline btn-info">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
