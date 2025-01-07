import { create } from "zustand";
import { produce } from "immer";
import {persist,createJSONStorage} from "zustand/middleware";
import AsyncStorage,{useAsyncStorage} from "@react-native-async-storage/async-storage";
import DoctorData from "../data/DoctorData";
import Medicine from "../data/Medicine";

export const useStore = create(
    persist(
        (set,get)=>({
            DoctorData: DoctorData,
            Medicine:Medicine,
            
        }),
        {
            name:"Docly",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
)