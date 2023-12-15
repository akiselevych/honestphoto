//libs
import Link from 'next/link';
import classNames from 'classnames';
//styles
import styles from './styles.module.scss';
import global from '@/styles/global.module.scss';


const Footer = () => {
    return (
        <footer className={styles.container}>
            <div className={styles.content}>
                <Link className={classNames(styles.logo, global.h5)} href="/">
                    HONEST PHOTOGRAPHY
                </Link>
                <div className={styles.contactBlock}>
                    <a className={classNames(global.body3, styles.contactLink)} href="mailto:info@mysite.com">info@mysite.com</a>
                    <a className={classNames(global.body3, styles.contactLink)} href="tel:+4971313829180">+4971313829180</a>
                </div>
                <p className={classNames(global.body3, styles.footerText)}>2023 © Honest Photography All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer