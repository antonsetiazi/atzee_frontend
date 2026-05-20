// src/modules/hrms/hrms.routes.tsx

import { Route, Navigate } from "react-router-dom";

import HRMSDashboardPage from "./pages/dashboard/HRMSDashboardPage";
import EmployeeListPage from "./pages/employees/EmployeeListPage";
import EmployeeDetailPage from "./pages/employees/EmployeeDetailPage";
import AttendancePage from "./pages/attendance/AttendancePage";
import LeaveRequestPage from "./pages/leave/LeaveRequestPage";
import LeaveApprovalPage from "./pages/leave/LeaveApprovalPage";
import PayrollPage from "./pages/payroll/PayrollPage";
import PayrollApprovalPage from "./pages/payroll/PayrollApprovalPage";
import EmployeeFormPage from "./pages/employees/EmployeeFormPage";

export const hrmsRoutes = (
    <>
        <Route path="/hrms" element={<Navigate to="/hrms/dashboard" />} />

        {/* =========================
            DASHBOARD
        ========================= */}
        <Route path="/hrms/dashboard" element={<HRMSDashboardPage />} />

        {/* =========================
            EMPLOYEES
        ========================= */}
        <Route path="/hrms/employees" element={<EmployeeListPage />} />
        <Route path="/hrms/employees/create" element={<EmployeeFormPage />} />
        <Route path="/hrms/employees/:id" element={<EmployeeDetailPage />} />

        {/* =========================
            ATTENDANCE
        ========================= */}
        <Route path="/hrms/attendance" element={<AttendancePage />} />

        {/* =========================
            LEAVE
        ========================= */}
        <Route path="/hrms/leave" element={<LeaveRequestPage />} />
        <Route path="/hrms/leave/approval" element={<LeaveApprovalPage />} />

        {/* =========================
            PAYROLL
        ========================= */}
        <Route path="/hrms/payroll" element={<PayrollPage />} />
        <Route path="/hrms/payroll/approval" element={<PayrollApprovalPage />} />
    </>
);
