import validator from './validator.js';

const creditCardNumber = document.getElementById('cardNumber');
const btnConfirm = document.getElementById('confirm');
//const message = document.getElementById('message');
const svg = document.getElementsByTagName('path')[0];

let newCreditCardNumber = '';
svg.classList.add('active');

 creditCardNumber.addEventListener('input',(e)=>{
   btnConfirm.disabled = false;
   if(e.inputType === 'insertFromPaste'){
      newCreditCardNumber = creditCardNumber.value
    } else if(e.inputType === 'deleteContentBackward'){
      newCreditCardNumber = newCreditCardNumber.slice(0,newCreditCardNumber.length-1);
    } else if(e.inputType === 'insertText'){
      newCreditCardNumber = newCreditCardNumber + creditCardNumber.value[creditCardNumber.value.length-1]
    }
    creditCardNumber.value = validator.maskify(newCreditCardNumber)
})
const onlyNumbers = (event) =>{
  if(event.keyCode >= 48 && event.keyCode <= 57) 
        return event.target.value;
    else event.preventDefault();
}
creditCardNumber.addEventListener('keypress',onlyNumbers)

/*   creditCardNumber.oncopy = () => {
    navigator.clipboard.writeText(array)
    .then(() => {
        console.log("El texto ha sido copiado :-)");
    })
    .catch(error => {
        // Por si el usuario no da permiso u ocurre un error
        console.log("Hubo un error: ", error);
    });
  } */
  
btnConfirm.addEventListener('click',(e)=>{
  e.preventDefault()
  if(validator.isValid(newCreditCardNumber)){
    alert('Tu tarjeta es valida')
  }else{
    alert('Tu tarjeta no es valida')
  }
    //console.log(array)
})

