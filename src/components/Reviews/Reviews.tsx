'use client'
//libs
// @ts-ignore
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import {useEffect} from "react";
//styles
import styles from './styles.module.scss'
import global from '@/styles/global.module.scss'
//redux
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {fetchAllReviews} from "@/redux/slices/Reviews.slice";



const Reviews = () => {
  const reviews = useAppSelector(state => state.Reviews.allReviews);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllReviews());
  }, []);
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        {reviews.length > 0 && <Splide options={{rewind: true, type: 'loop'}}>
          {reviews.map((review, index) => (
              <SplideSlide key={index}>
                <article className={styles.reviewCard}>
                  <p className={`${global.body2} ${styles.name}`}>{review.title}</p>
                  <hr className={styles.line}/>
                  <p className={`${global.body2} ${styles.text}`}>{review.description}</p>
                </article>
              </SplideSlide>
          ))}
        </Splide>}
      </div>
    </section>
  );
};

export default Reviews;
