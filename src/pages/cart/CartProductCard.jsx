import { useCustomContext } from "../../context/cartContext/CartContext";
import Rating from "../home/ratings/Ratings";
import { LiaShippingFastSolid } from "react-icons/lia";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

const CartProductCard = ({ productDetails }) => {
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
    quantity,
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

  const handleIncrementQuantity = () => {
    dispatch({ type: "INCREMENT_PRODUCT_QUANTITY", payload: id });
  };

  const handleDecrementQuantity = () => {
    // console.log("Decrement Quantity", id);
    if (quantity <= 1) return; // condition true so return nothing
    dispatch({ type: "DECREMENT_PRODUCT_QUANTITY", payload: id });
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

        <p className="line-clamp-2 text-slate-400">{productDescription}</p>

        <div className="flex justify-between mt-5">
          <span className="font-semibold text-[1.1rem]">Quantity : </span>
          <div className="flex justify-end gap-3">
            <button
              className="btn btn-accent btn-xs"
              onClick={handleIncrementQuantity}
            >
              <FaPlus />
            </button>
            <span className="font-bold">{quantity}</span>
            <button
              className="btn btn-error btn-xs"
              onClick={handleDecrementQuantity}
            >
              <FaMinus />
            </button>
          </div>
        </div>

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
          {/* array.some() method Returns true if at least one element satisfies the condition else false.here we match product inside cart(array), check if cart product id is equal to productDetail id yes or not   */}
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
              className="btn btn-outline btn-info "
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
          )}
          <button
            className="btn btn-outline btn-info "
            onClick={() => alert("Item Ordered")}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
