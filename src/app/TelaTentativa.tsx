import { Usuario } from "@/types/usuario";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { db } from "../../firebaseConfig";

export default function TelaTentativas() {
    const [lista, setLista] = useState<Usuario[]>([]);
    const [nomeUsuario, setNomeUsuario] = useState("");
    const [tentativas, setTentativas] = useState(1);
    const [tentativa, setTentativa] = useState("");

    const [numeroSorteado, setNumeroSorteado] = useState(Math.floor(Math.random() * 100) + 1);
    console.log(numeroSorteado);


    function inserir() {
        const prod = {
            nomeUsuario: nomeUsuario,
            tentativa: tentativa,
            tentativas: tentativas
        }

        try {
        
            addDoc(collection(db, 'usuarios'), prod);
            Alert.alert('Usuário inserido');
        } catch (e) {
            Alert.alert('Erro', String(e));
        }
    }
    function somarNumeroTentativas() {
        return setTentativas(tentativas + 1);

    }

    function verificarTentativa() {
        const tentativaNumero = parseInt(tentativa);

        if (tentativaNumero == numeroSorteado) {
            Alert.alert('Parabéns, você acertou :)')
        }
        else {
            Alert.alert('Número incorreto, tente novamente.')
            setTentativa('')
        }

    }



    return (
        <View style={styles.container}>
            <Text>Nome do usuário</Text>
            <TextInput
                style={styles.input}
                value={nomeUsuario}
                onChangeText={setNomeUsuario} />

            <Text>Insira sua tentativa: </Text>
            <TextInput
                style={styles.input}
                value={tentativa}
                onChangeText={setTentativa} />

            <Pressable
                style={styles.botao_tentativa}
                onPress={() => {
                    somarNumeroTentativas();
                    verificarTentativa();
                    inserir()
                }}
            >
                <Text>Realizar tentativa</Text>
            </Pressable>




        </View>


    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 5
    },
    input: {
        width: 200,
        borderWidth: 1,
    },
    titulo_campo: {
        fontSize: 14
    },
    view_campo: {
        margin: 5
    },
    botao_tentativa: {
        marginTop: 15,
        backgroundColor: '#008dde',
        borderRadius: 4

    }
});