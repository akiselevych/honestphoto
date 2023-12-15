'use client'
//libs
import Image from "next/image";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
//styles
import styles from './styles.module.scss'
//components
import AdminTopBar from "@/components/AdminTopBar/AdminTopBar";
import AdminSpinner from "@/components/AdminSpinner/AdminSpinner";
//images
import success from '../../../../../../public/images/icons/success.svg'
//types
import {FAQ} from "@/types";
//redux
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {
    createFaq,
    fetchOneFaq, resetCurrentFaq,
    setCreatingStatus, setUpdatingStatus, updateFaq
} from "@/redux/slices/Faq.slice";
//utils
import {withAuth} from "@/utils/AuthWrapper";








interface Params{
    params: {id: string}
}
const AddNewPage = ({params: {id}} : Params) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const faq = useAppSelector((state) => state.Faq.allFaq);
    const creatingStatus = useAppSelector((state) => state.Faq.creatingStatus);
    const updateStatus = useAppSelector((state) => state.Faq.editingStatus);
    const fetchCurrentStatus = useAppSelector((state) => state.Faq.fetchOneFaqStatus);
    const currentFaq = useAppSelector((state) => state.Faq.currentFaq);



    useEffect(() => {
        if (id !== "new"){
            dispatch(fetchOneFaq(parseInt(id)));
        }
        return () => {
            if (id !== "new"){
                dispatch(resetCurrentFaq());
            }
        }
    }, []);

    useEffect(() => {
        setValue("title",currentFaq?.title);
        setValue("description",currentFaq?.description);
    }, [currentFaq]);

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        reset,
        formState: { isValid,errors }
    } = useForm<Partial<FAQ>>()


    const submitHandler = (data: any) => {
        console.log(data)
        if (id === "new"){
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("description", data.description);
            dispatch(createFaq(formData))
                .then((res) => {
                    if (res.meta.requestStatus === "fulfilled"){
                        reset();
                        setTimeout(() => {
                            dispatch(setCreatingStatus("initial"))
                        },1000)
                        setTimeout(() => {
                            router.back();
                        },1000)
                    }
                })
        } else {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("description", data.description);
            dispatch(updateFaq({data: formData, id: parseInt(id)}))
                .then((res) => {
                    if (res.meta.requestStatus === "fulfilled"){
                        reset();
                        setTimeout(() => {
                            dispatch(setUpdatingStatus("initial"))
                        },1000)
                        setTimeout(() => {
                            router.back();
                        },1000)
                    }
                })
        }
    }
    const handleInitial = () => creatingStatus === "initial" && fetchCurrentStatus === "initial" && updateStatus === "initial"
    const handlePending = () => creatingStatus === "pending" || fetchCurrentStatus === "pending" || updateStatus === "pending"
    const handleRejected = () => creatingStatus === "rejected" || fetchCurrentStatus === "rejected" || updateStatus === "rejected"
    const handleSuccess = () => creatingStatus === "success" || updateStatus === "success"
    return (
        <div className={styles.container}>
            <AdminTopBar page={"faq"}/>
            <div className={styles.item}>
                <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
                    <div className={styles.content}>
                        <div className={styles.left}>
                            <div className={styles.inputWrapper}>
                                <label className={`${styles.label}`}>Title</label>
                                <input placeholder={"Enter the title"} {...register("title", { required: true })} className={styles.input} type="text" />
                            </div>
                            <div className={styles.inputWrapper}>
                                <label className={`${styles.label}`}>Description</label>
                                <textarea placeholder={"Enter the description"} {...register("description", { required: true })} className={styles.input} rows={5} />
                            </div>
                        </div>
                    </div>
                    {handleInitial() && <button disabled={!isValid} type={"submit"} className={styles.submitBtn}>{id === "new" ? "Create" : "Edit"}</button>}
                    {handlePending() && <div className={styles.spinnerWrapper}><AdminSpinner/></div>}
                    {handleSuccess() && <Image src={success} alt={"success icon"} className={styles.success}/>}
                    {handleRejected() &&  <p className={styles.error}>Something went wrong,please, reload this page and try again !</p>}
                </form>
            </div>
        </div>
    );
};

export default withAuth(AddNewPage);
