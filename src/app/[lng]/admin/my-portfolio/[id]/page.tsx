"use client";
//libs
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
//styles
import styles from "./styles.module.scss";
//components
import AdminTopBar from "@/components/AdminTopBar/AdminTopBar";
import AdminSpinner from "@/components/AdminSpinner/AdminSpinner";
//images
import empty from "../../../../../../public/images/empty.png";
import imageIcon from "../../../../../../public/images/icons/photoIcon.svg";
import success from "../../../../../../public/images/icons/success.svg";
//types
import { PortfolioPhotoshoot } from "@/types";
//redux
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  createPortfolioPhoto,
  fetchOnePortfolioPhoto,
  resetCurrentPortfolioPhoto,
  setCreatingStatus,
  setUpdatingStatus,
  updatePortfolioPhoto,
} from "@/redux/slices/Portfolio.slice";
//utils
import { withAuth } from "@/utils/AuthWrapper";


interface Params {
  params: { id: string };
}
const AddNewPage = ({ params: { id } }: Params) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const portfolio = useAppSelector(
    (state) => state.Portfolio.allPortfolioPhoto
  );
  const creatingStatus = useAppSelector(
    (state) => state.Portfolio.creatingStatus
  );
  const updateStatus = useAppSelector((state) => state.Portfolio.editingStatus);
  const fetchCurrentStatus = useAppSelector(
    (state) => state.Portfolio.fetchOnePortfolioPhotoStatus
  );
  const currentPortfolioProject = useAppSelector(
    (state) => state.Portfolio.currentPortfolioPhoto
  );
  const [fileInputValue, setFile] = useState<File | undefined>(undefined);
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);

  useEffect(() => {
    if (id !== "new") {
      dispatch(fetchOnePortfolioPhoto(parseInt(id)));
    }
    return () => {
      if (id !== "new") {
        dispatch(resetCurrentPortfolioPhoto());
      }
    };
  }, []);

  useEffect(() => {
    setPreviewPhoto(currentPortfolioProject?.image as string);
  }, [currentPortfolioProject]);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { isValid, errors },
  } = useForm<Partial<PortfolioPhotoshoot>>();
  const onFileChange = (e: any) => {
    setFile(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewPhoto(reader.result as string);
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const fileInputLabel =
    fileInputValue && fileInputValue.name
      ? fileInputValue.name
      : 
      id !== "new" &&
        portfolio.length &&
        //@ts-ignore
        portfolio.find((item) => item.id == id)
        //@ts-ignore
      ? portfolio.find((item) => item.id == id)?.image_name
      : "Select file";

  const submitHandler = (data: any) => {
    console.log(data);
    if (id === "new") {
      const formData = new FormData();
      if (fileInputValue) formData.append("image", fileInputValue);
      dispatch(createPortfolioPhoto(formData)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          reset();
          setFile(undefined);
          setPreviewPhoto(null);
          setTimeout(() => {
            dispatch(setCreatingStatus("initial"));
          }, 1000);
          setTimeout(() => {
            router.back();
          }, 1000);
        }
      });
    } else {
      const formData = new FormData();
      if (fileInputValue) formData.append("image", fileInputValue);
      dispatch(updatePortfolioPhoto({ data: formData, id: parseInt(id) })).then(
        (res) => {
          if (res.meta.requestStatus === "fulfilled") {
            reset();
            setFile(undefined);
            setPreviewPhoto(null);
            setTimeout(() => {
              dispatch(setUpdatingStatus("initial"));
            }, 1000);
            setTimeout(() => {
              router.back();
            }, 1000);
          }
        }
      );
    }
  };
  const handleInitial = () =>
    creatingStatus === "initial" &&
    fetchCurrentStatus === "initial" &&
    updateStatus === "initial";
  const handlePending = () =>
    creatingStatus === "pending" ||
    fetchCurrentStatus === "pending" ||
    updateStatus === "pending";
  const handleRejected = () =>
    creatingStatus === "rejected" ||
    fetchCurrentStatus === "rejected" ||
    updateStatus === "rejected";
  const handleSuccess = () =>
    creatingStatus === "success" || updateStatus === "success";
  return (
    <div className={styles.container}>
      <AdminTopBar page={"my-portfolio"} />
      <div className={styles.item}>
        <div className={styles.imageWrapper}>
          <Image
            src={previewPhoto || empty}
            alt={"Empty"}
            width={820}
            height={376}
            className={styles.image}
          />
        </div>
        <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
          <div className={styles.content}>
            <div className={styles.right}>
              <h4 className={styles.title}>Photo:</h4>
              <label
                htmlFor={"imageUpload"}
                className={styles.pickedFileWrapper}
              >
                <Image src={imageIcon} alt={"Icon"} />
                <p className={styles.pickedFileName}>{fileInputLabel}</p>
              </label>
              <input
                style={{ display: "none" }}
                id={"imageUpload"}
                hidden
                {...register("image", {
                  required: true,
                  onChange: (e) => onFileChange(e),
                })}
                type="file"
              />
            </div>
          </div>
          {handleInitial() && (
            <button
              disabled={!isValid}
              type={"submit"}
              className={styles.submitBtn}
            >
              {id === "new" ? "Create" : "Edit"}
            </button>
          )}
          {handlePending() && (
            <div className={styles.spinnerWrapper}>
              <AdminSpinner />
            </div>
          )}
          {handleSuccess() && (
            <Image
              src={success}
              alt={"success icon"}
              className={styles.success}
            />
          )}
          {handleRejected() && (
            <p className={styles.error}>
              Something went wrong,please, reload this page and try again !
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default withAuth(AddNewPage);
