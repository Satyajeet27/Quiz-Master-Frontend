import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient from "./axiosApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AxiosError } from "axios";

type StudentData = {
  studentUsername: string;
  studentEmail: string;
};

export const useRegister = (quizId: string) => {
  const navigate = useNavigate();
  const registerRequest = async (studentData: StudentData) => {
    const { data } = await axiosClient.post(`/api/v1/exam/${quizId}/register`, {
      ...studentData,
    });
    return data;
  };
  const { mutate: register, isPending } = useMutation({
    mutationFn: registerRequest,
    onSuccess: () => {
      navigate(`/${quizId}/exam`);
      toast.success("Registered successfully!");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message);
    },
  });
  return { register, isPending };
};

export const useStudentAuth = () => {
  const checkAuthentication = async () => {
    const { data } = await axiosClient.get("/api/v1/exam/auth/check");
    return data;
  };
  const {
    data: studentData,
    isLoading,
    isSuccess: isAuthenticated,
  } = useQuery({
    queryKey: ["studentAuthQuery"],
    queryFn: checkAuthentication,
  });
  return { isAuthenticated, isLoading, studentData };
};

export const useDisplayQuestions = (quizId: string) => {
  const fetchQuesRequest = async () => {
    const { data } = await axiosClient.get(`/api/v1/exam/${quizId}`);
    return data;
  };
  const { data, isLoading } = useQuery({
    queryFn: fetchQuesRequest,
    queryKey: ["fetchExamQuestions"],
  });
  return { data, isLoading };
};

type AnswerData = {
  questionId: string;
  answer: string;
};
export const useSubmitAnswer = (quizId: string) => {
  const queryClient = useQueryClient();
  const submitAnswerRequest = async (answerData: Array<AnswerData>) => {
    const { data } = await axiosClient.post(
      `/api/v1/exam/${quizId}`,
      answerData
    );
    return data;
  };
  const {
    mutate: submitAnswer,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: submitAnswerRequest,
    onSuccess: () => {
      toast.success("Answers submitted successfully");
      // navigate("/completed");
      queryClient.removeQueries({ queryKey: ["studentAuthQuery"] });
      queryClient.refetchQueries({ queryKey: ["studentAuthQuery"] });
    },
    onError: (error: AxiosError) => {
      console.log(error.response?.data);
      toast.error("Something went wrong, please try to submit again!");
    },
  });
  return { submitAnswer, isPending, isSuccess, error };
};

export const useFetchStudentAnswer = (quizId: string) => {
  const studentAnsRequest = async () => {
    const { data } = await axiosClient.get(
      `/api/v1/exam/${quizId}/student`
    );
    return data;
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["studentAnswer"],
    queryFn: studentAnsRequest,
  });
  return { data, isLoading, isError };
};
