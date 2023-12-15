//libs
import { FC } from 'react'
//styles
import style from "./styles.module.scss"
import global from "@/styles/global.module.scss"


interface Props {
  color: string;
}
const TextSpiner: FC<Props> = ({ color }) => {
  return (
    <div className={style.container}>
      <svg className={style.svg} viewBox="0 0 100 100" width="100" height="100">
        <defs>
          <path
            id="circle"
            d="
                            M 50, 50
                            m -37, 0
                            a 37,37 0 1,1 74,0
                            a 37,37 0 1,1 -74,0"
          />
        </defs>
        <text textLength={220} className={`${global.body3} ${style.text}`} style={{ color: color }}>
          <textPath xlinkHref="#circle">
            Through the lens of honesty
          </textPath>
        </text>
      </svg>
    </div >
  );
};


export default TextSpiner