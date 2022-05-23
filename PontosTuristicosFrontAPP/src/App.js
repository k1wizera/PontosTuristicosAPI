import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import logoCadastro from './assets/cadastro.png';
import { FiUserPlus, FiEdit, FiUserX, FiDatabase } from 'react-icons/fi'

function App() {
  const baseUrl = "https://localhost:7265/api/PontosTuristicosControlador";

  const [dadosPesquisa, setDadosPesquisa] = useState('');
  const [filtro, setFiltro] = useState([]);
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState(true);
  const [modalIncluir, setModalIncluir] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalExcluir, setModalExcluir] = useState(false);
  const [modalView, setModalView] = useState(false);

  const [pontoSelecionado, setPontoSelecionado] = useState({
    "nome": '',
    "descricao": '',
    "endereco": '',
    "cidade": '',
    "estado": '',
  });


  const selecionarPontoTuristico = (PontosTuristicosControlador, opcao) => {
    setPontoSelecionado(PontosTuristicosControlador);
    (opcao === "Editar") ?
      abrirFecharModalEditar() : abrirFecharModalExcluir();
  }

  const selecionarView = (PontosTuristicosControlador) => {
    setPontoSelecionado(PontosTuristicosControlador);
    abrirFecharModalView();
  }

  const abrirFecharModalIncluir = () => {
    setModalIncluir(!modalIncluir);
  }

  const abrirFecharModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  const abrirFecharModalExcluir = () => {
    setModalExcluir(!modalExcluir);
  }

  const abrirFecharModalView = () => {
    setModalView(!modalView);
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setPontoSelecionado({
      ...pontoSelecionado, [name]: value
    });
    console.log(pontoSelecionado);
  }

  const pedidoGet = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }

  const pedidoPost = async () => {
    delete pontoSelecionado.id;
    await axios.post(baseUrl, pontoSelecionado)
      .then(response => {
        setData(data.concat(response.data));
        setUpdateData(true);
        abrirFecharModalIncluir();
      }).catch(error => {
        console.log(error);
      })
  }

  const pedidoPut = async () => {
    await axios.put(baseUrl + "/" + pontoSelecionado.id, pontoSelecionado).then(response => {
      var resposta = response.data;
      var dadosAuxiliar = data;
      dadosAuxiliar.map(PontosTuristicosControlador => {
        if (PontosTuristicosControlador.id === pontoSelecionado.id) {
          PontosTuristicosControlador.nome = resposta.nome;
          PontosTuristicosControlador.descricao = resposta.descricao;
          PontosTuristicosControlador.endereco = resposta.endereco;
          PontosTuristicosControlador.cidade = resposta.cidade;
          PontosTuristicosControlador.estado = resposta.estado;
        }
      });
      setUpdateData(true);
      abrirFecharModalEditar();
    }).catch(error => {
      console.log(error);
    })

  }

  const pedidoDelete = async () => {
    await axios.delete(baseUrl + "/" + pontoSelecionado.id, pontoSelecionado)
      .then(response => {
        setData(data.filter(PontosTuristicosControlador => PontosTuristicosControlador.id !== response.data));
        setUpdateData(true);
        abrirFecharModalExcluir();
      }).catch(error => {
        console.log(error);
      })
  }

  const pesquisarAlunos = (valorPesquisa) => {
    setDadosPesquisa(valorPesquisa);
    if (dadosPesquisa !== '') {
      const dadosFiltrados = data.filter((item) => {
        return Object.values(item).join('').toLocaleLowerCase().includes(dadosPesquisa.toLocaleLowerCase())
      });
      setFiltro(dadosFiltrados);
    }
    else {
      setFiltro(data);
    }
  }

  useEffect(() => {
    if (updateData) {
      pedidoGet();
      setUpdateData(false);
    }
  }, [updateData])

  return (<div className="pontoturistico-container">
    <header>
      <img src={logoCadastro} alt='Cadastro' />
      <span><strong>Pontos Turísticos</strong></span>
      <button id="b1" type="button" onClick={() => abrirFecharModalIncluir()}
      > Cadastrar Ponto Turístico
      </button>
    </header>

    <form>
      <input type='text' placeholder='Digite um termo para buscar um ponto turístico...' onChange={(e) => pesquisarAlunos(e.target.value)} />
    </form>

    <h1>Relação de Pontos Turísticos</h1>
    {dadosPesquisa.length > 1 ? (
      <ul>
        {filtro.map(PontosTuristicosControlador => (
          <li key={PontosTuristicosControlador.id}>
            <b>Nome: </b>{PontosTuristicosControlador.nome}<br /><br />
            <b>Endereço: </b>{PontosTuristicosControlador.endereco}<br /><br />
            <b>Cidade: </b>{PontosTuristicosControlador.cidade}<br /><br />
            <b>Estado: </b>{PontosTuristicosControlador.estado}<br /><br />
            <button type="button" onClick={() => selecionarPontoTuristico(PontosTuristicosControlador, "Editar")}><FiEdit size="25" color="#17202a" />
            </button>
            <button type="button" onClick={() => selecionarPontoTuristico(PontosTuristicosControlador, "Excluir")}><FiUserX size="25" color="#17202a" />
            </button>
            <button type="button" onClick={() => selecionarView(PontosTuristicosControlador)}><FiDatabase size="25" color="#17202a" />
            </button>

          </li>
        ))}
      </ul>
    ) : (
      <ul>
        {data.map(PontosTuristicosControlador => (
          <li key={PontosTuristicosControlador.id}>
            <b>Nome: </b>{PontosTuristicosControlador.nome}<br /><br />
            <b>Endereço: </b>{PontosTuristicosControlador.endereco}<br /><br />
            <b>Cidade: </b>{PontosTuristicosControlador.cidade}<br /><br />
            <b>Estado: </b>{PontosTuristicosControlador.estado}<br /><br />

            <button type="button" onClick={() => selecionarPontoTuristico(PontosTuristicosControlador, "Editar")}><FiEdit size="25" color="#17202a" /></button>
            <button type="button" onClick={() => selecionarPontoTuristico(PontosTuristicosControlador, "Excluir")}><FiUserX size="25" color="#17202a" /></button>
            <button type="button" onClick={() => selecionarView(PontosTuristicosControlador)}><FiDatabase size="25" color="#17202a" /></button>
          </li>
        ))}
      </ul>
    )
    }
    < Modal isOpen={modalIncluir} >
      <ModalHeader>Cadastrar Novo Ponto Turístico</ModalHeader>
      <ModalBody>
        <div className="novo-aluno-container">
          <div className="content">
            <section className="form"><FiUserPlus size="105" color="#17202a" /></section>
            <form>
              <input placeholder="Digite o Nome do Ponto Turístico" type="text" className="form-control" required name="nome" onChange={handleChange} />
              <label><strong>Localização: </strong></label>
              <br />
              <label>Estado: </label>
              <select input className="form-control" required name="estado" onChange={handleChange}>
                <option value={null}></option>
                <option value="AC">Acre</option>
                <option value="AL">Alagoas</option>
                <option value="AP">Amapá</option>
                <option value="AM">Amazonas</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espírito Santo</option>
                <option value="GO">Goiás</option>
                <option value="MA">Maranhão</option>
                <option value="MT">Mato Grosso</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="MG">Minas Gerais</option>
                <option value="PA">Pará</option>
                <option value="PB">Paraíba</option>
                <option value="PR">Paraná</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="RR">Roraima</option>
                <option value="SC">Santa Catarina</option>
                <option value="SP">São Paulo</option>
                <option value="SE">Sergipe</option>
                <option value="TO">Tocantins</option>
                <option value="EX">Estrangeiro</option>
              </select>
              <input placeholder="Digite o Nome da cidade onde fica o Ponto Turístico" type="text" className="form-control" required name="cidade" onChange={handleChange} />
              <input placeholder="Digite o endereço ou ponto de referência do Ponto Turístico" type="text" className="form-control" required name="endereco" onChange={handleChange} />
              <input placeholder="Adicione uma descrição de até 100 caracteres" type="text" className="form-control" required name="descricao" onChange={handleChange} />

            </form>
          </div>
        </div>

      </ModalBody >
      <ModalFooter>
        <button className="btn btn-primary" onClick={() => pedidoPost()} >Incluir</button> {"   "}
        <button className="btn btn-danger" onClick={() => abrirFecharModalIncluir()}>Cancelar</button>
      </ModalFooter>
    </Modal >

    <Modal isOpen={modalEditar}>
      <ModalHeader>Editar Ponto Turístico</ModalHeader>
      <ModalBody>

        <div className="novo-aluno-container">
          <div className="content">
            <section className="form"><FiEdit size="105" color="#17202a" /></section>
            <form>
              <label>ID: </label>
              <input type="text" className="form-control" readOnly value={pontoSelecionado && pontoSelecionado.id} />
              <br />
              <label>Nome: </label>
              <br />
              <input type="text" className="form-control" required name="nome" onChange={handleChange} value={pontoSelecionado && pontoSelecionado.nome} />
              <br />
              <label><strong>Localização: </strong></label>
              <br />
              <label>Estado: </label>
              <br />
              <select input className="form-control" required name="estado" onChange={handleChange}>
                <option value="AC">Acre</option>
                <option value="AL">Alagoas</option>
                <option value="AP">Amapá</option>
                <option value="AM">Amazonas</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espírito Santo</option>
                <option value="GO">Goiás</option>
                <option value="MA">Maranhão</option>
                <option value="MT">Mato Grosso</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="MG">Minas Gerais</option>
                <option value="PA">Pará</option>
                <option value="PB">Paraíba</option>
                <option value="PR">Paraná</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="RR">Roraima</option>
                <option value="SC">Santa Catarina</option>
                <option value="SP">São Paulo</option>
                <option value="SE">Sergipe</option>
                <option value="TO">Tocantins</option>
                <option value="EX">Estrangeiro</option>

              </select>
              <br />
              <label>Cidade: </label>
              <br />
              <input type="text" className="form-control" required name="cidade" onChange={handleChange} value={pontoSelecionado && pontoSelecionado.cidade} />
              <br />
              <label>Referência: </label>
              <br />
              <input type="text" className="form-control" required name="endereco" onChange={handleChange} value={pontoSelecionado && pontoSelecionado.endereco} />
              <br />
              <label>Descrição: </label>
              <br />
              <input type="text" className="form-control" required name="descricao" onChange={handleChange} value={pontoSelecionado && pontoSelecionado.descricao} />
            </form>
          </div>
        </div>



      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={() => pedidoPut()} >Editar</button> {"   "}
        <button className="btn btn-danger" onClick={() => abrirFecharModalEditar()}>Cancelar</button>
      </ModalFooter>
    </Modal>

    <Modal isOpen={modalExcluir}>
      <ModalBody >
        Confirma a exclusão deste Ponto Turístico: {pontoSelecionado && pontoSelecionado.nome} ?
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-danger" onClick={() => pedidoDelete()}>Sim</button>
        <button className="btn btn-secondary" onClick={() => abrirFecharModalExcluir()}>Não</button>
      </ModalFooter>
    </Modal>

    <Modal isOpen={modalView}>
      <ModalHeader>Ponto Turístico</ModalHeader>
      <ModalBody>

        <div className="novo-aluno-container">
          <div className="content">
            <section className="form"><FiDatabase size="105" color="#17202a" /></section>
            <form>
              <label>ID: </label>
              <input type="text" className="form-control" readOnly value={pontoSelecionado && pontoSelecionado.id} />
              <br />
              <label>Nome: </label>
              <br />
              <input type="text" className="form-control" required name="nome" readOnly value={pontoSelecionado && pontoSelecionado.nome} />
              <br />
              <label><strong>Localização:</strong> </label>
              <br />
              <label>Estado: </label>
              <br />
              <input type="text" className="form-control" required name="estado" readOnly value={pontoSelecionado && pontoSelecionado.estado} />
              <br />
              <label>Cidade: </label>
              <br />
              <input type="text" className="form-control" required name="cidade" readOnly value={pontoSelecionado && pontoSelecionado.cidade} />
              <br />
              <label>Referência: </label>
              <br />
              <input type="text" className="form-control" required name="endereco" readOnly value={pontoSelecionado && pontoSelecionado.endereco} />
              <br />
              <label>Descrição: </label>
              <br />
              <input type="text" className="form-control" required name="descricao" readOnly value={pontoSelecionado && pontoSelecionado.descricao} />
            </form>
          </div>
        </div>

      </ModalBody>
      <ModalFooter>
        <button className="btn btn-danger" onClick={() => abrirFecharModalView()}>Fechar</button>
      </ModalFooter>
    </Modal>
  </div >
  )
}
export default App;