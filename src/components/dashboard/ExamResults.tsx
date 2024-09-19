import StudentAnswerUpdate from './StudentAnswerUpdate'

const ExamResults = () => {
    return (
        <div className="py-2 space-y-6">
            <p className='bg-red-600 px-6 py-2 w-fit text-white rounded-md'>
                Exams Result
            </p>
            {/* <StudentChart /> */}
            {/* <StudentAnswer /> */}
            <StudentAnswerUpdate />
        </div>
    )
}

export default ExamResults