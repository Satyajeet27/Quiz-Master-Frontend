import { useRegister } from '@/api/exam'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { z } from 'zod'

const formSchema = z.object({
    email: z.string().email("must be email"),
    username: z.string().min(1, "username should not be empty")
})

const Register = () => {
    const { quizId } = useParams()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            username: ""
        }
    })
    const { register, isPending } = useRegister(quizId as string)
    const handleSubmit = (value: z.infer<typeof formSchema>) => {
        register({ studentEmail: value.email, studentUsername: value.username })
        console.log(value)

    }
    // useEffect(() => {
    //     window.history.pushState({}, "", document.URL)
    //     const handlePopState = () => {
    //         window.history.pushState({}, "", document.URL);
    //         // Show Alert

    //         toast.warning(
    //             "Oops! The back button not allowed!"
    //         )

    //     };
    //     window.addEventListener("popstate", handlePopState)
    //     return () => {
    //         window.removeEventListener("popstate", handlePopState);
    //     };
    // }, [])
    return (
        <div className='container h-[30rem] flex flex-col justify-center'>
            <h2 className='text-5xl text-center text-slate-600 font-bold'>Register Yourself to get started with exam</h2>
            <div className="my-6 md:w-1/3 mx-auto">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
                        <FormField control={form.control} name='username' render={({ field }) => (
                            <FormItem>

                                <FormControl>
                                    <Input placeholder='username: Alex' {...field} />
                                </FormControl>
                            </FormItem>
                        )} />
                        <FormField control={form.control} name='email' render={({ field }) => (
                            <FormItem>

                                <FormControl>
                                    <Input placeholder='Email: xyz@gmail.com' {...field} />
                                </FormControl>
                            </FormItem>
                        )} />

                        <Button className='w-full bg-emerald-700 hover:bg-emerald-800'>{isPending ? <LoaderCircle className='animate-spin' /> : "Register"}</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Register