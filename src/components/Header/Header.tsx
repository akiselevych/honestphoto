"use client"
import Link from "next/link"
import {useState} from "react"
import classNames from "classnames"
import Image from "next/image"
import {usePathname} from "next/navigation";
//styles
import styles from "./styles.module.scss"
import global from "@/styles/global.module.scss"
//images
import arrow from "public/images/icons/dropdownArrw.svg"
import blackArrow from "public/images/icons/blackDropdownArrw.svg"

const localesData = ["En", "Es", "Ua"]

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const pathname = usePathname();

    const selectedIndex = localesData.map(l => l.toLowerCase()).indexOf(pathname.split("/")[1]);

    const handleColorStyle = () => {
        const pathNames = pathname.split("/");
        if (pathNames.at(-1) == "en" || pathNames.at(-1) == "es" || pathNames.at(-1) == "ua") return styles.grayColor;
        if (pathNames.at(-1) == "prices") return styles.blackColor;
        if (pathNames.at(-1) == "portfolio") return styles.blackColor;
        if (pathNames.at(-1) == "contacts") return styles.blackColor;
    }

    return (
        <header className={styles.container}>
            <Link className={classNames(styles.logo, global.h5, handleColorStyle())} href="/">
                HONEST PHOTOGRAPHY
            </Link>
            <div className={styles.langPickerDesctop}>
                {selectedIndex > -1 && (
                    <div className={classNames(styles.localeItem, handleColorStyle())}>
                        {localesData[selectedIndex]}
                    </div>
                )}
                {localesData.map((l, i) => {
                    if (i === selectedIndex) {
                        return null;
                    }
                    return (
                        <Link href={`/${l.toLowerCase()}/${pathname.slice(4)}`} key={i}
                              className={classNames(styles.localeItem)}>
                            {l}
                        </Link>
                    )
                })}
            </div>
            <div className={styles.langPickerMobile}>
                <div
                    onClick={() => setIsMenuOpen(prev => !prev)}
                    className={classNames(styles.currLocale, styles.localeItem, handleColorStyle())}>
                    <Image style={{transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)'}}
                           src={handleColorStyle() === styles.blackColor ? blackArrow : arrow}
                           alt="pick language"/>
                </div>

                {isMenuOpen && <div className={styles.dropdown}>
                    <div className={styles.localeItem}>UA</div>
                    <div className={styles.localeItem}>EN</div>
                    <div className={styles.localeItem}>ES</div>
                </div>}
            </div>
        </header>
    )
}

export default Header