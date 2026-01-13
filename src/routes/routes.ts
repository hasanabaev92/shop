import { createBrowserRouter } from "react-router";
import Layout from "../Layout";
import ProductList from "../pages/ProductList/ProductList";
import Admin from "../pages/Admin/Admin";
import Cart from "../pages/Cart/Cart";
import Product from "../pages/Product/Product";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: ProductList,
      },
      {
        path: "admin",
        Component: Admin,
      },
      {
        path: "cart",
        Component: Cart,
      },
      {
        path: "product",
        children: [
          {
            path: ":ZZZ",
            Component: Product,
          },
        ],
      },
    ],
  },
]);

export default router;
