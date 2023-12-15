"use client"
//libs
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import classNames from 'classnames';
import {useTranslation} from "@/app/i18n/client";
//styles
import styles from './styles.module.scss';
import global from '@/styles/global.module.scss';


const pages = [
  { name: 'Home', path: '/',lng:'menuHomeLink' },
  { name: 'Prices', path: '/prices',lng:'menuPriceLink' },
  { name: 'Portfolio', path: '/portfolio',lng:'menuPortfolioLink' },
  { name: 'Contacts', path: '/contacts',lng:'menuContactsLink' },
];

const Menu = ({ BGcolor, lng }: { BGcolor: "light" | "dark", lng: string }) => {
  const {t} = useTranslation(lng);
  const pathName = usePathname();
  const pathNames = pathName.split("/");
  const handleColorStyle = () => {
    if (pathNames.at(-1) == "en" || pathNames.at(-1) == "es" || pathNames.at(-1) == "ua") return styles.grayColor
    if (pathNames.at(-1) == "prices") return styles.blackColor
    if (pathNames.at(-1) == "portfolio") return styles.blackColor
    if (pathNames.at(-1) == "contacts") return styles.blackColor
  }
  const handlePath = (page: any) => {
    return pathNames.at(-1) === page.path.split("/").at(-1) || (page.path === "/" && pathName.length <= 4)
  }

  return (
    <nav className={styles.container}>
      {pages.map((page, index) => (
        <Link
          href={page.path}
          key={index}
          className={classNames(
            BGcolor === "dark" ? styles.item : styles.BDBDBD,
            global.body3,
            handlePath(page) && handleColorStyle()
          )}>
          {t(page.lng)}
        </Link>
      ))}
    </nav>
  );
};

export default Menu;
