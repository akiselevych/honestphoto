"use client"
//libs
import {useEffect} from "react";
//components
import AdminTopBar from "@/components/AdminTopBar/AdminTopBar";
import Spinner from "@/components/Spinner/Spinner";
import PhotoshootList from "@/components/PhotoshootList/PhotoshootList";
//redux
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {deletePhotoshoot, fetchAllPhotoshoots} from "@/redux/slices/Types.slice";
//utils
import {withAuth} from "@/utils/AuthWrapper";
//styles
import styles from './styles.module.scss'




const AdminPage = () => {
    const dispatch = useAppDispatch();
    const items = useAppSelector((state) => state.Types.allPhotoshoots);
    const fetchStatus = useAppSelector((state) => state.Types.fetchStatus);
    useEffect(() => {
        dispatch(fetchAllPhotoshoots());
    }, []);
    return (
        <div className={styles.container}>
            <AdminTopBar page={"types-of-photoshoot"}/>
            <div className={styles.list}>
                {fetchStatus === "pending" && <Spinner/>}
                <PhotoshootList items={items} deleteAction={deletePhotoshoot}/>
            </div>
        </div>
    );
};

export default withAuth(AdminPage);
