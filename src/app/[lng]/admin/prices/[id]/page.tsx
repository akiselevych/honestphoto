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
import left from '../../../../../../public/images/icons/left.svg'
import rightdown from '../../../../../../public/images/icons/rightdown.svg'
import leftdown from '../../../../../../public/images/icons/leftdown.svg'
import right from '../../../../../../public/images/icons/right.svg'
//types
import {DefaultPhotoshoot} from "@/types";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
//redux
import {
    createPrice,
    fetchOnePrice, resetCurrentPrice,
    setCreatingStatus,
    setUpdatingStatus, updatePrice,
} from "@/redux/slices/Prices.slice";
//utils
import {withAuth} from "@/utils/AuthWrapper";


interface Params {
    params: { id: string }
}

const AddNewPage = ({params: {id}}: Params) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const prices = useAppSelector((state) => state.Prices.allPrices);
    const creatingStatus = useAppSelector((state) => state.Prices.creatingStatus);
    const updateStatus = useAppSelector((state) => state.Prices.editingStatus);
    const fetchCurrentStatus = useAppSelector((state) => state.Prices.fetchOnePriceStatus);
    const currentPrice = useAppSelector((state) => state.Prices.currentPrice);
    const [fileInputValue, setFile] = useState<File | undefined>(undefined);
    const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);
    const [orientation, setOrientation] = useState<number | null>(null);

    useEffect(() => {
        if (id !== "new") {
            dispatch(fetchOnePrice(parseInt(id)));
        }
        return () => {
            if (id !== "new") {
                dispatch(resetCurrentPrice());
            }
        }
    }, []);

    useEffect(() => {
        setValue(`title`, currentPrice?.title);
        setValue(`price`, currentPrice?.price);
        setPreviewPhoto(currentPrice?.image as string);
        setOrientation(currentPrice?.style_variant!);
        setValue(`style_variant`, currentPrice?.style_variant);
    }, [currentPrice]);

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        reset,
        trigger,
        formState: {isValid, errors}
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
        : id !== "new" && prices.length && prices.find(item => item.id == id) ? prices.find(item => item.id == id)?.image_name : 'Select file'

    const submitHandler = (data: any) => {
        console.log(data)
        if (id === "new") {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("price", data.price);
            formData.append("style_variant", data.style_variant);
            if (fileInputValue) formData.append("image", fileInputValue);
            dispatch(createPrice(formData))
                .then((res) => {
                    if (res.meta.requestStatus === "fulfilled") {
                        reset();
                        setFile(undefined);
                        setPreviewPhoto(null);
                        setTimeout(() => {
                            dispatch(setCreatingStatus("initial"))
                        }, 1000)
                        setTimeout(() => {
                            router.back();
                        }, 1000)
                    }
                })
        } else {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("price", data.price);
            formData.append("style_variant", data.style_variant);
            if (fileInputValue) formData.append("image", fileInputValue);
            dispatch(updatePrice({data: formData, id: parseInt(id)}))
                .then((res) => {
                    if (res.meta.requestStatus === "fulfilled") {
                        reset();
                        setFile(undefined);
                        setPreviewPhoto(null);
                        setTimeout(() => {
                            dispatch(setUpdatingStatus("initial"))
                        }, 1000)
                        setTimeout(() => {
                            router.back();
                        }, 1000)
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
            <AdminTopBar page={"prices"}/>
            <div className={styles.item}>
                <div className={styles.imageWrapper}>
                    <Image src={previewPhoto || empty} alt={"Empty"} width={820} height={376} className={styles.image}/>
                </div>
                <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
                    <div className={styles.content}>
                        <div className={styles.left}>
                            <div className={styles.inputWrapper}>
                                <label className={`${styles.label}`}>Title</label>
                                <input placeholder={"Enter the title"} {...register("title", {required: true})}
                                       className={styles.input} type="text"/>
                            </div>
                            <div className={styles.inputWrapper}>
                                <label className={`${styles.label}`}>Price</label>
                                <input placeholder={"Enter the price"} {...register("price", {required: true})}
                                       className={styles.input} type="text"/>
                            </div>
                        </div>
                        <div className={styles.right}>
                            <div className={styles.picker}>
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
                            <div className={styles.orientation}>
                                <h4 className={styles.title}>Select the orientation:</h4>
                                <div className={styles.selects}>
                                    <div className={`${styles.select} ${orientation === 1 ? styles.selected : ''}`} onClick={() => {
                                        setValue("style_variant", 1)
                                        setOrientation(1)
                                        trigger()
                                    }}>
                                        <Image src={left} alt={"Orientation"}/>
                                    </div>
                                    <div className={`${styles.select} ${orientation === 2 ? styles.selected : ''}`} onClick={() => {
                                        setValue("style_variant", 2)
                                        setOrientation(2)
                                        trigger()
                                    }}>
                                        <Image src={leftdown} alt={"Orientation"}/>
                                    </div>
                                    <div className={`${styles.select} ${orientation === 4 ? styles.selected : ''}`} onClick={() => {
                                        setValue("style_variant", 4)
                                        setOrientation(4)
                                        trigger()
                                    }}>
                                        <Image src={right} alt={"Orientation"}/>
                                    </div>
                                    <div className={`${styles.select} ${orientation === 3 ? styles.selected : ''}`} onClick={() => {
                                        setValue("style_variant", 3)
                                        setOrientation(3)
                                        trigger()
                                    }}>
                                        <Image src={rightdown} alt={"Orientation"}/>
                                    </div>
                                    <input style={{display: "none"}} type="number"  {...register("style_variant", { required: true })} />
                                </div>
                            </div>
                        </div>
                    </div>
                    {handleInitial() && <button disabled={!isValid} type={"submit"}
                                                className={styles.submitBtn}>{id === "new" ? "Create" : "Edit"}</button>}
                    {handlePending() && <div className={styles.spinnerWrapper}><AdminSpinner/></div>}
                    {handleSuccess() && <Image src={success} alt={"success icon"} className={styles.success}/>}
                    {handleRejected() &&
                        <p className={styles.error}>Something went wrong,please, reload this page and try again !</p>}
                </form>
            </div>
        </div>
    );
};

export default withAuth(AddNewPage);
