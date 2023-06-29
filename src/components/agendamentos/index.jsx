import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { ModalAppConfirmaAgendamento, ModalAppNaoConfirmaAgendamento, ModalAppCovid, ModalAlertConf, ModalAlertNaoConf, ModalEnviaMotivo, ModalAlertHorario, ModalAlertConfCanc } from "../Modal/ModalApp";
import styles from './styles.jsx'
import { AuthContext } from '../../contexts/ContextApi.jsx';


function Agendamento(props) {
  const { setHorarioAlert12H } = useContext(AuthContext)
  const [modalConfirm, setModalConfirm] = useState(false);

  const [modalNoConfirm, setModalNoConfirm] = useState(false);

  const [modalAlertConf, setModalAlertConf] = useState(false);

  const [modalAlertNaoConf, setModalAlertNaoConf] = useState(false);

  const [modalMotivoCancel, setModalMotivoCancel] = useState(false);

  const [modalCovid, setModalCovid] = useState(false);

  const [modalAlertHorario, setModalAlertHorario] = useState(false);

  const [modalAlertConfCanc, setModalAlertConfCanc] = useState(false)

  function openModalCovid() {
    if (modalCovid == false) {
      setModalCovid(true);
    } else {
      setModalCovid(false);
    }
  }

  function openModalConfirmar() {
    if (modalConfirm == false) {
      setModalConfirm(true);
    } else {
      setModalConfirm(false);
    }
  }

  function openModalAlertHorario() {
    if (modalAlertHorario == false) {
      setModalAlertHorario(true);
    } else {
      setModalAlertHorario(false);
    }
  }

  function openModalNoConfirmar() {
    setModalNoConfirm(true);
  }

  function sairNoConf() {
    setModalNoConfirm(false);
  }

  function openModalAlertConf() {
    if (modalAlertConf == false) {
      setModalAlertConf(true);
    } else {
      setModalAlertConf(false);
    }
  }

  function openModalAlertNaoConf() {
    if (modalAlertNaoConf == false) {
      setModalAlertNaoConf(true);
    } else {
      setModalAlertNaoConf(false);
    }
  }

  function openModalMotivoCancel() {
    if (modalMotivoCancel == false) {
      setModalMotivoCancel(true);
    } else {
      setModalMotivoCancel(false);
    }
  }

  let aux_vector = props.data.profissionalNome.split("|");
  let aux_nome_profissional = "";
  if (aux_vector.length == 1) {
    //aux_nome_profissional = aux_vector[2].split(":");
    aux_nome_profissional = props.data.profissionalNome;
  } else if (aux_vector.length == 2) {
    //aux_nome_profissional = aux_vector[1].split(":");
    aux_nome_profissional = aux_vector[0] + ' ' + aux_vector[1];
  } else if (aux_vector.length >= 3) {
    //aux_nome_profissional = aux_vector[0];
    aux_nome_profissional = aux_vector[0] + ' ' + aux_vector[1] + ' ' + aux_vector[2];
  }


  let nome_profissional = aux_nome_profissional;
  let aux_vector_data = props.data.data.split("-");
  let dataFormatada =
    aux_vector_data[2] + "/" + aux_vector_data[1] + "/" + aux_vector_data[0];
  let horaFormatada = props.data.horaInicial.substring(0, 5);
  let foto_medico = ''

  if (props.data.sexo == 'M') {
    foto_medico = '../../assets/medico.png'
  } else {
    foto_medico = '../../assets/medica2.png'
  }

  //alert(props.foto)

  const openNodal = () => {

    const date = new Date();

    const dataHoraAgen = new Date(props.data.data + "T" + props.data.horaInicial);

    const diffDate = dataHoraAgen.getDate() - date.getDate();

    const diffHora = dataHoraAgen.getUTCHours() - date.getHours();

    console.log(diffDate);

    if (diffDate == 0) {

      if (diffHora <= 12 || diffHora >= 0) {
        setHorarioAlert12H(true)
        openModalAlertHorario();

      }

    } else {

      openModalNoConfirmar();

    }

  }

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.textoHeader}> {aux_vector[0]}</Text>
        <Text style={styles.textoHeader}>{aux_vector[1]}</Text>
      </View>

      <View style={styles.containerMain}>
        <View style={styles.containerMain_1}>
          <Image
            style={styles.img}
            source={require('../../assets/medicos.png')}
          />

          <View style={styles.viewTexto}>
            <Text>{nome_profissional}</Text>
            <Text> {props.data.especialidadeDescricao.toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.containerMain_2}>

          <Text style={styles.textoTituloMain}>
            Consulta dia: {dataFormatada} ás {horaFormatada}
          </Text>
          <Text style={styles.textoMain}>
            Clínica: {props.data.accountUnidadeDescricao}
          </Text>

          <Text style={styles.textoMain}>
            Endereço: AV PROF MAGALHÃES NETO,N 1450 - SALA 103 PITUBA -
            SALVADOR/BA
          </Text>
        </View>
      </View>

      <View style={styles.containerFooter}>
        <TouchableOpacity style={styles.botaoAreaCancela} onPress={openNodal}>
          <Text style={styles.botaoTextoCancela}>NÃO COMPARECER</Text>
        </TouchableOpacity>
        <Modal transparent={true} animationType="fadeIn" visible={modalNoConfirm}>
          <View style={styles.modalContainer}>
            <ModalAppNaoConfirmaAgendamento
              fechar={() => sairNoConf()}
              dataFormatada={dataFormatada}
              horaFormatada={horaFormatada}
              obj={props.data}
              clinica={props.data.accountUnidadeDescricao}
              abrirAlert={() => openModalMotivoCancel()}
            />
          </View>
        </Modal>
        <TouchableOpacity
          style={styles.botaoAreaConfirma}
          onPress={openModalConfirmar}
        >
          <Text style={styles.botaoTextoConfirma}>COMPARECER</Text>
        </TouchableOpacity>
        <Modal transparent={true} animationType="fadeIn" visible={modalConfirm}>
          <View style={styles.modalContainer}>
            <ModalAppConfirmaAgendamento
              funcao={() => openModalCovid()}
              dataFormatada={dataFormatada}
              horaFormatada={horaFormatada}
              textoBotao="Confirmar"
              fechar={() => openModalConfirmar()}
              clinica={props.data.accountUnidadeDescricao}
              abrirAlert={() => openModalAlertConf()}
            />
          </View>
        </Modal>
        <Modal transparent={true} animationType="fadeIn" visible={modalAlertConf}>
          <View style={styles.modalContainer}>
            <ModalAlertConf
              modalOpen={() => openModalAlertConf()}
              modalCovid={() => openModalCovid()}
              textoBotao="OK"
              texto="Agendamento confirmado"
            />
          </View>
        </Modal>
        <Modal transparent={true} animationType="fadeIn" visible={modalAlertNaoConf}>
          <View style={styles.modalContainer}>
            <ModalAlertNaoConf
              modalOpen={() => { setModalAlertConfCanc(!modalAlertConfCanc) }}
              textoBotao="OK!"
              texto="Agendamento Cancelado"
            />
          </View>
        </Modal>
        <Modal transparent={true} animationType="fadeIn" visible={modalAlertConfCanc}>
          <ModalAlertConfCanc
            obj={props.data}
            modalOpen={() => { setModalAlertConfCanc(!modalAlertConfCanc) }}
            abrirAlert={() => openModalAlertNaoConf()}
          />
        </Modal>
        <Modal transparent={true} animationType="fadeIn" visible={modalCovid}>
          <View style={styles.modalContainer}>
            <ModalAppCovid
              funcao={() => openModalCovid()}
            />
          </View>
        </Modal>
      </View>
      <Modal transparent={true} animationType="fadeIn" visible={modalMotivoCancel}>
        <View style={styles.modalContainer}>
          <ModalEnviaMotivo

            fechar={() => openModalMotivoCancel()}
            obj={props.data}
            abrir={() => openModalAlertNaoConf()}

          />
        </View>
      </Modal>

      <Modal transparent={true} animationType="fadeIn" visible={modalAlertHorario}>
        <View style={styles.modalContainer}>
          <ModalAlertHorario

            fechar={() => openModalAlertHorario()}
            obj={props.data}
            modalOpen={() => openModalNoConfirmar()}

          />
        </View>
      </Modal>

    </View>
  );
}


export default Agendamento;
