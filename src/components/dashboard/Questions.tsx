import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '../ui/dialog'
import QuestionCreateCard from '../question/QuestionCreateCard'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Link, useParams } from 'react-router-dom'
import { Copy, Loader2Icon } from 'lucide-react'
import QuestionCard from '../question/QuestionCard'
import { useFetchQuizById } from '@/api/quiz'
import { useFetchQuestionByQuizId } from '@/api/question'
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'

const Questions = () => {
    const { quizId } = useParams()
    const { data, isLoading } = useFetchQuizById(quizId as string)
    const { data: questionData, isLoading: isQuesLoading } = useFetchQuestionByQuizId(quizId as string)
    return (
        <div className=' py-2 md:p-6'>
            {
                isLoading ? <Loader2Icon className='text-slate-600 animate-spin my-6' /> : <div className="mb-4 md:mb-8">
                    <p className='font-semibold text-emerald-700 text-3xl mb-2'>{data?.title}</p>
                    <p className='text-sm text-emerald-600'>{data?.description}</p>
                </div>
            }
            <div className="grid grid-cols-1 gap-6">
                <div className="space-y-6">
                    <div className="flex gap-2 md:gap-4 items-center">
                        <Dialog >
                            <DialogTrigger className='bg-emerald-600 text-start text-sm sm:text-base px-2 md:px-4 py-1 md:py-2 rounded-md text-white font-semibold hover:bg-emerald-800'>
                                Create Questions
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle></DialogTitle>
                                    <QuestionCreateCard isEdit={false} />
                                    <DialogDescription></DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                        <Popover >
                            <PopoverTrigger>
                                <div className="text-sm sm:text-base text-start text-white flex items-center gap-2 bg-emerald-600 px-2 md:px-4 py-1 md:py-2 rounded-md">
                                    <span className='font-semibold'>Exam Link</span>
                                    <Copy size={"1rem"} />
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className='w-full rounded-full text-blue-700 cursor-pointer '>
                                {
                                    (!isQuesLoading && questionData?.length >= 5) ?
                                        <Link className='hover:underline' to={`/${quizId}/exam/register`}>
                                            http://localhost:5173/{quizId}/exam/register
                                        </Link>
                                        :
                                        <div className='text-red-600 text-sm md:text-base'>Create 5 questions to unlock the exam link.</div>
                                }

                            </PopoverContent>
                        </Popover>
                    </div>
                    <QuestionCard />
                </div>

            </div>
        </div>
    )
}

export default Questions