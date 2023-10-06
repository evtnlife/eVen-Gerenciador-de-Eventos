import React, {useEffect, useState} from 'react'
import {
    Button,
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    Image,
    TouchableOpacity,
    NativeModules,
    ScrollView, SafeAreaView
} from 'react-native'
import MinicursoService from '../services/minicurso';
import Common from "../global/common";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'


const Cursos = ({ navigation }) => {
    const [minicursos, setMinicursos] = useState(null);
    const [minicurso, setMinicurso] = useState(null);
    const [alertMsg, setAlertMsg] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    useEffect(() => {
    });
    const getMinicursos = async () => {
        const data = await MinicursoService.getAll();
        if (data !== undefined) {
            setMinicursos(data.response);
        }
    };

    if (minicursos === null) {
        const aux = getMinicursos();
    }
    const showItem = (item) => {
        setMinicurso(item);
    };
    const inscrever = async () => {
        let data = {
            id: minicurso.id
        };
        let response = await MinicursoService.inscrever(data);
        if (response !== undefined) {
            if (response.status == 'fail') {
                setAlertMsg(response.response);
                setShowAlert(true);
            }
            else {
                navigation.navigate('Dashboard');
            }
        }
    };
    const voltar = ()=>{
        setAlertMsg('');
        setShowAlert(false);
        setMinicurso(null);
        setMinicursos(null);
    };
    const renderItem = ({item}) => {
        return (<View style={styles.listView}>
            <TouchableOpacity style={styles.infoBox} onPress={x => showItem(item)}>
                <Text>
                    <Text style={styles.label}>Titulo: </Text>
                    {(item.titulo.length > 30 ? item.titulo.slice(0, 30) + '...' : item.titulo)}
                </Text>
                <Text>
                    <Text style={styles.label}>Titulo: </Text>
                    {(item.descricao.length > 100 ? item.descricao.slice(0, 100) + '...' : item.descricao)}
                </Text>
                <View style={styles.dateBox}>
                    <Text style={styles.dateBoxItem}>
                        <Text style={styles.label}>Data Inicial: </Text>
                        {moment(item.data_inicial).format('DD/MM/YYYY')}
                    </Text>
                    <Text style={styles.dateBoxItem}>
                        <Text style={styles.label}>Data Final: </Text>
                        {moment(item.data_final).format('DD/MM/YYYY')}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>);
    };
    const renderRequisito = ({item}) => {
        return (<View style={styles.reqList}>
            <Text style={styles.reqItem}>- {item.descricao}</Text>
        </View>)
    };
    return (
        <ScrollView>
            {minicurso == null ?
                <View style={styles.mainView}>
                    <Text style={styles.title}>Minicursos</Text>
                    <FlatList
                        data={minicursos}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}>
                    </FlatList>
                </View>
                :
                <View style={styles.mainView}>
                    <Text style={styles.title}>{minicurso.titulo}</Text>
                    <Text style={styles.infoBox}>{minicurso.descricao}</Text>


                    <Text style={styles.title}>Pré-Requisitos</Text>
                    <View style={styles.infoBox}>
                        <FlatList data={minicurso.requisitos} renderItem={renderRequisito} keyExtractor={x => x.id}>
                        </FlatList>
                    </View>

                    <Text style={styles.title}>Informações</Text>
                    <View style={[styles.infoBox]}>
                        <View style={[styles.dateBox]}>
                            <Text style={styles.dateBoxItem}>
                                <Text style={styles.label}>Data Inicial: </Text>
                                {moment(minicurso.data_inicial).format('DD/MM/YYYY')}
                            </Text>
                            <Text style={styles.dateBoxItem}>
                                <Text style={styles.label}>Data Final: </Text>
                                {moment(minicurso.data_final).format('DD/MM/YYYY')}
                            </Text>
                        </View>
                        <Text>
                            <Text style={styles.label}>Professor responsavel: </Text>
                            {minicurso.professor != null ? minicurso.professor.name: ''}
                        </Text>
                        <Text>
                            <Text style={styles.label}>Aluno responsavel: </Text>
                            {minicurso.user != null ? minicurso.user.name: ''}
                        </Text>
                        <Text>
                            <Text style={styles.label}>Quantidade de inscritos: </Text>
                            {minicurso.inscricoes != null ? minicurso.inscricoes.length: 0}
                            {console.log(minicurso)}
                        </Text>
                    </View>
                    {showAlert && (
                        <View>
                            <Text style={styles.alert}>{alertMsg}</Text>
                        </View>
                    )}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.buttonRight}
                            onPress={x => voltar()}>
                            <Text style={styles.buttonText}>VOLTAR</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonLeft}
                            onPress={inscrever}>
                            <Text style={styles.buttonText}>INSCREVER</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
    alert: {
        color: 'red',
        margin: 10,
        padding: 10,
        backgroundColor: 'rgb(220, 220, 220)',
    },
    title: {
        margin: 10,
        padding: 10,
        marginBottom: 5,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: 'rgb(220, 220, 220)',
    },
    infoBox: {
        flex: 1,
        backgroundColor: 'rgb(220, 220, 220)',
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 5,
    },
    label: {
        fontWeight: 'bold'
    },
    btnSair: {
        padding: 10,
        margin: 10
    },
    listView: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    listViewItem: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#fff',
        padding: 5,
        fontSize: 15
    },
    dateBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },
    reqList: {},
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        width: '100%',
        margin: 10
    },
    buttonRight: {
        backgroundColor: Common.AZUL,
        flex: 1,
        marginRight: 5,
    },
    buttonLeft: {
        backgroundColor: Common.GREEN,
        flex: 1,
        marginLeft: 5,
        marginRight: 20
    },
    buttonText: {
        color: 'white',
        padding: 10,
        textAlign: 'center'
    },
});
export default Cursos;
