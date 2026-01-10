import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { queryClient } from '@/lib/queryClient';
import { AppRoutes } from './routes';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 text-gray-900">
           <AppRoutes />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App