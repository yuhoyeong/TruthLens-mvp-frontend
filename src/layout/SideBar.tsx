import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Clock,
  Scale,
  Download,
  HelpCircle,
  Settings,
} from "lucide-react";

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const mainNavItems: NavItem[] = [
  { path: "/", label: "대시보드", icon: <Home size={20} /> },
  { path: "/history", label: "분석 히스토리", icon: <Clock size={20} /> },
  { path: "/legal", label: "법률 상담소", icon: <Scale size={20} /> },
  { path: "/export", label: "데이터셋 내보내기", icon: <Download size={20} /> },
];

const bottomNavItems: NavItem[] = [
  { path: "/help", label: "도움말", icon: <HelpCircle size={20} /> },
  { path: "/settings", label: "설정", icon: <Settings size={20} /> },
];

function NavLink({ item }: { item: NavItem }) {
  const location = useLocation();
  const isActive = location.pathname === item.path;

  return (
    <Link
      to={item.path}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-body-1
        ${
          isActive
            ? "bg-primary/10 text-primary font-medium"
            : "text-neutral-40 hover:bg-neutral-98"
        }`}
    >
      {item.icon}
      <span>{item.label}</span>
    </Link>
  );
}

export default function SideBar() {
  return (
    <aside className="w-60 bg-white border-r border-neutral-96 flex flex-col">
      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {mainNavItems.map((item) => (
          <NavLink key={item.path} item={item} />
        ))}
      </nav>

      {/* Bottom Navigation */}
      <nav className="p-4 border-t border-neutral-96 space-y-1">
        {bottomNavItems.map((item) => (
          <NavLink key={item.path} item={item} />
        ))}
      </nav>
    </aside>
  );
}
