//libs
import classNames from "classnames"
//styles
import styles from "./styles.module.scss"
import global from "@/styles/global.module.scss"
//utils
import { getHeroImage } from "@/utils/getHeroImage";
import {useTranslation} from "@/app/i18n";




const AboutMe = async ({ pagetype, lng }: { pagetype: "mainPage" | "contactPage", lng: string }) => {
  const {t} = await useTranslation(lng);
  const imageMainPage = await getHeroImage(5);
  const imageContactPage = await getHeroImage(7);
  return (
    <section
      style={(imageMainPage || imageContactPage) ? { backgroundImage: `url(${pagetype === "mainPage" ? imageMainPage.image : imageContactPage.image})` } : {}}
      className={(classNames(pagetype === 'mainPage' ? styles.mainPageContainer : styles.contactsPageContainer))}>
      < div className={(classNames(styles.content))
      }>
        <div className={styles.topRaw}>
          <p className={classNames(global.body2, styles.leftText, styles.quote)}>
            {t("aboutMeSectionUpperLeft")}
          </p>
          <p className={classNames(global.body2)}>
            {t("aboutMeSectionUpperRight")}
          </p>
        </div>
        <h2 className={classNames(global.bodyBig, styles.title)}>
          <span className={classNames(styles.leftText, global.bodyBig)}>{t("aboutMeSectionTitleWhite")}</span>
          {t("aboutMeSectionTitleBlack")}
        </h2>
        <div className={classNames(global.body2, styles.aboutDescr)}>
          <p className={styles.aboutDescrItem}>
            {t("aboutMeSectionFirstDesc")}
          </p>
          <p className={styles.aboutDescrItem}>
            {t("aboutMeSectionSecondDesc")}
          </p>
        </div>
        <div className={classNames(styles.contactBlock, global.body2)}>
          <div className={classNames(global.body2, styles.leftText, styles.contactSubBlock)}>
            <a className={styles.leftText} href="https://instagram.com/elena_the_sun?igshid=1imqxm3q4shfy&utm_source=web-site&utm_medium=icon&utm_campaign=inst_honest_web">Instagram</a>
            <a className={styles.leftText} href="https://uk-ua.facebook.com/">Facebook</a>
          </div>
          <div className={classNames(global.body2, styles.contactSubBlock)}>
            <a href="tel:+34648455735">+34648455735</a>
            <a href="mailto:info@mysite.com">info@mysite.com</a>
          </div>
        </div>
        {/* HTML FOR MOBILE VERSION (MAX_WIDTH: 932px)*/}
        <div className={styles.topRawMobile}>
          <div className={styles.topRowSection}>
            <p className={classNames(global.body2, styles.leftText, styles.quote)}>
              {t("aboutMeSectionUpperLeft")}
            </p>
            <p className={classNames(global.body2)}>
              {t("aboutMeSectionUpperRight")}
            </p>
          </div>
          <div className={styles.bottomRowSection}>
            <a className={styles.leftText} href="https://instagram.com/elena_the_sun?igshid=1imqxm3q4shfy&utm_source=web-site&utm_medium=icon&utm_campaign=inst_honest_web">Instagram</a>
            <a className={styles.leftText} href="https://uk-ua.facebook.com/">Facebook</a>
          </div>
        </div>
        <div className={styles.bottomRawMobile}>
          <div className={styles.topRowSection}>
            <h2 className={classNames(global.bodyBig, styles.mobileTitle)}>{t("aboutMeSectionTitleFull")}</h2>
            <div className={styles.descrBlock}>
              <p className={styles.aboutDescrItem}>
                {t("aboutMeSectionFirstDesc")}
              </p>
              <p className={styles.aboutDescrItem}>
                {t("aboutMeSectionSecondDesc")}
              </p>
            </div>
          </div>
          <div className={styles.bottomRowSection}>
            <a href="tel:+34648455735">+34648455735</a>
            <a href="mailto:info@mysite.com">info@mysite.com</a>
          </div>
        </div>
      </div >
    </section >
  )
}

export default AboutMe