import {ArtPhotoshoot} from "@/types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {adminInstance, guestInstance} from "@/redux/API";

type InitialStateType = {
    allArtPhotoshoots: ArtPhotoshoot[],
    currentArtPhotoshoot: ArtPhotoshoot | null,
    fetchStatus: string,
    fetchOneArtPhotoshootStatus: string
    creatingStatus: string,
    editingStatus: string,
    deletingStatus: string
}
const initialState: InitialStateType = {
    allArtPhotoshoots: [],
    currentArtPhotoshoot: null,
    fetchOneArtPhotoshootStatus: "initial",
    fetchStatus: "initial",
    creatingStatus: "initial",
    editingStatus: "initial",
    deletingStatus: "initial"
}

export const fetchAllArtPhotoshoots = createAsyncThunk(
    "art/fetchAllArtPhotoshoots",
    async () => {
        const response = await guestInstance.get("/art-photoshoots/")
        return await response.data;
    }
)
export const fetchOneArtPhotoshoot = createAsyncThunk(
    "art/fetchOneArtPhotoshoot",
    async (id: number) => {
        const response = await guestInstance.get(`/art-photoshoots/${id}`)
        return await response.data;
    }
)
export const createArtPhotoshoot = createAsyncThunk(
    "art/createArtPhotoshoot",
    async (data: FormData) => {
        const response = await adminInstance.post("/art-photoshoots/", data);
        return await response.data;
    }
)
export const updateArtPhotoshoot = createAsyncThunk(
    "art/updateArtPhotoshoot",
    async ({id,data}:{data: FormData, id: number}) => {
        const response = await adminInstance.patch(`/art-photoshoots/${id}/`, data);
        return await response.data;
    }
)
export const deleteArtPhotoshoot = createAsyncThunk(
    "art/deleteArtPhotoshoot",
    async (id: number) => {
        const response = await adminInstance.delete(`/art-photoshoots/${id}/`);
        return id;
    }
)
export const Art = createSlice(
    {
        name: "Art",
        initialState,
        reducers: {
            setCreatingStatus: (state, {payload}) => {
                state.creatingStatus = payload;
            },
            setUpdatingStatus: (state, {payload}) => {
                state.editingStatus = payload;
            },
            resetCurrentArtPhotoshoot: (state) => {
                state.currentArtPhotoshoot = null;
            }
        },
        extraReducers(builder) {
            //Fetch All photoshoots
            builder.addCase(fetchAllArtPhotoshoots.pending, (state, {payload}) => {
                state.fetchStatus = "pending";
            })
            builder.addCase(fetchAllArtPhotoshoots.fulfilled, (state, {payload}) => {
                state.fetchStatus = "initial";
                state.allArtPhotoshoots = payload;
            })
            builder.addCase(fetchAllArtPhotoshoots.rejected, (state, {payload}) => {
                state.fetchStatus = "rejected";
            })
            //Fetch One photoshoot
            builder.addCase(fetchOneArtPhotoshoot.pending, (state, {payload}) => {
                state.fetchOneArtPhotoshootStatus = "pending";
            })
            builder.addCase(fetchOneArtPhotoshoot.fulfilled, (state, {payload}) => {
                state.fetchOneArtPhotoshootStatus = "initial";
                state.currentArtPhotoshoot = payload;
            })
            builder.addCase(fetchOneArtPhotoshoot.rejected, (state, {payload}) => {
                state.fetchOneArtPhotoshootStatus = "rejected";
            })
            //Create new photoshoot
            builder.addCase(createArtPhotoshoot.pending, (state, {payload}) => {
                state.creatingStatus = "pending";
            })
            builder.addCase(createArtPhotoshoot.fulfilled, (state, {payload}) => {
                state.creatingStatus = "success";
                state.allArtPhotoshoots = [...state.allArtPhotoshoots, payload];
            })
            builder.addCase(createArtPhotoshoot.rejected, (state, {payload}) => {
                state.creatingStatus = "rejected";
            })
            //Edit photoshoot
            builder.addCase(updateArtPhotoshoot.pending, (state, {payload}) => {
                state.editingStatus = "pending";
            })
            builder.addCase(updateArtPhotoshoot.fulfilled, (state, {payload}) => {
                state.editingStatus = "success";
                state.allArtPhotoshoots = state.allArtPhotoshoots.map(el => el.id === payload.id ? payload : el);
            })
            builder.addCase(updateArtPhotoshoot.rejected, (state, {payload}) => {
                state.editingStatus = "rejected";
            })
            //Delete photoshoot
            builder.addCase(deleteArtPhotoshoot.pending, (state, {payload}) => {
                state.deletingStatus = "pending";
            })
            builder.addCase(deleteArtPhotoshoot.fulfilled, (state, {payload}) => {
                state.deletingStatus = "initial";
                state.allArtPhotoshoots = state.allArtPhotoshoots.filter(el => el.id !== payload);
            })
            builder.addCase(deleteArtPhotoshoot.rejected, (state, {payload}) => {
                state.deletingStatus = "rejected";
            })
        }
    }
)

const {reducer, actions} = Art;

export const {setUpdatingStatus,setCreatingStatus, resetCurrentArtPhotoshoot} = actions;
export default reducer;