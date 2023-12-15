'use client'
//libs
import {FC, RefObject, useState} from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
//styles
import styles from './styles.module.scss'
import global from '@/styles/global.module.scss'
//images
import closeIcon from 'public/images/icons/closeIcon.svg'
import successIcon from 'public/images/icons/success.svg'
//redux
import {guestInstance} from "@/redux/API";


interface IProps {
  overlayRef: RefObject<HTMLDivElement>,
  getInTouch: boolean,
  cities: boolean
}

const ContactForm: FC<IProps> = ({ overlayRef, getInTouch, cities }) => {
  const [status, setStatus] = useState("initial");
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { isValid }
  } = useForm();

  const submitHandler =  async (data: any) => {
    console.log(data);
    setStatus("pending");
    const postUrl = getInTouch ? '/send_email/get-in-touch/' : cities ? '/send_email/book-city-consultation/' : '/send_email/book-consultation/';
    const response  = await guestInstance.post(postUrl, JSON.stringify(data));
    if (response.status === 200) {
      setStatus("fulfilled");
      setTimeout(() => {
        setStatus("initial");
        router.push("/");
      },3000)
    } else {
      setStatus("rejected");
    }
  }


  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={`${global.h3} ${styles.title}`}>{getInTouch ? "Get in touch" : "Feel free to ask"}</h3>
          <Image width={16} height={16} src={closeIcon} alt={"Close banner"} onClick={() => router.push("/")} className={styles.closeBtn} />
        </div>
        <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
          <div className={styles.inputWrapper}>
            <label className={`${global.body3} ${styles.label}`}>First Name</label>
            <input {...register("first_name", { required: true })} className={styles.input} type="text" />
          </div>
          <div className={styles.inputWrapper}>
            <label className={`${global.body3} ${styles.label}`}>Last Name</label>
            <input {...register("last_name", { required: true })} className={styles.input} type="text" />
          </div>
          {!getInTouch && <div className={`${styles.inputWrapper}`}>
            <label className={`${global.body3} ${styles.label}`}>Instagram</label>
            <input {...register("instagram", { required: false })} className={styles.input} type="text" />
          </div>}
          <div className={`${getInTouch ? styles.email : ""} ${styles.inputWrapper}`}>
            <label className={`${global.body3} ${styles.label}`}>Email *</label>
            <input {...register("email", { required: true })} className={styles.input} type="email" />
          </div>
          {!getInTouch && <div className={`${styles.inputWrapper}`}>
            <label className={`${global.body3} ${styles.label}`}>Phone *</label>
            <input {...register("phone", { required: true })} className={styles.input} type="text" />
          </div>}
          {!getInTouch && <div className={`${styles.inputWrapper}`}>
            <label className={`${global.body3} ${styles.label}`}>How to contact you</label>
            <select {...register("contact_choice", { required: true })} className={`${styles.input}`} >
              <option value="">--Please choose an option--</option>
              <option value="email">Email</option>
              <option value="whatsapp">By phone number WhatsApp</option>
              <option value="instagram">Instagram</option>
            </select>
          </div>}

          {getInTouch && <div className={`${styles.message} ${styles.inputWrapper}`}>
            <label className={`${global.body3} ${styles.label}`}>Message</label>
            <textarea {...register("message", { required: true })} className={styles.input} />
          </div>}
          {cities && <div className={`${styles.inputWrapper}`}>
            <label className={`${global.body3} ${styles.label}`}>Cities *</label>
            <input {...register("cities", { required: true })} className={styles.input} type="text" />
          </div>}
          <div className={styles.buttom}>
            {status !== "fulfilled"
                &&
                <button
                    disabled={!isValid || status !== "initial"}
                    type={"submit"}

                    className={`${global.primaryButton} ${styles.submitbtn}`}
                >
                  {status === "pending" ? "Sending..." : "Send"}
                </button>
            }
            {status === "fulfilled" && <Image className={styles.success} src={successIcon} alt={"success"}/>}
            {status === "rejected" && <h2 className={styles.error}>Something went wrong. Please reload page and try again !</h2>}
          </div>
        </form>
      </div>
    </>

  );
};

export default ContactForm;
