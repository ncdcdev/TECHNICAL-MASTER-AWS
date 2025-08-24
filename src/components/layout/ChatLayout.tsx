import { Outlet } from "react-router";
import Sidebar from "../ui/Sidebar";
import { ConversationsProvider } from "../../context/ConversationsContext";

export default function ChatLayout() {
  return (
    <ConversationsProvider>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 bg-white">
          <Outlet />
        </main>
      </div>
    </ConversationsProvider>
  );
}
