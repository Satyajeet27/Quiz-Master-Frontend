import {
    Dialog,
    DialogContent,
    DialogDescription,

    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { EditIcon } from "lucide-react"
import Create from "./Create"
import { QuizDataType } from "./DashboardQuiz"

const EditQuiz = ({ title, description, _id }: QuizDataType) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <EditIcon className='text-green-500 hover:scale-105 cursor-pointer' />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                {/* <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            defaultValue="Pedro Duarte"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input
                            id="username"
                            defaultValue="@peduarte"
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter> */}
                <Create _id={_id} title={title} description={description} />
            </DialogContent>
        </Dialog>
    )
}
export default EditQuiz