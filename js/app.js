//Variables
const formulario = document.querySelector("#formulario");
const listaTewwts = document.querySelector("#lista-tweets");
const container = document.querySelector("#contenido");

//let porque va estar cambiando de valor
let tweetsAcc = [];

//Listeners
listeners();

function listeners() {
  formulario.addEventListener("submit", agregarTweets);
  //Para rescatar los tweets del local Storage y que no se borren del HTML al recargar
  document.addEventListener("DOMContentLoaded", () => {
    //Se tiene que agregar al HTML con getITem
    //Si no hay ningun tweet o se borra, enotnces el elemento marca null, se debe identificar como Array
    //||Si marca null el valor de tweetsHTML -> MArcalo como un arreglo vacio
    tweetsAcc = JSON.parse(localStorage.getItem("savedTweets")) || [];
    console.log(tweetsAcc);
    mostrarHTML();
  });
}

//Funciones
function agregarTweets(e) {
  e.preventDefault();
  const tweet = document.querySelector("#tweet").value;
  if (tweet === "") {
    alertEmptyTextarea("No hay tweet");
    return;
  }
  //Crear un objeto para almacenar cada tweet  y para identificar a cada uno,
  //usaremos date.now toda vez que no hay alguna db
  const tweetObj = {
    id: Date.now(),
    texto: tweet,
  };
  //Añadir tweets a un array
  //SpreadOperator toma una copia de los tweetsACC, y se agrega el tweet que el usuario este escribiendo
  tweetsAcc = [...tweetsAcc, tweetObj];
  mostrarHTML();
  // console.log(tweetsAcc);

  //REINICIAR EL FORMULARIO
  formulario.reset();
}

function borrarTweet(id) {
  //Filter va crear un nuevo arreglo omitiendo el que se haya elegido
  //Que sea diferente el id para que el nuevo arreglo se cree con los ids que no se deben borrar
  const tweetEliminado = tweetsAcc.filter((elem) => elem.id !== id);

  tweetsAcc = [...tweetEliminado];
  mostrarHTML();
}

function alertEmptyTextarea(error) {
  const paragraph = document.createElement("P");
  paragraph.textContent = error;
  paragraph.classList.add("error");

  container.appendChild(paragraph);

  setTimeout(() => {
    paragraph.remove();
  }, 2000);
}

function mostrarHTML() {
  limpiarHTML();
  //El if es porque al guardar en local Storage y luego borrar algun elemento, marcaba como null por llevar un arreglo vacio,
  //Entonces se añadio el || en el getItem en caso que venga como null o vacio, conviertelo en arreglo vacio;
  //Y para que no se ejecute este codigo, se agrego el IF.
  if (tweetsAcc.length > 0) {
    tweetsAcc.forEach((elem) => {
      //Agregar el boton eliminar
      const btnEliminar = document.createElement("a");
      btnEliminar.classList.add = "borrar-tweet";
      btnEliminar.innerText = "X";

      //Agregar el evento onclick llamar a la funcion removeTweet y pasar como parametro el id
      btnEliminar.onclick = () => {
        borrarTweet(elem.id);
      };

      const li = document.createElement("li");
      li.innerText = elem.texto;
      li.appendChild(btnEliminar);

      listaTewwts.appendChild(li);
    });
  }
  saveStorage();
}
//Agregar tweets a LOCAL STORAGE
function saveStorage() {
  //KEY and VALUE a guardar
  localStorage.setItem("savedTweets", JSON.stringify(tweetsAcc));
}

function limpiarHTML() {
  //listaTewwts.innerHTML = "";
  // Otra manera de limpiar el HTML es con un While
  while (listaTewwts.firstChild) {
    listaTewwts.removeChild(listaTewwts.firstChild);
  }
}
