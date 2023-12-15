//libs
import Image from "next/image";
import Link from "next/link";
//styles
import styles from "@/styles/notFoundPage.module.scss"
import global from "@/styles/global.module.scss"
//images
import image from "public/images/banners/404.png"


const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <Image className={styles.image} src={image} alt={"error"} />
      <div className={styles.textBlock}>
        <div className={global.h2}>Page not found</div>
        <div className={global.body2}> Honestly, we were looking, but....</div>
      </div>
      <Link href="/" className={global.primaryButton} >
        Back home
      </Link>
    </div >

  );
};

export default NotFoundPage;
