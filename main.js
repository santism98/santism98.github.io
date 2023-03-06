document.addEventListener('DOMContentLoaded', () => {
  // Aquí va todo el código que manipula el DOM


//CONTSTANTES Y DOM
const cardContainer = document.querySelector('#cardContainer');
const botonComprar = document.querySelector('#boton-comprar');
botonComprar.addEventListener('click', comprar);
const iconoImg = document.querySelector('#icono-img');
iconoImg.addEventListener('click', toggleTabla);

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
    //... resto del código ...
    const boton = document.createElement('button');
    boton.textContent = 'COMPRAR';
    boton.id = `boton-${producto.id}`; // Agrega un id único para cada botón

    // Define la función onComprarClick antes de usarla en el listener de eventos
    const onComprarClick = (producto, cantidad) => {
      addProduct(producto, cantidad);
      const carritoItem = JSON.parse(localStorage.getItem(producto.id));
      boton.textContent = `COMPRAR (${carritoItem.cantidad})`;
    };

    boton.addEventListener('click', () => {
      onComprarClick(producto, 1);
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

  //funcion pintar tabla
  const addProduct = (producto, cantidad) => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || {};
  const subtotal = producto.price * cantidad;
  if (carrito[producto.id]) {
    carrito[producto.id].cantidad += cantidad;
    carrito[producto.id].subtotal += subtotal;
  } else {
    carrito[producto.id] = {
      thumbnail: producto.thumbnail,
      title: producto.title,
      price: producto.price,
      cantidad: cantidad,
      subtotal: subtotal
    };
  }
  localStorage.setItem('carrito', JSON.stringify(carrito));
  updateCart(); // Agregar esta línea para actualizar la tabla del carrito después de agregar un producto nuevo
};
  //FUNCION ELIMINAR PRODUCTO
  const removeProduct = (productoId) => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || {};
    delete carrito[productoId];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    updateCart();
  };

  //FUNCION VACIAR CARRITO
  
  const clearCart = () => {
    localStorage.removeItem('carrito');
    const tablaCarrito = document.getElementById('tabla-carrito');
    const tbody = tablaCarrito.getElementsByTagName('tbody')[0];
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  };

  //PINTAR PRODUCTO EN TABLA
  
  const createRow = (producto) => {
    const row = document.createElement('tr');
    const imagenCell = document.createElement('td');
    const imagen = document.createElement('img');
    imagen.src = producto.thumbnail;
    imagen.alt = producto.title;
    imagenCell.appendChild(imagen);
    const titleCell = document.createElement('td');
    titleCell.textContent = producto.title;
    const priceCell = document.createElement('td');
    priceCell.textContent = `${producto.price.toLocaleString()} €`;
    const cantidadCell = document.createElement('td');
    cantidadCell.textContent = producto.cantidad;
    const subtotalCell = document.createElement('td');
    subtotalCell.textContent = `${producto.subtotal.toLocaleString()} €`;
    const accionesCell = document.createElement('td');
    const botonAgregar = document.createElement('button');
    botonAgregar.textContent = '+';
    botonAgregar.addEventListener('click', () => {
      addProduct(producto, 1);
      updateCart();
    });

    //FUNCION ELIMINAR
    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = '-';
    botonEliminar.addEventListener('click', () => {
      removeProduct(producto.id);
      updateCart();
    });
    accionesCell.append(botonAgregar, botonEliminar);
    row.append(imagenCell, titleCell, priceCell, cantidadCell, subtotalCell, accionesCell);
    return row;
  };
  //ACTUALIZAR CARRITO
  const updateCart = () => {
    const tablaCarrito = document.getElementById('tabla-carrito');
    const tbody = tablaCarrito.getElementsByTagName('tbody')[0];
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
    const carrito = JSON.parse(localStorage.getItem('carrito')) || {};
    Object.values(carrito).forEach(producto => {
      const row = createRow(producto);
      tbody.appendChild(row);
    });
  };

  //CAMBIAR DE URL
  const comprar = () => {
    window.location.href = 'paginaCompra.html';
  };



// función mutar y subir al local (aumentar el precio y la cantidad)
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


//FUNCION PARA MOSTRAR TOGGLE
const toggleTabla = () => {
  const tabla = document.querySelector('#tabla-carrito');
  tabla.classList.toggle('mostrar');
};


  //funcion pintar desde local que se pueda usar para pintar el carrito y la otra url??


///obtener productos PRUEBA
const obtenerProductos = async () => {
  try {
    const respuesta = await fetch('https://dummyjson.com/products');
    const productos = await respuesta.json();
    console.log(productos);
    return productos;
  } catch (error) {
    console.log(error);
  }
};

//const productos = obtenerProductos();

toggleTabla();
createCard();
addLocal();


});//LOAD