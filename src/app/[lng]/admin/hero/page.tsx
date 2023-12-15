"use client"
//libs
import {useEffect} from "react";
//styles
import styles from './styles.module.scss'
//components
import AdminTopBar from "@/components/AdminTopBar/AdminTopBar";
import Spinner from "@/components/Spinner/Spinner";
import PhotoshootList from "@/components/PhotoshootList/PhotoshootList";
//utils
import {withAuth} from "@/utils/AuthWrapper";
//redux
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {fetchAllHeroes} from "@/redux/slices/Hero.slice";

const AdminPage = () => {
    const fetchStatus = useAppSelector((state) => state.Hero.fetchAllStatus);
    const items = useAppSelector((state) => state.Hero.allHeroes);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchAllHeroes());
    }, []);

    return (
        <div className={styles.container}>
            <AdminTopBar page={"hero"}/>
            <div className={styles.list}>
                {fetchStatus === "pending" && <Spinner/>}
                <PhotoshootList items={items}/>
            </div>
        </div>
    );
};

export default withAuth(AdminPage);
