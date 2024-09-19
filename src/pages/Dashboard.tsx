import Sidebar from '@/components/dashboard/Sidebar'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
    return (
        <div className="flex bg-gray-100">
            <Sidebar />
            <div className="flex-1 p-3 md:p-6 bg-white shadow-lg ">
                <h2 className="text-gray-700 text-2xl md:text-4xl font-bold mb-4 md:mb-6">Dashboard</h2>
                <div className="grid grid-cols-1  gap-4">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard