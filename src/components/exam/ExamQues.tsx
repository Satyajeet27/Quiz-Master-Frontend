import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

export type ExamQuesType = {
    _id: string;
    questionText: string | undefined;
    option: string[] | undefined;
    index: number;
    selectedAnswer: string | null;
    onSelectAnswer: (questionId: string, answer: string) => void;
}

const ExamQues = ({ questionText,
    option,
    index,
    _id,
    selectedAnswer,
    onSelectAnswer }: ExamQuesType) => {
    const handleSelection = (answer: string) => {
        onSelectAnswer(_id, answer);
    };


    return (
        <div className="">
            <Card className=' bg-slate-100'>
                <CardHeader>
                    <CardTitle>Question {index}: {questionText}</CardTitle>
                </CardHeader>
                <CardContent className='grid grid-col-1 md:grid-cols-2 gap-2'>
                    {
                        option?.map((questionOpt, index: number) => (<CardDescription
                            key={index}
                            onClick={() => handleSelection(questionOpt)}
                            className={`border rounded-lg p-2 cursor-pointer ${selectedAnswer === questionOpt ? 'bg-blue-200' : 'bg-white'
                                }`}
                        >
                            {questionOpt}
                        </CardDescription>))
                    }
                </CardContent>
            </Card>
        </div>
    )
}

export default ExamQues