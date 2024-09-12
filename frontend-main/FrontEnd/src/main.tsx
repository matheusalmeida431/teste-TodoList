import { QueryClientProvider } from '../node_modules/@tanstack/react-query/build/legacy/QueryClientProvider';
import { QueryClient } from '../node_modules/@tanstack/query-core/build/legacy/queryClient'

import * as React from 'react'; 
import { createRoot } from 'react-dom/client'

import App from './App'
import './index.css'

const queryClient = new QueryClient();

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient} >
     <App />
    </QueryClientProvider>
  </React.StrictMode>
)
