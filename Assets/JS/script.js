// Apartado de Modal de Bienvenida 
/*
const modalBienvenida = `
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content bg-dark text-white">
        <div class="modal-body">
          ¡Hola visitante! Por favor, indícame cuántas monedas Geo tienes en este momento.
          <div class="input-group mt-3">
            <!-- Imagen de la moneda como ícono al lado del input -->
            <span class="input-group-text bg-dark text-white border-0">
              <img src="Assets/IMG/Geo - Money.jpg" alt="Geo Moneda" style="width: 40px; height: 40px;">
            </span>
            <input type="text" id="geoInputMoney" class="form-control" placeholder="Ingresa la cantidad de monedas Geo">
          </div>
        </div>
        <div class="modal-footer">          
          <button type="button" class="btn btn-secondary" id="geoSubmit" data-bs-dismiss="modal">Aceptar</button>
        </div>
      </div>
    </div>
  </div>`;

document.getElementById('info__modal').innerHTML = modalBienvenida;

const myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
myModal.show();


// Recolección de Variable geoAmount (cantidad de geo ingresada)

const geoMoneyInput = document.getElementById('geoInputMoney');
const geoButtonSubmit = document.getElementById('geoSubmit');

geoButtonSubmit.addEventListener('click', function () {
  const geoAmount = parseInt(geoMoneyInput.value);  
  console.log(geoAmount);
 
  if (geoAmount > 0 && !isNaN(geoAmount)) {    
    document.getElementById('geoMoneyContainerBox').value = `${geoAmount}`;
  } else {
    const errorModal = `
      <div class="modal fade" id="errorModal" tabindex="-1" aria-labelledby="errorModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content bg-dark text-white">
            <div class="modal-body">
              Por favor, inserta una cantidad valida de Geo
            </div>
            <div class="modal-footer">          
              <button type="button" class="btn btn-secondary" id="errorSubmit" data-bs-dismiss="modal">Aceptar</button>
            </div>
          </div>
        </div>
      </div>`;

    
    document.getElementById('error__modal').innerHTML = errorModal;
    

    const myErrorModal = new bootstrap.Modal(document.getElementById('errorModal'));
    myErrorModal.show();
    const errorButtonSubmit = document.getElementById('errorSubmit');
    errorButtonSubmit.addEventListener('click', function () {
    myModal.show();
    });
  }
});

*/

// Apartado del Boton de Musica

const audio = new Audio();
audio.src = "Assets/IMG/City of Tears Song.mp3";

const imgButton = document.getElementById("playPauseAudio");

imgButton.addEventListener("click", function() {
    if (audio.paused) {
        audio.play();
        imgButton.src = "Assets/IMG/Song-Icon.png";
        imgButton.alt = "Pausar";
    } else {
        audio.pause();
        imgButton.src = "Assets/IMG/Song-Icon.png";
        imgButton.alt = "Reproducir";
    }
});

// Apartado de la Shop List ( Arrays)

const products = [
  {      
    id: 1,
    img: "Assets/IMG/Items - Shop/Simple_Key.jpg",
    name: "Llave simple",
    price: 950
  },
  {
    id:2,
    img:"Assets/IMG/Items - Shop/Gathering_Swarm.jpg",
    name: "Enjambre recolector",
    price: 300
  },
  {
    id:3,
    img:"Assets/IMG/Items - Shop/Stalwart_Shell.jpg",
    name: "Coraza robusta",
    price: 200
  },
  {
    id:4,
    img:"Assets/IMG/Items - Shop/Lumafly_Lantern.jpg",
    name: "Linterna de lumélula",
    price: 1800
  },
  {
    id:5,
    img:"Assets/IMG/Items - Shop/Rancid_Egg.jpg",
    name: "Huevo podrido",
    price: 60
  },
  {
    id:6,
    img:"Assets/IMG/Items - Shop/Heavy_Blow.jpg",
    name: "Golpe duro",
    price: 350
  },
  {
    id:7,
    img:"Assets/IMG/Items - Shop/Elegant_Key.jpg",
    name: "Llave elegante",
    price: 800
  },
  {
    id:8,
    img:"Assets/IMG/Items - Shop/Health_Piecea.png",
    name: "Fragmento de mascara",
    price: 150
  },
  {
    id:9,
    img:"Assets/IMG/Items - Shop/Vessel_Fragmenta.png",
    name: "Fragmento de vasija",
    price: 550
  },
  {
    id:10,
    img:"Assets/IMG/Items - Shop/Sprintmaster.jpg",
    name: "Maestro de sprints",
    price: 400
  },

]

// Función para  inyectar el producto seleccionado (carrito vacío)

let cart = [];

