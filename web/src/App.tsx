import { QueryClientProvider } from '@tanstack/react-query'
import { router } from './routes'
import { RouterProvider } from 'react-router-dom'
import { queryClient } from './lib/query-client'
import { Toaster } from './components/ui/sonner'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  )
}
