//libs
//componrnts
import PageBanner from "@/components/PageBanner/PageBanner"
import PhotoshootsTypes from "@/components/PhotoshootsTypes/PhotoshootsTypes"
import PhotoshootLocations from "@/components/PhotoshootLocations/PhotoshootLocations"
import ArtPhotoshoot from "@/components/ArtPhotoshoot/ArtPhotoshoot"
import AboutMe from "@/components/AboutMe/AboutMe"
import Reviews from "@/components/Reviews/Reviews"
import classNames from "classnames"
import LetsWorkTogether from "@/components/LetsWorkTogether/LetsWorkTogether"
//styles
import styles from '@/styles/mainPage.module.scss'
import global from '@/styles/global.module.scss'
//utils
import {getHeroImage} from "@/utils/getHeroImage";
import {useTranslation} from "@/app/i18n";





export default async function Home({params: {lng}} :{params: {lng: string}}) {
    const img = await getHeroImage(1);
    const {t} = await useTranslation(lng);
    return (
        <>
            <PageBanner
                lng={lng}
                hero={img.image as string}
                BGcolor="dark"
                title={<div className={classNames(styles.title, global.h1)}>{t('homeHeroTitle')}</div>}
                colorOfTextSpinner={"#F7F7F7"}
                text={<div className={classNames(styles.text, global.body2)}>{t('homeHeroDescription')}</div>}
                children={<div className={classNames(global.body3, styles.since)}>{t('homeHeroDate')}</div>}
            />
            <PhotoshootsTypes lng={lng} />
            <PhotoshootLocations lng={lng}/>
            <ArtPhotoshoot lng={lng}/>
            <AboutMe pagetype="mainPage" lng={lng}/>
            <Reviews/>
            <LetsWorkTogether lng={lng}/>
        </>
    )
}
