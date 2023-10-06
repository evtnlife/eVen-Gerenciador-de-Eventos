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

const Ministrar = () => {
        const [minicursos, setMinicursos] = useState(null);
        const [cadastro, setCadastro] = useState(false);
        const [cadStep, setCadStep] = useState(0);
        const [startDate, setStartDate] = useState(new Date());
        const [endDate, setEndDate] = useState(new Date());
        const [showStartDate, setShowStartDate] = useState(false);
        const [showEndDate, setShowEndDate] = useState(false);
        const [showAlert, setShowAlert] = useState(false);
        const [alertMsg, setAlertMsg] = useState('');
        const [titulo, setTitulo] = useState('');
        const [descricao, setDescricao] = useState('');
        const [cargaHoraria, setCargaHoraria] = useState(0);
        const [requisitoDesc, setRequisitoDesc] = useState('');
        const [requisitos, setRequisitos] = useState([{titulo: '-', id: 0}]);
        const [requisito, setRequisito] = useState(null);
        const [editMode, setEditMode] = useState(false);
        const [id, setId] = useState(-1);
        useEffect(() =>
            {
                if (requisito !== null && requisito !== undefined && requisito.status == 1) {
                    let req = requisitos;
                    let index = 0;
                    req.map((x) => {
                        if (x.id > index)
                            index = x.id;
                    });
                    req.push({
                        titulo: requisito.titulo,
                        id: index + 1
                    });
                    setRequisitos(req);
                    setRequisito(null);
                }
                if (requisito != null && requisito != undefined && requisito.status == 2) {
                    let requ = [];
                    requisitos.map((x) => {
                        if (requisito.id != x.id) {
                            requ.push(x);
                        }
                    });
                    setRequisitos(requ);
                    setRequisito(null);
                }
            }, [requisito, requisitos]
        );
        //Obtem lista de minicursos.
        const getMinicursos = async () => {
            try {
                const data = await MinicursoService.getMeusMinicursos();
                if (data !== undefined) {
                    setMinicursos(data.minicursos);
                }
            } catch (e) {
                console.log(e);
            }
        };
        if (minicursos === null) {
            const aux = getMinicursos();
        }

        //View control itens
        const RemoverRequisito = async (ide) => {
            setRequisito(ide);
        };
        const addRequisitos = async () => {
            var insert = true;
            requisitos.map((x) => {
                if (x.titulo == requisitoDesc) {
                    setAlertMsg("Requisito ja foi adicionado.");
                    setShowAlert(true);
                    insert = false;
                    setRequisitoDesc('');
                } else
                    setShowAlert(false);
            });
            if (requisitoDesc == '') {
                setAlertMsg("Preencha o campo requisito antes de adicionar.");
                setShowAlert(true);
                insert = false;
            }
            if (insert) {
                setRequisito({
                    titulo: requisitoDesc,
                    status: 1,
                });
                setShowAlert(false);
                setAlertMsg('');
                setRequisitoDesc('');
            }
        };
        const onChangeStartDate = (event, selectedDate) => {
            const currentDate = selectedDate || startDate;
            setShowStartDate(false);
            if (moment(new Date(moment)) > moment(currentDate)) {
                setAlertMsg('Data inicial menor que o dia atual.');
                setShowAlert(true);
                return;
            }
            if (alertMsg != '')
                setAlertMsg('');
            setStartDate(currentDate);
        };
        const onChangeEndDate = (event, selectedDate) => {
            const currentDate = selectedDate || endDate;
            setShowEndDate(false);
            if (moment(currentDate) < moment.now()) {
                setAlertMsg('Data final menor que o dia atual.');
                setShowAlert(true);
                return;
            }
            if (moment(currentDate) <= moment(startDate)) {
                setAlertMsg('Data inicial maior que data final.');
                setShowAlert(true);
                return;
            }
            if (alertMsg != '')
                setAlertMsg('');
            setEndDate(currentDate);
        };
        const doRequest = async () => {
            try {
                let data = {
                    id: id,
                    titulo: titulo,
                    descricao: descricao,
                    startDate: startDate,
                    endDate: endDate,
                    cargaHoraria: cargaHoraria,
                    requisitos: requisitos
                };
                let request = null;
                if (!editMode)
                    request = await MinicursoService.create(data);
                else
                    request = await MinicursoService.edit(data);
                if (request !== undefined) {
                    if (request.status == "fail") {
                        let data = "";
                        request.response.descricao.forEach((x) => {
                            data = data + x + "\n";
                        });
                        setAlertMsg(data);
                        setShowAlert(true);
                    }
                    if (request.status == "success") {
                        setAlertMsg('');
                        setShowAlert(false);
                        setCadStep(0);
                        setCadastro(false);
                        getMinicursos();
                    }
                }
            } catch (e) {
                console.log(e);
            }
        };
        const previous = () => {
            if (cadStep > 0)
                setCadStep(cadStep - 1);
            else
                setCadastro(false);
        };
        const next = async () => {
            if (ConsisteDados(cadStep)) {
                if (cadStep < 1)
                    setCadStep(cadStep + 1);
                else
                    doRequest();
            }
        };
        const ConsisteDados = (step) => {
            if (step === 0) {
                if (titulo === "") {
                    setAlertMsg("Preencha o titulo antes de avançar!");
                    setShowAlert(true);
                    return false;
                }
                if (cargaHoraria <= 0) {
                    setAlertMsg("Carga horaria invalida!");
                    setShowAlert(true);
                    return false;
                }
                if (descricao.length < 50) {
                    setAlertMsg("Insira mais detalhes na descrição do minicurso!");
                    setShowAlert(true);
                    return false;
                }
                if (moment.now() >= moment(startDate)) {
                    setAlertMsg("Data inicial menor que data atual!");
                    setShowAlert(true);
                    return false;
                }
                if (moment(endDate) < moment(startDate)) {
                    setAlertMsg("Data inicial menor que data final!");
                    setShowAlert(true);
                    return false;
                }

                setShowAlert(false);
                return true;
            }
            if (cadStep === 1) {
                if (requisitos.length === 1) {
                    setAlertMsg("Você deve adicionar ao menos um requisito.");
                    setShowAlert(true);
                    return false;
                }
                setShowAlert(false);
                return true;
            }
            return false;
        };
        const cadClickRequest = () => {
            setCadastro(true);
            setCadStep(0);
            setTitulo('');
            setDescricao('');
            setStartDate(new Date());
            setEndDate(new Date());
            setCargaHoraria(0);
            setRequisitos([{titulo: '-', id: 0}]);
            setRequisito('');
            setEditMode(false);
        };
        const editClickRequest = (item) => {
            setCadastro(true);
            setCadStep(0);
            setTitulo(item.titulo);
            setDescricao(item.descricao);
            setStartDate(new Date(moment(item.data_inicial)));
            setEndDate(new Date(moment(item.data_final)));
            setCargaHoraria(item.carga_horaria);
            if (item.requisitos == null) {
                setRequisitos([{titulo: '-', id: 0}]);
            }
            else
            {
                let requisitosAux = [];
                item.requisitos.forEach(x => {
                    requisitosAux.push({
                        titulo: x.descricao,
                        id: x.id
                    });
                });
                setRequisitos(requisitosAux);
            }
            setEditMode(true);
            setId(item.id);
        };
        //Render itens
        const renderRequisitos = ({item}) => {
            return (<View style={styles.listView}>
                <Text style={styles.listViewItem}>{item.titulo}</Text>
                {
                    item.id != 0 ?
                        <Text style={styles.listViewItem}>
                            <TouchableOpacity
                                style={styles.buttonRemove}
                                onPress={() => {
                                    RemoverRequisito({id: item.id, status: 2})
                                }}>
                                <Text style={styles.buttonText}>Delete</Text>
                            </TouchableOpacity>
                        </Text>
                        :
                        <Text style={styles.listViewItem}>-</Text>
                }
            </View>)
        };
        const renderRequisitosHeader = () => {
            return (<View style={styles.listView}>
                <Text style={styles.listViewHeader}>Titulo</Text>
                <Text style={styles.listViewHeader}>Opções</Text>
            </View>)
        };
        const renderItem = ({item}) => {
            return (<View style={styles.listView}>
                <TouchableOpacity
                    style={styles.listView}
                    onPress={() => editClickRequest(item)}>
                    <Text style={styles.listViewItem}>{item.titulo}</Text>
                    <Text style={styles.listViewItem}>{item.status === 0 ? 'Lib. Pendente' : 'Liberado'}</Text>
                    <Text style={styles.listViewItem}>{moment(item.created_at).format('DD/MM/YYYY')}</Text>
                </TouchableOpacity>
            </View>)
        };
        const renderHeader = () => {
            return (<View style={styles.listView}>
                <Text style={styles.listViewHeader}>Titulo</Text>
                <Text style={styles.listViewHeader}>Status</Text>
                <Text style={styles.listViewHeader}>Data</Text>
            </View>)
        };
        return (
            <SafeAreaView style={{flex: 1}}>
                <ScrollView style={styles.scrollbar} horizontal={false}>
                    <View style={styles.mainView}>
                        {cadastro === false
                            ?
                            <View>
                                <View style={styles.infoBox}>
                                    <Text style={styles.title}>Nova Solicitação</Text>
                                    <Text style={styles.infoText}>Atenção, os minicursos só serão liberados após a aprovação
                                        de um professor! Preencha todos os campos corretamente.</Text>
                                    <Button color={Common.AZUL} title={'criar minicurso'} onPress={x => cadClickRequest()}>Criar
                                        Minicurso</Button>
                                </View>
                                <View style={styles.infoBox}>
                                    <Text style={styles.title}>Minhas Solicitações</Text>
                                    <FlatList
                                        data={minicursos}
                                        renderItem={renderItem}
                                        keyExtractor={item => item.titulo}
                                        ListHeaderComponent={renderHeader}>
                                    </FlatList>
                                </View>
                            </View>
                            :
                            <View style={styles.inner}>
                                <View style={styles.container}>
                                    <View style={styles.imageContainer}>
                                        {(() => {
                                            switch (cadStep) {
                                                case 0: {
                                                    return (
                                                        <View style={styles.containerStep}>
                                                            <Image style={styles.image}
                                                                   source={require('../../assets/computer.png')}/>
                                                            <View style={styles.textContainer}>
                                                                <Text style={styles.imageText}>1 - INFORMAÇÕES DO
                                                                    MINICURSO</Text>
                                                            </View>
                                                        </View>
                                                    )
                                                }
                                                case 1: {
                                                    return (
                                                        <View style={styles.containerStep}>
                                                            <Image style={styles.image}
                                                                   source={require('../../assets/computer.png')}/>
                                                            <View style={styles.textContainer}>
                                                                <Text style={styles.imageText}>2 - PRÉ-REQUISITOS DO
                                                                    MINICURSO</Text>
                                                            </View>
                                                        </View>
                                                    )
                                                }
                                            }
                                        })()}
                                    </View>
                                    {showAlert && (
                                        <View>
                                            <Text style={styles.alert}>{alertMsg}</Text>
                                        </View>
                                    )}
                                    {(() => {
                                        switch (cadStep) {
                                            case 0: {
                                                return (
                                                    <View style={styles.containerStep}>
                                                        <TextInput
                                                            style={styles.textInput}
                                                            onChangeText={(x) => setTitulo(x)}
                                                            placeholder="Ex: Curso de introdução a programação"
                                                            value={titulo}
                                                        />
                                                        <View style={styles.dates}>
                                                            <View style={styles.dateBox}>
                                                                <Text>Inicio: {moment(startDate).format('DD/MM/YYYY')}</Text>
                                                                <TouchableOpacity
                                                                    style={styles.btnSelectDate}
                                                                    onPress={() => setShowStartDate(true)}>
                                                                    <Text style={styles.buttonText}>Inserir Data</Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                            <View style={styles.dateBox}>
                                                                <Text>Termino: {moment(endDate).format('DD/MM/YYYY')}</Text>
                                                                <TouchableOpacity
                                                                    style={styles.btnSelectDate}
                                                                    onPress={() => setShowEndDate(true)}>
                                                                    <Text style={styles.buttonText}>Inserir Data</Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                        <TextInput
                                                            style={styles.textInput}
                                                            onChangeText={(x) => setCargaHoraria(parseInt(x))}
                                                            placeholder="Carga horaria do curso. Ex: 8"
                                                            value={cargaHoraria > 0 ? cargaHoraria.toString() : ''}
                                                            keyboardType={"numeric"}/>
                                                        <TextInput
                                                            multiline={true}
                                                            numberOfLines={10}
                                                            style={styles.textArea}
                                                            onChangeText={(x) => setDescricao(x)}
                                                            placeholder={'Breve descrição, citar os topicos que o curso ira abordar. Por exemplo:\n\n' +
                                                            '# Curso de introdução a programação com C#\n' +
                                                            '- Linguagem c#\n' +
                                                            '- Estruturas condicionais\n' +
                                                            '- Estruturas de repetição\n' +
                                                            '- Estretutura de seleção\n' +
                                                            '- Orientação a objetos '}
                                                            value={descricao}
                                                        />
                                                        {showStartDate && (
                                                            <DateTimePicker
                                                                testID="dateTimePickerStart"
                                                                value={startDate}
                                                                mode={'date'}
                                                                is24Hour={true}
                                                                display="default"
                                                                onChange={onChangeStartDate}
                                                            />
                                                        )}
                                                        {showEndDate && (
                                                            <DateTimePicker
                                                                testID="dateTimePicker2"
                                                                value={endDate}
                                                                mode={'date'}
                                                                is24Hour={true}
                                                                display="default"
                                                                onChange={onChangeEndDate}>
                                                            </DateTimePicker>
                                                        )}
                                                    </View>
                                                );
                                            }
                                            case 1:
                                                return (
                                                    <View style={styles.containerStep}>
                                                        <View style={styles.containerStep}>
                                                            <View style={styles.infoBoxRequisitos}>
                                                                <FlatList
                                                                    style={styles.flatlist}
                                                                    data={requisitos}
                                                                    renderItem={renderRequisitos}
                                                                    keyExtractor={item => item.titulo}
                                                                    ListHeaderComponent={renderRequisitosHeader}>
                                                                </FlatList>
                                                            </View>
                                                            <TextInput style={styles.textInput}
                                                                       onChangeText={(x) => setRequisitoDesc(x)}
                                                                       placeholder="Breve descrição do requisito."
                                                                       value={requisitoDesc}>
                                                            </TextInput>
                                                        </View>
                                                        <View style={styles.containerStep}>
                                                            <TouchableOpacity
                                                                style={styles.btnAddReq}
                                                                onPress={() => addRequisitos()}>
                                                                <Text>Adicionar Requisito</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                );
                                                break;
                                            case 2:
                                                break;
                                        }
                                    })()}
                                    <View style={styles.buttonContainer}>
                                        <TouchableOpacity
                                            style={styles.buttonRight}
                                            onPress={previous}>
                                            <Text style={styles.buttonText}>VOLTAR</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.buttonLeft}
                                            onPress={next}>
                                            <Text style={styles.buttonText}>{cadStep === 1 ? 'CONCLUIR' : 'AVANÇAR'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
;

const styles = StyleSheet.create({
    scrollbar: {
        height: '100%'
    },
    mainView: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    title: {
        paddingBottom: 10,
        fontSize: 25
    },
    inner: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '98%',
        alignItems: 'center',
        padding: 10,
        elevation: 10,
    },
    containerStep: {
        width: '100%',
        alignItems: 'center',
        padding: 0,
        margin: 0,
    },
    infoBox: {
        backgroundColor: 'rgb(220, 220, 220)',
        padding: 10,
        margin: 10,
        borderRadius: 5
    },
    infoBoxRequisitos: {
        backgroundColor: 'rgb(220, 220, 220)',
        width: '100%',
        padding: 10,
        margin: 10,
        borderRadius: 5
    },
    requisitosInputs: {},
    infoText: {
        marginBottom: 5,
        textAlign: 'justify'
    },
    label: {
        fontWeight: 'bold'
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
    listViewHeader: {
        flex: 1,
        borderWidth: 1,
        borderBottomWidth: 0,
        borderColor: '#fff',
        padding: 5,
        fontWeight: 'bold',
        fontSize: 20
    },
    btnCriar: {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: Common.AZUL
    },
    textInput: {
        height: 40,
        width: '100%',
        margin: 10,
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: StyleSheet.hairlineWidth,
        textAlign: 'center',
        borderRadius: 10,
        textAlignVertical: 'top',
        padding: 10,
    },
    textArea: {
        width: '100%',
        margin: 10,
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
        textAlignVertical: 'top',
        padding: 10,
    },
    buttonContainer: {
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
    btnSelectDate: {
        backgroundColor: Common.AZUL,
        flex: 1,
        minWidth: 150,
    },
    buttonText: {
        color: 'white',
        padding: 10,
        textAlign: 'center'
    },
    image: {
        width: 200,
        maxHeight: 200,
    },
    imageContainer: {
        width: '100%',
        maxHeight: 250,
        alignItems: 'center',
        padding: 10,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        elevation: 10,
    },
    textContainer: {
        width: '100%',
        alignItems: 'flex-start',
    },
    imageText: {
        fontSize: 20,
        padding: 0,
        margin: 10,
        textAlign: 'right'
    },
    btnAddReq: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        margin: 10,
        width: '100%',
    },
    dates: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    dateBox: {
        marginRight: 5,
        marginLeft: 5,
        textAlign: 'center',
        flex: 1,
    },
    alert: {
        color: 'red'
    }
});
export default Ministrar;
