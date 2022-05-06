// import { categories, products } from '../data.js';

export const Query = {
  products: (parent, args, context) => {
    const { db } = context;

    const { filteredProducts } = args;

    let productsOnSale = db.products;

    if(filteredProducts) {
      const { onSale, averageRating } = filteredProducts;

      if(onSale) {
        productsOnSale = productsOnSale.filter(product => {
          return product.onSale;
        });
      }
      
      // average rating for each product must be between 1 & 5
      if([1, 2, 3, 4, 5].includes(averageRating)) {
        productsOnSale = productsOnSale.filter(product => {
          let totalRatings = 0;
          let numberOfReviews = 0;
  
          db.reviews.forEach(review => {
            if(review.productId === product.id) {
              totalRatings += review.rating;

              numberOfReviews++;
            }
          });

          const averageRatingPerProduct = totalRatings / numberOfReviews;

          console.log(
            'total ratings ->',totalRatings,
            '| average rating per product ->',averageRatingPerProduct,
            '| product ->',product.name
          );

          return averageRatingPerProduct >= averageRating;
        });
      }
    }

    // if filteredProducts is null or onSale is false or 
    // average rating per product is >= average rating specified in localhost:4000, 
    // then products will be returned, instead of productsOnSale
    return productsOnSale;
  },
  product: (parent, args, { db }) => {
    console.log('product id ->',args);

    const { id } = args;

    const foundProduct = db.products.find(product => product.id === id);

    if(!foundProduct) {
      return null;
    }

    return foundProduct;
  },
  categories: (parent, args, { db }) => {
    return db.categories;
  },
  category: (parent, { id }, { db }) => {
    console.log('category id ->',id);

    return db.categories.find(category => category.id === id);
  }
};