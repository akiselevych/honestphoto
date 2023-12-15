//libs
import { FC, useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThunkAction } from "redux-thunk";
import { Action, AnyAction } from "redux";
//types
import { RootState, T } from "@/types";
//styles
import styles from "./styles.module.scss";
import global from "@/styles/global.module.scss";
//redux
import { useAppDispatch} from "@/redux/hooks";

type SomeActionType = {
  type: string;
  payload: any;
  meta: {
    requestStatus: string;
  };
};

type Props = {
  item: T;
  deleteAction?: (
    id: number
  ) => ThunkAction<Promise<SomeActionType>, RootState, unknown, Action<string>>;
};
const PhotoshootCard: FC<Props> = ({ item, deleteAction }) => {
  const [deleteStatus, setDeleteStatus] = useState<string>("initial");
  const dispatch = useAppDispatch();
  const path = usePathname();
  const handleDelete = (id: number) => {
    if (deleteAction) {
      dispatch(deleteAction(id)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          setDeleteStatus("rejected");
        }
      });
    }
  };
  const handleUrlForEdit = () => `/admin/${path.split("/").at(-1)}/${item.id}`;
  return (
    <div className={styles.container}>
      {item.image && (
        <div className={styles.imageWrapper}>
          {item.name && (
            <div className={`${global.h5} ${styles.name}`}>{item.name}</div>
          )}
          <Image
            width={498}
            height={312}
            src={item.image as StaticImageData}
            alt={"item"}
            className={styles.image}
          />
        </div>
      )}
      <div className={`${styles.content} ${!item.image ? styles.review : ""}`}>
        <div className={`${!item.image ? styles.reviewText : ""}`}>
          <h3
            className={`${!item.image ? styles.reviewTitle : ""}} ${
              global.h5
            } ${styles.title}`}
          >
            {item.title}
          </h3>
          <p
            className={`${styles.desc} ${
              !item.image ? styles.reviewDesc : ""
            }}`}
          >
            {item?.description}
          </p>
          <div className={styles.additionalInfo}>
            <p className={`${global.body2} ${styles.info}`}>
              {item.price}{" "}
              <span className={styles.old_price}>{item?.old_price}</span>
            </p>
            <p className={`${global.body2} ${styles.info}`}>{item?.date}</p>
          </div>
        </div>
        <div className={styles.btnContainer}>
          <Link
            href={handleUrlForEdit()}
            className={`${styles.btn} ${styles.editBtn}`}
          >
            Edit
          </Link>
          {deleteAction && deleteStatus === "initial" && (
            <div
              className={`${styles.btn} ${styles.deleteBtn}`}
              onClick={() => handleDelete(item.id!)}
            >
              Delete
            </div>
          )}
          {deleteStatus === "rejected" && (
            <p className={styles.error}>
              Something went wrong,please, reload this page and try again !
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoshootCard;
