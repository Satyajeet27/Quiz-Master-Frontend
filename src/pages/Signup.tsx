import { useSignup } from '@/api/user'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'


const formSchema = z.object({
    username: z.string().min(1, "username should not be empty"),
    email: z.string().email("must be email"),
    password: z.string().min(6, "password should be atleast 6 characters"),
    confirmPassword: z.string().min(6, "confirm password should be atleast 6 characters"),
})

const Signup = () => {
    const { signup, isPending, isSuccess } = useSignup()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            email: "",
            password: "",
            confirmPassword: ''
        }
    })
    const handleSubmit = (value: z.infer<typeof formSchema>) => {
        if (value.confirmPassword !== value.password) {
            form.setError("confirmPassword", { message: "Password did not match" })
        }
        console.log(value)
        signup({ email: value.email, password: value.password, username: value.username })

        // login(value)
    }
    useEffect(() => {
        if (isSuccess) {
            form.reset()
        }
    }, [isSuccess, form])
    return (
        <div className="container pt-10 ">
            <div className="bg-white space-y-2 py-6 px-4 mx-auto md:w-1/2 border rounded-lg shadow-lg">
                <h2 className='text-3xl text-center font-bold text-emerald-500'>Create your Account here!</h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
                        <FormField control={form.control} name='username' render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder='alex' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name='email' render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder='xyz@gmail.com' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name='password' render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder='. . . . . . .' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name='confirmPassword' render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type='password' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <div className="flex gap-2 items-center">
                            <Button className='bg-emerald-700 hover:bg-emerald-800'>{isPending ? <Loader2Icon className='animate-spin' /> : "Login"}</Button>
                            <Link to={"/login"} className='hover:underline text-blue-500 tracking-tight '>Already have Account? Login here</Link>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Signup