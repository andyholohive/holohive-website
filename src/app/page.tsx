import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Results from "@/components/Results";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import Proof from "@/components/Proof";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Hero />
        <Results />
        <Problem />
        <Solution />
        <Process />
        <Proof />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
