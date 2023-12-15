//libs
import React from 'react';
import Image from "next/image";
//styles
import styles from './styles.module.scss'
//images
import spinner from '../../../public/images/icons/spinner.svg';
const Spinner = () => {
    return (
        <div className={styles.spinerOverlay}>
            <Image src={spinner} alt={"Spinner"} className={styles.spiner}/>
        </div>
    );
};

export default Spinner;
