import { useNavigate } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { useMutation } from "@tanstack/react-query";

const Profile = () => {

  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.post(
        "/auth/logout",
        {},
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: () => {
      localStorage.removeItem("token");
      navigate("/auth/login");
    },
   onError: (error) => {
      console.log("Logout error:", error);
    }
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };
  return (
    <div className="w-full h-screen bg-cyan-500 text-2xl text-white flex flex-col justify-center items-center">
      <h2>Profile Page</h2>

      <p>You are logged in!</p>

      <button className="absolute top-4 right-4 px-4 py-2 bg-white text-cyan-500 font-semibold rounded hover:bg-gray-200 transition"
        onClick={handleLogout}
        disabled={logoutMutation.isPending}
      >
        {logoutMutation.isPending ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
};

export default Profile;