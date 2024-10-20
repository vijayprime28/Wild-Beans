import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';



export const userStore = create(
    persist(
        (set, get) => ({
            user: null,
            loginUser: (user) => set({ user: user }),
            logoutUser: () => set({ user: null })
        }),
        {
            name: 'user-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        },
    )
);

export const cartStore = create(
    persist(
        (set, get) => ({
            cart: [],
            addItem: (item) => set({ cart: [...get().cart, item] }),
            removeItem: (item) => set({ cart: get().cart.filter((i) => { return i._id !== item._id }) }),
            clearCart: () => set({ cart: [] }),
            decreaseCount: (item) => set({
                cart: get().cart.map((i) => {
                    if (i._id === item._id) {
                        return { ...i, count: i.count - 1 }
                    }
                    else {
                        return i
                    }
                })
            }),
            increaseCount: (item) => set({
                cart: get().cart.map((i) => {
                    if (i._id === item._id) {
                        return { ...i, count: i.count + 1 }
                    }
                    else {
                        return i
                    }
                })
            })
        }),
        {
            name: 'cart-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        },
    )
)