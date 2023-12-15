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
import empty from '../../../../../../public/images/empty.png'
import imageIcon from '../../../../../../public/images/icons/photoIcon.svg'
import success from '../../../../../../public/images/icons/success.svg'
//types
import {DefaultPhotoshoot} from "@/types";
//redux
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {
    createPhotoshoot,
    fetchOnePhotoshoot, resetCurrentPhotoshoot,
    setCreatingStatus,
    setUpdatingStatus,
    updatePhotoshoot
} from "@/redux/slices/Types.slice";
//utils
import {withAuth} from "@/utils/AuthWrapper";






interface Params{
    params: {id: string}
}
const AddNewPage = ({params: {id}} : Params) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const types = useAppSelector((state) => state.Types.allPhotoshoots);
    const creatingStatus = useAppSelector((state) => state.Types.creatingStatus);
    const updateStatus = useAppSelector((state) => state.Types.editingStatus);
    const fetchCurrentStatus = useAppSelector((state) => state.Types.fetchOnePhotoshootStatus);
    const currentPhotoshoot = useAppSelector((state) => state.Types.currentPhotoshoot);
    const [fileInputValue, setFile] = useState<File | undefined>(undefined);
    const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);


    useEffect(() => {
        if (id !== "new"){
            dispatch(fetchOnePhotoshoot(parseInt(id)));
        }
        return () => {
            if (id !== "new"){
                dispatch(resetCurrentPhotoshoot());
            }
        }
    }, []);

    useEffect(() => {
        setValue(`title`, currentPhotoshoot?.title);
        setValue(`price`, currentPhotoshoot?.price);
        setValue(`width`, currentPhotoshoot?.width);
        setValue(`height`, currentPhotoshoot?.height);
        setPreviewPhoto(currentPhotoshoot?.image as string);
    }, [currentPhotoshoot]);

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        reset,
        formState: { isValid,errors }
    } = useForm<Partial<DefaultPhotoshoot>>()
    const onFileChange = (e: any) => {
        setFile(e.target.files[0]);
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewPhoto(reader.result as string);
        }
        reader.readAsDataURL(e.target.files[0]);
    }
    const fileInputLabel = fileInputValue && fileInputValue.name ? fileInputValue.name
        //@ts-ignore
        : id !== "new" && types.length && types.find(item => item.id == id) ? types.find(item => item.id == id)?.image_name : 'Select file'

    const submitHandler = (data: any) => {
        console.log(data)
        if (id === "new"){
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("price", data.price);
            formData.append("width", data.width);
            formData.append("height", data.height);
            if (fileInputValue) formData.append("image", fileInputValue);
            dispatch(createPhotoshoot(formData))
                .then((res) => {
                    if (res.meta.requestStatus === "fulfilled"){
                        reset();
                        setFile(undefined);
                        setPreviewPhoto(null);
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
            formData.append("price", data.price);
            formData.append("width", data.width);
            formData.append("height", data.height);
            if (fileInputValue) formData.append("image", fileInputValue);
            dispatch(updatePhotoshoot({data: formData, id: parseInt(id)}))
                .then((res) => {
                    if (res.meta.requestStatus === "fulfilled"){
                        reset();
                        setFile(undefined);
                        setPreviewPhoto(null);
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
            <AdminTopBar page={"types-of-photoshoot"}/>
            <div className={styles.item}>
                <div className={styles.imageWrapper}>
                    <Image src={previewPhoto || empty} alt={"Empty"} width={820} height={376} className={styles.image}/>
                </div>
                <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
                    <div className={styles.content}>
                        <div className={styles.left}>
                            <div className={styles.inputWrapper}>
                                <label className={`${styles.label}`}>Title</label>
                                <input placeholder={"Enter the title"} {...register("title", { required: true })} className={styles.input} type="text" />
                            </div>
                            <div className={styles.inputWrapper}>
                                <label className={`${styles.label}`}>Price</label>
                                <input placeholder={"Enter the price"} {...register("price", { required: true })} className={styles.input} type="text" />
                            </div>
                        </div>
                        <div className={styles.right}>
                            <h4 className={styles.title}>Photo:</h4>
                            <label htmlFor={"imageUpload"} className={styles.pickedFileWrapper}>
                                <Image src={imageIcon} alt={"Icon"}/>
                                <p className={styles.pickedFileName}>{fileInputLabel}</p>
                            </label>
                            <input
                                style={{ display: "none" }}
                                id={"imageUpload"}
                                hidden
                                {...register("image", { required: id === "new", onChange: (e) => onFileChange(e) })}
                                type="file" />
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
