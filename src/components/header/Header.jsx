import { GiHamburgerMenu } from "react-icons/gi";
import Filter from "../../pages/home/filter/Filter";
import { useCustomContext } from "../../context/cartContext/CartContext";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

const Header = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const {
    state: { unfilteredProducts, cart }, // Fallback to an empty array if cart is undefined (default array if no value pass)
    dispatch,
  } = useCustomContext();
  // console.log(cart);
  // console.log("unfiltered data", unfilteredProducts);

  //for performance improvement useMemo hook use and cart Item get
  const cartLength = useMemo(() => {
    console.log("Calculating array length...", cart.length);
    return cart.length;
  }, [cart]); // Recalculate only when `cart` changes

  console.log(cart);

  // Calculate subtotal for cart
  const subTotal = cart?.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0 //initial value of accumulator
  ); //curr.quantity se multiply

  console.log(subTotal);

  useEffect(() => {
    // console.log("searching value", searchValue);
    if (!searchValue) {
      dispatch({
        type: "SET_PRODUCTS",
        payload: unfilteredProducts,
      });
      return;
    }
    // console.log("unfiltered Item", unfilteredProducts);
    const filteredItems = unfilteredProducts?.filter((p) => {
      return p.productName.toLowerCase().includes(searchValue.toLowerCase()); // filter data based on productName
    });
    console.log("filtered item", filteredItems);
    dispatch({
      type: "SET_PRODUCTS",
      payload: filteredItems,
    });
  }, [searchValue]);

  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-10">
      <div className="drawer min-[570px]:hidden w-12">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer"
            className="btn btn-soft text-xl drawer-button"
          >
            <GiHamburgerMenu />
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <Filter />
          </ul>
        </div>
      </div>

      <div className="flex flex-1">
        <NavLink to="/" className="btn btn-ghost text-xl">
          Store-Kart
        </NavLink>
      </div>

      <div className="flex gap-3">
        {/*Search  */}
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        {/* store */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">
                {cartLength}
              </span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold">{cartLength} Items</span>
              <span className="text-info">Subtotal: {subTotal}</span>
              <div className="card-actions">
                <button
                  className="btn btn-primary btn-block"
                  onClick={() => navigate("/cart")}
                >
                  View cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
