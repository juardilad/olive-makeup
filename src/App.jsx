import { CartProvider } from './context/CartContext'
import TopBar from './components/TopBar'
import Header from './components/Header'
import Hero from './components/Hero'
import TrustBadges from './components/TrustBadges'
import FeaturedPDP from './components/FeaturedPDP'
import IngredientsAccordion from './components/IngredientsAccordion'
import CatalogBrowser from './components/CatalogBrowser'
import ReviewsSection from './components/ReviewsSection'
import FAQAccordion from './components/FAQAccordion'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'

function scrollToSection(id) {
  if (id === 'inicio') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function App() {
  return (
    <CartProvider>
      <TopBar />
      <Header onNavigate={scrollToSection} />
      <main>
        <Hero onNavigate={scrollToSection} />
        <TrustBadges />
        <FeaturedPDP />
        <IngredientsAccordion />
        <CatalogBrowser />
        <ReviewsSection />
        <FAQAccordion />
      </main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  )
}
