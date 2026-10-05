export default function App() {
  return (
    <section className="hero">
      <video className="hero-video" src="/hero.mp4" autoPlay muted loop playsInline />
      <a className="signup" href="#">Sign Up</a>
      <div className="hero-content">
        <img className="logo" src="/logo.png" alt="UpCreate" />
        <h1 className="tagline">Define Your Brand</h1>
        <form className="prompt" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Describe your brand" aria-label="Describe your brand" />
          <button type="submit" aria-label="Send">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </form>
      </div>
    </section>
  )
}
