// src/App.tsx

import { Route, Routes } from "react-router-dom";
import Homepage from "./Home/User/Homepage";
import Error404 from "./Error/Error404";
import Allservice from "./Service/AllService";
import Allstaff from "./Staff/AllStaff";
import ReservationDate from "./Reservation/Date";
import ReservationBeautician from "./Reservation/Beautician";
import ReservationTime from "./Reservation/Time";
import ReservationForm from "./Reservation/Form";
import Login from "./Authen/Login";
import Register from "./Authen/Register";
import ForgotPasswordPage from "./Authen/ForgotPasswordPage";
import HomeAdmin from "./Staff/homeadmin";
import History from "./history/history";
import SuccessPage from "./Password/changepassworddone";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/all_service" element={<Allservice />} />
        <Route path="/all_staff" element={<Allstaff />} />
        <Route path="/reservation/date" element={<ReservationDate />} />
        <Route
          path="/reservation/beautician"
          element={<ReservationBeautician />}
        />
        <Route path="/reservation/time" element={<ReservationTime />} />
        <Route path="/reservation/form" element={<ReservationForm />} />

        {/* Authentication Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <HomeAdmin />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/register" element={<Register />} />
        <Route path="/admin/forgot-password" element={<ForgotPasswordPage />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

        <Route path="/success" element={<SuccessPage />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
