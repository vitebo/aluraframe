import { View } from './View.js';
import { DateHelper } from '../helpers/DateHelper.js';

export class NegociacoesView extends View {
  template(model) {
    return `
    <table class="table table-hover table-bordered">
      <thead>
        <tr>
          <th data-js-ordena="data">DATA</th>
          <th data-js-ordena="quantidade">QUANTIDADE</th>
          <th data-js-ordena="valor">VALOR</th>
          <th data-js-ordena="valor">VOLUME</th>
        </tr>
      </thead>

      <tbody>
        ${model.negociacoes.map(negociacao => `
          <tr>
            <td>${DateHelper.dataParaTexto(negociacao.data)}</td>
            <td>${negociacao.quantidade}</td>
            <td>${negociacao.valor}</td>
            <td>${negociacao.volume}</td>
          </tr>
        `).join('')}
      </tbody>

      <tfoot>
        <td colspan="3"></td>
        <td>${model.negociacoes.reduce((total, negociacao) => total + negociacao.volume, 0.0)}</td>
      </tfoot>
    </table>
    `
  }
}
