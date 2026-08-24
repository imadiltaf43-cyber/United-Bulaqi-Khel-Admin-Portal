import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Suspense, lazy } from "react";

import Login from "./pages/auth/Login";
import ProtectedRoute from "./routes/ProtectedRoute";

import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyOtp from "./pages/auth/VerifyOtp";
import ResetPassword from "./pages/auth/ResetPassword";

const Employees = lazy(() => import("./pages/employes/Employees"));
const AddEmployee = lazy(() => import("./pages/employes/AddEmployee"));
const EditEmployee = lazy(() => import("./pages/employes/EditEmployee"));
const ViewEmployee = lazy(() => import("./pages/employes/ViewEmployee"));

// ============================
// Lazy Loaded Pages
// ============================

const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));

const Minerals = lazy(() => import("./pages/minerals/Minerals"));
const AddMineral = lazy(() => import("./pages/minerals/AddMineral"));
const EditMineral = lazy(() => import("./pages/minerals/EditMineral"));
const ViewMineral = lazy(() => import("./pages/minerals/ViewMineral"));

const Settings = lazy(() => import("./pages/settings/Settings"));
const Profile = lazy(() => import("./pages/settings/Profile"));
const ChangePassword = lazy(() => import("./pages/settings/ChangePassword"));
const ChangeEmail = lazy(() => import("./pages/settings/ChangeEmail"));
const Security = lazy(() => import("./pages/settings/Security"));
const WebsiteSettings = lazy(() => import("./pages/settings/WebsiteSettings"));

const Investors = lazy(() => import("./pages/investors/Investors"));
const AddInvestor = lazy(() => import("./pages/investors/AddInvestor"));
const EditInvestor = lazy(() => import("./pages/investors/EditInvestor"));
const ViewInvestor = lazy(() => import("./pages/investors/ViewInvestor"));

// -----------------------------------
// Projects
// -----------------------------------

const Projects = lazy(() => import("./pages/projects/Projects"));
const AddProject = lazy(() => import("./pages/projects/AddProject"));
const EditProject = lazy(() => import("./pages/projects/EditProject"));
const ViewProject = lazy(() => import("./pages/projects/ViewProject"));

const Jobs = lazy(() => import("./pages/careers/Jobs"));
const CreateJob = lazy(() => import("./pages/careers/CreateJob"));
const EditJob = lazy(() => import("./pages/careers/EditJob"));
const JobApplications = lazy(() => import("./pages/careers/JobApplications"));
const ViewApplication = lazy(() => import("./pages/careers/ViewApplication"));

// -----------------------------------
// Sustainability Events
// -----------------------------------

const Events = lazy(() => import("./pages/sustainability/Events"));
const AddEvent = lazy(() => import("./pages/sustainability/AddEvent"));
const EditEvent = lazy(() => import("./pages/sustainability/EditEvent"));
const ViewEvent = lazy(() => import("./pages/sustainability/ViewEvent"));

// contact messages

const Messages = lazy(() => import("./pages/contact/Messages"));
const ViewMessage = lazy(() => import("./pages/contact/ViewMessage"));

