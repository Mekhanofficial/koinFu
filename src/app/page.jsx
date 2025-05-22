import PageAuth from "../components/web-app/PageAuth";
import AdaptingToChange from "../components/web-site/AdaptingToChange";
import About from "../components/web-site/about";
import ContactUs from "../components/web-site/contact-us";
import FAQ from "../components/web-site/faq";
import Features from "../components/web-site/features";
import Footer from "../components/web-site/footer/Footer";
import Header from "../components/web-site/header";
import Hero from "../components/web-site/hero";
import OurServices from "../components/web-site/our-services";
import ParticleJS from "../components/web-site/particleJS";
import CryptocurrencyMarketWidget from "../components/web-site/trading-view-widgets/CryptocurrencyMarketWidget";
import Alert from "../components/web-site/alert/index";
import GoogleTranslator from "../components/web-site/GoogleTranslator/index";

export default function Home() {
  return (
    <PageAuth>
      <div className="bg-[#0f1932] min-h-screen relative">
        <ParticleJS />
        <Header />
        <main className="relative">
          <Hero />
          <About />
          <OurServices />
          <CryptocurrencyMarketWidget />
          <AdaptingToChange />
          <Features />
          <FAQ />
          <ContactUs />
          <Footer />
          <Alert />
          <div id="google_translate_element"></div>
          <GoogleTranslator />
        </main>
        <script
          src="//code.tidio.co/98j5r6gitwvoyx5bbmtsyr7h9zlhqeo4.js"
          async
        ></script>
      </div>
    </PageAuth>
  );
}
