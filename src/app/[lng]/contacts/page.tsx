//libs
import Image from "next/image";
import classNames from "classnames";
//styles
import styles from './styles.module.scss'
import global from '@/styles/global.module.scss'
//components
import PageBanner from "@/components/PageBanner/PageBanner";
import LetsWorkTogether from "@/components/LetsWorkTogether/LetsWorkTogether";
import AboutMe from "@/components/AboutMe/AboutMe";
import FAQblock from "@/components/FAQblock/FAQblock";
//images
import {getHeroImage} from "@/utils/getHeroImage";
import {useTranslation} from "@/app/i18n";

const ConatctPage = async ({params: {lng}} :{params: {lng: string}}) => {
    const img = await getHeroImage(4);
    const {t} = await useTranslation(lng);
    return (
        <>
            <PageBanner
                lng={lng}
                BGcolor="light"
                title={<div className={classNames(styles.title, global.h1)}>{t("contactsHeroTitle")}</div>}
                colorOfTextSpinner={"#000000"}
                text={<Image priority width={631} height={348} src={img.image as string} alt={"Wedding"} className={styles.image}/>}>
                <div className={styles.linksWrapper}>
                    <a href="https://instagram.com/elena_the_sun?igshid=1imqxm3q4shfy&utm_source=web-site&utm_medium=icon&utm_campaign=inst_honest_web"
                       className={styles.link}>Instagram</a>
                    <a href="" className={styles.link}>Facebook</a>
                </div>
            </PageBanner>
            <FAQblock/>
            <LetsWorkTogether lng={lng}/>
            <AboutMe lng={lng} pagetype={"contactPage"}/>
        </>
    )
}

export default ConatctPage