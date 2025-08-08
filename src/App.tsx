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
