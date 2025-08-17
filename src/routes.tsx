import { createBrowserRouter, Navigate } from "react-router";
import NewChat from "./pages/NewChat";
import ChatConversation from "./pages/ChatConversation";
import ChatLayout from "./components/layout/ChatLayout";

export const router = createBrowserRouter([
  {
    path: "/chat",
    Component: ChatLayout,
    children: [
      {
        path: "new",
        Component: NewChat,
      },
      {
        path: ":conversationId",
        Component: ChatConversation,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/chat/new" replace />,
  },
]);
