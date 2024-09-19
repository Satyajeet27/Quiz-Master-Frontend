import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient from "./axiosApi";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { toast } from "sonner";

type UserLoginType = {
  email: string;
  password: string;
};
export type AxiosErrorType = {
  message: string;
};

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const loginRequest = async (userData: UserLoginType) => {
    const { data } = await axiosClient.post("/api/v1/user/login", {
      ...userData,
    });
    return data;
  };
  const { mutate: login, isPending } = useMutation({
    mutationFn: loginRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authQuery"] });
      navigate("/");
      toast.success("Login Successfully");
    },
    onError: (error: AxiosError<AxiosErrorType>) => {
      console.log(error.response?.data.message);
      toast.error(
        error.response
          ? error.response?.data.message
          : "Invalid Email or Password"
      );
    },
  });
  return { login, isPending };
};
export const useAuth = () => {
  const checkAuthentication = async () => {
    const { data } = await axiosClient.get("/api/v1/auth/check");
    return data;
  };
  const { isLoading, data: isAuthenticated } = useQuery({
    queryKey: ["authQuery"],
    queryFn: checkAuthentication,
    staleTime: 0,
    gcTime: 0,
  });
  return { isAuthenticated, isLoading };
};

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const logoutRequest = async () => {
    const { data } = await axiosClient.post("/api/v1/user/logout");
    return data;
  };
  const { mutate: logout } = useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["authQuery"] });
      queryClient.refetchQueries({ queryKey: ["authQuery"] });
      navigate("/login");
      toast.message("Logout Succesffully!");
    },
  });

  return { logout };
};

type UserDataType = {
  username: string;
  email: string;
  password: string;
};

export const useSignup = () => {
  const navigate = useNavigate();
  const signupRequest = async (userData: UserDataType) => {
    const { data } = await axiosClient.post("/api/v1/user", { ...userData });
    return data;
  };
  const {
    mutate: signup,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: signupRequest,
    onSuccess: () => {
      toast.success("Account created successfully!");
      navigate("/login");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error.response?.data.message
          ? error.response?.data.message
          : "Account creation got failed!"
      );
      console.log(error.response?.data);
    },
  });
  return { signup, isPending, isSuccess };
};
