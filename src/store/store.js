import create from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set) => ({
      jwt: {
        access_token: "",
        token_type: "",
      },
      inquiries: [],
      loggedIn: false,
      adminLoggedIn: false,
      setJwt: (token, type) =>
        set((state) => ({
          jwt: {
            access_token: token,
            token_type: type,
          },
        })),
      setInquiries: (data) => {
        set((state) => ({
          inquiries: [...data],
        }));
      },
      setLoggedIn: (data) => {
        set((state) => ({
          loggedIn: data,
        }));
      },
      setAdminLoggedIn: (data) => {
        set((state) => ({
          adminLoggedIn: data,
        }));
      },
    }),
    {
      name: "tessStore", // name of item in the storage (must be unique)
      getStorage: () => sessionStorage, // (optional) by default the 'localStorage' is used
    }
  )
);
