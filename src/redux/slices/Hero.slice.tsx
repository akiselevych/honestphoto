import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {HeroType} from "@/types";
import {StaticImageData} from "next/image";
import {adminInstance, guestInstance} from "@/redux/API";

type initialStateType = {
    allHeroes: HeroType[],
    currentHero: HeroType| null,
    fetchAllStatus:string,
    fetchCurrentStatus:string,
    editStatus:string
}

const initialState: initialStateType = {
    allHeroes: [],
    currentHero: null,
    fetchAllStatus: "initial",
    fetchCurrentStatus: "initial",
    editStatus: "initial"
}

export const fetchAllHeroes = createAsyncThunk(
    "hero/fetchAllHeroes",
    async () => {
        const response = await guestInstance.get(`/hero-images/`);
        return response.data;
    }
)
export const fetchCurrentHero = createAsyncThunk(
    "hero/fetchCurrentHero",
    async (id: number) => {
        const response = await guestInstance.get(`/hero-images/${id}/`);
        return response.data;
    }
)

export const updateHero = createAsyncThunk(
    "hero/createHero",
    async ({id,data}:{data: FormData, id: number}) => {
        const response = await adminInstance.patch(`/hero-images/${id}/`,data);
        return await response.data;
    }
)

export const Hero = createSlice(
    {
        name: "Hero",
        initialState,
        reducers: {
            setEditStatus: (state, {payload}) => {
                state.editStatus = payload;
            },
            resetCurrentHero: (state) => {
                state.currentHero = null;
            }
        },
        extraReducers(builder) {
            //fetch all heroes
            builder.addCase(fetchAllHeroes.pending, (state, {payload}) => {
                state.fetchAllStatus = "pending";
            })
            builder.addCase(fetchAllHeroes.fulfilled, (state, {payload}) => {
                state.fetchAllStatus = "initial";
                state.allHeroes = payload;
            })
            builder.addCase(fetchAllHeroes.rejected, (state, {payload}) => {
                state.fetchAllStatus = "rejected";
            })
            //fetch current hero
            builder.addCase(fetchCurrentHero.pending, (state, {payload}) => {
                state.fetchCurrentStatus = "pending";
            })
            builder.addCase(fetchCurrentHero.fulfilled, (state, {payload}) => {
                state.fetchCurrentStatus = "initial";
                state.currentHero = payload;
            })
            builder.addCase(fetchCurrentHero.rejected, (state, {payload}) => {
                state.fetchCurrentStatus = "rejected";
            })
            //edit hero
            builder.addCase(updateHero.pending, (state, {payload}) => {
                state.editStatus = "pending";
            })
            builder.addCase(updateHero.fulfilled, (state, {payload}) => {
                state.editStatus = "success";
                state.allHeroes = state.allHeroes.map(el => el.id === payload.id ? payload : el);
            })
            builder.addCase(updateHero.rejected, (state, {payload}) => {
                state.editStatus = "rejected";
            })
        }
    }
)

const {reducer, actions} = Hero;
export const {resetCurrentHero, setEditStatus} = actions;
export default reducer;