import AttractionsSection from "./_components/AttractionSection";
import CulturalTrailsCarousel from "./_components/CulturalTrailsCarousel";
import DestinationsCarousel from "./_components/DestinationsCarousel";
import HeritageAndMonuments from "./_components/HeritageAndMonuments";
import HeroCarousel from "./_components/HeroCarousel";
import Navigation from "./_components/Navbar";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroCarousel />
      <CulturalTrailsCarousel />
      <DestinationsCarousel />
      <HeritageAndMonuments />

      {/* <AttractionsSection/> */}

      {/* Placeholder for other sections */}
      <section className="h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            More Sections Coming Soon
          </h2>
          <p className="text-xl text-slate-600">
            Scroll down to see more amazing content about Konkan tourism
          </p>
        </div>
      </section>
    </main>
  );
}
