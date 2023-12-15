"use client"
//styles
import styles from './styles.module.scss'
//components
import AdminTopBar from "@/components/AdminTopBar/AdminTopBar";
//utils
import {withAuth} from "@/utils/AuthWrapper";
//redux
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {deleteArtPhotoshoot, fetchAllArtPhotoshoots} from "@/redux/slices/Art.slice";
import Spinner from "@/components/Spinner/Spinner";
import PhotoshootList from "@/components/PhotoshootList/PhotoshootList";
import {useEffect} from "react";

const AdminPage = () => {
    const fetchStatus = useAppSelector((state) => state.Art.fetchStatus);
    const items = useAppSelector((state) => state.Art.allArtPhotoshoots);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchAllArtPhotoshoots());
    }, []);
    return (
        <div className={styles.container}>
            <AdminTopBar page={"art-photoshoot"}/>
            <div className={styles.list}>
                {fetchStatus === "pending" && <Spinner/>}
                <PhotoshootList items={items} deleteAction={deleteArtPhotoshoot}/>
            </div>
        </div>
    );
};

export default withAuth(AdminPage);
