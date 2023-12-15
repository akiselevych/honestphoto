//libs
import classNames from "classnames";
import Image from "next/image";
//styles
import styles from "./styles.module.scss";
import global from "@/styles/global.module.scss";
//components
import PageBanner from "@/components/PageBanner/PageBanner";
import Portfolio from "@/components/Portfolio/Portfolio";
import LetsWorkTogether from "@/components/LetsWorkTogether/LetsWorkTogether";
//utils
import {getHeroImage} from "@/utils/getHeroImage";
import {useTranslation} from "@/app/i18n";

const Page = async ({params: {lng}}: { params: { lng: string } }) => {
    const {t} = await useTranslation(lng);
    const img = await getHeroImage(3);
    return (
        <>
            <PageBanner
                lng={lng}
                BGcolor="light"
                title={
                    <div
                        className={classNames(styles.title, global.h1)}
                    >
                        {t("portfolioHeroTitle")}
                    </div>
                }
                colorOfTextSpinner={"#000000"}
                text={
                    <Image
                        width={631}
                        height={348}
                        priority
                        src={img.image as string}
                        alt={"Wedding"}
                        className={styles.image}
                    />
                }
            >
                <div className={styles.linksWrapper}>
                    <a
                        href="https://instagram.com/elena_the_sun?igshid=1imqxm3q4shfy&utm_source=web-site&utm_medium=icon&utm_campaign=inst_honest_web"
                        className={styles.link}
                    >
                        Instagram
                    </a>
                    <a href="#" className={styles.link}>
                        Facebook
                    </a>
                </div>
            </PageBanner>
            <Portfolio lng={lng}/>
            <LetsWorkTogether lng={lng}/>
        </>
    );
};

export default Page;
