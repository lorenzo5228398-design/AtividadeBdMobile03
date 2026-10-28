import { router } from "expo-router";
import { Button, StyleSheet, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Button
        title='Ir à tela de tentativa'
        onPress={() => router.push('/TelaTentativa')} />

      <Button
        title='Ir à tela de score'
        onPress={() => router.push('/TelaScore')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 15
  },
});
