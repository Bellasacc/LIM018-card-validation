import validator from './validator.js';

const creditCardNumber = document.getElementById('cardNumber');
const btnConfirm = document.getElementById('confirm');
const svg = document.getElementsByTagName('path')[0];
const btnProducts = document.getElementById('products');
const btnBuy = document.getElementById('buy');
const containerProducts = document.getElementById('catalogue-products');
const containerCart = document.getElementsByTagName('tbody')[0];
const containerTotalPrice = document.getElementById('total-price');
const containerTableCart = document.getElementById('container-table');
const containerForm = document.getElementById('container-form');

const modal = document.getElementById("modal-message");
const span = document.getElementsByClassName("close")[0];
const message = document.getElementById('message');
const nameUser = document.getElementById('nameCardholder');

let listProductsCart = [];
let newCreditCardNumber = '';

const listProducts = [{
  img: 'img/img-helado.png',
  title: 'Llavero Helado',
  price: '5.00'
},
{
  img: 'img/img-palta.png',
  title: 'Llavero palta',
  price: '5.00'
},
{
  img: 'img/img-manzana.png',
  title: 'Llavero manzana',
  price: '5.00'
},
{
  img: 'img/img-tostada.png',
  title: 'Llavero tostada',
  price: '5.00'
},
{
  img: 'img/img-arbol.png',
  title: 'Llavero arbol',
  price: '5.00'
},
{
  img: 'img/img-dona.png',
  title: 'Llavero dona',
  price: '5.00'
},
{
  img: 'img/img-tortuga.png',
  title: 'Llavero tortuga',
  price: '5.00'
},
{
  img: 'img/img-sol.png',
  title: 'Llavero sol',
  price: '5.00'
}
]
//Funcion para crear las tarjetitas contenedoras de informacion del producto
const createProductCatalogue = ()=>{
  listProducts.forEach((item,index)=>{
    let div = document.createElement('div');
    div.classList.add('product-card');

    let divImg = document.createElement('div');
    divImg.classList.add('product-img');

    let img = document.createElement('img');
    img.setAttribute('src',`${item.img}`)
  
    let divInfo = document.createElement('div');
    divInfo.classList.add('product-info');
  
    let title = document.createElement('h3');
    title.textContent = `${item.title}`;
    let spanPrice = document.createElement('span');
    spanPrice.textContent =`S/. ${(item.price)}`;
    let btnAddPurchase = document.createElement('button');
    btnAddPurchase.setAttribute('type','button');
    btnAddPurchase.classList.add('btn')
    btnAddPurchase.setAttribute('data-id',`${index}`);
    btnAddPurchase.textContent='Comprar';
    
    divImg.appendChild(img);
    divInfo.appendChild(title);
    divInfo.appendChild(spanPrice);
    divInfo.appendChild(btnAddPurchase);
  
    div.appendChild(divImg);
    div.appendChild(divInfo);
  
    containerProducts.appendChild(div)
  })
}
//Cargando automaticamente el catalogo de productos
window.onload = ()=>{
  btnProducts.classList.add('active-a');
  createProductCatalogue();
}
//calculando el precio total
const priceTotal = () => {
  let total = 0;
  for(let product of listProductsCart){
    total = total + parseFloat(product.price)*product.amount;
  }
  containerTotalPrice.innerText = total.toFixed(2);
}
//Creando la tabla con los productos seleccionados
const createTableCart = () => {
  containerCart.innerHTML = '';
  listProductsCart.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
               <td>  
                    <img src="${product.img}" width=60>
               </td>
               <td>${product.title}</td>
               <td>${product.price}</td>
               <td>${product.amount} </td>
               <td>
                    <a href="#" class="empty-product" data-id="${product.id}">&times;</a>
               </td>
          `;
    containerCart.appendChild(row);
  });
  priceTotal();
}
//funcion para ir añadiendo al carrito
const addToShoppingCart = (e) => {
  e.preventDefault();
  if (e.target.classList.contains("btn")) {
    const infoProduct = e.target.parentElement.parentElement;
    const infoProducts = {
      img : infoProduct.querySelector('img').getAttribute('src'),
      title: infoProduct.querySelector('h3').textContent,
      price: infoProduct.querySelector('span').textContent.slice(4),
      id: infoProduct.querySelector('button').getAttribute('data-id'),
      amount: 1
    }
    //usamos metodo some para verificar la existencia del id y si existe aumentaremos la cantidad y si no se ingresa uno nuevo
    if (listProductsCart.some((product) => product.id === infoProducts.id)) {
      const products = listProductsCart.map((product) => {
        if (product.id === infoProducts.id) {
          product.amount++;
          return product;
        } else {
          return product;
        }
      });
  
      listProductsCart = [...products];
    } else {
      listProductsCart = [...listProductsCart, infoProducts];
    }  
    createTableCart();
  }
}
//Funcion para ir eliminando productos del carrito 
const deleteProductCart = (e) => {
  e.preventDefault();
  if (e.target.classList.contains("empty-product")) {
    const productId = e.target.getAttribute("data-id");
    listProductsCart = listProductsCart.filter((product) => product.id !== productId);
    createTableCart();
  }
}
//funcion para limpiar los contenedores, formularios,etc
const clearContainerShopping = () => {
  containerCart.innerHTML = '';
  document.getElementsByTagName('form')[0].reset();
  containerTotalPrice.innerHTML = '0.00';
  listProductsCart = [];
}
//evento para eliminar productos de la tabla
containerTableCart.addEventListener('click',deleteProductCart)
//evento para ir agregando al carrito
containerProducts.addEventListener('click',addToShoppingCart)
//funcion y evento para mostrar el catalogo de productos
const activeCatalogueProducts = () => {
  svg.classList.remove('active-svg');
  btnProducts.classList.add('active-a');

  containerProducts.classList.add('container-products');
  containerProducts.classList.remove('hidden');

  containerForm.classList.add('hidden');
  containerForm.classList.remove('container');

  containerProducts.innerHTML = '';
  createProductCatalogue();
}
btnProducts.addEventListener('click',activeCatalogueProducts)

//funcion y evento para mostrar el formulario y la lista del carrito de compra
btnBuy.addEventListener('click',()=>{
  btnProducts.classList.remove('active-a')
  svg.classList.add('active-svg');

  containerProducts.classList.add('hidden');
  containerProducts.classList.remove('container-products');

  containerForm.classList.remove('hidden');
  containerForm.classList.add('container');

})
//Evento para enmascarar y ejecutar la funcion maskify
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
//Funcion para validar el ingreso de solo numeros en el input de la tarjeta
const onlyNumbers = (event) =>{
  if(event.keyCode >= 48 && event.keyCode <= 57) 
        return event.target.value;
    else event.preventDefault();
}
creditCardNumber.addEventListener('keypress',onlyNumbers)
//Evento para cerrar el modal en el boton X
span.addEventListener('click',() => {
  modal.style.display = "none";
  clearContainerShopping();
  activeCatalogueProducts();
})
//Evento para cerrar el modal desde cualquier parte de la ventana
window.addEventListener('click', (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
    clearContainerShopping();
    activeCatalogueProducts();
  }
})
//Evento para confirmar la venta, luego de validar la tarjeta
btnConfirm.addEventListener('click',(e)=>{
  e.preventDefault()
  modal.style.display = "block";
  if(validator.isValid(newCreditCardNumber)){
    message.innerHTML = `        🎉Felicidades  ${nameUser.value.toUpperCase()}  hemos validado tu tarjeta correctamente 🎉 
                        \n\n Gracias por tu compra`;
  }else{
    message.innerHTML = `${nameUser.value.toUpperCase()}  No hemos podido validar tu tarjeta correctamente, por favor ingresa una tarjeta valida`;
  }
})

