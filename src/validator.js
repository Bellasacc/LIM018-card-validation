const validator = {
  isValid: (creditCardNumber) => {
    let cardReverse = creditCardNumber.split('').reverse();// el string ingresado se convierte a un array y se ordena los elementos en reversa
    let arrayPair = []; // array para almacenar las posiciones pares segun el algoritmo de luhn
    let arrayOdd = []; // array para almacenar las posiciones impares segun el algoritmo de luhn
    cardReverse.forEach((item, index) =>{
      if(index % 2 === 1){// como en los array el index empiezan en cero, se toma como valores pares a los impares 1,3,.etc, entonces se evalua para comprobar si es impar el index  
         let result = item * 2; // se multiplica
         if (result >= 10){ // se evalua si el resultado de la multiplicacion es mayor a 10
             let sumOfDigits = parseInt(String(result)[0]) + parseInt(String(result)[1]); // se suma los digitos de todos valores que son mayores a 10 ejemplo si es 16 seria  1+6 = 7
             arrayPair.push(sumOfDigits);//Aqui insertamos el resultado de esa suma a nuestro array de todos los que cumplen dicha condicion
         } else {
             arrayPair.push(result);//Aqui los demas que solo son de un dígito
         }
      }
      else {
         arrayOdd.push(parseInt(item));//Aqui insertamos en otro array, para los que no cumple la primera condicion 
     }
    })
    //Sumamos cada array obtenido y obtenemos el total para verificar si cumple la codicion de se valida o no un tarjeta de credito
    if((arrayPair.reduce((a,b) => a + b) + arrayOdd.reduce((a,b) => a + b)) % 10 === 0){
      return true; //retorna true si es valida
    }
    else {
      return false;//retorna false si no es valida
    } 
  },
  maskify: () => {

  }
};

export default validator;
