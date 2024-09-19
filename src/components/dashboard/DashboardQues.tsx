import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import Questions from './Questions'
import ExamResults from './ExamResults'


const DashboardQues = () => {
    return (
        <div className='my-2'>
            <Tabs defaultValue="questions" className="">
                <TabsList className='w-full'>
                    <TabsTrigger value="questions" className='w-full'>Questions</TabsTrigger>
                    <TabsTrigger value="resuts" className='w-full'>Results</TabsTrigger>
                </TabsList>
                <TabsContent value="questions">
                    <Questions />
                </TabsContent>
                <TabsContent value="resuts"><ExamResults /></TabsContent>
            </Tabs>
        </div>
    )
}

export default DashboardQues