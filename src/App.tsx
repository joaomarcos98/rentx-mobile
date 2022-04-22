/** @name Dependecies */
import React from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium
} from "@expo-google-fonts/inter";
import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold
} from "@expo-google-fonts/archivo";
/** @name Theme */
import theme from './styles/theme';
/** @name Screen */
import { Home } from './screens/Home';
import { CarDetails } from "./screens/CarDetails";
import { Scheduling } from './screens/Scheduling';
import { SchedulingDetails } from './screens/SchedulingDetails';
import { SchedulingComplete } from './screens/SchedulingComplete';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function App() {

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <SchedulingComplete />
      </ThemeProvider>
    </GestureHandlerRootView>
  )
}

