import NavBar from "../components/NavBar";
import {Outlet } from "react-router-dom"
function DefaultLayout() {
  return (
      <div className="min-h-screen flex flex-col bg-white">
          <NavBar />
          <main className="flex-1 flex flex-col m-5">
              <Outlet/>
          </main>
      </div>
  );
}

export default DefaultLayout;