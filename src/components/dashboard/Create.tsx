import { Lightbulb, Loader2Icon } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useCreateQuiz, useUpdateQuiz } from "@/api/quiz"
import { useLocation } from "react-router-dom"
import { QuizDataType } from "./DashboardQuiz"

const formSchema = z.object({
    title: z.string().min(1, "title should not empty"),
    description: z.string().min(1, "Description should not empty"),
})

const Create = ({ title, description, _id }: QuizDataType) => {
    const { pathname } = useLocation()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: pathname.includes("create") ? {
            title: "", description: ""
        } : {
            title, description
        }
    })

    const { createQuiz, isPending } = useCreateQuiz()
    const { updateQuiz, isPending: isUpdatePending } = useUpdateQuiz(_id as string)
    const handleSubmit = (value: z.infer<typeof formSchema>) => {
        if (pathname.includes("create")) {
            createQuiz(value)

        } else {
            updateQuiz(value)
        }
    }
    return (
        <div className="text-slate-600">
            <Form {...form}>
                {pathname.includes("create") && <p className=" sm:text-lg md:text-xl mb-4 font-semibold flex items-center gap-1 "><Lightbulb /> Quiz Creation Station</p>}
                <form onSubmit={form.handleSubmit(handleSubmit)} className={`${pathname.includes("create") ? "space-y-4" : "space-y-2"}`}>
                    <FormField control={form.control} name='title' render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input  {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )} />
                    <FormField control={form.control} name='description' render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl >
                                <Input  {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    {pathname.includes("create") ?
                        <Button className="bg-emerald-600 hover:bg-emerald-500">         {isPending ? <Loader2Icon className="animate-spin" /> : "Create"}</Button> :

                        <Button>
                            {isUpdatePending ? <Loader2Icon className="animate-spin" /> : "Create"}
                        </Button>}
                </form>
            </Form>
        </div>
    )
}

export default Create