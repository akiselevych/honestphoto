"use client"
//libs
import {useForm} from "react-hook-form";
import {LoginFormInputs} from "@/types";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {useEffect, useState} from "react";
//styles
import styles from './styles.module.scss'
import global from '@/styles/global.module.scss'
//redux
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {loginUser} from "@/redux/slices/Login.slice";
//images
import show from '../../../public/images/icons/showed.svg'
import hide from '../../../public/images/icons/hidden.svg'
//components
import Spinner from "@/components/Spinner/Spinner";

const LoginForm = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [isShow, setIsShow] = useState<boolean>(false);
    const errorMessage = useAppSelector((state) => state.Login.isLoginError)
    const loading = useAppSelector((state) => state.Login.isLoginLoading)

    useEffect(() => {
        if (!loading && localStorage.getItem("accessHonestPhoto") != null){
            router.push("/admin");
        }
        // eslint-disable-next-line
    }, [loading]);

    const {
        register,
        handleSubmit,
        formState: {isValid},
        reset
    } = useForm<LoginFormInputs>()


    const submitForm = (data: LoginFormInputs) => {
        dispatch(loginUser(data));
    }
    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
                <div className={styles.inputWrapper}>
                    <label className={`${styles.label} ${global.body3}`}>Login</label>
                    <input type="text" className={styles.input} {...register("username", {required: true})}/>
                </div>

                <div className={styles.inputWrapper}>
                    <label className={`${styles.label} ${global.body3}`}>Password</label>
                    <input type={isShow ? "text" : "password"} className={styles.input} {...register("password", {required: true})} />
                    <Image onClick={() => setIsShow(!isShow)} src={isShow ? show : hide} alt={"Show password"} className={styles.showIcon}/>
                </div>

                {loading? <Spinner/> : <button className={styles.submitBtn} type={"submit"} disabled={!isValid}>Sign in</button>}
                {errorMessage && <div className={styles.error}>Something went wrong. Try again !</div>}
            </form>
        </div>
    );
};

export default LoginForm;
