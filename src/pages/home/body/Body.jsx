import { useCustomContext } from "../../../context/cartContext/CartContext";
import ProductCard from "./ProductCard";

const Body = () => {
  const {
    state: { products },
  } = useCustomContext(); //state:{products ,cart}
  console.log("Products in Body:", products);

  return (
    <>
      {products?.length <= 0 ? (
        <div className="w-full h-full flex items-center justify-center mt-6">
          <p className="text-xl font-semibold ">Products Not available</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-[1rem] p-3 max-[1150px]:grid-cols-2 max-[850px]:grid-cols-1">
          {products?.map((curElem) => {
            return <ProductCard productDetails={curElem} key={curElem.id} />;
          })}
        </div>
      )}
    </>
  );
};

export default Body;
