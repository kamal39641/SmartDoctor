import React, { createContext, useState } from "react";

export type Patient = {
  id: number;
  name: string;
  age: number;
  address: string;
};

export const DoctorContext = createContext<any>(null);

export const DoctorProvider = ({ children }: any) => {

  // 👨‍⚕️ Doctor info
  const [doctor, setDoctor] = useState({
    name: "ডা. আহমেদ রহমান",
    spec: "কার্ডিওলজিস্ট",
    medical: "ঢাকা মেডিকেল কলেজ হাসপাতাল, ঢাকা",
    bmdc: "A-12345",
    image: null,
  });

  //  Notification
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // 🔥 REAL DATA FLOW
  const [pendingPatients, setPendingPatients] = useState<Patient[]>([]);
  const [confirmedPatients, setConfirmedPatients] = useState<Patient[]>([]);
  const [todayPatients, setTodayPatients] = useState<Patient[]>([]);

  // 🔥 Add Patient (Patient side booking)
  const addPatient = (patient: Patient) => {
    setPendingPatients((prev: Patient[]) => [...prev, patient]);
  };

  // 🔥 Confirm Appointment
  const confirmPatient = (patient: Patient) => {
    setPendingPatients((prev: Patient[]) =>
      prev.filter((p) => p.id !== patient.id)
    );

    setConfirmedPatients((prev: Patient[]) => [...prev, patient]);
    setTodayPatients((prev: Patient[]) => [...prev, patient]);
  };

  return (
    <DoctorContext.Provider
      value={{
        doctor,
        setDoctor,
        notificationsEnabled,
        setNotificationsEnabled,

        pendingPatients,
        confirmedPatients,
        todayPatients,

        addPatient,
        confirmPatient,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};