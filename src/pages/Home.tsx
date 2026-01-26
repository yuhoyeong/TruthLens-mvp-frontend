import HeaderSection from "@/components/Dashboard/HeaderSection";
import ImageAnalysisForm from "@/components/Dashboard/ImageAnalysisForm";

export default function Home() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <HeaderSection />
      <ImageAnalysisForm />
    </div>
  );
}
