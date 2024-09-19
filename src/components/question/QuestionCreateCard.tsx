import { useEffect, useState } from 'react'
import { Input } from '../ui/input'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useCreateQuestion, useUpdateQuestion } from '@/api/question'
import { useParams } from 'react-router-dom'

const formSchema = z.object({
    _id: z.string().optional(),
    questionText: z.string().min(10, "Question should be of minimum 10 characters"),
    option: z.array(z.string().min(1, "Each choice should be of at least 1 character")),
    correctAnswer: z.string()
})

export type QuestionType = z.infer<typeof formSchema>



interface QuestionCardType {
    isEdit?: boolean;
    quesnData?: QuestionType
}

const QuestionCreateCard = ({ isEdit, quesnData }: QuestionCardType) => {
    const { quizId } = useParams()
    const [NoOfOptions, setNoOfOptions] = useState<number>(1)
    console.log(quesnData)
    const _id = quesnData?._id;
    const questionText = quesnData?.questionText || '';
    const option = quesnData?.option || ['', '', '', ''];
    const correctAnswer = quesnData?.correctAnswer || '';
    useEffect(() => {
        if (NoOfOptions > 4) {
            setNoOfOptions(4)
            alert("Cannot have more 4 options")

        }
    }, [NoOfOptions])

    const form = useForm<QuestionType>({
        resolver: zodResolver(formSchema),
        defaultValues: isEdit ?
            {
                questionText,
                option,
                correctAnswer
            }
            :
            {
                questionText: "",
                option: ["", "", "", ""],
                correctAnswer: ""
            }
    })
    const { createQuestion } = useCreateQuestion(quizId as string)
    const { updateQuestion } = useUpdateQuestion(_id as string)
    const handleSubmit = (value: QuestionType) => {
        // console.log(value.option)
        if (isEdit) {
            console.log(value)
            updateQuestion(value)
        } else {
            createQuestion(value)
        }
        form.reset()
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className=" text-slate-600 space-y-4 ">

                <FormField control={form.control} name='questionText' render={({ field }) => (
                    <FormItem className='grid grid-cols-6 items-center'>
                        <FormLabel className="col-span-1 text-nowrap">Question</FormLabel>
                        <FormControl className="col-span-5">
                            <Input {...field} />
                        </FormControl>
                        <div className="col-start-2 col-span-4">
                            <FormMessage />
                        </div>
                    </FormItem>
                )} />

                {Array.from({ length: 4 }).map((_, index: number) => (
                    <FormField key={index} control={form.control} name={`option.${index}`} render={({ field }) => (
                        <FormItem className='grid grid-cols-6 items-center'>
                            <FormLabel className=" col-span-1 text-nowrap">Option {index + 1}</FormLabel>
                            <FormControl className="col-span-5">
                                <Input {...field} />
                            </FormControl>
                            <div className="col-start-2 col-span-4">
                                <FormMessage />
                            </div>
                        </FormItem>
                    )} />
                ))}


                <FormField control={form.control} name='correctAnswer' render={({ field }) => (
                    <FormItem className='grid grid-cols-6 items-center'>
                        <FormLabel className="col-span-1">Correct Answer</FormLabel>
                        <FormControl className="col-span-5">
                            <>
                                {/* <Input {...field} /> */}
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className='col-span-5 '>
                                        <SelectValue placeholder="Select the Option" />
                                    </SelectTrigger>
                                    <SelectContent >
                                        <SelectGroup>


                                            {
                                                form.getValues().option.map((optionVal, index) => (
                                                    <SelectItem key={index} value={optionVal ? optionVal : String(index)}>Option {index + 1}</SelectItem>
                                                ))
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </>
                        </FormControl>
                        <div className="col-start-2 col-span-4">
                            <FormMessage />
                        </div>
                    </FormItem>
                )} />
                <Button>{isEdit ? "Update" : "Create"}</Button>
            </form>
        </Form >

    )
}

export default QuestionCreateCard