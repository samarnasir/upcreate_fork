import { useState } from 'react'

export default function App() {
  const [text, setText] = useState('')
  return (
    <section className="hero">
      <video className="hero-video" src="/hero.mp4" autoPlay muted loop playsInline />
      <a className="signup" href="#">Sign Up</a>
      <div className="hero-content">
        <img className="logo" src="/logo.png" alt="UpCreate" />
        <h1 className="tagline"><span className="t-sans">Define Your</span> <span className="t-serif">Brand</span></h1>
        <form className="prompt" onSubmit={(e) => e.preventDefault()}>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Describe your brand" aria-label="Describe your brand" />
          <button type="submit" className={text.trim() ? 'active' : ''} aria-label="Send">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </form>
      </div>
    </section>
  )
}
