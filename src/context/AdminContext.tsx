import React, { createContext, useState } from "react";

export type PendingDoctor = {
  id: number;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  bmdcNumber: string;
  medicalCollege: string;
  registeredDate: string;
  status: "pending" | "approved" | "rejected";
  bmdcVerified: boolean;
  image?: string;
};

export type Hospital = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  requestDate: string;
  status: "pending" | "approved" | "rejected";
  registrationNumber: string;
};

export type VerificationItem = {
  id: number;
  userId: string;
  userName: string;
  userType: "doctor" | "patient";
  verificationType: "bmdc" | "phone" | "email";
  value: string;
  status: "pending" | "verified" | "failed";
  submittedDate: string;
};

export type Appointment = {
  id: number;
  patientName: string;
  patientPhone: string;
  doctorName: string;
  date: string;
  time: string;
  hospital: string;
  status: "scheduled" | "completed" | "cancelled";
};

export type BlockedUser = {
  id: number;
  userName: string;
  email: string;
  userType: "doctor" | "patient";
  reason: string;
  blockedDate: string;
  blockedBy: string;
};

export const AdminContext = createContext<any>(null);

export const AdminProvider = ({ children }: any) => {
  // Pending Doctors
  const [pendingDoctors, setPendingDoctors] = useState<PendingDoctor[]>([
    {
      id: 1,
      name: "ডা. রহিম হোসেন",
      email: "rahim.hossan@email.com",
      phone: "01923456789",
      specialization: "হৃদরোগ বিশেষজ্ঞ",
      bmdcNumber: "B-45678",
      medicalCollege: "চট্টগ্রাম মেডিকেল কলেজ",
      registeredDate: "2024-04-20",
      status: "pending",
      bmdcVerified: false,
    },
    {
      id: 2,
      name: "ডা. সারা আক্তার",
      email: "sara.akter@email.com",
      phone: "01834567890",
      specialization: "নিউরোলজি",
      bmdcNumber: "B-56789",
      medicalCollege: "রাজশাহী মেডিকেল কলেজ",
      registeredDate: "2024-04-19",
      status: "pending",
      bmdcVerified: false,
    },
  ]);

  // Pending Hospitals
  const [pendingHospitals, setPendingHospitals] = useState<Hospital[]>([
    {
      id: 1,
      name: "নতুন জীবন হাসপাতাল",
      email: "info@newlife.com",
      phone: "01234567890",
      address: "ঢাকা, বাংলাদেশ",
      requestDate: "2024-04-18",
      status: "pending",
      registrationNumber: "REG-2024-001",
    },
    {
      id: 2,
      name: "স্বাস্থ্য সেবা মেডিকেল সেন্টার",
      email: "health@med.com",
      phone: "01712345678",
      address: "চট্টগ্রাম, বাংলাদেশ",
      requestDate: "2024-04-17",
      status: "pending",
      registrationNumber: "REG-2024-002",
    },
  ]);

  // Approved Hospitals
  const [approvedHospitals, setApprovedHospitals] = useState<Hospital[]>([
    {
      id: 101,
      name: "Square Hospital",
      email: "square@hospital.com",
      phone: "01200000000",
      address: "ঢাকা, বাংলাদেশ",
      requestDate: "2024-01-01",
      status: "approved",
      registrationNumber: "REG-2024-100",
    },
    {
      id: 102,
      name: "United Hospital",
      email: "united@hospital.com",
      phone: "01212345678",
      address: "ঢাকা, বাংলাদেশ",
      requestDate: "2024-01-02",
      status: "approved",
      registrationNumber: "REG-2024-101",
    },
  ]);

  // Verification Management
  const [verifications, setVerifications] = useState<VerificationItem[]>([
    {
      id: 1,
      userId: "doc-001",
      userName: "ডা. আহমেদ রহমান",
      userType: "doctor",
      verificationType: "bmdc",
      value: "A-12345",
      status: "verified",
      submittedDate: "2024-04-10",
    },
    {
      id: 2,
      userId: "pat-001",
      userName: "রহিম আহমেদ",
      userType: "patient",
      verificationType: "phone",
      value: "01712345678",
      status: "pending",
      submittedDate: "2024-04-20",
    },
    {
      id: 3,
      userId: "pat-002",
      userName: "ফাতিমা আক্তার",
      userType: "patient",
      verificationType: "email",
      value: "fatima@email.com",
      status: "verified",
      submittedDate: "2024-04-15",
    },
  ]);

  // Appointment Monitoring
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      patientName: "রহিম আহমেদ",
      patientPhone: "01712345678",
      doctorName: "ডা. আহমেদ রহমান",
      date: "2024-04-25",
      time: "10:00 AM",
      hospital: "Square Hospital",
      status: "scheduled",
    },
    {
      id: 2,
      patientName: "সালমা বেগম",
      patientPhone: "01823456789",
      doctorName: "ডা. ফাতেমা খান",
      date: "2024-04-24",
      time: "02:00 PM",
      hospital: "United Hospital",
      status: "scheduled",
    },
    {
      id: 3,
      patientName: "করিম সাহেব",
      patientPhone: "01934567890",
      doctorName: "ডা. আহমেদ রহমান",
      date: "2024-04-22",
      time: "11:00 AM",
      hospital: "Square Hospital",
      status: "completed",
    },
  ]);

  // Blocked Users
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([
    {
      id: 1,
      userName: "স্প্যাম ডক্টর",
      email: "spam@doctor.com",
      userType: "doctor",
      reason: "Inappropriate behavior",
      blockedDate: "2024-04-15",
      blockedBy: "Admin",
    },
  ]);

  // Settings
  const [adminSettings, setAdminSettings] = useState({
    notificationsEnabled: true,
    emailAlertsEnabled: true,
    autoApprovalEnabled: false,
    maintenanceMode: false,
  });

  // ==================== DOCTOR APPROVAL ====================
  const approveDoctor = (doctorId: number) => {
    setPendingDoctors((prev) =>
      prev.map((doc) =>
        doc.id === doctorId ? { ...doc, status: "approved" } : doc
      )
    );
  };

  const rejectDoctor = (doctorId: number) => {
    setPendingDoctors((prev) =>
      prev.map((doc) =>
        doc.id === doctorId ? { ...doc, status: "rejected" } : doc
      )
    );
  };

  const verifyBMDC = (doctorId: number) => {
    setPendingDoctors((prev) =>
      prev.map((doc) =>
        doc.id === doctorId ? { ...doc, bmdcVerified: true } : doc
      )
    );
  };

  // ==================== HOSPITAL APPROVAL ====================
  const approveHospital = (hospitalId: number) => {
    const hospital = pendingHospitals.find((h) => h.id === hospitalId);
    if (hospital) {
      setPendingHospitals((prev) =>
        prev.filter((h) => h.id !== hospitalId)
      );
      setApprovedHospitals((prev) => [...prev, { ...hospital, status: "approved" }]);
    }
  };

  const rejectHospital = (hospitalId: number) => {
    setPendingHospitals((prev) =>
      prev.filter((h) => h.id !== hospitalId)
    );
  };

  // ==================== VERIFICATION ====================
  const verifyUser = (verificationId: number) => {
    setVerifications((prev) =>
      prev.map((v) =>
        v.id === verificationId ? { ...v, status: "verified" } : v
      )
    );
  };

  const rejectVerification = (verificationId: number) => {
    setVerifications((prev) =>
      prev.map((v) =>
        v.id === verificationId ? { ...v, status: "failed" } : v
      )
    );
  };

  // ==================== BLOCK USER ====================
  const blockUser = (userId: string, userName: string, email: string, userType: "doctor" | "patient", reason: string) => {
    const newBlockedUser: BlockedUser = {
      id: blockedUsers.length + 1,
      userName,
      email,
      userType,
      reason,
      blockedDate: new Date().toISOString().split("T")[0],
      blockedBy: "Admin",
    };
    setBlockedUsers((prev) => [...prev, newBlockedUser]);
  };

  const unblockUser = (userId: number) => {
    setBlockedUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  // ==================== SETTINGS ====================
  const updateSettings = (newSettings: any) => {
    setAdminSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <AdminContext.Provider
      value={{
        // Doctors
        pendingDoctors,
        approveDoctor,
        rejectDoctor,
        verifyBMDC,

        // Hospitals
        pendingHospitals,
        approvedHospitals,
        approveHospital,
        rejectHospital,

        // Verification
        verifications,
        verifyUser,
        rejectVerification,

        // Appointments
        appointments,
        setAppointments,

        // Blocked Users
        blockedUsers,
        blockUser,
        unblockUser,

        // Settings
        adminSettings,
        updateSettings,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
