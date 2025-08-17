import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar fixed width and fixed positioning handled inside Sidebar */}
      <Sidebar />

      {/* Main content grows, with left margin to avoid sidebar on desktop */}
      <main
        className="
          flex-1
          bg-gray-50
          p-6
          pt-16
          lg:pt-4
          transition-all
          duration-300
          ease-in-out
          w-full
          lg:ml-2
          overflow-y-auto
          h-screen
        "
      >
        <Outlet />
      </main>
    </div>
  );
}
