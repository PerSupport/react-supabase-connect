import { NavLink } from "react-router-dom";

export default function Menu() {

    const menus = [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Products", path: "/products" },
        { name: "Categories", path: "/categories" },
        { name: "Customers", path: "#" },
        { name: "Orders", path: "#" },
        { name: "Reports", path: "#" },
    ];

    return (
        <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-6">
                <ul className="flex">

                    {menus.map(menu => (
                        <li key={menu.name}>
                            {
                                menu.path === "#"
                                    ?
                                    <span className="block px-5 py-4 text-gray-400 cursor-not-allowed">
                                        {menu.name}
                                    </span>
                                    :
                                    <NavLink
                                        to={menu.path}
                                        className={({ isActive }) =>
                                            `block px-5 py-4 border-b-2 ${
                                                isActive
                                                    ? "border-blue-600 text-blue-600 font-semibold"
                                                    : "border-transparent hover:border-gray-300"
                                            }`
                                        }
                                    >
                                        {menu.name}
                                    </NavLink>
                            }
                        </li>
                    ))}
                    
                </ul>
            </div>
        </nav>
    );
}