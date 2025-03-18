import { createContext, useContext, useEffect, useReducer } from "react";
import { faker } from "@faker-js/faker";
import { cartReducer } from "./CartReducer";

const CartContext = createContext(null);

faker.seed(1); // it's fix on 1 page not change in Reload (e.g pagination 1 page show  )

const CartContextProvider = ({ children }) => {
  // Create an array of 20 undefined elements and Loop through each element and replace it with a new object., so array of object create where fake data generate
  const products = [...Array(20)].map((_) => {
    // Return a new object for each product with fake data using faker.js package  and store in array
    return {
      id: faker.string.uuid(), // Generate a random product name
      productName: faker.commerce.productName(),
      productDescription: faker.commerce.productDescription(),
      price: faker.number.int({ min: 100, max: 5000 }),
      image: faker.image.urlPicsumPhotos({ width: 300, height: 300 }),
      inStock: faker.helpers.arrayElement([0, 5, 10, 15, 20]),
      fastDelivery: faker.datatype.boolean(),
      isNew: faker.datatype.boolean(),
      ratings: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
    };
  });

  // console.log(products);
  const initialState = {
    unfilteredProducts: products, //All product store in Array of Obj which is unfiltered (original)
    products, // this state use render filter/change product / all product
    cart: [], //Add to Cart or Remove Cart state manage
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);
  console.log(state);

  //^ Session Storage- temporary, tab-specific storage.Data is cleared when the browser tab is closed.
  //^ Local Storage- Persistent, cross-tab storage. Data persists even after the browser is closed and reopened

  useEffect(() => {
    //const Data = JSON.parse(sessionStorage.getItem("cartContextData")); //session storage get data , so Reload time data get from session storage
    const Data = JSON.parse(localStorage.getItem("cartContextData")); //local storage get data , so Reload time data get from local storage
    console.log(Data);
    if (!Data) return;
    dispatch({
      type: "SET_STATE",
      payload: Data ?? {},
    });
  }, []);

  useEffect(() => {
    // sessionStorage.setItem("cartContextData", JSON.stringify(state)); // session storage save state data which is string form and name of key - cartContextData
    localStorage.setItem("cartContextData", JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

//custom hook for useContext hook
const useCustomContext = () => {
  return useContext(CartContext);
};

export { CartContextProvider, useCustomContext };
