import HeroCarousel from "./_components/HeroCarousel";
import Navigation from "./_components/Navbar";
import CulturalExperiencesPage from "./_components/CulturalExperiences";
import CultureSection from "./_components/CultureSection";
import DestinationsCarousel from "./_components/DestinationsCarousel";
import CuisineSection from "./_components/CuisineSection";
import AdventureSection from "./_components/AdventureSection";
import NatureSection from "./_components/NatureSection";
import FestivalsSection from "./_components/FestivalsSection";
import HeritageAndMonuments from "./_components/HeritageAndMonuments";

export default function HomePage() {
  return (
    <main className="min-h-screen pt-16 bg-white">
      <Navigation />
      <HeroCarousel />
      <DestinationsCarousel />
      <CulturalExperiencesPage />
      <CultureSection />
      <CuisineSection />
      <AdventureSection />
      <NatureSection />
      <FestivalsSection />
      <HeritageAndMonuments />
    </main>
  );
}
