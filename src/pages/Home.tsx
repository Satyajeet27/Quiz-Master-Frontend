import { Link } from "react-router-dom"
import quizImage from "../assets/homePageImage.png"

const Home = () => {
    return (
        <div className='container text-emerald-600'>
            <div className="text-center py-10 ">
                <h2 className='text-5xl font-semibold text-emerald-600'>Welcome to <span className='text-emerald-800 font-bold'>QuizMaster</span></h2>
                <p className=''>Create engaging quizzes, challenge your audience, and see who scores the highest!</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 ">
                <div className="flex justify-center md:justify-start ">
                    <img src={quizImage} className="max-w-full " alt="Quiz" />
                </div>
                <div className="p-6">
                    <h3 className='text-3xl font-semibold'>Create, Share, and Manage Quizzes</h3>
                    <p className='text-sm mb-4'>As a host, you can easily sign up, create questions, and generate unique quiz links to share with takers. Manage everything from one platform!</p>
                    <Link to={"/dashboard/quiz"} className="bg-emerald-600 hover:bg-emerald-800 text-white px-4 py-2 rounded-md">Lets get Started</Link>
                </div>
            </div>
        </div>
    )
}

export default Home