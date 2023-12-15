//components
import Image from "next/image"
import Link from "next/link"
import classNames from "classnames"
//styles
import styles from "./styles.module.scss"
import global from "@/styles/global.module.scss"
//utils
import {getHeroImage} from "@/utils/getHeroImage";
import {useTranslation} from "@/app/i18n";

const LetsWorkTogether = async ({lng}: {lng: string}) => {
  const {t} = await useTranslation(lng);
  const image = await getHeroImage(6);
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={classNames(styles.titleBlock, global.bodyBig)}>
          <div className={styles.topRaw}>
            <p className={styles.rawItem}>{t('lestWorkSectionFirstWord')}</p>
            <Image src={image.image} width={226} height={142} alt={'Lets Work Together'} />
            <p className={styles.rawItem}>{t('letsWorkSectionSecondWord')}</p>
          </div>
          <div className={styles.bottomRaw}>
            {t('lestWorkSectionThirdWord')}
            <Link href="/form/get-in-touch" className={classNames(global.primaryButton, global.body2, styles.btn)}>{t("lestWorkSectionBtn")}</Link>
          </div>
        </div>
        <p className={classNames(global.body2, styles.label)}>
          {t('lestWorkSectionFirstAdv')}
        </p>
        <p className={classNames(global.body2, styles.label)}>
          {t('lestWorkSectionSecondAdv')}
        </p>
        <p className={classNames(global.body2, styles.label)}>
          {t('lestWorkSectionThirdAdv')}
        </p>
      </div>
    </section>
  )
}

export default LetsWorkTogether