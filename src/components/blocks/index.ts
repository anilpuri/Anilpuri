import About from './About'
import CardGrid from './CardGrid'
import Contact from './Contact'
import Hero from './Hero'
import { SectionHeader } from './SectionHeader'
// import CardsListing from './CardsListing'

const blockComponents = {
  hero: Hero,
  about: About,
  gridCards: CardGrid,
  'section-head': SectionHeader,
  'get-in-touch': Contact,

  // cardsListing: CardsListing,
}
export default blockComponents
