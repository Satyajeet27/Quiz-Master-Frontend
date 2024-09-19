import ExamNav from '@/components/ExamNav'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const ExamLayout = ({ children }: Props) => {
    return (
        <div className=''>
            <ExamNav />
            <div className="">{children}</div>
        </div>
    )
}

export default ExamLayout