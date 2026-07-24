import { Outlet } from "react-router-dom";
import Header from "../components/Layout/Header";
import Menu from "../components/Layout/Menu";

export default function MainLayout() {
    return (
        <div className="min-h-screen bg-gray-100">

            <Header />

            <Menu />

            <main className="max-w-7xl mx-auto p-6">
                <Outlet />
            </main>

        </div>
    );
}