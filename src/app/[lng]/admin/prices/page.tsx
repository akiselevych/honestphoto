"use client"
//libs
import {useEffect} from "react";
//components
import AdminTopBar from "@/components/AdminTopBar/AdminTopBar";
import Spinner from "@/components/Spinner/Spinner";
import PhotoshootList from "@/components/PhotoshootList/PhotoshootList";
//redux
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {deletePrice, fetchAllPrices} from "@/redux/slices/Prices.slice";
//utils
import {withAuth} from "@/utils/AuthWrapper";
//styles
import styles from './styles.module.scss'




const AdminPage = () => {
    const dispatch = useAppDispatch();
    const items = useAppSelector((state) => state.Prices.allPrices);
    const fetchStatus = useAppSelector((state) => state.Prices.fetchStatus);
    useEffect(() => {
        dispatch(fetchAllPrices());
    }, []);
    return (
        <div className={styles.container}>
            <AdminTopBar page={"prices"}/>
            <div className={styles.list}>
                {fetchStatus === "pending" && <Spinner/>}
                <PhotoshootList items={items} deleteAction={deletePrice}/>
            </div>
        </div>
    );
};

export default withAuth(AdminPage);
