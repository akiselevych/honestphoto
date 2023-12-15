import {PortfolioPhotoshoot, Review} from "@/types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {adminInstance, guestInstance} from "@/redux/API";

type InitialStateType = {
    allReviews: Review[],
    currentReview: Review | null,
    fetchStatus: string,
    fetchOneReviewStatus: string
    creatingStatus: string,
    editingStatus: string,
    deletingStatus: string
}
const initialState: InitialStateType = {
    allReviews: [],
    currentReview: null,
    fetchOneReviewStatus: "initial",
    fetchStatus: "initial",
    creatingStatus: "initial",
    editingStatus: "initial",
    deletingStatus: "initial"
}

export const fetchAllReviews = createAsyncThunk(
    "reviews/fetchAllReviews",
    async () => {
        const response = await guestInstance.get("/reviews/")
        return await response.data;
    }
)
export const fetchOneReview = createAsyncThunk(
    "reviews/fetchOneReview",
    async (id: number) => {
        const response = await guestInstance.get(`/reviews/${id}`)
        return await response.data;
    }
)
export const createReview = createAsyncThunk(
    "reviews/createReview",
    async (data: FormData) => {
        const response = await adminInstance.post("/reviews/", data);
        return await response.data;
    }
)
export const updateReview = createAsyncThunk(
    "reviews/updateReview",
    async ({id,data}:{data: FormData, id: number}) => {
        const response = await adminInstance.patch(`/reviews/${id}/`, data);
        return await response.data;
    }
)
export const deleteReview = createAsyncThunk(
    "reviews/deleteReview",
    async (id: number) => {
        const response = await adminInstance.delete(`/reviews/${id}/`);
        return id;
    }
)
export const Reviews = createSlice(
    {
        name: "Reviews",
        initialState,
        reducers: {
            setCreatingStatus: (state, {payload}) => {
                state.creatingStatus = payload;
            },
            setUpdatingStatus: (state, {payload}) => {
                state.editingStatus = payload;
            },
            resetCurrentReview: (state) => {
                state.currentReview = null;
            }
        },
        extraReducers(builder) {
            //Fetch All photoshoots
            builder.addCase(fetchAllReviews.pending, (state, {payload}) => {
                state.fetchStatus = "pending";
            })
            builder.addCase(fetchAllReviews.fulfilled, (state, {payload}) => {
                state.fetchStatus = "initial";
                state.allReviews = payload;
            })
            builder.addCase(fetchAllReviews.rejected, (state, {payload}) => {
                state.fetchStatus = "rejected";
            })
            //Fetch One photoshoot
            builder.addCase(fetchOneReview.pending, (state, {payload}) => {
                state.fetchOneReviewStatus = "pending";
            })
            builder.addCase(fetchOneReview.fulfilled, (state, {payload}) => {
                state.fetchOneReviewStatus = "initial";
                state.currentReview= payload;
            })
            builder.addCase(fetchOneReview.rejected, (state, {payload}) => {
                state.fetchOneReviewStatus = "rejected";
            })
            //Create new photoshoot
            builder.addCase(createReview.pending, (state, {payload}) => {
                state.creatingStatus = "pending";
            })
            builder.addCase(createReview.fulfilled, (state, {payload}) => {
                state.creatingStatus = "success";
                state.allReviews = [...state.allReviews, payload];
            })
            builder.addCase(createReview.rejected, (state, {payload}) => {
                state.creatingStatus = "rejected";
            })
            //Edit photoshoot
            builder.addCase(updateReview.pending, (state, {payload}) => {
                state.editingStatus = "pending";
            })
            builder.addCase(updateReview.fulfilled, (state, {payload}) => {
                state.editingStatus = "success";
                state.allReviews = state.allReviews.map(el => el.id === payload.id ? payload : el);
            })
            builder.addCase(updateReview.rejected, (state, {payload}) => {
                state.editingStatus = "rejected";
            })
            //Delete photoshoot
            builder.addCase(deleteReview.pending, (state, {payload}) => {
                state.deletingStatus = "pending";
            })
            builder.addCase(deleteReview.fulfilled, (state, {payload}) => {
                state.deletingStatus = "initial";
                state.allReviews = state.allReviews.filter(el => el.id !== payload);
            })
            builder.addCase(deleteReview.rejected, (state, {payload}) => {
                state.deletingStatus = "rejected";
            })
        }
    }
)

const {reducer, actions} = Reviews;

export const {setUpdatingStatus,setCreatingStatus, resetCurrentReview} = actions;
export default reducer;