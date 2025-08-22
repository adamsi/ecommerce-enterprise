import { addProduct } from "../../features/shoppingCart/shoppingCartSlice";

export const truncateDescription = (description, maxLength) => {
  if (description.length > maxLength) {
    return description.slice(0, maxLength) + "...";
  }
  return description;
};


// Add to Cart Function
const hasDiscountFunction = (product) => {
  // Check if a discount is applied
  const hasDiscount = product.discount !== undefined && product.discount > 0;

  // Calculate the discounted price if there is one
  const discountedPrice = hasDiscount
    ? product.price * (1 - product.discount / 100)
    : product.price;
  return discountedPrice;
};



export const handleAddToCart = (product, dispatch, quantity) => {
  const unitPrice = hasDiscountFunction(product);
  const newProduct = {
    id: product.id,
    category: product.category.name,
    image: product.image,
    title: product.title,
    quantity,
    unitPrice,
    totalPrice: unitPrice * quantity,
  };
  dispatch(addProduct(newProduct));
};
// format Currency
export const formatCurrency = (price) => {
  // Check if the price is a valid number
  if (typeof price !== "number") {
    return "Invalid Price";
  }

  // Format the price to have two decimal places and add commas for thousands separator
  const formattedPrice = price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Add dollar sign to the beginning of the formatted price
  return `$${formattedPrice}`;
};

// This function returns an array of image objects for a product, including the main image and up to three thumbnails, if they exist.
// For ProductDetail Image presentation
export const imgCatalog = (product) => {
  if (product.image && Array.isArray(product.thumbnails)) {
    const catalog = [{ id: 1, image: product.image }];

    const thumbnails = product.thumbnails.length === 0 ? []:
     product.thumbnails.map((thumb, index) => ({
      id: index + 2, 
      image: thumb,
    }));   

    return [...catalog, ...thumbnails];
  }

  return []; 
};

export const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "long", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};
