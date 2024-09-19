import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from './components/ui/sonner.tsx'

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1 }, mutations: { retry: 1 } }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster position='top-center' richColors theme='light' />
    </QueryClientProvider>
  </StrictMode>,
)
