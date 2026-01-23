import Header from "./Header";
import SideBar from "./SideBar";

interface AppLayoutProps {
  readonly children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <SideBar />

        <main className="flex-1 overflow-y-auto bg-neutral-99">{children}</main>
      </div>
    </div>
  );
}
