import { useDisplayQuestions, useSubmitAnswer } from '@/api/exam'
import ExamQues, { ExamQuesType } from '@/components/exam/ExamQues'
import { Button } from '@/components/ui/button'
import { Loader2Icon, LoaderCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

type AnswerSubmitType = {
    questionId: string;
    answer: string;
}

const ExamHome = () => {
    const { quizId } = useParams()
    const { data, isLoading } = useDisplayQuestions(quizId as string)
    const [selectedAnswers, setSelectedAnswers] = useState<AnswerSubmitType[]>([]);
    const navigate = useNavigate()
    //
    const handleSelectAnswer = (questionId: string, answer: string) => {
        setSelectedAnswers(prevAnswers => {
            const newAnswers = prevAnswers.filter(a => a.questionId !== questionId);
            if (prevAnswers.some(a => a.questionId === questionId && a.answer === answer)) {
                // If the same answer is selected again, remove it (deselect)
                return newAnswers;
            } else {
                // Otherwise, add the new answer
                return [...newAnswers, { questionId, answer }];
            }
        });
    };
    //
    const { submitAnswer, isPending, isSuccess, error } = useSubmitAnswer(quizId as string)
    const handleSubmit = () => {
        console.log(data?.length, selectedAnswers.length);
        if (data?.length !== selectedAnswers.length) {
            toast.warning("You need to complete all the questions")
        } else {
            submitAnswer(selectedAnswers)
        }
    };

    useEffect(() => {
        if (isSuccess) {
            navigate("finished")
        }
    }, [isSuccess, navigate])
    useEffect(() => {
        if (error) {
            navigate("register")
        }
    }, [error, navigate])

    return (
        <div className='container my-6'>
            <h2 className='text-3xl mb-2 font-semibold'>Skill up yourself</h2>
            <div className="mb-6 flex gap-2 text-xs md:text-sm text-center">
                <p className=' border shadow-md px-6 py-2 font-semibold w-fit rounded-md flex flex-col'>Total Question<span>{data?.length}</span></p>
                <p className='border shadow-md px-6 py-2 font-semibold w-fit rounded-md flex flex-col'>Question Attempted<span>{selectedAnswers?.length}</span> </p>
                <p className='border shadow-md px-6 py-2 font-semibold w-fit rounded-md flex flex-col'>Remaining Question<span>{data?.length - selectedAnswers.length}</span></p>
            </div>
            <div className="grid grid-cols-1 gap-4">{isLoading ? <Loader2Icon className='animate-spin' /> : data?.length === 0 ? <div>No Question Found</div> : data?.map((quest: ExamQuesType, index: number) => (<ExamQues
                key={quest._id}
                questionText={quest.questionText}
                _id={quest._id}
                option={quest.option}
                index={index + 1}
                selectedAnswer={selectedAnswers.find(a => a.questionId === quest._id)?.answer || null}
                onSelectAnswer={handleSelectAnswer}
            />))}</div>
            <Button onClick={handleSubmit} className="mt-4">{isPending ? <LoaderCircle className='animate-spin' /> : "Submit All Answers"}</Button>
        </div>
    )
}

export default ExamHome