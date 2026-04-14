import { Stack } from "expo-router";
import { DoctorProvider } from "../src/context/DoctorContext";

export default function RootLayout() {
  return (
    <DoctorProvider>
      <Stack
        screenOptions={{
          headerShown: false, 
        }}
      />
    </DoctorProvider>
  );
}