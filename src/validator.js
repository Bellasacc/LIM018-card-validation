const validator = {
  isValid: (creditCardNumber) => {
    let cardReverse = creditCardNumber.split('').reverse();// el string ingresado se convierte a un array y se ordena los elementos en reversa
    let sum = 0 ; 
    cardReverse.forEach((item, index) =>{
      if(index % 2 === 1){// como en los array el index empiezan en cero, se toma como valores pares a los impares 1,3,.etc, entonces se evalua para comprobar si es impar el index  
         if (item * 2 >= 10) sum+= parseInt(item * 2 / 10) + (item * 2 % 10); // se suma los digitos de todos valores que son mayores a 10 ejemplo si es 16 seria  1+6 = 7
         else sum+=item * 2;//Aqui los demas que solo son de un dígito
      } else sum+=parseInt(item);//Aqui sumamos para los que no cumple la primera condicion 
    })
    return (sum % 10 === 0);
  },
  maskify: (creditCardNumber) => {
    const lastFourCharacters = creditCardNumber.slice(creditCardNumber.length-4); // los ultimos caracteres que si seran visibles
    const stringToReplace = creditCardNumber.slice(0,creditCardNumber.length-4); //la cadena a reemplazar
        
    return '#'.repeat(stringToReplace.length) + lastFourCharacters;
  }
};

export default validator;
