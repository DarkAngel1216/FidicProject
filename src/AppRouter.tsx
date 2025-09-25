
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App } from "./App";
import { Dashboard } from "./components/dashboard/Dashboard";
import { ContractManagement } from "./components/contracts/ContractManagement";
import { ObligationTracker } from "./components/tracking/ObligationTracker";
import { AIAssistant } from "./components/ai/AIAssistant";
import { Reports } from "./components/reports/Reports";
import { RegionsProjects } from "./components/regions/RegionsProjects";
import { Settings } from "./components/settings/Settings";
import { ProjectWorkspace } from "./components/project/ProjectWorkspace";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="regions" element={<RegionsProjects />} />
          <Route path="contracts" element={<ContractManagement />} />
          <Route path="obligations" element={<ObligationTracker />} />
          <Route path="ai-assistant" element={<AIAssistant />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="project/:projectId" element={<ProjectWorkspace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
