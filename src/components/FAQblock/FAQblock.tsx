"use client"
//libs
import classNames from 'classnames'
//components
import QuetionItem from "./QuetionItem/QuetionItem"
//styles
import styles from './styles.module.scss'
import global from '@/styles/global.module.scss'




import React, {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {fetchAllFaq} from "@/redux/slices/Faq.slice";


const FAQblock = () => {
  const faq = useAppSelector(state => state.Faq.allFaq);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllFaq());
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={classNames(styles.title, global.h2)}>FAQ</div>
        <div className={styles.quetionsBlock}>
          {faq.map((item, index) => (
            <QuetionItem key={index} text={item.title} answ={item.description} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default FAQblock