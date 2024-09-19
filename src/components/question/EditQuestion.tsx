import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import QuestionCreateCard, { QuestionType } from './QuestionCreateCard'
import { EditIcon } from 'lucide-react'

const EditQuestion = ({ quesnData }: { quesnData: QuestionType }) => {
    return (
        <Dialog >
            <DialogTrigger className='hover:scale-105 cursor-pointer'>
                <EditIcon className='text-green-500' size={"1.2rem"} />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <QuestionCreateCard isEdit={true} quesnData={quesnData} />
                    <DialogDescription></DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default EditQuestion