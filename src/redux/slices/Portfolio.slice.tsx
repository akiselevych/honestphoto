import { PortfolioPhotoshoot } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { adminInstance, guestInstance } from "@/redux/API";

export enum Status {
  Initial = "initial",
  Pending = "pending",
  Success = "success",
  Rejected = "rejected",
}

type InitialStateType = {
  allPortfolioPhoto: PortfolioPhotoshoot[];
  currentPortfolioPhoto: PortfolioPhotoshoot | null;
  fetchStatus: Status;
  fetchOnePortfolioPhotoStatus: string;
  creatingStatus: Status;
  editingStatus: Status;
  deletingStatus: Status;
};

const initialState: InitialStateType = {
  allPortfolioPhoto: [],
  currentPortfolioPhoto: null,
  fetchOnePortfolioPhotoStatus: Status.Initial,
  fetchStatus: Status.Initial,
  creatingStatus: Status.Initial,
  editingStatus: Status.Initial,
  deletingStatus: Status.Initial,
};

export const fetchAllPortfolioPhoto = createAsyncThunk(
  "portfolio/PortfolioPhoto",
  async () => {
    const response = await guestInstance.get("/portfolio-photoshoots/");
    return await response.data;
  }
);
export const fetchOnePortfolioPhoto = createAsyncThunk(
  "portfolio/fetchOnePortfolioPhoto",
  async (id: number) => {
    const response = await guestInstance.get(`/portfolio-photoshoots/${id}`);
    return await response.data;
  }
);
export const createPortfolioPhoto = createAsyncThunk(
  "portfolio/createPortfolioPhoto",
  async (data: FormData) => {
    const response = await adminInstance.post("/portfolio-photoshoots/", data);
    return await response.data;
  }
);
export const updatePortfolioPhoto = createAsyncThunk(
  "portfolio/updatePortfolioPhoto",
  async ({ id, data }: { data: FormData; id: number }) => {
    const response = await adminInstance.patch(
      `/portfolio-photoshoots/${id}/`,
      data
    );
    return await response.data;
  }
);

export const updatePortfolioOrder = createAsyncThunk(
  "portfolio/updatePortfolioOrder",
  async (data: {
    dragItem: {
      id: number;
      order: number;
    };
    hoverItem: {
      id: number;
      order: number;
    };
  }) => {
    const { dragItem, hoverItem } = data;

    const draggedFormData = new FormData();
    draggedFormData.append("order", dragItem.order.toString());

    const hoveredFormData = new FormData();
    hoveredFormData.append("order", hoverItem.order.toString());

    const draggedItemResponse = await adminInstance.patch(
      `/portfolio-photoshoots/${dragItem.id}/`,
      hoveredFormData
    );

    const hoveredItemResponse = await adminInstance.patch(
      `/portfolio-photoshoots/${hoverItem.id}/`,
      draggedFormData
    );

    const response = await guestInstance.get("/portfolio-photoshoots/");
    return await response.data;
  }
);

export const deletePortfolioPhoto = createAsyncThunk(
  "portfolio/deletePortfolioPhoto",
  async (id: number) => {
    const response = await adminInstance.delete(
      `/portfolio-photoshoots/${id}/`
    );
    return id;
  }
);
export const Portfolio = createSlice({
  name: "Portfolio",
  initialState,
  reducers: {
    setCreatingStatus: (state, { payload }) => {
      state.creatingStatus = payload;
    },
    setUpdatingStatus: (state, { payload }) => {
      state.editingStatus = payload;
    },
    resetCurrentPortfolioPhoto: (state) => {
      state.currentPortfolioPhoto = null;
    },
  },
  extraReducers(builder) {
    //Fetch All photoshoots
    builder.addCase(fetchAllPortfolioPhoto.pending, (state, { payload }) => {
      state.fetchStatus = Status.Pending;
    });
    builder.addCase(fetchAllPortfolioPhoto.fulfilled, (state, { payload }) => {
      state.fetchStatus = Status.Initial;
      state.allPortfolioPhoto = payload;
    });
    builder.addCase(fetchAllPortfolioPhoto.rejected, (state, { payload }) => {
      state.fetchStatus = Status.Rejected;
    });
    //Fetch One photoshoot
    builder.addCase(fetchOnePortfolioPhoto.pending, (state, { payload }) => {
      state.fetchOnePortfolioPhotoStatus = Status.Pending;
    });
    builder.addCase(fetchOnePortfolioPhoto.fulfilled, (state, { payload }) => {
      state.fetchOnePortfolioPhotoStatus = Status.Initial;
      state.currentPortfolioPhoto = payload;
    });
    builder.addCase(fetchOnePortfolioPhoto.rejected, (state, { payload }) => {
      state.fetchOnePortfolioPhotoStatus = Status.Rejected;
    });
    //Create new photoshoot
    builder.addCase(createPortfolioPhoto.pending, (state, { payload }) => {
      state.creatingStatus = Status.Pending;
    });
    builder.addCase(createPortfolioPhoto.fulfilled, (state, { payload }) => {
      state.creatingStatus = Status.Pending;
      state.allPortfolioPhoto = [...state.allPortfolioPhoto, payload];
    });
    builder.addCase(createPortfolioPhoto.rejected, (state, { payload }) => {
      state.creatingStatus = Status.Rejected;
    });
    //Edit photoshoot
    builder.addCase(updatePortfolioPhoto.pending, (state, { payload }) => {
      state.editingStatus = Status.Pending;
    });
    builder.addCase(updatePortfolioPhoto.fulfilled, (state, { payload }) => {
      state.editingStatus = Status.Success;
    });
    builder.addCase(updatePortfolioPhoto.rejected, (state, { payload }) => {
      state.editingStatus = Status.Rejected;
    });
    //Edit order
    builder.addCase(updatePortfolioOrder.pending, (state, { payload }) => {
      state.editingStatus = Status.Pending;
    });
    builder.addCase(updatePortfolioOrder.fulfilled, (state, { payload }) => {
      state.editingStatus = Status.Success;
      state.allPortfolioPhoto = [...payload];
    });
    builder.addCase(updatePortfolioOrder.rejected, (state, { payload }) => {
      state.editingStatus = Status.Rejected;
    });
    //Delete photoshoot
    builder.addCase(deletePortfolioPhoto.pending, (state, { payload }) => {
      state.deletingStatus = Status.Pending;
    });
    builder.addCase(deletePortfolioPhoto.fulfilled, (state, { payload }) => {
      state.deletingStatus = Status.Success;
      state.allPortfolioPhoto = state.allPortfolioPhoto.filter(
        (el) => el.id !== payload
      );
    });
    builder.addCase(deletePortfolioPhoto.rejected, (state, { payload }) => {
      state.deletingStatus = Status.Rejected;
    });
  },
});

const { reducer, actions } = Portfolio;

export const {
  setUpdatingStatus,
  setCreatingStatus,
  resetCurrentPortfolioPhoto,
} = actions;
export default reducer;
