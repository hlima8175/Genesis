$('.cep').on('blur', function () {
  if (this.value.length != 9) {
    alert('CEP Inválido.');
    return;
  }
  preencherCampos(this.value, this);
});

function preencherCampos(cep, campo) {
  let campo_logradouro = campo.dataset.logradouro;
  let campo_complemento = campo.dataset.complemento;
  let campo_bairro = campo.dataset.bairro;
  let campo_localidade = campo.dataset.localidade;
  let campo_uf = campo.dataset.uf;

  let logradouro = document.getElementById(campo_logradouro);
  let complemento = document.getElementById(campo_complemento);
  let bairro = document.getElementById(campo_bairro);
  let localidade = document.getElementById(campo_localidade);
  let uf = document.getElementById(campo_uf);

  logradouro.value = '...';
  complemento.value = '...';
  bairro.value = '...';
  localidade.value = '...';
  uf.value = '...';

  const url = `https://viacep.com.br/ws/${cep}/json/`;
  async function buscaCep() {
    const response = await fetch(url);
    const endereco = await response.json();

    return endereco;
  }
  buscaCep().then((endereco) => {
    if (endereco.erro) {
      alert('CEP Inválido.');
      limpaCampos();
      return;
    }
    atribuirCampos(endereco);
  });


  function limpaCampos() {
    logradouro.value = '';
    complemento.value = '';
    bairro.value = '';
    localidade.value = '';
    uf.value = '';
  }

  function atribuirCampos(endereco) {
    logradouro.value = endereco.logradouro;
    complemento.value = endereco.complemento;
    bairro.value = endereco.bairro;
    localidade.value = endereco.localidade;
    uf.value = endereco.uf;
  }
}