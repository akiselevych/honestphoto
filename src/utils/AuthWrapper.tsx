"use client"
//libs
import {FC, ReactElement, useEffect} from "react";
import {useRouter} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
// types
import {AppDispatch, RootState} from "@/types";
//redux
import {refreshToken, setIsLogged} from "@/redux/slices/Login.slice";
import Spinner from "@/components/Spinner/Spinner";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";

export function withAuth(WrappedComponent: any) {
    return function WithAuth(props: React.ComponentProps<typeof WrappedComponent>): ReactElement {
        const isLogged = useAppSelector((state) => state.Login.isLogged);
        const router = useRouter();
        const dispatch = useAppDispatch();

        useEffect(() => {
            const access = JSON.parse(localStorage.getItem("accessHonestPhoto")!);
            const refresh = JSON.parse(localStorage.getItem("refreshHonestPhoto")!);
            if (access == null || refresh == null || new Date(refresh.exp) < new Date()){
                localStorage.removeItem("accessHonestPhoto");
                localStorage.removeItem("refreshHonestPhoto");
                router.push("/login");
                return;
            } else if (new Date(access.exp) < new Date()){
                dispatch(refreshToken(refresh.token))
                    .then((res) => dispatch(setIsLogged(true)));
                return;
            }
            if (!isLogged){
                dispatch(setIsLogged(true));
            }
            //eslint-disable-next-line
        }, []);

        if(!isLogged){
            return <Spinner/>
        }

        return <WrappedComponent {...props} />;
    };
}