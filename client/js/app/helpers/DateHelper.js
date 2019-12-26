export class DateHelper {
  constructor() {
    throw new Error('Esta classe não pode ser instanciada');
  }

  static dataParaTexto(data) {
    return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
  }

  static textoParaData(texto) {
    const paternDate = /^\d{4}-\d{2}-\d{2}$/;
    if(!paternDate.test(texto))
      throw new Error('Deve estar no formato yyyy-mm-aa');
    return new Date(...texto.split('-').map((item, indice) => item - indice % 2));
  }
}
