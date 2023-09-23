// CARRITO DE COMPRAS
let productos;
obtenerJsonProds();
console.table(productos);
const carro = JSON.parse(localStorage.getItem("carro")) || [];

// MOSTRAR PRODUCTOS CON CARDS
let tablaBody = document.getElementById('tablabody');
let contenedorProd = document.getElementById("prod");
let finalizarBtn = document.getElementById("finalizar");
let vaciarBtn = document.getElementById("vaciar");

// RECORDAR CARRITO SI HAY EN EL STORAGE
(carro.length != 0) && dibujarTabla();

function dibujarTabla(){
  for(const producto of carro){
    document.getElementById("tablabody").innerHTML +=`
        <tr>
          <td>${producto.id} </td>  
          <td>${producto.nombre} </td>
          <td>${producto.precio} </td>
          <td><button class="btn btn-light" onclick="eliminar(event)">X</button></td>        
        </tr>`;
  }

totalCarrito = carro.reduce((acumulador,producto) => acumulador + producto.precio,0);
let infoTotal = document.getElementById("total");
infoTotal.innerText= "Total a pagar $: "+ totalCarrito;
}

// FUNCION PARA ELIMINAR PRODUCTOS
function eliminar(ev){
  let fila = ev.target.parentElement.parentElement;
  let id = fila.children[0].innerText;
  let indice = carro.findIndex (producto => producto.id == id);
  carro.splice(indice,1);
  fila.remove();
  // recalcular el total
  let preciosAcumulados = carro.reduce((acumulador, producto)=> acumulador+producto.precio,0);
  total.innerText= "Total a pagar $: "+preciosAcumulados;

  localStorage.setItem("carro",JSON.stringify(carro));
}

// LISTAR PRODUCTOS
function listarProductos(listaprod){
  for(const prod of listaprod){ 
   contenedorProd.innerHTML+= `
  <div class="col-sm-2">
   <img class="card-img-top" src= ${prod.foto}  alt="Card image cap"></img>
   <div class="card-body">
      <h5 class="card-title">${prod.nombre} </h5>
      <p class="card-text"> $ ${prod.precio} </p>
      <button id= ${prod.id} class="btn btn-danger compra"> Comprar </button>
     </div>
  </div>    
  `;
  } 
  // funcionalidad boton comprar
    let botones = document.getElementsByClassName('compra');
    for(const boton of botones){
      boton.addEventListener('click', ()=>{
        const prodACarro = productos.find((producto)=> producto.id == boton.id);
        console.log(prodACarro);

// cargar productos al carro
 agregarACarrito(prodACarro);
      })
    }
} 
function agregarACarrito(producto){
  carro.push(producto);
  console.table(carro);
  Toastify({
    text: "Producto agregado al carrito",
    duration: 1000,
    gravity: "bottom",
    position: "center",
    stopOnFocus: true, 
    style: {
      background: "linear-gradient(to right, #b22d1f, #9e0100)",
    },    
    onClick: function(){} // Callback after click
  }).showToast();
  tablaBody.innerHTML += `
  <tr>
    <td>${producto.id} </td>
    <td>${producto.nombre} </td>
    <td>${producto.precio} </td>
    <td><button class="btn btn-light" onclick="eliminar(event)">X</button></td> 
  </tr>
`
//calcular total
let total = carro.reduce((ac,prod)=> ac + prod.precio,0);
document.getElementById("total").innerText = `Total a pagar $ ${total}`
//guardar carro en storage
localStorage.setItem('carro', JSON.stringify(carro))
}


// Boton finalizar compra con toastify

finalizarBtn.onclick=()=>{
  carrito = []
  document.getElementById("tablabody").innerHTML='';
  document.getElementById("total").innerHTML= 'Total a pagar $';
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Compra Confirmada!, su producto llegara pronto',
    showConfirmButton: false,
    timer: 1500
  })
  localStorage.removeItem("carro");
}

// BOTON PARA VACIAR EL CARRITO
vaciarBtn.onclick=()=>{
  carrito = [];
  document.getElementById("tablabody").innerHTML='';
  document.getElementById("total").innerHTML= 'Total a pagar $';
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Carrito Vacio',
    showConfirmButton: false,
    timer: 1500
  })
  localStorage.removeItem("carro");
}

// JSON
async function obtenerJsonProds(){
  const URLJSON = "../JSON/productos.json";
  const respuesta = await fetch(URLJSON);
  const data = await respuesta.json();
  productos = data;
  listarProductos(productos);
}

