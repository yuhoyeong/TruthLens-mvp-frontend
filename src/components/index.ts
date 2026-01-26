export { default as Button } from "./Button";
export { default as FileUpload } from "./FileUpload";
export { default as Input } from "./Input";
export * from "./Analysis";
import {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "./Tabs";

// Compound Component 패턴으로 사용
export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
};
