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
import {deleteReview, fetchAllReviews} from "@/redux/slices/Reviews.slice";

const AdminPage = () => {
    const dispatch = useAppDispatch();
    const items = useAppSelector((state) => state.Reviews.allReviews);
    const fetchStatus = useAppSelector((state) => state.Reviews.fetchStatus);
    useEffect(() => {
        dispatch(fetchAllReviews());
    }, []);
    return (
        <div className={styles.container}>
            <AdminTopBar page={"reviews"}/>
            <div className={styles.list}>
                {fetchStatus === "pending" && <Spinner/>}
                <PhotoshootList items={items} deleteAction={deleteReview}/>
            </div>
        </div>
    );
};

export default withAuth(AdminPage);
