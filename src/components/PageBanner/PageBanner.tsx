//libs
import {FC, ReactNode} from "react";
//components
import Menu from "../Menu/Menu"
import TextSpiner from "../TextSpiner/TextSpiner"
//styles
import styles from "./styles.module.scss"


interface Props {
  title: ReactNode,
  colorOfTextSpinner: string,
  text: string | ReactNode,
  children: ReactNode,
  BGcolor: "light" | "dark",
  hero?: string,
  lng: string,
}
const PageBanner: FC<Props> = ({ title, colorOfTextSpinner, text, children, BGcolor, hero,
                               lng}) => {
  return (
    <section style={hero ? {backgroundImage: `url('${hero}')`} : {}} className={`${styles.container}`}>
      <div className={styles.content}>
        <div className={styles.topRaw}>
          <div className={styles.navBlock}>
            <Menu BGcolor={BGcolor} lng={lng} />
          </div>
          {title}
        </div>
        <div className={styles.bottomRaw}>
          <div className={styles.textSpiner}>
            <TextSpiner color={colorOfTextSpinner} />
          </div>
          <div className={styles.imageOrText}>
            {text}
          </div>
        </div>
        {children}
      </div>
    </section>
  )
}

export default PageBanner