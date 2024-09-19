import { useFetchQuestionByQuizId } from '@/api/question'
import { useParams } from 'react-router-dom'
import { Loader2Icon } from 'lucide-react'
import { QuestionType } from './QuestionCreateCard'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import DeleteAlert from '../dashboard/DeleteAlert'
import EditQuestion from './EditQuestion'



const QuestionCard = () => {
    const { quizId } = useParams()
    const { data, isLoading } = useFetchQuestionByQuizId(quizId as string)
    return (
        <div className="my-4 flex flex-col gap-4">
            {
                isLoading ?
                    <Loader2Icon className='animate-spin text-slate-600 my-4 ' />
                    :
                    data?.length === 0
                        ?
                        <div className='bg-emerald-200 text-emerald-700  py-2 w-full text-center rounded-lg'>No Questions created</div>
                        :
                        data?.map((quesnData: QuestionType, index: number) => (
                            <Accordion type="single" collapsible key={index}>
                                <AccordionItem value={String(index)}>
                                    <AccordionTrigger className='text-start'>Question {index + 1}: {quesnData.questionText}</AccordionTrigger>
                                    <AccordionContent>
                                        {
                                            quesnData?.option.map((option, index) => (<div key={index}>Option {index + 1}: {option}</div>))
                                        }
                                        <p className='text-green-700'>Correct Anwser: {quesnData.correctAnswer}</p>
                                        <div className="flex gap-2 items-center mt-2">
                                            {/* <Trash2 className='text-red-500' size={"1.2rem"} /> */}
                                            <DeleteAlert isQuiz={false} _id={quesnData._id as string} />
                                            <EditQuestion quesnData={quesnData} />
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        ))
            }
        </div>
    )
}

export default QuestionCard