// current state manage with reducer fun based on action.type
export const cartReducer = (state, action) => {
  if (action.type === "SET_STATE") {
    state = action.payload; // here action.payload is session data/local data to change state
    return state;
  }

  if (action.type === "SET_PRODUCTS") {
    state = { ...state, products: action.payload }; // rest state same not change like cart and unfiltered product , only set Products which value assign action.payload(searchValue) change
    return state;
  }

  if (action.type === "ADD_TO_CART") {
    // console.log("Add product in Cart", action.payload);
    state = {
      ...state, //spread the state where all product and cart store , where no change in product
      // cart:[...state.cart, action.payload]               // but in Cart we need to change in array [...old Cart must store, add payload product]
      cart: [...state.cart, { ...action.payload, quantity: 1 }], // here default quantity add 1
    };
    return state;
  }

  if (action.type === "REMOVE_FROM_CART") {
    console.log("Remove Product From Cart", action.payload);
    state = {
      ...state,
      cart: state.cart.filter((product) => product.id !== action.payload), //filter product return new array which is not same with action.payload id
    };
    return state;
  }

  if (action.type === "INCREMENT_PRODUCT_QUANTITY") {
    console.log("increment payload", action.payload);
    state = {
      ...state, // product as a tease
      cart: state.cart.map(
        (
          product // specific cart ki quantity ko increase karna hai only isliye map method k through phle usse get karege jo bhi product id equal hui payload id se uske baki sb same rhe hai only quantity increase
        ) =>
          product.id === action.payload
            ? { ...product, quantity: product.quantity + 1 }
            : product
      ),
    };
    return state;
  }

  if (action.type === "DECREMENT_PRODUCT_QUANTITY") {
    console.log("decrement payload", action.payload);
    state = {
      ...state, // rest product same
      cart: state.cart.map((product) =>
        product.id === action.payload
          ? { ...product, quantity: product.quantity - 1 }
          : product
      ),
    };
    return state;
  } else {
    return state; // must pass state
  }
};
