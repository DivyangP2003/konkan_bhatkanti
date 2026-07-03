import HeroCarousel from "./_components/HeroCarousel";
import Navigation from "./_components/Navbar";
import ScrollProgress from "./_components/ScrollProgress";
import DestinationsCarousel from "./_components/DestinationsCarousel";
import CulturalExperiencesPage from "./_components/CulturalExperiences";
import SpotlightDestination from "./_components/SpotlightDestination";
import CultureSection from "./_components/CultureSection";
import CuisineSection from "./_components/CuisineSection";
import AdventureSection from "./_components/AdventureSection";
import NatureSection from "./_components/NatureSection";
import FestivalsSection from "./_components/FestivalsSection";
import InteractiveAttractionsMap from "./_components/InteractiveAttractionsMap";
import HeritageAndMonuments from "./_components/HeritageAndMonuments";

export default function HomePage() {
  return (
    <main className="min-h-screen pt-16 bg-white">
      <Navigation />
      <ScrollProgress />
      <div id="hero">
        <HeroCarousel />
      </div>
      <div id="destinations">
        <DestinationsCarousel />
      </div>
      <div id="spotlight">
        <SpotlightDestination />
      </div>
      <div id="cultural">
        <CulturalExperiencesPage />
      </div>
      <div id="culture">
        <CultureSection />
      </div>
      <div id="cuisine">
        <CuisineSection />
      </div>
      <div id="adventure">
        <AdventureSection />
      </div>
      <div id="nature">
        <NatureSection />
      </div>
      <div id="festivals">
        <FestivalsSection />
      </div>
      <div id="attractions">
        <InteractiveAttractionsMap />
      </div>
      <div id="heritage">
        <HeritageAndMonuments />
      </div>
    </main>
  );
}
