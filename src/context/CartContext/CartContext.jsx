import { createContext, useContext, useReducer } from "react";
import { faker } from "@faker-js/faker";
import { cartReducer } from "./CartReducer";

const CartContext =createContext(null);


const CartContextProvider=({children})=>{

// Create an array of 20 undefined elements and Loop through each element and replace it with a new object., so array of object create where fake data generate 
const products = [...Array(20)].map((_)=>{
     // Return a new object for each product with fake data using faker.js package  and store in array 
    return{              
       id:faker.string.uuid(),        // Generate a random product name
       productName: faker.commerce.productName(),
       productDescription: faker.commerce.productDescription(),
       price:faker.commerce.price({min:100, max:5000}),
       image:faker.image.urlPicsumPhotos({width:300, height:300}),
       inStock:faker.helpers.arrayElement([0,5,10,15,20]),
       fastDeliver:faker.datatype.boolean(),
       isNew:faker.datatype.boolean(),
       ratings:faker.helpers.arrayElement([1,2,3,4,5])
       
}});  
    
// console.log(products);
const initialState = products;

const[productState, dispatch]=useReducer( cartReducer, initialState);
// console.log(productState);
 
return(
    <CartContext.Provider value={productState}>
        {children}
    </CartContext.Provider>
)
}

//custom hook for useContext hook
const useCustomContext=()=>{
    return (
        useContext(CartContext)
    )
}

export {CartContextProvider, useCustomContext};