// Calcular el total 
function calculateTotal() {
  let total = 0;
  cart.forEach(product => {
    total += product.price * product.quantity; // Sumar el precio del producto multiplicado por la cantidad
  });
  return total;
}

// Función para actualizar el botón del total
function updateTotalButton() {
  const total = calculateTotal(); // Calcular el total
  document.getElementById('totalAmount').innerText = total; // Actualizar el texto en el botón
}

// Función de inyección del producto seleccionado en el table
function injectCart(product) {
  console.log("Verificando producto:", product);

  const cartInjection = `
    <tr class="align-middle">
      <td class="text-center">
        <img src="${product.img ? product.img : 'Assets/IMG/default-image.jpg'}" 
             alt="${product.name}" 
             class="shoppingcart__img-product">
      </td>
      <td class="text-center">${product.name}</td>
      <td class="text-center">${product.quantity}</td>
      <td class="text-center">
        <div class="input-group">
          <span class="input-group-text bg-transparent border-0">
            <img src="Assets/IMG/Geo - Money.jpg" alt="Geo Icon" class="img-fluid geoMoney__icon">
          </span>
          <input type="text" class="form-control bg-dark text-white border-0" 
                 value="${product.quantity * product.price}" 
                 aria-label="Precio acumulado" 
                 readonly style="max-width: 80px;">
        </div>
      </td>
      <td class="text-center">
        <button class="btn btn-secondary btn-sm" onclick="removeRow(this)">X</button>
      </td>
    </tr>
  `;

  document.getElementById('shoppingcart__container').innerHTML += cartInjection;
  updateTotalButton();
}



// Función que captura el click de todos los productos e inserta el producto en el carro

function getValue(productAmount, idProducto) {
  const value = document.getElementById(productAmount).value;
  console.log("Cantidad seleccionada:", value);

  const product = products.find((product) => product.id === idProducto);
  if (product) {
    product.quantity = parseInt(value);
    cart.push(product);
    console.log("Producto agregado al carrito:", product);

    injectCart(product);
  } 
}


// Función para eliminar el producto seleccionado
function removeRow(button) { 
  const row = button.closest('tr');
  const productName = row.cells[1].innerText;
  const quantity = parseInt(row.cells[2].innerText);

  // Eliminar el producto del carrito
  cart = cart.filter(product => product.name !== productName || product.quantity !== quantity);

  row.remove();
  updateTotalButton();
}



// Apartado de finalización de compra

document.addEventListener('DOMContentLoaded', function() {
  
  document.getElementById('finalizePurchaseButton').addEventListener('click', function() {
    const geoAmount = parseInt(document.getElementById('geoMoneyContainerBox').value); 
    const total = calculateTotal(); 

    
    if (isNaN(geoAmount)) {
      alert("Por favor, introduce una cantidad válida de Geo.");
      return;
    }

    if (geoAmount >= total) {
      
      cart = [];
      document.getElementById('shoppingcart__container').innerHTML = '';
      updateTotalButton();

      
      const finalModal = `
        <div class="modal fade" id="finalModal" tabindex="-1" aria-labelledby="finalModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content bg-dark text-white">
              <div class="modal-body">
                ¡Muchas gracias por tu compra! Vuelve pronto.
              </div>
              <div class="modal-footer">          
                <button type="button" class="btn btn-secondary" id="finalSubmit" data-bs-dismiss="modal">Aceptar</button>
              </div>
            </div>
          </div>
        </div>`;
      
      document.getElementById('final__modal').innerHTML = finalModal;

      
      const myModal = new bootstrap.Modal(document.getElementById('finalModal'));
      myModal.show();
      
    } else {
      
      const insufficientFundsModal = `
        <div class="modal fade" id="insufficientFundsModal" tabindex="-1" aria-labelledby="insufficientFundsModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content bg-dark text-white">
              <div class="modal-body">
                No tienes suficientes monedas Geo. Por favor, revisa tu carrito.
              </div>
              <div class="modal-footer">          
                <button type="button" class="btn btn-secondary" id="insufficientFundsSubmit" data-bs-dismiss="modal">Aceptar</button>
              </div>
            </div>
          </div>
        </div>`;
      
      document.getElementById('final__modal').innerHTML = insufficientFundsModal;
      const myInsufficientFundsModal = new bootstrap.Modal(document.getElementById('insufficientFundsModal'));
      myInsufficientFundsModal.show();
    }
  });

  
  document.getElementById('final__modal').addEventListener('click', (event) => {
    if (event.target.id === 'finalSubmit') {      
      resetCart();
    }
  });
});

function resetCart() {
  cart = []; 
  document.getElementById('shoppingcart__container').innerHTML = '';
  updateTotalButton(); 
}

