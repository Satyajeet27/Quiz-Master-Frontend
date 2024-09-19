import { useStudentAuth } from '@/api/exam';
import { LoaderCircle } from 'lucide-react';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

type Props = {
    children: React.ReactNode;
};

const PrivateExamRoute = ({ children }: Props) => {
    const navigate = useNavigate();
    const { isAuthenticated, isLoading } = useStudentAuth();
    const { quizId } = useParams()
    console.log(isAuthenticated)
    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            toast.error("Please register yourself first!")
            navigate(`/${quizId}/exam/register`);
        }
    }, [isAuthenticated, isLoading, navigate, quizId]);

    if (isLoading) {
        return <LoaderCircle className='animate-spin w-fit mx-auto my-10 text-slate-500' size={"4rem"} />
    }

    if (isAuthenticated) {
        return <div>{children}</div>;
    }

    return null;
};

export default PrivateExamRoute;
