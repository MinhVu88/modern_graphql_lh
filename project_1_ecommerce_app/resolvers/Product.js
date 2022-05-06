// import { categories } from '../data.js';

export const Product = {
  category: (
    { categoryId: categoryIdWithinAProduct }, 
    args, 
    { db }
  ) => {
    return db.categories.find(category => category.id === categoryIdWithinAProduct);
  },
  reviews: (
    { id: productIdHoldingReviews }, 
    args, 
    { db }
  ) => {
    return db.reviews.filter(review => review.productId === productIdHoldingReviews);
  }
};