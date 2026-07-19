import api from "./api";
const userService = {
  getProfile: () => api.get("/users/profile"),

  updateProfile: (formData) =>
    api.put("/users/profile", formData, {
      headers: { "Content-Type": undefined },
    }),

  changePassword: (payload) => api.put("/users/change-password", payload),
};

export default userService;
