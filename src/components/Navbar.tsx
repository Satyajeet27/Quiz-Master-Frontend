import { GraduationCapIcon, UserCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { useAuth, useLogout } from "@/api/user"
import { useEffect } from "react"

const Navbar = () => {
    const { isAuthenticated, isLoading } = useAuth()
    const { logout } = useLogout()
    useEffect(() => { }, [isAuthenticated])
    const handleLogout = () => {
        logout()
    }
    return (
        <div className="border border-b-emerald-100 bg-emerald-50">
            <div className=" container flex justify-between items-center py-4 text-emerald-600">
                <Link to={"/"} className="bg-emerald-200 px-4 py-1 w-fit rounded-full text-2xl font-semibold  flex gap-1 items-center"><GraduationCapIcon size={"2rem"} />Quiz</Link>
                {
                    (isAuthenticated && !isLoading)
                        ?
                        <div className="flex gap-2 md:gap-4 items-center">
                            <p className="flex gap-1 items-center text-emerald-700"><UserCircle size={"1.4rem"} /> {isAuthenticated.email && isAuthenticated.email}</p>
                            <Button onClick={handleLogout} className="bg-emerald-600 hover:bg-emerald-700 px-3 py-1 text-white rounded-md">Logout</Button>
                        </div>
                        :
                        <Link to={"/login"} className="bg-emerald-600 hover:bg-emerald-700 px-3 py-1 text-white rounded-md">Login</Link>
                }
            </div>
        </div>
    )
}

export default Navbar