import CartBody from "./CartBody";
import SubTotalSideBar from "./SubTotalSideBar";

function Cart() {
  return (
    <div className="flex gap-2">
      <CartBody />

      <div>
        <SubTotalSideBar />
      </div>
    </div>
  );
}

export default Cart;
