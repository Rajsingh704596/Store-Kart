import { useCustomContext } from "../../../context/cartContext/CartContext"
import ProductCard from "./ProductCard";


const Body = () => {

  const productState =useCustomContext();
   console.log(productState)

  return (
    <div className="grid grid-cols-3 gap-[1rem] p-3 max-[1150px]:grid-cols-2 max-[850px]:grid-cols-1">
      {productState?.map((curElem)=>{
        return (
                <ProductCard productDetails={curElem} key={curElem.id}/>  
      )
      })}
 
    </div>
  )
}

export default Body