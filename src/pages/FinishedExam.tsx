import { CheckCircleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FinishedExam = () => {
    const [countdown, setCountdown] = useState(5);
    const { quizId } = useParams()
    const navigate = useNavigate();
    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCount) => {
                if (prevCount <= 1) {
                    clearInterval(timer);
                    navigate(`/${quizId}/exam/register`);
                    return 0
                }
                return prevCount - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate, quizId])

    return (
        <div className="flex items-center justify-center mt-16">
            <div className=" max-w-lg text-center">
                <CheckCircleIcon className="w-16 h-16 mx-auto text-green-500 mb-4" />
                <h1 className="text-4xl font-bold text-gray-800">Exam Completed!</h1>
                <p className="mt-4 text-gray-500">Congratulations on finishing your exam! You will receive your results via email very soon.</p>
                <p className="mt-4 text-gray-600">
                    You will be redirected in {countdown} seconds. You may also close this window now.
                </p>
            </div>
        </div>
    );
};

export default FinishedExam;
