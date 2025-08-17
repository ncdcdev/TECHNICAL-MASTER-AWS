import { Outlet } from "react-router";
import Sidebar from "../ui/Sidebar";

export default function ChatLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 bg-white">
        <Outlet />
      </main>
    </div>
  );
}
