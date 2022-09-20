import create from "zustand";

export const useStore = create((set) => ({
  jwt: {
    access_token: "",
    token_type: "",
  },
  setJwt: (token, type) =>
    set((state) => ({
      jwt: {
        access_token: token,
        token_type: type,
      },
    })),
}));
