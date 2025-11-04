import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@radix-ui/themes/styles.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Theme } from '@radix-ui/themes'
import './index.css'
import App from './App.tsx'
import Charts from './components/Charts.tsx'
import Layout from './components/Layout.tsx'

const client = new QueryClient()


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <Theme>
          <BrowserRouter basename="/open-trivia">
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<App />} />
                <Route path="/charts" element={<Charts />} />
              </Route>
            </Routes>
          </BrowserRouter>
      </Theme>
    </QueryClientProvider>
  </StrictMode>,
)
