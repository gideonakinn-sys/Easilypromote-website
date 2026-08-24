import VideoCarousel from './VideoCarousel'

/**
 * The travelling card.
 *
 * It lives in the stage wrapper rather than inside the hero, because it has to
 * move out of the hero and land inside the section below it. It carries no
 * z-index on purpose: later siblings paint over it, so the approval copy stays
 * readable while the card is in transit across it.
 */
function HeroCard() {
  return (
    <div data-hero="card" className="hero-card">
      <VideoCarousel variant="fill" />
      <aside data-hero="scrim" className="hero-scrim" />
    </div>
  )
}

export default HeroCard
