import validator from './validator.js';

const creditCardNumber = document.getElementById('cardNumber');
const btnConfirm = document.getElementById('confirm');
//const message = document.getElementById('message');
const svg = document.getElementsByTagName('path')[0];

let array = '';
svg.classList.add('active');

 creditCardNumber.addEventListener('input',(e)=>{
   
   btnConfirm.disabled = false;
   if(e.inputType === 'insertFromPaste'){
      array = creditCardNumber.value
    } else if(e.inputType === 'deleteContentBackward'){
      array = array.slice(0,array.length-1);
    } else if(e.inputType === 'insertText'){
      array = array + creditCardNumber.value[creditCardNumber.value.length-1]
    }
    creditCardNumber.value = validator.maskify(array)
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
  if(validator.isValid(array)){
    alert('Tu tarjeta es valida')
  }else{
    alert('Tu tarjeta no es valida')
  }
    //console.log(array)
})

