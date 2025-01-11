import { create } from "zustand";
import { produce } from "immer";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage, { useAsyncStorage } from "@react-native-async-storage/async-storage";
import DoctorData from "../data/DoctorData";
import Medicine from "../data/Medicine";

export const useStore = create(
    persist(
        (set, get) => ({
            DoctorData: DoctorData,
            Medicine: Medicine,
            Appointment: [],
            CartList: [],
            Cartprice: 0,
            AddAppoitment: (item: any) =>
                set(produce(state => {
                    let found = false;
                    for (let i = 0; i < state.Appointment.length; i++) {
                        if (state.Appointment[i].doctor.id === item.doctor.id) {
                            found = true;
                            state.Appointment[i].date = item.date;
                            state.Appointment[i].day = item.day;
                            state.Appointment[i].time = item.time;
                        }
                    }
                    if (found == false) {
                        state.Appointment.push(item);
                    }

                    // console.log("Updated Appoitments", state.Appointment);
                })),
            RemoveAppointment: (item: any) =>
                set(produce(state => {
                    for (let i = 0; i < state.Appointment.length; i++) {
                        if (state.Appointment[i].doctor.id === item.doctor.id) {
                            state.Appointment.splice(i, 1);
                        }
                    }

                    // console.log("Updated Appoitments", state.Appointment);
                })),
            addToCart: (item: any) =>
                set(
                    produce(state => {

                        let found = false;
                        for (let i = 0; i < state.CartList.length; i++) {
                            if (state.CartList[i].id === item.id) {
                                found = true;
                                if ("quantity" in state.CartList[i] && state.CartList[i].quantity >= 0) {
                                    state.CartList[i].quantity += item.quantity;
                                }
                                else {
                                    state.CartList[i].quantity = item.quantity;
                                }
                            }
                        }
                        if (found == false) {
                            state.CartList.push(item);
                        }


                    })),
            calculateCartPrice: () =>
                set(
                    produce(state => {
                        let totatPrice = 0;

                        for (let i = 0; i < state.CartList.length; i++) {
                            state.CartList[i].itemPrice = state.CartList[i].quantity * state.CartList[i].price;
                            totatPrice += state.CartList[i].itemPrice;
                        }

                        state.Cartprice = totatPrice.toFixed(2).toString();

                    })
                ),
            incrementQuantityHandler: (id: any) =>
                set(produce(state => {

                    for (let i = 0; i < state.CartList.length; i++) {
                        if (state.CartList[i].id === id) {
                            state.CartList[i].quantity++;
                            break;
                        }
                    }
                    console.log("cartList: " + JSON.stringify(state.CartList));

                })),
            decrementQuantityHandler: (id: any) =>
                set(produce(state => {

                    for (let i = 0; i < state.CartList.length; i++) {
                        if (state.CartList[i].id === id) {
                            state.CartList[i].quantity--;
                            if (state.CartList[i].quantity <= 0) {
                                state.CartList.splice(i, 1);
                            }
                            break;
                        }
                    }
                    
                    console.log("cartList: " + JSON.stringify(state.CartList));
                }))
        }),
        {
            name: "Docly",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

// {"date": "01", "day": "Wednesday", "doctor": {"about": "Expert in heart health and cardiovascular diseases with over 15 years of experience.", "id": 1, "index": 0, "userDistance": "800m away", "userImage": 6, "userName": "Dr. Marcus Horizo", "userProfession": "Cardiologist", "userRating": 4.8}, "time": "09:00 AM"}