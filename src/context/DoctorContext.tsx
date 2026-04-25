import React, { createContext, useState } from "react";

export type Patient = {
  id: number;
  name: string;
  age: number;
  address: string;
  doctorName: string;
  phone?: string;
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
  const [isPatientLoggedIn, setIsPatientLoggedIn] = useState(false);

  // 🔥 REAL DATA FLOW
  const [pendingPatients, setPendingPatients] = useState<Patient[]>([]);
  const [confirmedPatients, setConfirmedPatients] = useState<Patient[]>([]);
  const [todayPatients, setTodayPatients] = useState<Patient[]>([]);

  // 🔥 Add Patient (Patient side booking)
  const addPatient = (patient: Patient) => {
    setPendingPatients((prev: Patient[]) => [...prev, patient]);
  };

  // 🔥 Confirm Appointment (move from pending to confirmed)
  const confirmPatient = (patient: Patient) => {
    setPendingPatients((prev: Patient[]) =>
      prev.filter((p) => p.id !== patient.id)
    );

    setConfirmedPatients((prev: Patient[]) => [...prev, patient]);
  };

  // 🔥 Move confirmed patients to today's list (Doctor clicks button)
  const moveConfirmedToToday = (patients: Patient[]) => {
    setConfirmedPatients((prev: Patient[]) =>
      prev.filter((p) => !patients.some((m) => m.id === p.id))
    );

    setTodayPatients((prev: Patient[]) => [
      ...prev,
      ...patients.filter((p) => !prev.some((t) => t.id === p.id)),
    ]);
  };

  // 🔥 Mark patient as done (remove from today's list)
  const markPatientDone = (patientId: number) => {
    setTodayPatients((prev: Patient[]) =>
      prev.filter((p) => p.id !== patientId)
    );
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
        moveConfirmedToToday,
        markPatientDone,
        isPatientLoggedIn,      
        setIsPatientLoggedIn,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};