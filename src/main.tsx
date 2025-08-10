import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './bland.css'

// Enable global bland mode to simplify UI to white/black while we pick a new theme
document.body.classList.add('bland');

createRoot(document.getElementById("root")!).render(<App />);

