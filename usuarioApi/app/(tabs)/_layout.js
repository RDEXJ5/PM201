import {tabs} from "expo-router";
import {IonIcons} from "@expo/ vectot-icons";

export default function RootLayout() {
    return (
        <tabs>

            <tabs.Screen name="Alta" options={{title: "Alta", tabBarIcon: ({focused}) => <IonIcons name={focused ? 'add-circle' : 'add-circle-outline'} />}}/>

            <tabs.Screen name="Consulta" options={{title: "Consulta", tabBarIcon: ({focused}) => <IonIcons name={focused ? 'search' : 'search-outline'} />}}/>

            <tabs.Screen name="index" options={{title: "Inicio", href:null, tabBarIcon: ({focused}) => <IonIcons name={focused ? 'home' : 'home-outline'} />}}/>

        </tabs>
    )
}