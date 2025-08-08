import { useEffect, useState } from 'react'
import './index.css'

interface Quote {
  q: string;
  a: string;
}

export default function App() {
  
  const [quote, setQuote] = useState<Quote>({ q: '', a: '' })
  const [error, setError] = useState<string>('')
  const [showQuote, setShowQuote] = useState(false)
  
  const [coinCaught, setCoinCaught] = useState(false)
  const [showWin, setShowWin] = useState(false)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    
    async function fetchQuote() {
      try {
        const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://zenquotes.io/api/today')}`)
        
        const wrapped = await res.json()
        const data = JSON.parse(wrapped.contents)
        
        if (Array.isArray(data) && data[0]) {
          
          setQuote({ q: data[0].q, a: data[0].a })
          console.log(data)
        }
      
      } catch (e: any) {
        setError(e?.message ?? 'Failed to fetch')
      }
    }
    fetchQuote()
  }, [])

  const handleCoinCatch = () => {
    setCoinCaught(true)
    // Show win image immediately
    setShowWin(true)
    // Hide win image and show button after animation
    setTimeout(() => {
      setShowWin(false)
      setShowButton(true)
    }, 1500)
  }

  const handleRevealQuote = () => {
    setShowQuote(true)
  }

  return (
    <div className="overlay">
      {/* GitHub Icon */}
      <a 
        href="https://github.com/ahmadyahya-05/quote-of-the-day" 
        target="_blank" 
        rel="noopener noreferrer"
        className="github-icon"
        title="View on GitHub"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      </a>

      {/* Floating Coin */}
      {!coinCaught && quote && !showQuote && (
        <div 
          className="floating-coin"
          onClick={handleCoinCatch}
        >
          <img src="/coin.png" alt="Catch me!" />
        </div>
      )}

      {/* Win Image */}
      {showWin && (
        <div className="win-image">
          <img src="/win.png" alt="You won!" />
        </div>
      )}

      {/* Transformed Button */}
      {coinCaught && showButton && !showQuote && (
        <button 
          className="reveal-button coin-button"
          onClick={handleRevealQuote}
        >
          Reveal Quote
        </button>
      )}
      
      <div className="cloud-container">
        {error && <p className="text-red-600">{error}</p>}
        {showQuote && quote ? (
          <>
            <p className="text">"{quote.q}"</p>
            <p className="author">— {quote.a}</p>
          </>
        ) : !showQuote && quote ? (
          <p className="text">Catch the coin to reveal today's wisdom!</p>
        ) : (
          <p className="text">Loading...</p>
        )}
      </div>
    </div>
  )
}
