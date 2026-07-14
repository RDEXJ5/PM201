import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function RootLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="alta"
                options={{
                    title: "Alta",
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name={focused ? "add-circle" : "add-circle-outline"} />
                    ),
                }}
            />

            <Tabs.Screen
                name="consulta"
                options={{
                    title: "Consulta",
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name={focused ? "search" : "search-outline"} />
                    ),
                }}
            />

            <Tabs.Screen
                name="index"
                options={{
                    title: "Inicio",
                    href: null,
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name={focused ? "home" : "home-outline"} />
                    ),
                }}
            />
        </Tabs>
    );
}