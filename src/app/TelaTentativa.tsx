import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { db } from "../../firebaseConfig";

export default function TelaTentativas() {
    const [nomeUsuario, setNomeUsuario] = useState("");
    const [tentativas, setTentativas] = useState(0);
    const [tentativa, setTentativa] = useState("");
    const [ganhou, setGanhou] = useState(false);

    const [numeroSorteado, setNumeroSorteado] = useState(Math.floor(Math.random() * 100) + 1);
    console.log(numeroSorteado);


    async function adicionarTentativaUsuarioOuCriarUsuario(usuarioInserido: string, novaQuantidadeTentativa: number, usuarioVitorioso: boolean) {

        try {
            const usuarioRef = collection(db, 'usuarios');
            const busca = query(usuarioRef, where('nomeUsuario', '==', usuarioInserido));
            

            const resultado = await getDocs(busca);

            if (!resultado.empty) {
                const documentoEncontrado = resultado.docs[0];
                const idEncontrado = documentoEncontrado.id;
                const dadosUsuario = documentoEncontrado.data();

                if (dadosUsuario.ganhou == true) {
                    Alert.alert("Este usuário já ganhou, selecione outro para continuar.");
                    return false;

                }

                const dadosAtualizados: any ={tentativas: novaQuantidadeTentativa}

                if(usuarioVitorioso){
                    dadosAtualizados.ganhou = true
                }


                const usuarioRef = doc(db, 'usuarios', idEncontrado);

                await updateDoc(usuarioRef, dadosAtualizados)
            }

            else {
                inserir(novaQuantidadeTentativa, usuarioVitorioso)
                return false
            }
        }


        catch (e) {
            console.error("Erro ao checar o usuário");
            return false;
        }

    }


    function inserir(quantidadeTentativasExata: number, usuarioVitorioso: boolean) {
        if (!nomeUsuario) {
            Alert.alert("É necessário inserir um usuário para jogar.");
            return false;

        }

        const prod = {
            nomeUsuario: nomeUsuario,
            tentativas: quantidadeTentativasExata,
            ganhou: usuarioVitorioso
        }

        try {

            addDoc(collection(db, 'usuarios'), prod);
            Alert.alert('Usuário inserido');
        } catch (e) {
            Alert.alert('Erro', String(e));
        }
    }

    async function verificarTentativa() {
        const tentativaNumero = parseInt(tentativa);

        if (tentativaNumero == numeroSorteado) {
            Alert.alert('Parabéns, você acertou :)')
            setGanhou(true);
            const totalFinal = tentativas + 1
            await adicionarTentativaUsuarioOuCriarUsuario(nomeUsuario, totalFinal, true)

            const novoNumero = Math.floor(Math.random() * 100) + 1;
            setNumeroSorteado(novoNumero);
            setNomeUsuario("");
            setTentativa("");

        }
        else {
            Alert.alert('Número incorreto, tente novamente.')
            const novoTotalTentativas = tentativas + 1;
            setTentativas(novoTotalTentativas)
            await adicionarTentativaUsuarioOuCriarUsuario(nomeUsuario, novoTotalTentativas, false);
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

            <Text>Insira sua tentativa </Text>
            <TextInput
                style={styles.input}
                value={tentativa}
                onChangeText={setTentativa} />

            <Pressable
                style={styles.botao_tentativa}
                onPress={() => {
                    verificarTentativa();
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
        backgroundColor: '#008dde',
        padding: 15,
        marginTop: 20,
        borderRadius: 5,
        alignItems: 'center'

    }
});