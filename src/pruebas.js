function probarMonedaBase() {
  console.assert(
    validarMonedaBase('') ===
      'Este campo debe tener 3 letras (mayúsculas). Consulte el listado de monedas disponibles',
    'Validar moneda base no validó que la moneda base no este vacío'
  );

  console.assert(
    validarMonedaBase('USDEUR') ===
      'Este campo debe tener 3 letras (mayúsculas). Consulte el listado de monedas disponibles',
    'Validar moneda base no validó que la moneda base tenga menos de 4 letras'
  );
}

probarMonedaBase();
