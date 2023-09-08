// SALUDO
let usuario;
let usuarioStorage = sessionStorage.getItem("usuario");

if(usuarioStorage){
  usuario = usuarioStorage;
  let saludo = document.getElementById("saludo");
  saludo.innerHTML = `<h2>Bienvenido ${usuario}</h2>`;
}else{
  usuario = prompt("Ingrese su nombre");
  sessionStorage.setItem("usuario", usuario);
  let saludo = document.getElementById("saludo");
  saludo.innerHTML = `<h2>Bienvenido ${usuario}</h2>`;
}
//  AGREGUE NODO
let parrafo = document.createElement("p"); 
parrafo.innerHTML = "<h2>Tenemos los productos de mejor calidad para vos</h2>"; 
document.body.append(parrafo); 

// BOTON SESION
button.addEventListener("click", () => {
    sessionStorage.removeItem("usuario");
    alert("sesión cerrada exitosamente");
  })


// CARRITO DE COMPRAS
const carro = [];
// MOSTRAR PRODUCTOS CON CARDS
let contenedorProd = document.getElementById("prod");
let tablaBody = document.getElementById('tablabody');



function listarProductos(listaprod){
  for(const prod of listaprod){ 
   contenedorProd.innerHTML+= `
  <div class="card col-sm-2">
   <img class="card-img-top" src= ${prod.foto}  alt="Card image cap"></img>
   <div class="card-body">
      <h5 class="card-title">${prod.nombre} </h5>
      <p class="card-text"> $ ${prod.precio} </p>
      <button id= ${prod.id} class="btn btn-primary compra"> Comprar </button>
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

listarProductos(productos);

      function agregarACarrito(producto){
        carro.push(producto);
        console.table(carro);
        tablaBody.innerHTML += `
        <tr>
          <td>${producto.id} </td>
          <td>${producto.nombre} </td>
          <td>${producto.precio} </td>
        </tr>
      `
      //calcular total
      let total = carro.reduce((ac,prod)=> ac + prod.precio,0);
      document.getElementById("total").innerText = `Total a pagar $ ${total}`
      //guardar carro en storage
      localStorage.setItem('carro', JSON.stringify(carro))
      }






