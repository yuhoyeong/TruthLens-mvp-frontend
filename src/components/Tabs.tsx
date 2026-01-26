import { createContext, useContext, useState, type ReactNode } from "react";

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs 컴포넌트 내부에서 사용해야 합니다.");
  }
  return context;
}

/* ---------------------------------- Root ---------------------------------- */
interface TabsRootProps {
  defaultValue: string;
  children: ReactNode;
  onChange?: (value: string) => void;
  onValueChange?: (value: string) => void;
}

export function TabsRoot({
  defaultValue,
  children,
  onChange,
  onValueChange,
}: TabsRootProps) {
  const [activeTab, setActiveTabState] = useState(defaultValue);

  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
    onChange?.(tab);
    onValueChange?.(tab);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
}

/* ---------------------------------- List ---------------------------------- */
interface TabsListProps {
  children: ReactNode;
  className?: string;
}

export function TabsList({ children, className = "" }: TabsListProps) {
  return <div className={`flex gap-2 ${className}`}>{children}</div>;
}

/* --------------------------------- Trigger -------------------------------- */
interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export function TabsTrigger({
  value,
  children,
  icon,
  className = "",
}: TabsTriggerProps) {
  const { activeTab, setActiveTab } = useTabs();
  const isActive = activeTab === value;

  return (
    <button
      type="button"
      onClick={() => setActiveTab(value)}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full text-body-2 border transition-colors
        ${
          isActive
            ? "border-neutral-20 text-neutral-10 bg-white"
            : "border-neutral-90 text-neutral-50 hover:border-neutral-60"
        }
        ${className}
      `}
    >
      {icon}
      {children}
    </button>
  );
}

/* --------------------------------- Content -------------------------------- */
interface TabsContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function TabsContent({
  value,
  children,
  className = "",
}: TabsContentProps) {
  const { activeTab } = useTabs();

  if (activeTab !== value) return null;

  return <div className={className}>{children}</div>;
}
