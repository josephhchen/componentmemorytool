import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import PerformanceDashboard from './src/screens/PerformanceDashboard';
import { MemoryUsageProvider } from './src/context/MemoryUsageContext';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <MemoryUsageProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{headerShown: false}} name="HomeScreen" component={HomeScreen} />
          <Stack.Screen options={{headerShown: false, animation: "none"}} name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen options={{headerShown: false, animation: "slide_from_bottom"}} name="SettingsScreen" component={SettingsScreen} />
          <Stack.Screen options={{headerShown: false}} name="PerformanceDashboard" component={PerformanceDashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </MemoryUsageProvider>
  );
}

export default App;
