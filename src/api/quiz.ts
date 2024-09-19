import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient from "./axiosApi";
import { AxiosErrorType } from "./user";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { QuizDataType } from "@/components/dashboard/DashboardQuiz";

type QuizType = {
  title: string;
  description: string;
};

export const useCreateQuiz = () => {
  const queryClient = useQueryClient();
  const createQuizRequest = async (quizData: QuizType) => {
    const { data } = await axiosClient.post("/api/v1/quiz", { ...quizData });
    return data;
  };
  const { mutate: createQuiz, isPending } = useMutation({
    mutationFn: createQuizRequest,
    onSuccess: () => {
      toast.success("Quiz Created Successfully!");
      queryClient.invalidateQueries({ queryKey: ["fetchUserQuiz"] });
    },
    onError: (error: AxiosError<AxiosErrorType>) => {
      console.log(error.response?.data.message);
      toast.error(
        error.response ? error.response?.data.message : "Something went wrong"
      );
    },
  });
  return { createQuiz, isPending };
};
export const useFetchQuiz = () => {
  const fetchQuizRequest = async () => {
    const { data } = await axiosClient.get("/api/v1/quiz");
    return data;
  };
  const { data, isLoading, error } = useQuery({
    queryFn: fetchQuizRequest,
    queryKey: ["fetchUserQuiz"],
    retry: false,
  });
  return { data, isLoading, error };
};
export const useFetchQuizById = (quizId: string) => {
  const fetchQuizRequest = async () => {
    const { data } = await axiosClient.get(`/api/v1/quiz/${quizId}`);
    return data;
  };
  const { data, isLoading } = useQuery({
    queryFn: fetchQuizRequest,
    queryKey: ["fetchQuizById"],
  });
  return { data, isLoading };
};

export const useDelete = (quizId: string) => {
  const queryClient = useQueryClient();
  const deleteRequest = async () => {
    const { data } = await axiosClient.delete(`/api/v1/quiz/${quizId}`);
    return data;
  };
  const { mutate: deleteQuiz, isPending } = useMutation({
    mutationFn: deleteRequest,
    onSuccess: () => {
      toast.success("Successfully deleted!");
      queryClient.invalidateQueries({ queryKey: ["fetchUserQuiz"] });
      queryClient.refetchQueries({ queryKey: ["fetchUserQuiz"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.log(error);
      toast.error(error.response?.data.message || "Something went wrong");
    },
  });
  return { deleteQuiz, isPending };
};

export const useUpdateQuiz = (quizId: string) => {
  const queryClient = useQueryClient();
  const updateRequest = async (quizData: QuizDataType) => {
    const { data } = await axiosClient.put(`/api/v1/quiz/${quizId}`, {
      ...quizData,
    });
    return data;
  };
  const { mutate: updateQuiz, isPending } = useMutation({
    mutationFn: updateRequest,
    onSuccess: () => {
      toast.success("Updated Successfully!");
      queryClient.invalidateQueries({ queryKey: ["fetchUserQuiz"] });
      queryClient.refetchQueries({ queryKey: ["fetchUserQuiz"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.log(error);
      toast.error(error.response?.data.message || "Something went wrong");
    },
  });
  return { updateQuiz, isPending };
};
