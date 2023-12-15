//libs
import React from 'react';
import Image from "next/image";
//styles
import styles from './styles.module.scss'
//images
import spinner from '../../../public/images/icons/spinner.svg';
const AdminSpinner = () => {
    return (
        <div className={styles.spinerOverlay}>
            <Image src={spinner} alt={"AdminSpinner"} className={styles.spiner}/>
        </div>
    );
};

export default AdminSpinner;
