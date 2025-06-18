import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '/src/styles/index.css'
import GenerateBody from './components/GenerateBody'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GenerateBody />
  </StrictMode>,
)
