// import { products } from '../data.js';

export const Category = {
  products: (
    { id: categoryIdHoldingProducts }, 
    { filteredProducts }, 
    { db }
  ) => {
    const categorizedProducts = db.products.filter(product => product.categoryId === categoryIdHoldingProducts);

    let categorizedProductsOnSale = categorizedProducts;

    if(filteredProducts && filteredProducts.onSale === true) {
      categorizedProductsOnSale = categorizedProductsOnSale.filter(product => {
        return product.onSale;
      });
    }

    // if filteredProducts is null & filteredProducts.onSale is false, 
    // categorizedProducts will be returned, instead of categorizedProductsOnSale
    return categorizedProductsOnSale;
  }
};