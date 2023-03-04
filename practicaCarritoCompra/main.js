//CONTSTANTES Y DOM
const cardContainer = document.querySelector('#cardContainer');
// const imagen = document.getElementById("movida");
// imagen.addEventListener("click", mostrarTabla);


//alert('funciona')

///EVENTOS

//evento click para boton compra
 //evento click para carrito
 //evento click para



/////FUNCIONES


  //funcion crear tarjeta

  // función para pintar estrellas
const pintarEstrellas = (rating, card) => {
  const estrellaAmarilla = 'star1.png';
  const estrellaGris = 'star2.png';
  const estrellasContainer = document.createElement('div');
  estrellasContainer.classList.add('estrellas-container');
  for (let i = 1; i <= 5; i++) {
    const estrella = document.createElement('img');
    estrella.src = i <= Math.ceil(rating) ? estrellaAmarilla : estrellaGris;
    estrella.alt = `Estrella ${i}`;
    estrellasContainer.append(estrella);
  }
  card.append(estrellasContainer);
};

// función para crear tarjeta
const createCard = async () => {
    const productos = await obtenerProductos();
    productos.products.forEach(producto => {
      const card = document.createElement('div');
      card.classList.add('card');
    
      const imagen = document.createElement('img');
      imagen.src = producto.thumbnail;
      imagen.alt = producto.title;
    
      const titulo = document.createElement('h2');
      titulo.textContent = producto.title;
    
      const precio = document.createElement('p');
      precio.textContent = `${producto.price.toLocaleString()} €`;
    
      const boton = document.createElement('button');
      boton.textContent = 'COMPRAR';
      boton.id = `boton-${producto.id}`; // Agrega un id único para cada botón
      boton.addEventListener('click', () => {
        onComprarClick(producto, 1); // Llama a la función onComprarClick() con una cantidad de 1
      });
    
      const carritoItem = JSON.parse(localStorage.getItem(producto.id));
      if (carritoItem) {
        boton.textContent = `COMPRAR (${carritoItem.cantidad})`; // Actualiza el botón con la cantidad en el carrito para el producto dado
      }
    
      card.append(imagen, titulo, precio, boton);
      cardContainer.append(card);
      pintarEstrellas(producto.rating, card);
    });
  };

  //funcion boton compra


  const onComprarClick = (producto, cantidad) => {
    addLocal(producto, cantidad); // Agrega el producto al carrito con la cantidad dada
    const carritoItem = JSON.parse(localStorage.getItem(producto.id));
    const boton = document.querySelector(`#boton-${producto.id}`);
    boton.textContent = `COMPRAR (${carritoItem.cantidad})`; // Actualiza el botón con la cantidad en el carrito para el producto dado
  };
  


  //funcion pintar estrellas


  //funcion pintar tabla
  // const mostrarTabla = () => {
  //   const tabla = document.getElementById("tabla");
  //   tabla.style.display = tabla.style.display === "none" ? "block" : "none";
  // };



  //funcion mutar y subir al local (aumentar el precio y la cantidad)
  const addLocal = (producto, cantidad) => {
    const item = JSON.parse(localStorage.getItem(producto.id)) || {
      thumbnail: producto.thumbnail,
      title: producto.title,
      price: producto.price,
      cantidad: 0,
      subtotal: 0
    };
    item.cantidad += cantidad;
    item.subtotal += producto.price * cantidad;
    localStorage.setItem(producto.id, JSON.stringify(item));
  };


  //funcion pintar desde local que se pueda usar para pintar el carrito y la otra url??


///obtener productos PRUEBA
const obtenerProductos = async () => {
  try {
    const respuesta = await fetch('https://dummyjson.com/products');
    const productos = await respuesta.json();
   // console.log(productos);
    return productos;
  } catch (error) {
    console.log(error);
  }
};

const productos = obtenerProductos();

createCard();


