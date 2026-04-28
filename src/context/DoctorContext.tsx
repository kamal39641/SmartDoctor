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

  const [notificationsEnabled, setNotificationsEnabled] =
    useState(true);

  const [isPatientLoggedIn, setIsPatientLoggedIn] =
    useState(false);


  // =========================
  // LOGGED BOOKED PATIENT
  // (for PatientDashboard live queue)
  // =========================

  const [loggedPatient, setLoggedPatient] =
    useState<Patient | null>(null);



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

  const [pendingPatients,setPendingPatients] =
    useState<Patient[]>(demoPending);

  const [confirmedPatients,setConfirmedPatients] =
    useState<Patient[]>(demoConfirmed);

  const [todayPatients,setTodayPatients] =
    useState<Patient[]>(demoToday);


  // LIVE QUEUE
  const [doctorQueue,setDoctorQueue] =
    useState<Patient[]>(demoToday);



  // =========================
  // ADD PATIENT BOOKING
  // =========================

  const addPatient = (
    patient: Patient
  ) => {

    setPendingPatients(prev => {

      const exists =
        prev.find(
          p=>p.id===patient.id
        );

      if(exists) return prev;

      return [
        ...prev,
        {
          ...patient,
          status:"pending"
        }
      ];

    });


    // save booked patient
    // PatientDashboard live tracking
    setLoggedPatient(patient);


    if(notificationsEnabled){
      Alert.alert(
        "Appointment Sent",
        `${patient.name} appointment request submitted`
      );
    }

  };



  // =========================
  // CONFIRM APPOINTMENT
  // =========================

  const confirmPatient = (
    patient:Patient
  ) => {

    setPendingPatients(prev =>
      prev.filter(
        p=>p.id!==patient.id
      )
    );


    setConfirmedPatients(prev=>{

      const exists=
        prev.find(
          p=>p.id===patient.id
        );

      if(exists) return prev;

      return[
        ...prev,
        {
          ...patient,
          status:"confirmed"
        }
      ];

    });


    if(notificationsEnabled){
      Alert.alert(
        "Appointment Confirmed",
        `${patient.name} confirmed`
      );
    }

  };



  // =========================
  // CONFIRMED -> TODAY QUEUE
  // =========================

  const moveConfirmedToToday = () => {

    setTodayPatients(prev=>{

      const existing=
        new Set(
          prev.map(
            p=>p.id
          )
        );

      const newPatients=
        confirmedPatients
          .filter(
            p=>!existing.has(p.id)
          )
          .map(
            p=>({
              ...p,
              status:"today"
            })
          );

      return[
        ...prev,
        ...newPatients
      ];

    });



    setDoctorQueue(prev=>{

      const existing=
        new Set(
          prev.map(
            p=>p.id
          )
        );

      const newQueue=
        confirmedPatients.filter(
          p=>!existing.has(p.id)
        );

      return[
        ...prev,
        ...newQueue
      ];

    });


    setConfirmedPatients([]);

  };



  // =========================
  // PATIENT SEEN
  // Queue shifts automatically
  // =========================

  const markPatientDone = (
    patientId:number
  ) => {

    setDoctorQueue(prev=>
      prev.filter(
        p=>p.id!==patientId
      )
    );

  };



  // =========================
  // CLEAR TODAY
  // =========================

  const clearTodayPatients = () => {
    setTodayPatients([]);
  };



  // =========================
  // LIVE POSITION
  // =========================

  const getPatientPosition = (
    patientId:number
  ) => {

    const index=
      doctorQueue.findIndex(
        p=>p.id===patientId
      );

    if(index===-1){
      return null;
    }

    return index+1;

  };



  // patients ahead
  const patientsAhead = (
    patientId:number
  ) => {

    const pos=
      getPatientPosition(
        patientId
      );

    if(pos===null){
      return 0;
    }

    return pos-1;
  };



  return(
    <DoctorContext.Provider
      value={{

        doctor,
        setDoctor,

        notificationsEnabled,
        setNotificationsEnabled,

        isPatientLoggedIn,
        setIsPatientLoggedIn,

        // NEW
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

        getPatientPosition,
        patientsAhead,

      }}
    >
      {children}
    </DoctorContext.Provider>
  );

};