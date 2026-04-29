import React, { createContext, useState } from "react";
import { Alert } from "react-native";

export type Patient = {
  id: number;
  name: string;
  age: number;
  address: string;
  doctorName: string;
  phone?: string;
  status?: string;
};

export const DoctorContext = createContext<any>(null);

export const DoctorProvider = ({ children }: any) => {

  // =========================
  // Doctor Info
  // =========================
  const [doctor, setDoctor] = useState({
    name: "ডা. আহমেদ রহমান",
    spec: "কার্ডিওলজিস্ট",
    medical: "ঢাকা মেডিকেল কলেজ হাসপাতাল, ঢাকা",
    bmdc: "A-12345",
    image: null,
  });

  // =========================
  // Settings
  // =========================
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isPatientLoggedIn, setIsPatientLoggedIn] = useState(false);

  // =========================
  // Logged patient (PatientDashboard tracking)
  // =========================
  const [loggedPatient, setLoggedPatient] = useState<Patient | null>(null);

  // =========================
  // Demo Data
  // =========================
  const demoPending: Patient[] = [
    {
      id: 1,
      name: "জান্নাত খাতুন",
      age: 28,
      address: "Dhaka",
      doctorName: "ডা. আহমেদ রহমান",
      phone: "01710000001",
      status: "pending",
    },
    {
      id: 2,
      name: "রফিকুল ইসলাম",
      age: 45,
      address: "Rajshahi",
      doctorName: "ডা. আহমেদ রহমান",
      phone: "01710000002",
      status: "pending",
    },
  ];

  const demoConfirmed: Patient[] = [
    {
      id: 11,
      name: "শরীফুল ইসলাম",
      age: 37,
      address: "Chattogram",
      doctorName: "ডা. আহমেদ রহমান",
      phone: "01710000011",
      status: "confirmed",
    },
  ];

  const demoToday: Patient[] = [
    {
      id: 21,
      name: "মো. কামাল হোসেন",
      age: 52,
      address: "Dhaka",
      doctorName: "ডা. আহমেদ রহমান",
      phone: "01710000021",
      status: "today",
    },
  ];

  // =========================
  // STATES
  // =========================
  const [pendingPatients, setPendingPatients] = useState<Patient[]>(demoPending);
  const [confirmedPatients, setConfirmedPatients] = useState<Patient[]>(demoConfirmed);
  const [todayPatients, setTodayPatients] = useState<Patient[]>(demoToday);
  const [doctorQueue, setDoctorQueue] = useState<Patient[]>(demoToday);

  // =========================
  // 🔥 LIVE POSITION MAP (NEW FIX)
  // =========================
  const [patientPositions, setPatientPositions] =
    useState<{ [key: number]: number }>({});

  // =========================
  // ADD PATIENT
  // =========================
  const addPatient = (patient: Patient) => {

    setPendingPatients(prev => {
      const exists = prev.find(p => p.id === patient.id);
      if (exists) return prev;

      return [...prev, { ...patient, status: "pending" }];
    });

    setLoggedPatient(patient);

    // 🔥 initial position assign
    setPatientPositions(prev => ({
      ...prev,
      [patient.id]: Object.keys(prev).length + 1,
    }));

    if (notificationsEnabled) {
      Alert.alert(
        "Appointment Sent",
        `${patient.name} appointment request submitted`
      );
    }
  };

  // =========================
  // CONFIRM PATIENT
  // =========================
  const confirmPatient = (patient: Patient) => {

    setPendingPatients(prev =>
      prev.filter(p => p.id !== patient.id)
    );

    setConfirmedPatients(prev => [
      ...prev,
      { ...patient, status: "confirmed" },
    ]);
  };

  // =========================
  // MOVE TO TODAY + QUEUE
  // =========================
  const moveConfirmedToToday = () => {

    setTodayPatients(prev => {

      const existing = new Set(prev.map(p => p.id));

      const newPatients = confirmedPatients
        .filter(p => !existing.has(p.id))
        .map(p => ({ ...p, status: "today" }));

      return [...prev, ...newPatients];
    });

    setDoctorQueue(prev => {

      const existing = new Set(prev.map(p => p.id));

      const newQueue = confirmedPatients.filter(p => !existing.has(p.id));

      const updated = [...prev, ...newQueue];

      // 🔥 UPDATE POSITION MAP
      const newPositions: any = {};
      updated.forEach((p, index) => {
        newPositions[p.id] = index + 1;
      });

      setPatientPositions(newPositions);

      return updated;
    });

    setConfirmedPatients([]);
  };

  // =========================
  // PATIENT DONE
  // =========================
  const markPatientDone = (patientId: number) => {

    setDoctorQueue(prev => {

      const updated = prev.filter(p => p.id !== patientId);

      // 🔥 REBUILD POSITION MAP
      const newPositions: any = {};
      updated.forEach((p, index) => {
        newPositions[p.id] = index + 1;
      });

      setPatientPositions(newPositions);

      return updated;
    });
  };

  // =========================
  // CLEAR TODAY
  // =========================
  const clearTodayPatients = () => {
    setTodayPatients([]);
  };

  // =========================
  // 🔥 LIVE POSITION (FIXED)
  // =========================
  const getPatientPosition = (patientId: number) => {
    return patientPositions[patientId] ?? null;
  };

  const patientsAhead = (patientId: number) => {
    const pos = getPatientPosition(patientId);
    if (!pos) return 0;
    return pos - 1;
  };

  // =========================
  // PROVIDER
  // =========================
  return (
    <DoctorContext.Provider
      value={{
        doctor,
        setDoctor,

        notificationsEnabled,
        setNotificationsEnabled,

        isPatientLoggedIn,
        setIsPatientLoggedIn,

        loggedPatient,
        setLoggedPatient,

        pendingPatients,
        setPendingPatients,

        confirmedPatients,
        setConfirmedPatients,

        todayPatients,
        setTodayPatients,

        doctorQueue,
        setDoctorQueue,

        addPatient,
        confirmPatient,
        moveConfirmedToToday,
        markPatientDone,
        clearTodayPatients,

        // 🔥 NEW LIVE SYSTEM
        getPatientPosition,
        patientsAhead,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};