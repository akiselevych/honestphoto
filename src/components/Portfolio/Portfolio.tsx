//libs
import Image from "next/image";
import Link from "next/link";
//styles
import styles from "./styles.module.scss";
import global from "@/styles/global.module.scss";
//images
import arrow from "public/images/icons/rightArrow.svg";
//types
import { PortfolioPhotoshoot } from "@/types";
//components
import ImageCard from "@/components/Portfolio/ImageCard";
import {useTranslation} from "@/app/i18n";

export async function getPortfolioImages() {
  const res = await fetch(
    `https://api.honest-photography.com/api/v1/portfolio-photoshoots/`
  );
  return res.json();
}

const Portfolio = async ({lng}: {lng: string}) => {
  const {t} = await useTranslation(lng);
  const portfolio: PortfolioPhotoshoot[] = await getPortfolioImages();



  
  portfolio.sort((a, b) => a.order - b.order);

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.text}>
            <h2 className={`${global.h2} ${styles.title}`}>{t("portfolioSectionTitle")}</h2>
            <p className={`${global.body2} ${styles.desc}`}>
              {t("portfolioSectionDesc")}
            </p>
          </div>
          <Link
            href="/book/1"
            className={`${global.body2Bold} ${styles.giftLink}`}
          >
            {t("portfolioSectionBtn")}
            <Image src={arrow} alt={"Buy a gift certificate link"} />
          </Link>
        </div>
        <div className={styles.content}>
          <div className={styles.bigCol}>
            {portfolio.map((img: PortfolioPhotoshoot, i: number) => {
              if ((img.order + 1) % 3 === 1) {
                return (
                  <div key={i}>
                    <ImageCard image={img} />
                  </div>
                );
              }
              return null;
            })}
          </div>
          <div className={styles.bigCol}>
            {portfolio.map((img: PortfolioPhotoshoot, i: number) => {
              if ((img.order + 1) % 3 === 2) {
                return (
                  <div key={i}>
                    <ImageCard image={img} />
                  </div>
                );
              }
              return null;
            })}
          </div>
          <div className={styles.bigCol}>
            {portfolio.map((img: PortfolioPhotoshoot, i: number) => {
              if ((img.order + 1) % 3 === 0) {
                return (
                  <div key={i}>
                    <ImageCard image={img} />
                  </div>
                );
              }
              return null;
            })}
          </div>

          <div className={styles.mediumCol}>
            {portfolio.map((img: PortfolioPhotoshoot, i: number) => {
              if (i % 2 !== 0) {
                return (
                  <div key={i}>
                    <ImageCard image={img} />
                  </div>
                );
              }
              return null;
            })}
          </div>
          <div className={styles.mediumCol}>
            {portfolio.map((img: PortfolioPhotoshoot, i: number) => {
              if (i % 2 === 0) {
                return (
                  <div key={i}>
                    <ImageCard image={img} />
                  </div>
                );
              }
              return null;
            })}
          </div>

          <div className={styles.smallCol}>
            {portfolio.map((img: PortfolioPhotoshoot, i: number) => (
              <div key={i}>
                <ImageCard image={img} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
