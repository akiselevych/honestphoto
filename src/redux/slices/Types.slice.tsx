import {DefaultPhotoshoot} from "@/types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {adminInstance, guestInstance} from "@/redux/API";

type InitialStateType = {
    allPhotoshoots: DefaultPhotoshoot[],
    currentPhotoshoot: DefaultPhotoshoot | null,
    fetchStatus: string,
    fetchOnePhotoshootStatus: string
    creatingStatus: string,
    editingStatus: string,
    deletingStatus: string
}
const initialState: InitialStateType = {
    allPhotoshoots: [],
    currentPhotoshoot: null,
    fetchOnePhotoshootStatus: "initial",
    fetchStatus: "initial",
    creatingStatus: "initial",
    editingStatus: "initial",
    deletingStatus: "initial"
}

export const fetchAllPhotoshoots = createAsyncThunk(
    "types/fetchAllPhotoshoot",
    async () => {
        const response = await guestInstance.get("/type-photoshoots/")
        return await response.data;
    }
)
export const fetchOnePhotoshoot = createAsyncThunk(
    "types/fetchOnePhotoshoot",
    async (id: number) => {
        const response = await guestInstance.get(`/type-photoshoots/${id}`)
        return await response.data;
    }
)
export const createPhotoshoot = createAsyncThunk(
    "types/createPhotoshoot",
    async (data: FormData) => {
        const response = await adminInstance.post("/type-photoshoots/", data);
        return await response.data;
    }
)
export const updatePhotoshoot = createAsyncThunk(
    "types/updatePhotoshoot",
    async ({id,data}:{data: FormData, id: number}) => {
        const response = await adminInstance.patch(`/type-photoshoots/${id}/`, data);
        return await response.data;
    }
)
export const deletePhotoshoot = createAsyncThunk(
    "types/deletePhotoshoot",
    async (id: number) => {
        const response = await adminInstance.delete(`/type-photoshoots/${id}/`);
        return id;
    }
)
export const Types = createSlice(
    {
        name: "Types",
        initialState,
        reducers: {
            setCreatingStatus: (state, {payload}) => {
                state.creatingStatus = payload;
            },
            setUpdatingStatus: (state, {payload}) => {
                state.editingStatus = payload;
            },
            resetCurrentPhotoshoot: (state) => {
                state.currentPhotoshoot = null;
            }
        },
        extraReducers(builder) {
            //Fetch All photoshoots
            builder.addCase(fetchAllPhotoshoots.pending, (state,{payload}) => {
                state.fetchStatus = "pending";
            })
            builder.addCase(fetchAllPhotoshoots.fulfilled, (state,{payload}) => {
                state.fetchStatus = "initial";
                state.allPhotoshoots = payload;
            })
            builder.addCase(fetchAllPhotoshoots.rejected, (state,{payload}) => {
                state.fetchStatus = "rejected";
            })
            //Fetch One photoshoot
            builder.addCase(fetchOnePhotoshoot.pending, (state,{payload}) => {
                state.fetchOnePhotoshootStatus = "pending";
            })
            builder.addCase(fetchOnePhotoshoot.fulfilled, (state,{payload}) => {
                state.fetchOnePhotoshootStatus = "initial";
                state.currentPhotoshoot = payload;
            })
            builder.addCase(fetchOnePhotoshoot.rejected, (state,{payload}) => {
                state.fetchOnePhotoshootStatus = "rejected";
            })
            //Create new photoshoot
            builder.addCase(createPhotoshoot.pending, (state, {payload}) => {
                state.creatingStatus = "pending";
            })
            builder.addCase(createPhotoshoot.fulfilled, (state, {payload}) => {
                state.creatingStatus = "success";
                state.allPhotoshoots = [...state.allPhotoshoots, payload];
            })
            builder.addCase(createPhotoshoot.rejected, (state, {payload}) => {
                state.creatingStatus = "rejected";
            })
            //Edit photoshoot
            builder.addCase(updatePhotoshoot.pending, (state, {payload}) => {
                state.editingStatus = "pending";
            })
            builder.addCase(updatePhotoshoot.fulfilled, (state, {payload}) => {
                state.editingStatus = "success";
                state.allPhotoshoots = state.allPhotoshoots.map(el => el.id === payload.id ? payload : el);
            })
            builder.addCase(updatePhotoshoot.rejected, (state, {payload}) => {
                state.editingStatus = "rejected";
            })
            //Delete photoshoot
            builder.addCase(deletePhotoshoot.pending, (state, {payload}) => {
                state.deletingStatus = "pending";
            })
            builder.addCase(deletePhotoshoot.fulfilled, (state, {payload}) => {
                state.deletingStatus = "initial";
                state.allPhotoshoots = state.allPhotoshoots.filter(el => el.id !== payload);
            })
            builder.addCase(deletePhotoshoot.rejected, (state, {payload}) => {
                state.deletingStatus = "rejected";
            })
        }
    }
)

const {reducer, actions} = Types;

export const {setUpdatingStatus,setCreatingStatus, resetCurrentPhotoshoot} = actions;
export default reducer;