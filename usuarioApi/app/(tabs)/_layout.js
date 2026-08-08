import {Redirect, Tabs} from 'expo-router';
import {obtenerApiUrl} from '../../config/api';

export default function TabsLayout() {
  if (!obtenerApiUrl()) {
    return <Redirect href="/" />;
  }

  return (
    <Tabs>
      <Tabs.Screen name="alta" options={{title:"Alta"}} />
      <Tabs.Screen name="consulta" options={{title:"Consulta"}} />
    </Tabs>
  );
}
