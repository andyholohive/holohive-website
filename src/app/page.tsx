import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import Proof from "@/components/Proof";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Hero />
        <Problem />
        <Solution />
        <Proof />
        <Process />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
