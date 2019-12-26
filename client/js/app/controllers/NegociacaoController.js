import { ListaNegociacoes } from '../models/ListaNegociacoes.js';
import { Negociacao } from '../models/Negociacao.js';
import { Mensagem } from '../models/Mensagem.js';
import { NegociacoesView } from '../views/NegociacoesView.js';
import { MensagemView } from '../views/MensagemView.js';
import { Bind } from '../helpers/Bind.js';
import { DateHelper } from '../helpers/DateHelper.js';
import { NegociacaoService } from '../services/NegociacaoService.js';

const $ = document.querySelector.bind(document);

export class NegociacaoController {
  constructor() {
    this._$inputData = $('#data');
    this._$inputQuantidade = $('#quantidade');
    this._$inputValor = $('#valor');
    this._listaNegociacoes = this._buildListaNegociacao();
    this._mensagem = this._buildMenssagem();
    this._ordemAtual = '';
    this.service = new NegociacaoService();
    this._init();
  }

  _init() {
    this._setupDb();
    this._importaNegociacoes();
    this._setupForm();
  }

  _setupForm() {
    $('[data-js="form"]').addEventListener('submit', this.adiciona.bind(this));
    $('[data-js="apaga"]').addEventListener('click', this.apaga.bind(this));
  }

  _buildListaNegociacao() {
    const model = new ListaNegociacoes();
    const view = new NegociacoesView($('#NegociacoesView'));
    const props = ['adiciona', 'esvazia', 'ordena', 'inverteOrdem'];
    view.addEventListener('click', (event) => {
      const value = event.target.dataset['jsOrdena'];
      if (value) this.ordena(value);
    });
    return new Bind(model, view, props);
  }

  _buildMenssagem() {
    const model = new Mensagem();
    const view = new MensagemView($('#MensagemView'));
    const props = ['texto'];
    return new Bind(model, view, props);
  }

  _setupDb() {
    this.service
      .lista()
      .then((negociacoes) => negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao)))
      .catch(error => this._mensagem.texto = error);
  }

  adiciona(event) {
    event.preventDefault();
    this.service
      .cadastrar(this._criaNegociacao())
      .then((msg) => {
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = msg;
        this._limpaFormulario();
      })
      .catch(error => this._mensagem.texto = erro);
  }

  apaga() {
    this.service
      .apaga()
      .then((msg) => {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = msg;
      })
      .catch(msg => this._mensagem.texto = msg);
  }

  _importaNegociacoes() {
    this.service.importar(this._listaNegociacoes.negociacoes)
      .then((negociacoes) => {
        negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
        return this._mensagem.texto = 'Negociações importadas com sucesso!';
      })
      .then(() => setTimeout(() => this._importaNegociacoes(), 3000))
      .catch(error => this._mensagem.texto = error);
  }

  ordena(coluna) {
    if (this._ordemAtual === coluna) {
      return this._listaNegociacoes.inverteOrdem();
    }
    this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
    this._ordemAtual = coluna;
  }

  _criaNegociacao() {
    return new Negociacao(
      DateHelper.textoParaData(this._$inputData.value),
      this._$inputQuantidade.value,
      this._$inputValor.value
    );
  }

  _limpaFormulario() {
    this._$inputData.value = '';
    this._$inputQuantidade.value = 1;
    this._$inputValor.value = 0.0;
    this._$inputData.focus();
  }
}
