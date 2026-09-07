import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar";

function UserLayout() {
  return (
      <div className="min-h-screen flex flex-row bg-white">
          <div className="no-shrink w-20">
              <Sidebar />
          </div>
          <main className="flex-1 flex flex-col m-5">
                <Outlet/>
          </main>
      </div>
  );
}

export default UserLayout;