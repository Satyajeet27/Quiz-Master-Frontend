import { QuizDataType } from './DashboardQuiz'
import { Card, CardDescription, CardTitle } from '../ui/card'
import { Link } from 'react-router-dom'
import DeleteAlert from './DeleteAlert'
import EditQuiz from './EditQuiz'


const QuizCard = ({ title, _id, description }: QuizDataType) => {
    return (
        <Card className=' p-4 w-full flex justify-between bg-emerald-50'>
            <Link to={`/dashboard/quiz/${_id}`} className='hover:text-emerald-700 space-y-1'>
                <CardTitle className=''>Quiz: {title}</CardTitle>
                <CardDescription className=''>Description: {description}</CardDescription>
            </Link>
            <div className="flex flex-col sm:flex-row items-center gap-2">
                <EditQuiz _id={_id} title={title} description={description} />
                <DeleteAlert isQuiz={true} _id={_id as string} />
            </div>
        </Card>


    )
}

export default QuizCard