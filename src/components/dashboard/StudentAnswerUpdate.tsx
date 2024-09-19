import { useFetchStudentAnswer } from '@/api/exam'
import { Check, Loader2Icon, X } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { Input } from '../ui/input'
import { useCallback, useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


type AnswerType = {
    answer: string;
    questionId: {
        correctAnswer: string;
        questionText: string;
        _id: string;
    }
}

interface StudentAnswerType {
    answer: Array<AnswerType>;
    studentId: {
        studentEmail: string;
        _id: string;
    };
    _id: string;
    marksObtained: number;
}

const StudentAnswerUpdate = () => {

    const { quizId } = useParams();
    const { data: studentData, isLoading: isStudentLoading } = useFetchStudentAnswer(quizId as string);
    const [stData, setStData] = useState<Array<StudentAnswerType>>([]);
    const [searchText, setSearchText] = useState<string>("");
    const [sortVal, setSortVal] = useState<string>("");

    const getSortedData = useCallback((data: Array<StudentAnswerType>, sortValue: string) => {
        return [...data].sort((a, b) => {
            switch (sortValue) {
                case "HM":
                    return b.marksObtained - a.marksObtained;
                case "LM":
                    return a.marksObtained - b.marksObtained;
                case "AZ":
                    return a.studentId.studentEmail.localeCompare(b.studentId.studentEmail, undefined, { sensitivity: 'base' });
                case "ZA":
                    return b.studentId.studentEmail.localeCompare(a.studentId.studentEmail, undefined, { sensitivity: 'base' });
                default:
                    return 0;
            }
        });
    }, []);
    useEffect(() => {
        if (studentData?.students) {
            setStData(studentData.students);
        }
    }, [studentData]);
    useEffect(() => {
        if (stData.length > 0 && sortVal) {
            setStData(prevData => getSortedData(prevData, sortVal));
        }
    }, [sortVal, getSortedData]);
    const debounceSearch = useCallback((text: string) => {
        if (!studentData?.students) return;
        const filterData = text.trim().length
            ? studentData.students.filter((student: StudentAnswerType) =>
                student.studentId.studentEmail.toLowerCase().includes(text.toLowerCase()))
            : studentData.students;
        setStData(filterData);
    }, [studentData]);
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            debounceSearch(searchText);
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [searchText, debounceSearch]);

    if (isStudentLoading) {
        return <Loader2Icon className='animate-spin text-slate-600 mx-auto my-6 w-12 h-12 ' />
    }
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className='border rounded-lg py-2 md:py-1 flex items-center justify-center text-sm font-semibold'>
                    Total Students Attempted: {studentData?.students?.length || 0}
                </div>
                <Input type='search' placeholder='Search Student' value={searchText} onChange={e => setSearchText(e.target.value)} />
                <Select onValueChange={(value: string) => setSortVal(value)}>
                    <SelectTrigger className="">
                        <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent className=''>
                        <SelectItem value="HM" className=''>
                            Highest Marks
                        </SelectItem>
                        <SelectItem value="LM">
                            Lowest Marks
                        </SelectItem>
                        <SelectItem value="ZA">
                            Z-A by Name
                        </SelectItem>
                        <SelectItem value="AZ">
                            A-Z by Name
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                {stData?.map((student: StudentAnswerType, index: number) => (
                    <div className='' key={index}>
                        <Accordion type="single" collapsible className='w-full border px-4 text-slate-700 rounded-lg '>
                            <AccordionItem value={String(index)} className='border-none'>
                                <AccordionTrigger className='hover:no-underline'>

                                    <div className="text-nowrap text-start w-full flex flex-col sm:flex-row justify-between  md:text-base pe-2">
                                        <p>Student {(index) + 1}</p>
                                        <p>Email: {student.studentId.studentEmail}</p>
                                        <p>Marks Obtained: {student.marksObtained}/{student.answer.length}</p>
                                    </div>

                                </AccordionTrigger>
                                <AccordionContent className='border-t pt-2'>
                                    <div className="grid grid-cols-1 gap-3 ">
                                        {student?.answer && student.answer.map((ans: AnswerType, idx) => (
                                            <div key={idx} className='grid grid-cols-1 md:grid-cols-8 '>

                                                <span className='col-span-1  font-semibold flex  md:justify-between'><>Question {idx + 1} </><span>:</span></span>
                                                <span className='col-span-1   md:col-span-7 flex flex-row gap-1'>  {ans.questionId?.questionText}</span>

                                                <span className='col-span-1 font-semibold flex md:justify-between'>Answer <span>:</span></span>
                                                <div className='col-span-1  md:col-span-7 flex flex-row gap-1'>
                                                    {ans.answer === ans.questionId.correctAnswer ? (
                                                        <span className='text-green-600 flex gap-1 sm:items-center'>
                                                            <Check size="1rem" className='mt-1' /> {ans.answer}
                                                        </span>
                                                    ) : (
                                                        <div className='flex gap-2 items-center'>
                                                            <span className='text-red-600 flex items-center'>
                                                                <X size="1rem" /> {ans.answer}
                                                            </span>
                                                            <span className='text-green-600 flex items-center'>
                                                                <Check size="1rem" /> {ans.questionId.correctAnswer}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                            </div>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default StudentAnswerUpdate