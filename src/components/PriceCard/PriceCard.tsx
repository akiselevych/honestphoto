'use client'
//libs
import { FC } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
//styles
import styles from './styles.module.scss'
import global from '@/styles/global.module.scss'
//images
import arrow from 'public/images/icons/rightArrow.svg'
import {useTranslation} from "@/app/i18n/client";


interface Props {
  title: string,
  price: string,
  image: StaticImageData | string,
  styleVariant: number,
  id: number,
   width: number,
  height: number,
  small: boolean,
  lng: string
}

const PriceCard: FC<Props> = ({ title, price, image, styleVariant, id, width, height, small, lng }) => {
  const {t} = useTranslation(lng);
  const handleColorStyle = () => {
    switch (styleVariant) {
      case 1:
        return styles.variant1
      case 2:
        return styles.variant2
      case 3:
        return styles.variant3
      case 4:
        return styles.variant4
    }
  }
  return (
    <div className={`${styles.container} ${handleColorStyle()}`}>
      <div className={styles.content}>
        <h5 className={`${global.h5} ${styles.title}`}>{title}</h5>
        <p className={`${global.body2} ${styles.price}`}>{price}</p>
        <Link href={`/book/${id}`} className={`${global.body2Bold} ${styles.bookLink}`}>{t("priceSectionBookBtn")} <Image src={arrow} alt={"Book photoshoot link"} /></Link>
      </div>
      <Image src={image} alt={title} className={`${small ? styles.small : ''} ${styles.image}`} width={width} height={height}/>
    </div>
  );
};

export default PriceCard;
