//libs
import Image from "next/image";
import classNames from "classnames";
//styles
import styles from './styles.module.scss'
import global from '@/styles/global.module.scss'
//components
import PageBanner from "@/components/PageBanner/PageBanner";
import ExplorePortfolio from "@/components/ExplorePortfolio/ExplorePortfolio";
import Prices from "@/components/Prices/Prices";
import Reviews from "@/components/Reviews/Reviews";
import LetsWorkTogether from "@/components/LetsWorkTogether/LetsWorkTogether";
//utils
import {getHeroImage} from "@/utils/getHeroImage";
import {useTranslation} from "@/app/i18n";


const Price = async ({params: {lng}} :{params: {lng: string}}) => {
    const img = await getHeroImage(2);
    const {t} = await useTranslation(lng);
    return (
        <>
            <PageBanner
                lng={lng}
                BGcolor="light"
                title={<div className={classNames(styles.title, global.h1)}>{t('priceHeroTitle')}</div>}
                colorOfTextSpinner={"#000000"}
                text={<Image width={631} height={348} priority src={img.image as string} alt={"Wedding"} className={styles.image}/>}>
                <div className={styles.linksWrapper}>
                    <a href="https://instagram.com/elena_the_sun?igshid=1imqxm3q4shfy&utm_source=web-site&utm_medium=icon&utm_campaign=inst_honest_web"
                       className={styles.link}>Instagram</a>
                    <a href="#" className={styles.link}>Facebook</a>
                </div>
            </PageBanner>
            <Prices lng={lng}/>
            <ExplorePortfolio lng={lng}/>
            <Reviews/>
            <LetsWorkTogether lng={lng}/>
        </>
    )
}

export default Price