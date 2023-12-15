import {DefaultPhotoshoot} from "@/types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {adminInstance, guestInstance} from "@/redux/API";

type InitialStateType = {
    allPrices: DefaultPhotoshoot[],
    currentPrice: DefaultPhotoshoot | null,
    fetchStatus: string,
    fetchOnePriceStatus: string
    creatingStatus: string,
    editingStatus: string,
    deletingStatus: string
}
const initialState: InitialStateType = {
    allPrices: [],
    currentPrice: null,
    fetchOnePriceStatus: "initial",
    fetchStatus: "initial",
    creatingStatus: "initial",
    editingStatus: "initial",
    deletingStatus: "initial"
}

export const fetchAllPrices = createAsyncThunk(
    "price/fetchAllPrices",
    async () => {
        const response = await guestInstance.get("/price-photoshoots/")
        return await response.data;
    }
)
export const fetchOnePrice = createAsyncThunk(
    "price/fetchOnePrice",
    async (id: number) => {
        const response = await guestInstance.get(`/price-photoshoots/${id}`)
        return await response.data;
    }
)
export const createPrice = createAsyncThunk(
    "price/createPrice",
    async (data: FormData) => {
        const response = await adminInstance.post("/price-photoshoots/", data);
        return await response.data;
    }
)
export const updatePrice = createAsyncThunk(
    "price/updatePrice",
    async ({id,data}:{data: FormData, id: number}) => {
        const response = await adminInstance.patch(`/price-photoshoots/${id}/`, data);
        return await response.data;
    }
)
export const deletePrice = createAsyncThunk(
    "price/deletePrice",
    async (id: number) => {
        const response = await adminInstance.delete(`/price-photoshoots/${id}/`);
        return id;
    }
)
export const Price = createSlice(
    {
        name: "Price",
        initialState,
        reducers: {
            setCreatingStatus: (state, {payload}) => {
                state.creatingStatus = payload;
            },
            setUpdatingStatus: (state, {payload}) => {
                state.editingStatus = payload;
            },
            resetCurrentPrice: (state) => {
                state.currentPrice = null;
            }
        },
        extraReducers(builder) {
            //Fetch All photoshoots
            builder.addCase(fetchAllPrices.pending, (state,{payload}) => {
                state.fetchStatus = "pending";
            })
            builder.addCase(fetchAllPrices.fulfilled, (state,{payload}) => {
                state.fetchStatus = "initial";
                state.allPrices = payload;
            })
            builder.addCase(fetchAllPrices.rejected, (state,{payload}) => {
                state.fetchStatus = "rejected";
            })
            //Fetch One photoshoot
            builder.addCase(fetchOnePrice.pending, (state,{payload}) => {
                state.fetchOnePriceStatus = "pending";
            })
            builder.addCase(fetchOnePrice.fulfilled, (state,{payload}) => {
                state.fetchOnePriceStatus = "initial";
                state.currentPrice = payload;
            })
            builder.addCase(fetchOnePrice.rejected, (state,{payload}) => {
                state.fetchOnePriceStatus = "rejected";
            })
            //Create new photoshoot
            builder.addCase(createPrice.pending, (state, {payload}) => {
                state.creatingStatus = "pending";
            })
            builder.addCase(createPrice.fulfilled, (state, {payload}) => {
                state.creatingStatus = "success";
                state.allPrices = [...state.allPrices, payload];
            })
            builder.addCase(createPrice.rejected, (state, {payload}) => {
                state.creatingStatus = "rejected";
            })
            //Edit photoshoot
            builder.addCase(updatePrice.pending, (state, {payload}) => {
                state.editingStatus = "pending";
            })
            builder.addCase(updatePrice.fulfilled, (state, {payload}) => {
                state.editingStatus = "success";
                state.allPrices = state.allPrices.map(el => el.id === payload.id ? payload : el);
            })
            builder.addCase(updatePrice.rejected, (state, {payload}) => {
                state.editingStatus = "rejected";
            })
            //Delete photoshoot
            builder.addCase(deletePrice.pending, (state, {payload}) => {
                state.deletingStatus = "pending";
            })
            builder.addCase(deletePrice.fulfilled, (state, {payload}) => {
                state.deletingStatus = "initial";
                state.allPrices = state.allPrices.filter(el => el.id !== payload);
            })
            builder.addCase(deletePrice.rejected, (state, {payload}) => {
                state.deletingStatus = "rejected";
            })
        }
    }
)

const {reducer, actions} = Price;

export const {setUpdatingStatus,setCreatingStatus, resetCurrentPrice} = actions;
export default reducer;