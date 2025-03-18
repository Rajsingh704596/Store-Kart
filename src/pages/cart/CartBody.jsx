import { useCustomContext } from "../../context/cartContext/CartContext/";
import CartProductCard from "./CartProductCard";

const CartBody = () => {
  const {
    state: { cart },
  } = useCustomContext(); //state:{products ,cart}
  //  console.log(products)

  return (
    <>
      {cart.length <= 0 ? (
        <div className="w-full flex items-center justify-center mt-6 text-2xl font-semibold ">
          Cart is Empty now !!!
        </div>
      ) : (
        <div className="w-full grid grid-cols-3 gap-[1rem] p-3 max-[1150px]:grid-cols-2 max-[850px]:grid-cols-1">
          {cart?.map((curElem) => {
            return (
              <CartProductCard productDetails={curElem} key={curElem.id} />
            );
          })}
        </div>
      )}
    </>
  );
};

export default CartBody;
