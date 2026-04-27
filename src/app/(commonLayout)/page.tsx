import PublicNavbar from "@/components/modules/home/PublicNavbar";
import Steps from "@/components/modules/home/Steps";
import TopDoctors from "@/components/modules/home/TopDoctors";
import PublicFooter from "@/components/modules/home/PublicFooter";
import Hero from "@/components/modules/home/Hero";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="grow">
        <Hero />
        <Steps />
        <TopDoctors />
      </main>
      <PublicFooter />
    </div>
  );
}
