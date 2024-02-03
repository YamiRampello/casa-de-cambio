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

const $buscarDatos = document.querySelector('#buscar-tipos-de-cambio');

$buscarDatos.onclick = function () {
  const $fecha = document.querySelector('#fecha').value;
  const $moneda = document.querySelector('#moneda-base').value;

  const errorMoneda = validarMonedaBase($moneda);

  const error = {
    'moneda-base': errorMoneda
  };

  const mensajeError = document.querySelector('#texto-error');
  mensajeError.textContent = '';

  manejarErrores(error);

  limpiarLista();

  const $monedaFechaTexto = document.querySelector('#moneda-fecha-solicitados');
  $monedaFechaTexto.innerText = '';

  if (mensajeError.textContent === '') {
    fetch(`${URL}/${$fecha}?from=${$moneda}`)
      .then((respuesta) => respuesta.json())
      .then((respuestaJSON) => {
        $('#moneda-fecha-solicitados').text(
          `Cambios del día ${respuestaJSON.date} en base ${respuestaJSON.base}`
        );
        Object.keys(respuestaJSON.rates).forEach((moneda) => {
          $('#lista-moneda-fecha-solicitado').append(
            $(`<li>${moneda}: ${respuestaJSON.rates[moneda]}</li>`)
          );
        });
      });
  }
};

function limpiarLista() {
  $('li').remove();
}

function validarMonedaBase(moneda) {
  if (!/^[A-Z]{3}$/.test(moneda)) {
    return 'Este campo debe tener 3 letras (mayúsculas). Consulte el listado de monedas disponibles';
  }

  return '';
}

const $form = document.querySelector('#formulario');

function manejarErrores(errores) {
  const keys = Object.keys(errores);
  const $errores = document.querySelector('#texto-error');

  keys.forEach(function (key) {
    const error = errores[key];

    if (error === '') {
      $form[key].className = '';
    } else {
      $form[key].className = 'error';
      const $error = document.createElement('div');

      $error.textContent = error;

      $errores.appendChild($error);
    }
  });
}
