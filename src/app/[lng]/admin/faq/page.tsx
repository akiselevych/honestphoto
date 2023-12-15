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
import {deleteFaq, fetchAllFaq} from "@/redux/slices/Faq.slice";

const AdminPage = () => {
    const dispatch = useAppDispatch();
    const items = useAppSelector((state) => state.Faq.allFaq);
    const fetchStatus = useAppSelector((state) => state.Faq.fetchStatus);
    useEffect(() => {
        dispatch(fetchAllFaq());
    }, []);
    return (
        <div className={styles.container}>
            <AdminTopBar page={"faq"}/>
            <div className={styles.list}>
                {fetchStatus === "pending" && <Spinner/>}
                <PhotoshootList items={items} deleteAction={deleteFaq}/>
            </div>
        </div>
    );
};

export default withAuth(AdminPage);
