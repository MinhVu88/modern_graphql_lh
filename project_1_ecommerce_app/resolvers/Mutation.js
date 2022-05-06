import { v4 as uuid } from 'uuid';

export const Mutation = {
  addCategory: (
    parent, 
    { params }, 
    { db }
  ) => {
    const { name } = params;

    const newCategory = {
      id: uuid(),
      name
    };

    db.categories.push(newCategory);

    return newCategory;
  },
  deleteCategory: (
    parent, 
    { id: removedCategoryId }, 
    { db }
  ) => {
    // delete a category based on its id
    db.categories = db.categories.filter(category => category.id !== removedCategoryId);

    // any product that's in the removed category has its categoryId set to null
    db.products = db.products.map(product => {
      if(product.categoryId === removedCategoryId) {
        return {
          ...product,
          categoryId: null
        };
      }else {
        return product;
      }
    });

    return true;
  },
  updateCategory: (
    parent, 
    { 
      id: updatedCategoryId, 
      params 
    }, 
    { db }
  ) => {
    const updatedCategoryIndex = db.categories.findIndex(category => category.id === updatedCategoryId);

    if(updatedCategoryIndex === -1) {
      return null;
    }

    db.categories[updatedCategoryIndex] = {
      ...db.categories[updatedCategoryIndex],
      ...params
    };

    const updatedCategory = db.categories[updatedCategoryIndex];

    return updatedCategory;
  },
  addProduct: (
    parent, 
    { params }, 
    { db }
  ) => {
    const {
      name,
      description,
      image,
      price,
      onSale,
      quantity,
      categoryId
    } = params;

    const newProduct = {
      id: uuid(),
      name,
      description,
      image,
      price,
      onSale,
      quantity,
      categoryId
    };

    db.products.push(newProduct);

    return newProduct;
  },
  deleteProduct: (
    parent, 
    { id: removedProductId }, 
    { db }
  ) => {
    db.products = db.products.filter(product => product.id !== removedProductId);

    db.reviews = db.reviews.filter(review => review.productId !== removedProductId);

    return true;
  },
  updateProduct: (
    parent, 
    { 
      id: updatedProductId, 
      params 
    }, 
    { db }
  ) => {
    const updatedProductIndex = db.products.findIndex(product => product.id === updatedProductId);

    if(updatedProductIndex === -1) {
      return null;
    }

    db.products[updatedProductIndex] = {
      ...db.products[updatedProductIndex],
      ...params
    };

    const updatedProduct = db.products[updatedProductIndex];

    return updatedProduct;
  },
  addReview: (
    parent, 
    { params }, 
    { db }
  ) => {
    const {
      date,
      title,
      comment,
      rating,
      productId
    } = params;

    const newReview = {
      id: uuid(),
      date,
      title,
      comment,
      rating,
      productId
    };

    db.reviews.push(newReview);

    return newReview;
  },
  deleteReview: (
    parent, 
    { id: removedReviewId }, 
    { db }
  ) => {
    db.reviews = db.reviews.filter(review => review.id !== removedReviewId);

    return true;
  },
  updateReview: (
    parent, 
    { 
      id: updatedReviewId, 
      params 
    }, 
    { db }
  ) => {
    const updatedReviewIndex = db.reviews.findIndex(review => review.id === updatedReviewId);

    db.reviews[updatedReviewIndex] = {
      ...db.reviews[updatedReviewIndex],
      ...params
    };

    const updatedReview = db.reviews[updatedReviewIndex];

    return updatedReview;
  }
};