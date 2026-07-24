import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function Header() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    useEffect(() => {
        loadUser();
    }, []);

    async function loadUser() {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (user) {
            setEmail(user.email ?? "");
        }
    }
    
    async function logout() {
        await supabase.auth.signOut();
        navigate("/");
    }
    return (
        <header className="bg-blue-700 text-white shadow">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">
                        Product Management System
                    </h1>
                    <p className="text-sm text-blue-100">
                        React + Supabase Demo
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <span>
                        {email}
                    </span>
                    <button
                        onClick={logout}
                        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
}