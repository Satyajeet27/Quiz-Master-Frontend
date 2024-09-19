import { useLogin } from '@/api/user'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'


const formSchema = z.object({
    email: z.string().email("must be email"),
    password: z.string().min(1, "password should not be empty")
})

const Login = () => {
    const { login, isPending } = useLogin()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })
    const handleSubmit = (value: z.infer<typeof formSchema>) => {
        // console.log(value)
        login(value)
    }
    return (
        <div className="container pt-10 ">
            <div className="bg-white space-y-2 py-6 px-4 mx-auto md:w-1/2 border rounded-lg shadow-lg">
                <h2 className='text-3xl text-center font-bold text-emerald-500'>Let's Login and get started!</h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
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
                        <div className="flex gap-4 items-center">
                            <Button className='bg-emerald-700 hover:bg-emerald-800'>{isPending ? <Loader2Icon className='animate-spin' /> : "Login"}</Button>
                            <Link to={"/signup"} className='hover:underline text-blue-500 tracking-tight '>Don't have account? Signup here</Link>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Login