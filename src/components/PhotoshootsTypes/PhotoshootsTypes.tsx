'use client'
//libs
import Link from "next/link"
import Image from "next/image"
import {FC, useEffect} from "react";
import classNames from "classnames"
import {useTranslation} from "@/app/i18n/client";
//styles
import styles from "./styles.module.scss"
import global from "@/styles/global.module.scss"
//images
import arrow from "public/images/icons/rightArrow.svg"
//redux
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchAllPhotoshoots } from "@/redux/slices/Types.slice";
import { fetchAllPrices } from "@/redux/slices/Prices.slice";
//types
import {ITranslateProp} from "@/types";

const PhotoshootsTypes = ({lng}: {lng: string}) => {
  const {t} = useTranslation(lng)
  const types = useAppSelector(state => state.Types.allPhotoshoots);
  const prices = useAppSelector(state => state.Prices.allPrices);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (prices.length === 0) dispatch(fetchAllPrices());
    if (types.length === 0) dispatch(fetchAllPhotoshoots());
  }, []);
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles.topRaw}>
          <h2 className={classNames(global.h2, styles.title)}>
            {t("typesOfPhotoshootTitle")}
          </h2>
          <Link className={classNames(global.body2, styles.viewMoreLink)} href={"/prices"}>
            {t("typesOfPhotoshootViewBtn")}
            <Image src={arrow} alt="View all" />
          </Link>
        </div>
        <div className={styles.bottomRaw}>
          {types.map((ph, index) => (
            <div key={index} className={classNames(styles.photoshootItem, index === 1 && styles.centerCard)}>
              <div className={classNames(styles.imageWrapper, index === 1 && styles.centarlImageWrapper)}>
                <Image priority src={ph.image as string} alt={ph.title} width={ph.width} height={ph.height} className={styles.image} />
              </div>
              <h5 className={classNames(styles.photoshootName, global.h5)}>{ph.title}</h5>
              <div className={classNames(styles.photoshootPrice, global.body2)}>{ph.price}</div>
              <Link href={`/book/${prices.find(price => price.title === ph.title)?.id || 1}`} className={classNames(global.h5, styles.photoshootBook)}>
                {t("typesOfPhotoshootBookBtn")}
                <Image src={arrow} alt="View all" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PhotoshootsTypes