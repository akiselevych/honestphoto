//libs
import Link from "next/link";
//styles
import styles from './styles.module.scss'
import global from '@/styles/global.module.scss'
import {useTranslation} from "@/app/i18n";

const ExplorePortfolio = async ({lng}: {lng: string}) => {
    const {t} = await useTranslation(lng);
    return (
        <section className={styles.container}>
            <h2 className={`${global.h2} ${styles.title}`}>{t("explorePortfolioSectionTitle")}</h2>
            <p className={`${global.body2} ${styles.desc}`}>{t("explorePortfolioSectionDesc")}</p>
            <Link href="/portfolio" className={`${global.primaryButton} ${styles.button}`}>{t("explorePortfolioSectionBtn")}</Link>
        </section>
    );
};

export default ExplorePortfolio;
