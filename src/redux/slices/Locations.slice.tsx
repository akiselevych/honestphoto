import {LocationPhotoshoot} from "@/types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {adminInstance, guestInstance} from "@/redux/API";

type InitialStateType = {
    allLocations: LocationPhotoshoot[],
    currentLocation: LocationPhotoshoot | null,
    fetchStatus: string,
    fetchOneLocationStatus: string
    creatingStatus: string,
    editingStatus: string,
    deletingStatus: string
}
const initialState: InitialStateType = {
    allLocations: [],
    currentLocation: null,
    fetchOneLocationStatus: "initial",
    fetchStatus: "initial",
    creatingStatus: "initial",
    editingStatus: "initial",
    deletingStatus: "initial"
}

export const fetchAllLocation = createAsyncThunk(
    "locations/fetchAllLocation",
    async () => {
        const response = await guestInstance.get("/location-photoshoots/")
        return await response.data;
    }
)
export const fetchOneLocation = createAsyncThunk(
    "locations/fetchOneLocation",
    async (id: number) => {
        const response = await guestInstance.get(`/location-photoshoots/${id}`)
        return await response.data;
    }
)
export const createLocation = createAsyncThunk(
    "locations/createLocation",
    async (data: FormData) => {
        const response = await adminInstance.post("/location-photoshoots/", data);
        return await response.data;
    }
)
export const updateLocation = createAsyncThunk(
    "locations/updateLocation",
    async ({id,data}:{data: FormData, id: number}) => {
        const response = await adminInstance.patch(`/location-photoshoots/${id}/`, data);
        return await response.data;
    }
)
export const deleteLocation = createAsyncThunk(
    "locations/deleteLocation",
    async (id: number) => {
        const response = await adminInstance.delete(`/location-photoshoots/${id}/`);
        return id;
    }
)
export const Locations = createSlice(
    {
        name: "Locations",
        initialState,
        reducers: {
            setCreatingStatus: (state, {payload}) => {
                state.creatingStatus = payload;
            },
            setUpdatingStatus: (state, {payload}) => {
                state.editingStatus = payload;
            },
            resetCurrentLocation: (state) => {
                state.currentLocation = null;
            }
        },
        extraReducers(builder) {
            //Fetch All photoshoots
            builder.addCase(fetchAllLocation.pending, (state, {payload}) => {
                state.fetchStatus = "pending";
            })
            builder.addCase(fetchAllLocation.fulfilled, (state, {payload}) => {
                state.fetchStatus = "initial";
                state.allLocations = payload;
            })
            builder.addCase(fetchAllLocation.rejected, (state, {payload}) => {
                state.fetchStatus = "rejected";
            })
            //Fetch One photoshoot
            builder.addCase(fetchOneLocation.pending, (state, {payload}) => {
                state.fetchOneLocationStatus = "pending";
            })
            builder.addCase(fetchOneLocation.fulfilled, (state, {payload}) => {
                state.fetchOneLocationStatus = "initial";
                state.currentLocation = payload;
            })
            builder.addCase(fetchOneLocation.rejected, (state, {payload}) => {
                state.fetchOneLocationStatus = "rejected";
            })
            //Create new photoshoot
            builder.addCase(createLocation.pending, (state, {payload}) => {
                state.creatingStatus = "pending";
            })
            builder.addCase(createLocation.fulfilled, (state, {payload}) => {
                state.creatingStatus = "success";
                state.allLocations = [...state.allLocations, payload];
            })
            builder.addCase(createLocation.rejected, (state, {payload}) => {
                state.creatingStatus = "rejected";
            })
            //Edit photoshoot
            builder.addCase(updateLocation.pending, (state, {payload}) => {
                state.editingStatus = "pending";
            })
            builder.addCase(updateLocation.fulfilled, (state, {payload}) => {
                state.editingStatus = "success";
                state.allLocations = state.allLocations.map(el => el.id === payload.id ? payload : el);
            })
            builder.addCase(updateLocation.rejected, (state, {payload}) => {
                state.editingStatus = "rejected";
            })
            //Delete photoshoot
            builder.addCase(deleteLocation.pending, (state, {payload}) => {
                state.deletingStatus = "pending";
            })
            builder.addCase(deleteLocation.fulfilled, (state, {payload}) => {
                state.deletingStatus = "initial";
                state.allLocations = state.allLocations.filter(el => el.id !== payload);
            })
            builder.addCase(deleteLocation.rejected, (state, {payload}) => {
                state.deletingStatus = "rejected";
            })
        }
    }
)

const {reducer, actions} = Locations;

export const {setUpdatingStatus,setCreatingStatus, resetCurrentLocation} = actions;
export default reducer;