import { Stack } from "expo-router";
import { DoctorProvider } from "../src/context/DoctorContext";
import { AdminProvider } from "../src/context/AdminContext";

export default function RootLayout() {
  return (
    <DoctorProvider>
      <AdminProvider>
        <Stack
          screenOptions={{
            headerShown: false, 
          }}
        />
      </AdminProvider>
    </DoctorProvider>
  );
}