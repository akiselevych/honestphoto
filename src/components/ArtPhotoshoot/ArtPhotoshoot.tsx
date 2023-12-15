'use client'
//libs
import Image from "next/image"
import Link from "next/link"
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {useEffect} from "react";
import classNames from "classnames"
//styles
import styles from "./styles.module.scss"
import global from "@/styles/global.module.scss"
//redux
import {fetchAllArtPhotoshoots} from "@/redux/slices/Art.slice";
//images
import arrow from "public/images/icons/rightArrow.svg"
import {useTranslation} from "@/app/i18n/client";

const ArtPhotoshoot = ({lng} :{lng: string}) => {
  const {t} = useTranslation(lng)
  const art = useAppSelector(state => state.Art.allArtPhotoshoots);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (art.length === 0){
      dispatch(fetchAllArtPhotoshoots())
    }
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles.leftCol}>
          <div className={styles.textBlock}>
            <h2 className={classNames(global.h2, styles.title)}>
              {t("artSectionTitle")}
            </h2>
            <p className={classNames(global.body2)}>
              {t("artSectionDesc")}
            </p>
          </div>
          <Link href="/form/book-consultation" className={classNames(global.secondaryButton, styles.btn)}>{t("artSectionBtn")}</Link>
        </div>
        <div className={styles.rightCol}>
          {
            art.map(({ title, image, price, old_price, description,width,height,id }, index) => (
              <div key={title} className={classNames(styles.card, index === art.length - 1 ? styles.thirdCard : "")}>
                <Image alt={title} src={image as string} width={width} height={height} />
                <div className={styles.cardTextBlock}>
                  <h5 className={global.h5}>{title}</h5>
                  <p className={global.body2}>{description}</p>
                  <div className={styles.cardPriceBlock}>
                    <p className={styles.new}>{price}</p>
                    <p className={styles.old}>{old_price}</p>
                  </div>
                  <Link href={`/book/${id}`} className={classNames(global.h5, styles.photoshootBook)}>
                    {t("artSectionBtn")}
                    <Image src={arrow} alt="View all" />
                  </Link>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default ArtPhotoshoot