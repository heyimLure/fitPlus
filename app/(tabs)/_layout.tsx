import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import { useColorScheme } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';

const darkBackground = '#121212';
const lightBackground = '#ffffff';
const darkBorder = '#2C2C2C';
const lightBorder = '#E0E0E0';
const darkText = '#BBBBBB';
const accent = '#007AFF'; // Verde moderno

type TabBarIconProps = {
  color: string;
  focused: boolean;
  size: number;
};

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarActiveTintColor: isDark ? accent : '#007AFF',
        tabBarInactiveTintColor: isDark ? darkText : '#999',
        tabBarStyle: {
          backgroundColor: isDark ? darkBackground : lightBackground,
          borderTopWidth: 0, // <- remove completamente a linha
          position: Platform.OS === 'ios' ? 'absolute' : 'relative',
        },        
        
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Calculadora',
          tabBarIcon: ({ color, size }: TabBarIconProps) => (
            <MaterialCommunityIcons name="calculator-variant" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explorar',
          tabBarIcon: ({ color, size }: TabBarIconProps) => (
            <MaterialCommunityIcons name="rocket-launch" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="historico"
        options={{
          title: 'Histórico',
          tabBarIcon: ({ color, size }: TabBarIconProps) => (
            <MaterialCommunityIcons name="chart-line" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
