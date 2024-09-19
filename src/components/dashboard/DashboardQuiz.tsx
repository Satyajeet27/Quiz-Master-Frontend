import { Card } from '../ui/card'
import { useFetchQuiz } from '@/api/quiz'
import { AlertTriangle, LoaderCircle } from 'lucide-react'
import QuizCard from './QuizCard'

export type QuizDataType = {
    _id?: string;
    title: string;
    description: string;
}

const DashboardQuiz = () => {
    const { data, isLoading, error } = useFetchQuiz()
    if (isLoading) {
        return <LoaderCircle size={"2.5rem"} className='mx-auto animate-spin text-center my-10 text-slate-500' />
    }
    if (error) {
        return <div className='text-red-500 font-semibold '><AlertTriangle />Error in Loading the data</div>
    }
    return (
        <div className='my-2'>
            <div className="">
                <Card className='w-fit p-4 flex gap-2 font-semibold text-slate-700'>
                    <div className="">No. of Quiz:</div>
                    <div className="">{data?.length}</div>
                </Card>

                {/* <Create /> */}
                <div className="my-5 flex flex-col flex-nowrap gap-3 w-full">
                    {
                        data?.map((quizData: QuizDataType, index: number) => (
                            <div key={index}>
                                <QuizCard description={quizData.description} title={quizData.title} _id={quizData._id} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default DashboardQuiz