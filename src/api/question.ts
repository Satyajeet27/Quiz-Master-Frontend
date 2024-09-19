import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient from "./axiosApi";
import { QuestionType } from "@/components/question/QuestionCreateCard";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useCreateQuestion = (quizId: string) => {
  const queryClient = useQueryClient();
  const createQuestionRequest = async (questionData: QuestionType) => {
    const { data } = await axiosClient.post(`/api/v1/question/${quizId}`, {
      ...questionData,
    });
    return data;
  };
  const { mutate: createQuestion } = useMutation({
    mutationFn: createQuestionRequest,
    onSuccess: () => {
      toast.success("Question Created Successfully!");
      queryClient.invalidateQueries({ queryKey: ["fetchQuesByQuizId"] });
    },
    onError: (error: AxiosError) => {
      console.log(error);
      toast.error("Question failed to create successfully!");
    },
  });
  return { createQuestion };
};

export const useFetchQuestionByQuizId = (quizId: string) => {
  const fetchQuesRequest = async () => {
    const { data } = await axiosClient.get(`/api/v1/question/${quizId}`);
    return data;
  };
  const { data, isLoading } = useQuery({
    queryFn: fetchQuesRequest,
    queryKey: ["fetchQuesByQuizId"],
  });
  return { data, isLoading };
};

export const useDeleteQuestion = (quesId: string) => {
  const queryClient = useQueryClient();
  const deleteRequest = async () => {
    const { data } = await axiosClient.delete(`/api/v1/question/${quesId}`);
    return data;
  };
  const { mutate: deleteQuesn, isPending } = useMutation({
    mutationFn: deleteRequest,
    onSuccess: () => {
      toast.success("Updated Successfully!");
      queryClient.invalidateQueries({ queryKey: ["fetchQuesByQuizId"] });
      queryClient.refetchQueries({ queryKey: ["fetchQuesByQuizId"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.log(error);
      toast.error(error.response?.data.message || "Something went wrong");
    },
  });
  return { deleteQuesn, isPending };
};

export const useUpdateQuestion = (questionId: string) => {
  const queryClient = useQueryClient();
  const updateQuestionRequest = async (questionData: QuestionType) => {
    const { data } = await axiosClient.put(`/api/v1/question/${questionId}`, {
      ...questionData,
    });
    return data;
  };
  const { mutate: updateQuestion } = useMutation({
    mutationFn: updateQuestionRequest,
    onSuccess: () => {
      toast.success("Question updated Successfully!");
      queryClient.invalidateQueries({ queryKey: ["fetchQuesByQuizId"] });
    },
    onError: (error: AxiosError) => {
      console.log(error);
      toast.error("Failed to update question!");
    },
  });
  return { updateQuestion };
};
