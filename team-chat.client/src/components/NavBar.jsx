import { Link } from "react-router-dom"
const paths = [
    {to: "/", name: "Home" },
    {to: "/aboutus", name: "About" },
    { to: "/login", name: "Login" },
    { to: "/register", name: "Register" },
];

function NavBar() {
  return (
      <nav className="h-15 bg-white shadow-sm">        
          <div className="flex flex-row h-full 
                    justify-center items-center gap-2 ">
              {
                  paths.map((links) => (
                      <Link key={links.to}
                          to={links.to}>{links.name}</Link>
                  ))
              }
           </div>          
      </nav>
  );
}

export default NavBar;