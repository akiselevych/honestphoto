'use client'
//libs
import { useRef } from "react";
import { usePathname } from "next/navigation";
//styles
import styles from "@/styles/mainPage.module.scss";
//components
import ContactForm from "@/components/ContactForm/ContactForm";
import NotFoundPage from "@/app/[lng]/[...notFound]/page";


const Page = () => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const pathName = usePathname();
  const typeOfForm = () => {
    const pathNames = pathName.split("/")
    if (pathNames.at(-1) == "get-in-touch") return "default"
    if (pathNames.at(-1) == "book-consultation") return "book-consultation"
    if (pathNames.at(-1) == "book-consultation-cities") return "book-consultation-cities"
  }
  return (
    <>
      {typeOfForm() && <ContactForm overlayRef={overlayRef} getInTouch={typeOfForm() == "default"}
        cities={typeOfForm() != "default" && typeOfForm() == "book-consultation-cities"} />}
      {typeOfForm() && <div ref={overlayRef} className={styles.overlay}></div>}
      {!typeOfForm() && <NotFoundPage />}
    </>
  );
};

export default Page;
