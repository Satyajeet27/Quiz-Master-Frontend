import { useAuth } from '@/api/user';
import { LoaderCircle } from 'lucide-react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
    children: React.ReactNode;
};

const PrivateRoute = ({ children }: Props) => {
    const navigate = useNavigate();
    const { isAuthenticated, isLoading } = useAuth();
    // console.log(isAuthenticated)
    useEffect(() => {
        if (!isLoading && isAuthenticated?.message !== "Authenticated") {
            navigate('/login');
        }
    }, [isAuthenticated, navigate, isLoading]);

    if (isLoading) {
        return <LoaderCircle className='animate-spin w-fit mx-auto my-10 text-green-400' size={"4rem"} />
    }

    if (isAuthenticated?.message == "Authenticated") {
        return <div className=''>{children}</div>;
    }


};

export default PrivateRoute;
