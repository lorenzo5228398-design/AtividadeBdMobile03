import { Usuario } from "@/types/usuario";
import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { db } from "../../firebaseConfig";

export default function TelaScore() {
    const [lista, setLista] = useState<Usuario[]>([]);
    async function consultar() {
        setLista([]);
        const querySnapshot = await getDocs(collection(db, 'usuarios'))
        querySnapshot.docs.map((doc) => {
            const usuario = {

                ...doc.data()
            } as Usuario;

            setLista((listaAnterior) => [...listaAnterior, usuario]);
        })
    }
    return (

        <View>

            <Pressable
                onPress={consultar}>
                <Text style={styles.texto}>Consultar</Text>
            </Pressable>

            <FlatList
                data={lista}
                renderItem={(item) => {
                    return (
                        <View style={styles.card}>
                            <Text>NOME: {item.item.nome}</Text>
                            <Text>Número de tentativas: {item.item.tentativas}</Text>

                        </View>
                    )
                }} />


        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    texto: {
        fontSize: 20
    },
    card:{
        borderWidth: 1
    }
});