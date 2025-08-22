import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./AppLayout";
import ShopOverview from "./pages/ShopOverview/ShopOverview";
import CartSummary from "./pages/CartSummary/CartSummary";
import ContactPage from "./pages/ContactPage/ContactPage";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import { getProduct } from "./services/apiProducts";
import ShopOverviewRightSidebar from "./pages/ShopOverview/ShopOverviewRightSidebar";
import ShopOverviewFullWidth from "./pages/ShopOverview/ShopOverviewFullWidth";
import ShopOverviewBreadcrumb2 from "./pages/ShopOverview/ShopOverviewBreadcrumb2";

import FAQPage from "./pages/FAQPage/FAQPage";
import NotFound from "./pages/NotFound/NotFound";
import TermsAndPrivacy from "./pages/TermsAndPrivacy/TermsAndPrivacy";

import { ToastContainer } from 'react-toastify';
import { AdminRoute } from "./AdminRoute";

import { AdminForm } from "./components/common/AdminForm/AdminForm";
import { AdminProducts } from "./pages/AdminProducts/AdminProducts";

// Define your routes
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      // Shop Standard
      {
        path: "/all-products",
        element: <ShopOverview />,
      },
      // Shop List
      {
        path: "/list-shop",
        element: <ShopOverview defaultColumns={2} />,
      },
      // Shop: Left Sidebar
      {
        path: "/shop-left-sidebar",
        element: <ShopOverview />,
      },
      // Shop: Right Sidebar
      {
        path: "/shop-right-sidebar",
        element: <ShopOverviewRightSidebar />,
      },
      // Shop: Right Sidebar
      {
        path: "/full-width",
        element: <ShopOverviewFullWidth />,
      },
      // Shop: Breadcrumb 1
      {
        path: "/breadcrumb-1",
        element: <ShopOverview />,
      },
      // Shop: Breadcrumb 2
      {
        path: "/breadcrumb-2",
        element: <ShopOverviewBreadcrumb2 />,
      },
      // Product Detail Page
      {
        path: "/shop/:slug",
        element: <ProductDetail />,
        loader: ({ params }) => {
          return getProduct(params.slug);
        },
      },
      // Shop filtred by category
      {
        path: "/product-category/:category",
        element: <ShopOverview dispatchAction={true} />,
      },
      // Cart Summary
      {
        path: "/cart-summary",
        element: <CartSummary />,
      },
      // Search Page
      {
        path: "/search/:category/:query",
        element: <ShopOverview dispatchAction={true} />,
      },
      // Contact Page
      {
        path: "/contact",
        element: <ContactPage />,
      },

      // FAQ Us Page
      {
        path: "/faq",
        element: <FAQPage />,
      },
      // Terms and Privacy Page
      {
        path: "/terms-privacy",
        element: <TermsAndPrivacy />,
      },
      { 
     path: "/admin",
     element:<AdminRoute/>,
     children:[{path:"/admin/create", element:<AdminForm/> }, {path:"/admin/products", element:<AdminProducts/> }]
      },
    ],
  },
]);

const App = () => (
  <>
    <GlobalStyles />
    <RouterProvider router={router} />
    <ToastContainer position="bottom-right" limit={2}/>
  </>
);

export default App;
