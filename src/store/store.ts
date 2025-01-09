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
            Appointment:[],
            AddAppoitment:(item : any) =>
                set(produce(state=>{
                    let found = false;
                    for(let i = 0 ; i < state.Appointment.length;i++){
                        if(state.Appointment[i].doctor.id === item.doctor.id){
                            found = true;
                            state.Appointment[i].date = item.date;
                            state.Appointment[i].day = item.day;
                            state.Appointment[i].time = item.time;
                        }
                    }
                    if(found==false){
                        state.Appointment.push(item);
                    }
                    
                    console.log("Updated Appoitments", state.Appointment);
                }))
        }),
        {
            name:"Docly",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

// {"date": "01", "day": "Wednesday", "doctor": {"about": "Expert in heart health and cardiovascular diseases with over 15 years of experience.", "id": 1, "index": 0, "userDistance": "800m away", "userImage": 6, "userName": "Dr. Marcus Horizo", "userProfession": "Cardiologist", "userRating": 4.8}, "time": "09:00 AM"}