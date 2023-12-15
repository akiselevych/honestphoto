'use client'
//libs
import Image from "next/image";
import {useEffect} from "react";
import Masonry from "react-masonry-css";
//styles
import styles from './styles.module.scss'
import global from '@/styles/global.module.scss'
//images
import arrow from 'public/images/icons/rightArrow.svg'
//components
import PriceCard from "@/components/PriceCard/PriceCard";
//redux
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {fetchAllPrices} from "@/redux/slices/Prices.slice";
import {useTranslation} from "@/app/i18n/client";



const Prices = ({lng}: {lng: string}) => {
    const {t} = useTranslation(lng);
    const breakpointColumnsObj = {
        default: 2,
        1061: 1
    };
    const prices = useAppSelector(state => state.Prices.allPrices);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (prices.length === 0){
            dispatch(fetchAllPrices());
        }
    }, []);
    return (
        <section className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <h2 className={`${global.h2} ${styles.title}`}>{t("priceHeroTitle")}</h2>
                    <a href="#" className={`${global.body2Bold} ${styles.giftLink}`}>
                        {t("priceSectionGiftBtn")}
                        <Image src={arrow} alt={"Buy a gift certificate link"}/>
                    </a>
                </div>
                <div className={styles.content}>
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        columnClassName={styles.item}
                        className={styles.masonry}>
                        {prices.map((position, index) => {
                            const isSmall = position.title === "Family photoshoot" || position.title === "Holiday" +
                                " photoshoot" || position.title === "Content shooting"
                            return <PriceCard lng={lng} small={isSmall} key={index} id={position.id} styleVariant={position.style_variant} title={position.title}
                                              price={position.price.toString()} image={position.image as string} width={position.width} height={position.height}/>
                        })}
                    </Masonry>
                </div>
            </div>
        </section>
    );
};

export default Prices;
