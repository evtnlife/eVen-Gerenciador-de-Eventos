import React, {useContext, useState} from 'react'
import {
    View,
    Text,
    StyleSheet, TouchableOpacity, Button, FlatList, Image,
} from 'react-native'
import Storage from '../global/storage';

import AuthContext from "../contexts/auth";
import DashboardService from "../services/dashboard";
import MinicursoService from "../services/minicurso";
import Common from "../global/common";

const Dashboard = () => {
    const {context, setContext} = useContext(AuthContext);
    const [inscricao, setInscricao] = useState(
        {
            "id": 10,
            "pagamento": 0,
            "minicurso_id": 3,
            "user_id": 1,
            "created_at": "2021-08-30T23:41:44.000000Z",
            "updated_at": "2021-08-30T23:41:44.000000Z",
            "minicurso": {
                "id": 3,
                "professor_id": 1,
                "user_id": 1,
                "titulo": "LGPD",
                "descricao": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                "data_inicial": "2021-08-23 15:10:27",
                "data_final": "2021-08-28 15:10:27",
                "carga_horaria": 33,
                "status": 1,
                "created_at": "2021-08-22T15:14:35.000000Z",
                "updated_at": "2021-09-06T16:23:31.000000Z"
            }
        }
    );
    const [minicursos, setMinicursos] = useState(
        {
            "id": 3,
            "professor_id": 1,
            "user_id": 1,
            "titulo": "LGPD",
            "descricao": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "data_inicial": "2021-08-23 15:10:27",
            "data_final": "2021-08-28 15:10:27",
            "carga_horaria": 33,
            "status": 1,
            "created_at": "2021-08-22T15:14:35.000000Z",
            "updated_at": "2021-09-06T16:23:31.000000Z",
            "inscricoes": [
                {
                    "id": 10,
                    "pagamento": 0,
                    "minicurso_id": 3,
                    "user_id": 1,
                    "created_at": "2021-08-30T23:41:44.000000Z",
                    "updated_at": "2021-08-30T23:41:44.000000Z"
                }
            ]
        }
    );
    const [first, setFirst] = useState(false);

    const doLogoff = () => {
        Storage.removeItem('user');
    };

    const getDashboard = async () => {
        try {
            const data = await DashboardService.getDashboardData();
            if (data !== undefined) {
                setInscricao(data.MinhasInscricoes);
                setMinicursos(data.MeusMinicursos[0]);
                setFirst(true);
            }
        } catch (e) {
            console.log(e);
        }
    };
    if(!first) {
        const aux = getDashboard();
    }
    const cancelMinicurso = (id) =>{
        console.log(id);
    };
    const visualizarMinicurso = (id) => {

    };
    return (
    <View style={styles.mainView}>
        <View style={styles.infoBox}>
            <Text><Text style={styles.label}>Matricula: </Text>{context.user.matricula}</Text>
            <Text><Text style={styles.label}>Nome: </Text>{context.user.name}</Text>
            <Text><Text style={styles.label}>Email: </Text>{context.user.email}</Text>
        </View>
        <View style={styles.infoBox}>
            <Text style={styles.label}>Minha Inscrição</Text>
            {(() => {
                if(inscricao !== null){
                    console.log(inscricao);
                    return (
                        <View>
                            <View>
                                <Text><Text style={styles.label}>Titulo: </Text>{inscricao.minicurso.titulo}</Text>
                                <Text><Text style={styles.label}>Pagamento Inscrição: </Text>{ inscricao.pagamento === 0 ? 'Pendente' : 'Pago' }</Text>
                                <Text><Text style={styles.label}>Carga Horária: </Text>{ inscricao.minicurso.carga_horaria }</Text>
                                <Text><Text style={styles.label}>Data Inicial: </Text>{ inscricao.minicurso.data_inicial }</Text>
                                <Text><Text style={styles.label}>Data Final: </Text>{ inscricao.minicurso.data_final }</Text>
                                <Text><Text style={styles.label}>Quantidade de Inscritos: </Text>{ inscricao.minicurso.inscricoes != null ? inscricao.minicurso.inscricoes.length : ''}</Text>
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={styles.buttonRight}>
                                    <Text style={styles.buttonText}>Emitir Certificado</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.btnCancel}
                                    onPress={() => cancelMinicurso(minicursos.id)}>
                                    <Text style={styles.buttonText}>Cancelar Inscrição</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                }
                else {
                    return (<Text>Você ainda não se inscreveu em um minicurso.</Text>);
                }
            })()}
        </View>
        <View style={styles.infoBox}>
            <Text style={styles.label}>Meus Minicursos</Text>
            {(() => {
                console.log(minicursos);
                if(minicursos !== null){
                    return (
                        <View>
                            <View>
                                <Text><Text style={styles.label}>Titulo: </Text>{minicursos.titulo}</Text>
                                <Text><Text style={styles.label}>Quantidade de Inscritos: </Text>{ minicursos.inscricoes.length }</Text>
                            </View>
                            <View>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        style={styles.buttonRight}
                                        onPress={() => visualizarMinicurso(minicursos.id)}>
                                        <Text style={styles.buttonText}>Visualizar minicurso</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.btnCancel}
                                        onPress={() => cancelMinicurso(minicursos.id)}>
                                        <Text style={styles.buttonText}>Cancelar minicurso</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                    );
                }
                else
                {
                    return (<Text>Você ainda não criou um minicurso.</Text>);
                }
            })()}
        </View>
    </View>)
};

const styles = StyleSheet.create({
    mainView: {
        flex:1,
    },
    infoBox: {
        backgroundColor: 'rgb(220, 220, 220)',
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
    label:{
        fontWeight: 'bold'
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    btnSair:{
        padding: 10,
        margin: 10
    },
    btnCancel: {
        backgroundColor: Common.LARANJA,
        minWidth: 150,
    },
    buttonText: {
        color: 'white',
        padding: 10,
        textAlign: 'center'
    },
    buttonContainer: {
        marginTop: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        width: '100%',
    },

    buttonRemove: {
        backgroundColor: Common.AZUL,
        width: '100%',
    },
    buttonRight: {
        backgroundColor: Common.AZUL,
        flex: 1,
        marginRight: 5
    },
    buttonLeft: {
        backgroundColor: Common.AZUL,
        flex: 1,
        marginLeft: 5
    },
});
export default Dashboard;
