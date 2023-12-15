"use client";

//components
import AdminTopBar from "@/components/AdminTopBar/AdminTopBar";
import Spinner from "@/components/Spinner/Spinner";
import PortfolioAdmin from "@/components/PortfolioAdmin/PortfolioAdmin";

//utils
import { withAuth } from "@/utils/AuthWrapper";
import { useEffect } from "react";

//redux
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  deletePortfolioPhoto,
  fetchAllPortfolioPhoto,
} from "@/redux/slices/Portfolio.slice";

//styles
import styles from "./styles.module.scss";

const AdminPage = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.Portfolio.allPortfolioPhoto);
  const fetchStatus = useAppSelector((state) => state.Portfolio.fetchStatus);
  const editingStatus = useAppSelector(
    (state) => state.Portfolio.editingStatus
  );

  useEffect(() => {
    dispatch(fetchAllPortfolioPhoto());
  }, []);

  return (
    <div className={styles.container}>
      <AdminTopBar page="my-portfolio" />
      <div className={styles.list}>
        {fetchStatus === "pending" && <Spinner />}
        {fetchStatus === "initial" && (
          <PortfolioAdmin
            editingStatus={editingStatus}
            items={items}
            deleteAction={deletePortfolioPhoto}
          />
        )}
      </div>
    </div>
  );
};

export default withAuth(AdminPage);
