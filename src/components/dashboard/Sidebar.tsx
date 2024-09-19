// import { Link, useLocation } from 'react-router-dom'

// const Sidebar = () => {
//     const { pathname } = useLocation()
//     console.log(pathname.split("/").at(-1))
//     const path = pathname.split("/").at(-1)
//     return (
//         <div className='flex items-center p-1 text-lg rounded-lg text-center bg-emerald-100 text-slate-600 font-semibold'>
//             <Link to={"/dashboard/quiz"} className={`flex-1 ${path === "quiz" && "bg-emerald-600 text-white rounded-md"}`}>Quiz</Link>
//             <Link to={"/dashboard/create"} className={`flex-1 ${path === "create" && "bg-emerald-600 text-white rounded-md"}`}>Create</Link>
//             {/* <Link to={"/dashboard/exams"} className={`flex-1 ${path === "exams" && "bg-emerald-600 text-white"}`}>Exam</Link> */}
//         </div>
//     )
// }

// export default Sidebar

import { ClipboardList, Plus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';


const Sidebar = () => {
    const { pathname } = useLocation();
    // console.log(pathname.includes("quiz"))
    const path = pathname.split("/").at(-1);

    return (
        <div className="min-h-screen md:w-64 bg-emerald-100 p-5 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-8"> Menu</h3>
            <nav className="space-y-4">
                <Link
                    to="/dashboard/quiz"
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md text-lg font-semibold ${pathname.includes("quiz") ? "bg-emerald-600 text-white" : "text-emerald-700 hover:bg-emerald-200"}`}>
                    <ClipboardList />
                    <span className='hidden md:block'>Quiz</span>
                </Link>
                <Link
                    to="/dashboard/create"
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md text-lg font-semibold ${path === "create" ? "bg-emerald-600 text-white" : "text-emerald-700 hover:bg-emerald-200"}`}>
                    <Plus />
                    <span className='hidden md:block'>Create</span>
                </Link>
            </nav>
        </div>
    );
};

export default Sidebar;
