"use client"
//libs
import {useEffect} from "react";
//components
import AdminTopBar from "@/components/AdminTopBar/AdminTopBar";
import Spinner from "@/components/Spinner/Spinner";
import PhotoshootList from "@/components/PhotoshootList/PhotoshootList";
//styles
import styles from './styles.module.scss'
//utils
import {withAuth} from "@/utils/AuthWrapper";
//redux
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {deleteLocation, fetchAllLocation} from "@/redux/slices/Locations.slice";


const AdminPage = () => {
    const fetchStatus = useAppSelector((state) => state.Locations.fetchStatus);
    const items = useAppSelector((state) => state.Locations.allLocations);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchAllLocation());
    }, []);

    return (
        <div className={styles.container}>
            <AdminTopBar page={"locations-for-photoshoot"}/>
            <div className={styles.list}>
                {fetchStatus === "pending" && <Spinner/>}
                <PhotoshootList items={items} deleteAction={deleteLocation}/>
            </div>
        </div>
    );
};

export default withAuth(AdminPage);
