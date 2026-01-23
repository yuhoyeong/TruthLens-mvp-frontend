import { User } from "lucide-react";

export default function Header() {
  return (
    <header className="h-14 px-6 flex justify-between items-center bg-white border-b border-neutral-96">
      {/* Logo */}
      <img src="/Logo.png" alt="TruthLens" className="h-6" />

      {/* User Profile */}
      <div className="flex items-center gap-2 text-neutral-40">
        <div className="w-8 h-8 rounded-full bg-neutral-96 flex items-center justify-center">
          <User size={18} className="text-neutral-50" />
        </div>
        <span className="text-body-2 text-neutral-30">트루스렌즈님</span>
      </div>
    </header>
  );
}
