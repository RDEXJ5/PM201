import { Alert, Platform } from 'react-native';

export function showMessage(title, message) {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n${message}`);
  } else {
    Alert.alert(title, message);
  }
}

export function pesos(value) {
  return `$${Number(value || 0).toFixed(2)}`;
}
