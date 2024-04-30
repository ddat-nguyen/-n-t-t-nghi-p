import authApi from "../api/auth";

const authUtils = {
    isAuthenticated: async () => {
        const token = localStorage.getItem("token");
        if (!token) return false;
        try {
            const res = await authApi.verifyToken();
            return res;
        } catch (error) {
            return false;
        }
    },
};

export default authUtils;