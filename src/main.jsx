import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Automatically attach credentials (cookies) and add auto-retry for GET requests on network failures
const originalFetch = window.fetch;
window.fetch = async (input, options = {}) => {
  const urlString = (input instanceof Request) ? input.url : String(input);
  const isBackend =
    urlString.includes('api.ansaritools.com') ||
    urlString.includes(':5000') ||
    urlString.startsWith('/api') ||
    urlString.includes('/api/');

  if (isBackend) {
    options.credentials = 'include';
  }

  // Get HTTP method (default GET)
  const method = (options.method || (input instanceof Request ? input.method : 'GET')).toUpperCase();

  // Retry logic for GET requests on network errors
  if (isBackend && method === 'GET') {
    let retries = 3;
    let delay = 1000; // start with 1 second delay
    
    while (retries > 0) {
      try {
        return await originalFetch(input, options);
      } catch (err) {
        // Do NOT retry if the request was aborted by the application
        if (err.name === 'AbortError') {
          throw err;
        }

        retries--;
        if (retries === 0) {
          throw err; // throw on final failure
        }

        console.warn(
          `[Network Retry] Fetch failed for ${urlString} (${err.message}). Retrying in ${delay}ms... (${retries} attempts remaining)`
        );

        // Wait before retrying
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2; // Exponential backoff (1s, 2s, 4s...)
      }
    }
  }

  return originalFetch(input, options);
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
