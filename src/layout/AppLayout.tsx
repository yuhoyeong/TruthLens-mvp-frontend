import Header from "./Header";
import SideBar from "./SideBar";

interface AppLayoutProps {
  readonly children: React.ReactNode; 
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex flex-1">
        <SideBar />

        <main className="flex-1 p-4 bg-[#F7F7F7]">
          {children}
        </main>
      </div>
    </div>
  );
}