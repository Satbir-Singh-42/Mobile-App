import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { LandingPage } from "@/pages/LandingPage";
import { WalkthroughPage } from "@/pages/WalkthroughPage";
import { LoginPage } from "@/pages/LoginPage";
import { SignupPage } from "@/pages/SignupPage";
import { ForgotPasswordPage } from "@/pages/ForgotPasswordPage";
import { QuestionnairePage } from "@/pages/QuestionnairePage";
import { DashboardPage } from "@/pages/DashboardPage";

import { ProfilePage } from "@/pages/ProfilePage";
import { SearchPage } from "@/pages/SearchPage";
import { NotificationsPage } from "@/pages/NotificationsPage";
import { PlannerPage } from "@/pages/PlannerPage";
import { GamingPage } from "@/pages/GamingPage";
import { QuizPage } from "@/pages/QuizPage";
import { EditProfilePage } from "@/pages/EditProfilePage";
import { LearningProgressPage } from "@/pages/LearningProgressPage";
import { GoalsSummaryPage } from "@/pages/GoalsSummaryPage";
import { SecuritySettingsPage } from "@/pages/SecuritySettingsPage";
import { HelpFeedbackPage } from "@/pages/HelpFeedbackPage";
import { LearningPage } from "@/pages/LearningPage";
import { CalculatorsOverviewPage } from "@/pages/CalculatorsOverviewPage";
import { IndividualCalculatorPage } from "@/pages/IndividualCalculatorPage";

function Router() {
  return (
    <Switch>
      {/* Landing and authentication flow */}
      <Route path="/" component={LandingPage} />
      <Route path="/walkthrough" component={WalkthroughPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/forgot-password" component={ForgotPasswordPage} />
      <Route path="/questionnaire" component={QuestionnairePage} />
      <Route path="/dashboard" component={DashboardPage} />

      <Route path="/profile" component={ProfilePage} />
      <Route path="/search" component={SearchPage} />
      <Route path="/notifications" component={NotificationsPage} />
      <Route path="/planner" component={PlannerPage} />
      <Route path="/learning" component={LearningPage} />
      <Route path="/calculators" component={CalculatorsOverviewPage} />
      <Route path="/calculator/:type" component={IndividualCalculatorPage} />
      <Route path="/gaming" component={GamingPage} />
      <Route path="/quiz" component={QuizPage} />
      
      {/* Profile sub-pages */}
      <Route path="/edit-profile" component={EditProfilePage} />
      <Route path="/learning-progress" component={LearningProgressPage} />
      <Route path="/goals-summary" component={GoalsSummaryPage} />
      <Route path="/security-settings" component={SecuritySettingsPage} />
      <Route path="/help-feedback" component={HelpFeedbackPage} />
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
