export const mockEmptyCartState = {
  cartProducts: [],
  cartProductsCounter: 0,
  cartTotalAmount: 0,
};

export const mockFullCartState = {
  cartProducts: [{
    id: 1,
    name: "Essence Mascara Lash Princess",
    image: "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png",
    quantity: 2,
    price: 19.98,
  },{
    id: 2,
    name: "Eyeshadow Palette with Mirror",
    image: "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/1.png",
    quantity: 2,
    price: 39.98,
  },{
    id: 3,
    name: "Powder Canister",
    image: "https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/1.png",
    quantity: 1,
    price: 14.99,
  }],
  cartProductsCounter: 4,
  cartTotalAmount: 64.96,
}