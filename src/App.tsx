import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import History from "@/pages/History";
import Legal from "@/pages/Legal";
import Export from "@/pages/Export";
import Help from "@/pages/Help";
import Settings from "@/pages/Settings";
import AnalysisResult from "@/pages/AnalysisResult";
import AppLayout from "@/layout/AppLayout";

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analysis-result/:jobId" element={<AnalysisResult />} />
          <Route path="/history" element={<History />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/export" element={<Export />} />
          <Route path="/help" element={<Help />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
