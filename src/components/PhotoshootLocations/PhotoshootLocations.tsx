'use client'
//libs
import { useEffect } from "react";
import Image from "next/image"
import Link from "next/link"
import classNames from "classnames"
//styles
import styles from "./styles.module.scss"
import global from "@/styles/global.module.scss"
//redux
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchAllLocation } from "@/redux/slices/Locations.slice";
import {useTranslation} from "@/app/i18n/client";



const PhotoshootLocations = ({lng}: {lng: string}) => {
  const {t} = useTranslation(lng)
  const locations = useAppSelector(state => state.Locations.allLocations);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (locations.length === 0) {
      dispatch(fetchAllLocation())
    }
  }, []);
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles.textBlock}>
          <p className={classNames(styles.title, global.bodyBig)}>
            {t("locationSectionTitle")}
          </p>
          <p className={classNames(global.body2, styles.subTitle)}>
            {t("locationSectionDesc")}
          </p>
          <Link href="/form/book-consultation-cities" className={classNames(global.primaryButton, styles.btn)}>
            {t("locationSectionBtn")}
          </Link>
        </div>
        {locations.map(({ title, price, date, image, width, height }, i) => {
          return (
            <div key={i} className={styles.locationCard}>
              <Image src={image as string} alt={title} width={width} height={height} />
              <div className={styles.cardTextBlock}>
                <h5 className={global.h5}>{title}</h5>
                <div className={styles.bottomRaw}>
                  <p className={global.body2}>{date}</p>
                  <p className={global.body2}>{price}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default PhotoshootLocations