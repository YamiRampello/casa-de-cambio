/// <reference types="jquery" />

const URL = 'https://api.frankfurter.app';

const $opcionesMoneda = document.querySelector('#ver-monedas');

$opcionesMoneda.onclick = function () {
  limpiarLista();

  fetch(`${URL}/currencies`)
    .then((respuesta) => respuesta.json())
    .then((respuestaJSON) => {
      Object.keys(respuestaJSON).forEach((moneda) => {
        $('#lista-monedas').append(
          $(`<li>${moneda}: ${respuestaJSON[moneda]}</li>`)
        );
      });
    });
};

const $buscarDatos = document.querySelector('#buscar-datos');

$buscarDatos.onclick = function () {
  const $fecha = document.querySelector('#fecha').value;
  const $moneda = document.querySelector('#moneda-base').value;

  limpiarLista();

  fetch(`${URL}/${$fecha}?from=${$moneda}`)
    .then((respuesta) => respuesta.json())
    .then((respuestaJSON) => {
      $('#datos-solicitados').text(
        `Cambios del día ${respuestaJSON.date} en base ${respuestaJSON.base}`
      );
      Object.keys(respuestaJSON.rates).forEach((moneda) => {
        $('#lista-datos').append(
          $(`<li>${moneda}: ${respuestaJSON.rates[moneda]}</li>`)
        );
      });
    });
};

function limpiarLista() {
  $('li').remove();
}
