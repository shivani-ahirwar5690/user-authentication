import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { axiosInstance } from "../config/axiosInstance";

const VerifyEmailPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get(`/auth/verify/${token}`)
      .then(res => {
        alert(res.data.message);
        navigate("/auth/login");
      })
      .catch(err => {
        alert(err.response.data.message);
        navigate("/auth/register");
      });
  }, [token]);

  return <div>Verifying your email...</div>;
};

export default VerifyEmailPage;