//libs
import {FC} from "react";
import Image, {StaticImageData} from "next/image";
import Link from "next/link";
//styles
import styles from './styles.module.scss'
import global from '@/styles/global.module.scss'
//images
import arrow from '../../../../public/images/icons/blackRightArrow.png'

interface Props {
    active: boolean,
    title: string,
    price: string,
    image: StaticImageData,
    width: number,
    height: number
}

const Card: FC<Props> = ({active, title,  price, image, width,height}) => {
    return (
        <div className={styles.container}>
            {active && <h2 className={`${global.h2} ${styles.title}`}>{title}</h2>}
            {active && <p className={`${global.body2} ${styles.desc}`}>{price}</p>}
            <Image width={width} height={height} src={image} alt={title} className={styles.image}/>
            <h5 className={`${global.h5} ${styles.subtitle}`}>{title}</h5>
            {/*<p className={`${global.body2} ${styles.subdesc}`}>{desc}</p>*/}
            {active && <p className={`${global.body3SemiBold} ${styles.discout}`}>When you buy several photoshoots at once, you
                get
                a discount. *You can also
                purchase a certificate for any type of shooting at a discount.</p>}
            <Link
                href={"/"}
                className={`${active ? styles.activeBtn : styles.btn} ${active ? global.primaryButton : global.body2Bold}`}>
                Book photoshoot {!active && <Image src={arrow} alt={"Right arrow"}/>}
            </Link>
        </div>
    );
};

export default Card;
