import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <nav className="hidden lg:flex flex-col w-[15.27%] h-full p-4 z-10 bg-white border-t-2 border-[#E1E2E4]">
      <ul className="text-base space-y-6">
        <li><Link to="/" className="text-[#37383C]hover:text-blue-800 font-medium">대시보드</Link></li>
        <li><Link to="/" className="text-[#37383C] hover:text-blue-800 font-medium">상황요약</Link></li>
        <li><Link to="/" className="text-[#37383C] hover:text-blue-800 font-medium">리포트 생성</Link></li>
        <li><Link to="/" className="text-[#37383C] hover:text-blue-800 font-medium">분석</Link></li>
      </ul>
    </nav>
  );
}