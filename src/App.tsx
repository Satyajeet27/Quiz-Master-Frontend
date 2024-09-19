import { createBrowserRouter } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './pages/Home'
import React from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './PrivateRoute/PrivateRoute'
import ExamHome from './pages/ExamHome'
import ExamLayout from './layout/ExamLayout'
import Register from './components/exam/Register'
import PrivateExamRoute from './PrivateRoute/PrivateExamRoute'
import FinishedExam from './pages/FinishedExam'
import Create from './components/dashboard/Create'
import DashboardQuiz from './components/dashboard/DashboardQuiz'
import DashboardQues from './components/dashboard/DashboardQues'
import ExamResults from './components/dashboard/ExamResults'
import Signup from './pages/Signup'

const withLayout = (children: React.ReactNode) => <Layout>{children}</Layout>
const withPrivate = (children: React.ReactNode) => <Layout><PrivateRoute>{children}</PrivateRoute></Layout>
const withExamLayout = (children: React.ReactNode) => <ExamLayout>{children}</ExamLayout>
const withPrivateExam = (children: React.ReactNode) => <ExamLayout><PrivateExamRoute>{children}</PrivateExamRoute></ExamLayout>
const router = createBrowserRouter([
  { path: "/", element: withLayout(<Home />) },
  { path: "/login", element: withLayout(<Login />) },
  { path: "/signup", element: withLayout(<Signup />) },
  {
    path: "/dashboard", element: withPrivate(<Dashboard />), children: [
      { path: "create", element: <Create title='' description='' /> },
      {
        path: "quiz", element: <DashboardQuiz />
      },
      { path: "quiz/:quizId", element: <DashboardQues /> },
      { path: ":quizId/results", element: <ExamResults /> }
    ]
  },
  {
    path: "/:quizId/exam", children: [
      { path: "register", element: withExamLayout(<Register />) },
      { path: "", element: withPrivateExam(<ExamHome />) },
      { path: "finished", element: withExamLayout(<FinishedExam />) }
    ]
  },
  {
    path: "*", element: <div>404 Not Found</div>
  }
])

export default router