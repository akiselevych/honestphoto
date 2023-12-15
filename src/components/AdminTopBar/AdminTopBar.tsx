//libs
import {usePathname} from "next/navigation";
import classNames from "classnames"
import Link from 'next/link'
import Image from 'next/image'
import {FC} from 'react'
//styles
import styles from './styles.module.scss'
//images
import addIcon from "../../../public/images/icons/addIcon.svg"
import backIcon from "../../../public/images/icons/backArrow.svg"

interface Props {
    page: "hero" | "types-of-photoshoot" | "locations-for-photoshoot" | "art-photoshoot" | "my-portfolio" | "prices"  | "reviews" | "faq";
    isSpecial?: boolean;
}

const AdminTopBar: FC<Props> = ({page}) => {
    const path = usePathname();
    const createHandler = () => {
        if (page === "types-of-photoshoot") return ["Create new photoshoot:", "Edit photoshoot"];
        if (page === "prices") return ["Create new photoshoot:", "Edit photoshoot"];
        if (page === "hero") return ["Create new hero:", "Edit hero"];
        if (page === "locations-for-photoshoot") return ["Create new location", "Edit location"];
        if (page === "art-photoshoot") return ["Create new art photoshoot", "Edit art photoshoot"];
        if (page === "my-portfolio") return ["Add new project to portfolio", "Edit portfolio project"];
        if (page === "reviews") return ["Add new review", "Edit review"];
        if (page === "faq") return ["Add new faq", "Edit faq"];
    }
    return (
        <div className={styles.topBlock}>
            <div className={styles.header}>
                <h1 className={styles.title}>
                    {path.split("/").at(-1) === "new" ? createHandler()![0] : createHandler()![1]}
                </h1>
                {page !== "hero" && path.split("/").at(-1) !== page
                    ? <Link href={`/admin/${page}`} className={styles.addBtn}>
                        <Image src={backIcon} alt={"back icon"} className={styles.icon}/>
                        <div className={styles.addText}>Back</div>
                    </Link>
                    : <Link href={`/admin/${page}/new`} className={styles.addBtn}>
                            <Image src={addIcon} alt={"add icon"} className={styles.icon}/>
                            <div className={styles.addText}>Add new</div>
                        </Link>
                }
            </div>

            <div className={styles.toolBar}>
                <div className={styles.pagePicker}>
                    <Link className={classNames(styles.link, page === "hero" ? styles.active : '')}
                          href={"/admin/hero"}>Hero</Link>
                    <span></span>
                    <Link className={classNames(styles.link, page === "types-of-photoshoot" ? styles.active : '')}
                          href={"/admin/types-of-photoshoot"}>Types of photoshoot</Link>
                    <span></span>
                    <Link className={classNames(styles.link, page === "locations-for-photoshoot" ? styles.active : '')}
                          href={"/admin/locations-for-photoshoot"}>Locations for a photoshoot</Link>
                    <span></span>
                    <Link className={classNames(styles.link, page === "art-photoshoot" ? styles.active : '')}
                          href={"/admin/art-photoshoot"}>Art photoshoot</Link>
                    <span></span>
                    <Link className={classNames(styles.link, page === "my-portfolio" ? styles.active : '')}
                          href={"/admin/my-portfolio"}>My portfolio</Link>
                    <span></span>
                    <Link className={classNames(styles.link, page === "prices" ? styles.active : '')}
                          href={"/admin/prices"}>Prices</Link>
                    <span></span>
                    <Link className={classNames(styles.link, page === "reviews" ? styles.active : '')}
                          href={"/admin/reviews"}>Reviews</Link>
                    <span></span>
                    <Link className={classNames(styles.link, page === "faq" ? styles.active : '')}
                          href={"/admin/faq"}>Faq</Link>
                </div>
            </div>
        </div>
    )
}

export default AdminTopBar;