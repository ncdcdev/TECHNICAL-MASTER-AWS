import { RouterProvider } from "react-router";
import "./index.css";
import { router } from "./routes";

export default function App() {
  return <RouterProvider router={router} />;
}
