import Image from 'next/image'
import { FC, useState } from 'react'
import { motion } from 'framer-motion';
import classNames from 'classnames'
//images
import open from "public/images/icons/openTopic.svg"
import close from "public/images/icons/closeTopic.svg"
//styles
import styles from './styles.module.scss'
import global from '@/styles/global.module.scss'


interface Props {
  text: string
  answ: string;
}

const QuetionItem: FC<Props> = ({ text, answ }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div onClick={() => setIsOpen(prev => !prev)} className={classNames(styles.quetionsItem, global.h4, isOpen ? styles.activeItem : '')}>
      <div className={styles.topRow}>
        <div className={styles.qutionText}>{text}</div>
        <Image alt={isOpen ? 'open' : 'close'} src={isOpen ? close : open} />
      </div>
      {isOpen &&

        <motion.div
          className={classNames(styles.bottoRow, global.body2)}
          initial={{ height: 0, opacity: 0 }} // Початковий стан
          animate={{ height: 'auto', opacity: 1 }} // Кінцевий стан при відкритті
          exit={{ height: 0, opacity: 0 }} // Стан при закритті
          transition={{ duration: 0.3 }} // Тривалість анімації
        >{answ}
        </motion.div>
      }
    </div>
  )
}

export default QuetionItem