import { useMemo } from "react";
import { useCustomContext } from "../../context/cartContext/CartContext";

const SubTotalSideBar = () => {
  const {
    state: { cart }, // Fallback to an empty array if cart is undefined (default array if no value pass)
  } = useCustomContext();

  //for performance improvement useMemo hook use and cart Item get
  const cartLength = useMemo(() => {
    console.log("Calculating array length...", cart.length);
    return cart.length;
  }, [cart]); // Recalculate only when `cart` changes

  // Calculate subtotal for cart
  const subTotal = cart?.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0 //initial value of accumulator
  ); //curr.quantity se multiply

  console.log(subTotal);

  return (
    <div className="min-w-[15rem] border-l border-l-white/10 p-6 sticky top-[4rem]">
      <div
        tabIndex={0}
        className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
      >
        <div className="card-body">
          <span className="text-lg font-bold">{cartLength} Items</span>
          <span className="text-info">Total Price: {subTotal}</span>
          <div className="card-actions">
            <button
              className="btn btn-primary btn-block"
              onClick={() => alert("Sure for Payment")}
            >
              Proceed to Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubTotalSideBar;
