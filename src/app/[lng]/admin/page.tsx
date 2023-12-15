"use client"
//libs
import {useRouter} from "next/navigation";
import {useEffect} from "react";
//utils
import {withAuth} from "@/utils/AuthWrapper";

const AdminPage = () => {
    const router = useRouter();
    useEffect(() => {
        router.push("/admin/types-of-photoshoot")
    }, []);
    return (
        <>

        </>
    );
};

export default withAuth(AdminPage);
