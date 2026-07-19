import api from "./api";

const authService = {
  register: (payload) => api.post("/auth/register", payload),
  login: (payload) => api.post("/auth/login", payload),
  getProfile: () => api.get("/auth/profile"),
};

export default authService;
