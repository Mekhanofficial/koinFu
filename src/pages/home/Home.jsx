import ContactUs from "../../components/ContactIndex.jsx";
import HomeHeaderPage from "../../components/HomeHeader.jsx";
import FooterPage from "../../components/Footer.jsx";
import StatsPage from "./Stats.jsx";
import WhatIsKoinfuPage from "./WhatIsKoinfu.jsx";
import FeaturesSection from "./FeaturesSection.jsx";
import TokenSection from "./TokenSection.jsx";
import ProfitCalculator from "./ProfitCalculator.jsx";
import TestimonyPage from "./Testimonials.jsx";
import QuestionAndAnswer from "./QuestionAndAnswer.jsx";
import PricingPlan from "./PricingPlan.jsx";
import HeroPage from "./Hero.jsx";
import RandomAlert from "../../constants/RandomAlert.jsx";
import ChatBot from "../../components/ChatBot.jsx";

export default function HomePage() {
  return (
    <>
      <section className="overflow-x-hidden" style={{ height: "100vh" }}>
        <HomeHeaderPage />
        <HeroPage />
        <StatsPage />
        <WhatIsKoinfuPage />
        <FeaturesSection />
        <TokenSection />
        <ProfitCalculator />
        <TestimonyPage />
        <QuestionAndAnswer />
        <PricingPlan />
        <ContactUs />
        <FooterPage />
        <RandomAlert/>
        <ChatBot/>
      </section>
    </>
  );
}
