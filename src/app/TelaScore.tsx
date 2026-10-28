import { Usuario } from "@/types/usuario";

import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { db } from "../../firebaseConfig";

export default function TelaScore() {
    const [lista, setLista] = useState<Usuario[]>([]);
    async function consultar() {
        setLista([])
        try {
            const usuariosRef = collection(db, 'usuarios')

            const q = query(usuariosRef, orderBy('tentativas', 'asc'));

            const querySnapshot = await getDocs(q);

            const novaLista: Usuario[] = [];

            querySnapshot.docs.forEach((doc) => {
                const usuario = {
                    ...doc.data()
                } as Usuario
                novaLista.push(usuario)
            })
            setLista(novaLista)
        }
        catch (e) {
            console.error("Erro ao consultar.", e)
        }


    }
    return (

        <View style={estilos.container}>
            <Text style={estilos.titulo}>Tela de usuários</Text>
            <Button title="Mostrar ranking de usuários"
                onPress={consultar} />

            <FlatList
                data={lista}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(item) => {
                    return (
                        <View style={estilos.itemContainer}>
                            <Text>Usuários cadastrados </Text>
                            <Text>NOME: {item.item.nomeUsuario}</Text>
                            <Text>Número de tentativas: {item.item.tentativas}</Text>
                            <Text>Ganhou: {item.item.ganhou ? 'Sim' : 'Não'}</Text>

                        </View>
                    )
                }} />


        </View>

    )
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5'
    },
    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center'
    },
    itemContainer: {
        marginBottom: 20,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        elevation: 2,
    },
    botaoExcluir: {
        backgroundColor: '#ff4444',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center'
    },
    textoBotaoExcluir: {
        color: 'white',
        fontWeight: 'bold'
    },
    vazio: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#666'
    }
});