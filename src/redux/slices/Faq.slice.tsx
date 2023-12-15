import {FAQ} from '@/types'
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {adminInstance, guestInstance} from "@/redux/API";

type InitialStateType = {
    allFaq: FAQ[],
    currentFaq: FAQ | null,
    fetchStatus: string,
    fetchOneFaqStatus: string
    creatingStatus: string,
    editingStatus: string,
    deletingStatus: string
}
const initialState: InitialStateType = {
    allFaq: [],
    currentFaq: null,
    fetchOneFaqStatus: "initial",
    fetchStatus: "initial",
    creatingStatus: "initial",
    editingStatus: "initial",
    deletingStatus: "initial"
}

export const fetchAllFaq = createAsyncThunk(
    "faq/fetchAllFaq",
    async () => {
        const response = await guestInstance.get("/faq/")
        return await response.data;
    }
)
export const fetchOneFaq = createAsyncThunk(
    "faq/fetchOneFaq",
    async (id: number) => {
        const response = await guestInstance.get(`/faq/${id}`)
        return await response.data;
    }
)
export const createFaq = createAsyncThunk(
    "faq/createFaq",
    async (data: FormData) => {
        const response = await adminInstance.post("/faq/", data);
        return await response.data;
    }
)
export const updateFaq = createAsyncThunk(
    "faq/updateFaq",
    async ({id,data}:{data: FormData, id: number}) => {
        const response = await adminInstance.patch(`/faq/${id}/`, data);
        return await response.data;
    }
)
export const deleteFaq = createAsyncThunk(
    "faq/deleteFaq",
    async (id: number) => {
        const response = await adminInstance.delete(`/faq/${id}/`);
        return id;
    }
)
export const Faq = createSlice(
    {
        name: "Faq",
        initialState,
        reducers: {
            setCreatingStatus: (state, {payload}) => {
                state.creatingStatus = payload;
            },
            setUpdatingStatus: (state, {payload}) => {
                state.editingStatus = payload;
            },
            resetCurrentFaq: (state) => {
                state.currentFaq = null;
            }
        },
        extraReducers(builder) {
            //Fetch All photoshoots
            builder.addCase(fetchAllFaq.pending, (state, {payload}) => {
                state.fetchStatus = "pending";
            })
            builder.addCase(fetchAllFaq.fulfilled, (state, {payload}) => {
                state.fetchStatus = "initial";
                state.allFaq = payload;
            })
            builder.addCase(fetchAllFaq.rejected, (state, {payload}) => {
                state.fetchStatus = "rejected";
            })
            //Fetch One photoshoot
            builder.addCase(fetchOneFaq.pending, (state, {payload}) => {
                state.fetchOneFaqStatus = "pending";
            })
            builder.addCase(fetchOneFaq.fulfilled, (state, {payload}) => {
                state.fetchOneFaqStatus = "initial";
                state.currentFaq= payload;
            })
            builder.addCase(fetchOneFaq.rejected, (state, {payload}) => {
                state.fetchOneFaqStatus = "rejected";
            })
            //Create new photoshoot
            builder.addCase(createFaq.pending, (state, {payload}) => {
                state.creatingStatus = "pending";
            })
            builder.addCase(createFaq.fulfilled, (state, {payload}) => {
                state.creatingStatus = "success";
                state.allFaq = [...state.allFaq, payload];
            })
            builder.addCase(createFaq.rejected, (state, {payload}) => {
                state.creatingStatus = "rejected";
            })
            //Edit photoshoot
            builder.addCase(updateFaq.pending, (state, {payload}) => {
                state.editingStatus = "pending";
            })
            builder.addCase(updateFaq.fulfilled, (state, {payload}) => {
                state.editingStatus = "success";
                state.allFaq= state.allFaq.map(el => el.id === payload.id ? payload : el);
            })
            builder.addCase(updateFaq.rejected, (state, {payload}) => {
                state.editingStatus = "rejected";
            })
            //Delete photoshoot
            builder.addCase(deleteFaq.pending, (state, {payload}) => {
                state.deletingStatus = "pending";
            })
            builder.addCase(deleteFaq.fulfilled, (state, {payload}) => {
                state.deletingStatus = "initial";
                state.allFaq = state.allFaq.filter(el => el.id !== payload);
            })
            builder.addCase(deleteFaq.rejected, (state, {payload}) => {
                state.deletingStatus = "rejected";
            })
        }
    }
)

const {reducer, actions} = Faq;

export const {setUpdatingStatus,setCreatingStatus, resetCurrentFaq} = actions;
export default reducer;