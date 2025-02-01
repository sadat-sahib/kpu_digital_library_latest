
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { RouterProvider } from 'react-router-dom'
import './App.css'
import { Router } from './Router/Router'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const queryClient =new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={Router} />
    </QueryClientProvider>
  )
}

export default App
