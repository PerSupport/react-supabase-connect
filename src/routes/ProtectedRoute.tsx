import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

type Props = {
    children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {

    const [loading, setLoading] = useState(true);
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        checkSession();
    }, []);

    async function checkSession() {

        const { data } = await supabase.auth.getSession();

        setIsLogin(!!data.session);

        setLoading(false);

    }

    if (loading) {

        return <div className="p-6">Loading...</div>;

    }

    if (!isLogin) {

        return <Navigate to="/" replace />;

    }

    return <>{children}</>;

}