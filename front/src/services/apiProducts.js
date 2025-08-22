import productsData from "../data/productData.json";
import { setBlog } from "../features/blog/blogSlice";
import blogsData from "../data/blogData.json";
import { gql } from "@apollo/client";
import { client } from "../ApolloClient";

const GET_PRODUCTS = gql`
  query GET_PRODUCTS {
    products {
    id
    slug
    title
    price
    materials
    sizes
    thumbnails
    image
    description
    stockQuantity
    createdAt
    category {
    id
    name
    }
}
  }
`;

const GET_PRODUCT_BY_SLUG = gql`
  query GET_PRODUCT_BY_SLUG($slug: String!) {
    productBySlug(slug: $slug) {
    id
    slug
    title
    price
    materials
    sizes
    thumbnails
    image
    description
    stockQuantity
    createdAt
    category {
    id
    name
    }
}
  }
`;

export function getProducts() {
  return productsData;
}

const allData = async () => {

  const { data } = await client.query({
    query: GET_PRODUCTS,
      fetchPolicy: "no-cache",
  });

  const allProductsData =  data.products;

  return allProductsData;
}
// Get all products
export const fetchProducts = () => {
  return async (dispatch) => {
    try {
              
      // Fetch your products data
      const allProductsData = await allData();

      // Dispatch an action to update the state with the fetched data
      dispatch({
        type: "products/set",
        payload: { allProductsData},
      });
    } catch (error) {
    }
  };
};
// Get specific product
export const getProduct = async (slug) => {
  const { data } = await client.query({
    query: GET_PRODUCT_BY_SLUG,
      fetchPolicy: "no-cache",
      variables: {slug:slug}
  });

  // The product is searched by slug, if necessary you can change it
  const selectedProduct = data.productBySlug;
  if (!selectedProduct) throw Error(`Error: Unable to locate product`);
  return selectedProduct;
}

