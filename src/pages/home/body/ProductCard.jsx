import Rating from '../ratings/Ratings';


const ProductCard = ({productDetails}) => {

  const{productName,productDescription,price,image,inStock,fastDeliver,isNew,ratings}=productDetails;
  
  return (
    
 <div className="card bg-base-100 shadow-xl border border-white/10 ">

  <figure>
    <img
      src={image}
      alt={productName}
      className="aspect-video object-cover w-full"
      />
  </figure>

  <div className="card-body">

    <h2 className="card-title flex justify-between">
      <span className="line-clamp-1">{productName}</span> 
      {!!isNew && (<div className="badge badge-secondary badge-sm ">NEW</div>)}
      
    </h2>

    <p className="line-clamp-2">{productDescription}</p>

    <p>Price : <strong>{price}</strong> Rs</p>

    {inStock?(<p className="text-green-500">{inStock} items left...!!</p>):(<p className="text-red-500">Out of Stock...!!</p>)}

    {fastDeliver?(<p className="text-blue-400">Fast Delivery</p>):(<p className="text-blue-400">5 Days Delivery</p>)}

    <Rating defaultRating={ratings} isEditable={false} className={"w-20"}/>     {/*class pass as a props */}

    <div className="card-actions flex justify-between mt-5">
       <button className="btn btn-outline btn-info">Add To Cart</button>
       <button className="btn btn-outline btn-info">Buy Now</button>
    </div>

  </div>
</div>
  
  )
}

export default ProductCard