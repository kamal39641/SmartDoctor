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
  // Demo data for screens
  const demoPending: Patient[] = [
    { id: 1, name: "জান্নাত খাতুন", age: 28, address: "Dhaka", doctorName: "ডা. আহমেদ রহমান", phone: "01710000001", status: "pending" },
    { id: 2, name: "রফিকুল ইসলাম", age: 45, address: "Rajshahi", doctorName: "ডা. আহমেদ রহমান", phone: "01710000002", status: "pending" },
  ];

  const demoConfirmed: Patient[] = [
    { id: 11, name: "শাহીનুর রহমান", age: 37, address: "Chattogram", doctorName: "ডা. আহমেদ রহমান", phone: "01710000011", status: "confirmed" },
  ];

  const demoToday: Patient[] = [
    { id: 21, name: "মো. কামাল", age: 52, address: "Dhaka", doctorName: "ডা. আহমেদ রহমান", phone: "01710000021", status: "today" },
  ];

  const [pendingPatients, setPendingPatients] = useState<Patient[]>(demoPending);
  const [confirmedPatients, setConfirmedPatients] = useState<Patient[]>(demoConfirmed);
  const [todayPatients, setTodayPatients] = useState<Patient[]>(demoToday);
  const [doctorQueue, setDoctorQueue] = useState<Patient[]>(demoToday);
  const [patientPosition, setPatientPosition] = useState<number | null>(null);

  // 🔥 Add Patient (Patient side booking)
  const addPatient = (patient: Patient) => {
    setPendingPatients(prev => [
      ...prev,
      {
        ...patient,
        status: "pending",
      }
    ]);
  };

  // 🔥 Confirm Appointment (move from pending to confirmed)
 const confirmPatient = (patient: Patient) => {

    setPendingPatients(prev => prev.filter(p => p.id !== patient.id));

    setConfirmedPatients(prev => {
      const updated = [
        ...prev,
        {
          ...patient,
          status: "confirmed",
        },
      ];

      // update serial based on updated confirmed list
      setPatientPosition(updated.length);

      return updated;
    });

    if (notificationsEnabled) {
      Alert.alert(
        "✅ Appointment Confirmed",
        `${patient.name} কে SMS পাঠানো হয়েছে`
      );
    }
  };

  // 🔥 Move confirmed patients to today's list (Doctor clicks button)
  const moveConfirmedToToday = () => {
    // Append confirmed patients to today's list and doctor queue
    setTodayPatients(prev => [
      ...prev,
      ...confirmedPatients.map(p => ({ ...p, status: "today" })),
    ]);

    setDoctorQueue(prev => {
      const appended = [
        ...prev,
        ...confirmedPatients.map(p => ({ ...p })),
      ];

      // update patientPosition to reflect new queue length
      setPatientPosition(appended.length === 0 ? null : appended.length);

      return appended;
    });

    // clear confirmed list after moving
    setConfirmedPatients([]);
  };



  // 🔥 Mark patient as done (remove from today's list)
   const markPatientDone = (
    patientId: number
  ) => {

    setDoctorQueue(prev => {

      const updated =
        prev.filter(
          p => p.id !== patientId
        );

      // update patient serial
      setPatientPosition(
        updated.length === 0
          ? null
          : updated.length
      );

      return updated;
    });

    // today patient list থেকেও remove
    setTodayPatients(prev =>
      prev.filter(
        p => p.id !== patientId
      )
    );
  };

  return (
    <DoctorContext.Provider
      value={{
         doctor,
        setDoctor,

        notificationsEnabled,
        setNotificationsEnabled,

        isPatientLoggedIn,
        setIsPatientLoggedIn,

        pendingPatients,
        setPendingPatients,

        confirmedPatients,
        setConfirmedPatients,

        todayPatients,
        setTodayPatients,

        doctorQueue,
        setDoctorQueue,

        patientPosition,
        setPatientPosition,

        addPatient,
        confirmPatient,
        moveConfirmedToToday,
        markPatientDone,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};