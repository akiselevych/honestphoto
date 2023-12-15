'use client'
//libs
import Image, {StaticImageData} from "next/image";
import {FC, useEffect, useRef, useState} from "react";
import Link from "next/link";
//@ts-ignore
import { Splide, SplideSlide } from '@splidejs/react-splide';
//styles
import styles from './styles.module.scss'
import global from '@/styles/global.module.scss'
import '@splidejs/react-splide/css';
import './sliderStyles.scss';
//redux
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {fetchAllPrices} from "@/redux/slices/Prices.slice";
import {fetchAllArtPhotoshoots} from "@/redux/slices/Art.slice";
//components
import Card from "@/components/BookSlider/Card/Card";
import Spinner from "@/components/Spinner/Spinner";



const BookSlider:FC<{typeId: number}> = ({typeId}) => {
    const prices = useAppSelector(state => state.Prices.allPrices);
    const pricesStatus = useAppSelector(state => state.Prices.fetchStatus);
    const art = useAppSelector(state => state.Art.allArtPhotoshoots);
    const artStatus = useAppSelector(state => state.Art.fetchStatus);
    const allPossibleForBook = [...prices,...art];
    const dispatch = useAppDispatch();
    const splideRef = useRef<Splide>(null);
    const [width, setWidth] = useState<number>(0);
    useEffect(() => {
        dispatch(fetchAllPrices());
        dispatch(fetchAllArtPhotoshoots());
        if (typeof window !== "undefined") setWidth(window.innerWidth);
    }, []);

    const handleGap = () => {
        return width > 1240 ? "3%" : "3%"
    }
    const handleStart = () => allPossibleForBook.findIndex(p => p.id == typeId);
    if (pricesStatus !== "initial" || artStatus !== "initial"){
        return <Spinner/>
    }
    return (
        <section className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.sliderWrapper}>
                    <Splide ref={splideRef} options={ { rewind: true,start: handleStart() ,easing:'linear', type: 'loop', perPage:2, perMove:1, pagination: false, gap: handleGap()}} className={styles.slider}>
                        {allPossibleForBook.map((pos, ind) => (
                            <SplideSlide key={ind} className={styles.slide}>
                                <Image width={pos.width} height={pos.height} src={pos.image as string} alt={pos.title} className={`smallImage ${styles.smallImage}`}/>
                                <Image width={pos.width} height={pos.height} src={pos.image as string} alt={pos.title} className={`bigImage ${styles.bigImage}`}/>
                                <article className={"article"}>
                                    <h5 className={`${global.h5} ${styles.name} name`}>{pos.title}</h5>
                                    <p className={`${global.body2} ${styles.price} price`}>{pos.price}</p>
                                </article>
                                <p className={`discount ${global.body3SemiBold} ${styles.discount}`}>When you buy several photoshoots at once, you get a discount. *You can also purchase a certificate for any type of shooting at a discount.</p>
                                <div className={`upperdecor ${styles.upperdecor}`}>
                                    <h2 className={`${global.h2} ${styles.bigTitle}`}>{pos.title}</h2>
                                    <p className={`${global.body2} ${styles.time}`}>This photoshoot lasts up to 1.5 hours.</p>
                                </div>
                                <Link className={`bookButton ${global.primaryButton} ${styles.bookButton}`} href={"/form/book-consultation"}>Book photoshoot</Link>
                            </SplideSlide>
                        ))}
                    </Splide>
                </div>
                <div className={styles.cardsWrapper}>
                    {allPossibleForBook.map((pos, index) => (
                        <div className={styles.cardWrapper} key={index}>
                            <Card height={pos.height} width={pos.width} title={pos.title} price={pos.price} image={pos.image as StaticImageData} active={index == 0}/>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BookSlider;