function App() {
  return (
    <BrowserRouter>

      <Suspense
        fallback={
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#F4F5F7",
              fontSize: "22px",
              fontWeight: "600",
              color: "#444",
            }}
          >
            Loading...
          </div>
        }
      >

        <Routes>

          {/* Root Redirect */}
          <Route
            path="/"
            element={<Navigate to="/login" replace />}
          />

          {/* Public Routes */}
          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          <Route
            path="/verify-otp"
            element={<VerifyOtp />}
          />

          <Route
            path="/reset-password"
            element={<ResetPassword />}
          />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Minerals */}
          <Route
            path="/minerals"
            element={
              <ProtectedRoute>
                <Minerals />
              </ProtectedRoute>
            }
          />

          <Route
            path="/minerals/add"
            element={
              <ProtectedRoute>
                <AddMineral />
              </ProtectedRoute>
            }
          />

          <Route
            path="/minerals/edit/:id"
            element={
              <ProtectedRoute>
                <EditMineral />
              </ProtectedRoute>
            }
          />

          <Route
            path="/minerals/view/:id"
            element={
              <ProtectedRoute>
                <ViewMineral />
              </ProtectedRoute>
            }
          />

          {/* Settings */}
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings/change-password"
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings/change-email"
            element={
              <ProtectedRoute>
                <ChangeEmail />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings/security"
            element={
              <ProtectedRoute>
                <Security />
              </ProtectedRoute>
            }
          />

          {/* C-06: Wrap /settings/website in ProtectedRoute */}
          <Route
            path="/settings/website"
            element={
              <ProtectedRoute>
                <WebsiteSettings />
              </ProtectedRoute>
            }
          />

          {/* Careers */}
          <Route
            path="/careers"
            element={
              <ProtectedRoute>
                <Jobs />
              </ProtectedRoute>
            }
          />

          <Route
            path="/careers/create"
            element={
              <ProtectedRoute>
                <CreateJob />
              </ProtectedRoute>
            }
          />

          <Route
            path="/careers/edit/:id"
            element={
              <ProtectedRoute>
                <EditJob />
              </ProtectedRoute>
            }
          />

          <Route
            path="/careers/applications"
            element={
              <ProtectedRoute>
                <JobApplications />
              </ProtectedRoute>
            }
          />

          <Route
            path="/careers/applications/:id"
            element={
              <ProtectedRoute>
                <ViewApplication />
              </ProtectedRoute>
            }
          />

          {/* Employees */}
          <Route
            path="/employees"
            element={
              <ProtectedRoute>
                <Employees />
              </ProtectedRoute>
            }
          />

          <Route
            path="/employees/add"
            element={
              <ProtectedRoute>
                <AddEmployee />
              </ProtectedRoute>
            }
          />

          <Route
            path="/employees/edit/:id"
            element={
              <ProtectedRoute>
                <EditEmployee />
              </ProtectedRoute>
            }
          />

          <Route
            path="/employees/view/:id"
            element={
              <ProtectedRoute>
                <ViewEmployee />
              </ProtectedRoute>
            }
          />

          {/* Investors */}
          <Route
            path="/investors"
            element={
              <ProtectedRoute>
                <Investors />
              </ProtectedRoute>
            }
          />

          <Route
            path="/investors/add"
            element={
              <ProtectedRoute>
                <AddInvestor />
              </ProtectedRoute>
            }
          />

          <Route
            path="/investors/edit/:id"
            element={
              <ProtectedRoute>
                <EditInvestor />
              </ProtectedRoute>
            }
          />

          <Route
            path="/investors/view/:id"
            element={
              <ProtectedRoute>
                <ViewInvestor />
              </ProtectedRoute>
            }
          />

          {/* Projects */}
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            }
          />

          <Route
            path="/projects/add"
            element={
              <ProtectedRoute>
                <AddProject />
              </ProtectedRoute>
            }
          />

          <Route
            path="/projects/edit/:id"
            element={
              <ProtectedRoute>
                <EditProject />
              </ProtectedRoute>
            }
          />

          <Route
            path="/projects/view/:id"
            element={
              <ProtectedRoute>
                <ViewProject />
              </ProtectedRoute>
            }
          />

          {/* Sustainability Events */}
          <Route
            path="/sustainability"
            element={
              <ProtectedRoute>
                <Events />
              </ProtectedRoute>
            }
          />

          <Route
            path="/sustainability/add"
            element={
              <ProtectedRoute>
                <AddEvent />
              </ProtectedRoute>
            }
          />

          <Route
            path="/sustainability/edit/:id"
            element={
              <ProtectedRoute>
                <EditEvent />
              </ProtectedRoute>
            }
          />

          <Route
            path="/sustainability/view/:id"
            element={
              <ProtectedRoute>
                <ViewEvent />
              </ProtectedRoute>
            }
          />

          {/* Contact Messages */}
          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            }
          />

          <Route
            path="/messages/:id"
            element={
              <ProtectedRoute>
                <ViewMessage />
              </ProtectedRoute>
            }
          />

          {/* C-05: Wildcard catch-all MUST be the very last route */}
          <Route
            path="*"
            element={<Navigate to="/login" replace />}
          />

        </Routes>

      </Suspense>

    </BrowserRouter>
  );
}

export default App;