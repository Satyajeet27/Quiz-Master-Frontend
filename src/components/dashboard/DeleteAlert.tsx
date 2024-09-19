import { useDeleteQuestion } from "@/api/question"
import { useDelete } from "@/api/quiz"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { AlertCircle, Loader2Icon, Trash2 } from "lucide-react"


const DeleteAlert = ({ _id, isQuiz }: { _id: string, isQuiz: boolean }) => {
    const { deleteQuiz, isPending } = useDelete(_id)
    const { deleteQuesn, isPending: isDelQuesPending } = useDeleteQuestion(_id)
    const handleDelete = () => {
        if (isQuiz) {
            deleteQuiz()
        } else {
            deleteQuesn()
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Trash2 className='text-red-500 hover:scale-105 cursor-pointer' size={!isQuiz ? "1.2rem" : "1.5rem"} />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex gap-1 items-center"><AlertCircle /> Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your {isQuiz ? "quiz" : "question"}
                        and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-500 hover:bg-red-700" onClick={handleDelete}>
                        {(isPending || isDelQuesPending) ? <Loader2Icon className="animate-spin text-white" /> : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteAlert