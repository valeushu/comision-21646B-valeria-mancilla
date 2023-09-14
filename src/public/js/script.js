const contenedor = document.getElementById("container-row");
const btnCrear = document.getElementById("btn-newPost");
const myModal = new bootstrap.Modal(document.getElementById("myModal"));
const btnSave = document.getElementById("btn-save");
const form = document.getElementById("formulario");

let html = "";
let option = "";
let idForm = "";

const tituloInput = document.getElementById("input-titulo");
const contenidoInput = document.getElementById("input-contenido");
const imgInput = document.getElementById("input-img");

btnCrear.addEventListener("click", () => {
  option = "new";
  btnSave.textContent = "New";
  tituloInput.value = "";
  contenidoInput.value = "";
  imgInput.value = "";

  myModal.show();
});

document.addEventListener("click", (event) => {
  if (event.target.matches("#btn-delete")) {
    const article = event.target.closest(".col-4");
    const articleId = article.dataset.id;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/api/post/${articleId}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (res.ok) {
              article.remove();
            }
          })
          .catch((error) => {
            console.log(error);
          });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }
});

document.addEventListener("click", (event) => {
  if (event.target.matches("#btn-edit")) {
    const article = event.target.closest(".col-4");

    const articleId = article.dataset.id;
    const titulo = article.children[0].children[1].children[0].textContent;
    const contenido = article.children[0].children[1].children[1].textContent;
    const imagen = article.children[0].children[0].src;

    idForm = articleId;
    tituloInput.value = titulo;
    contenidoInput.value = contenido;
    imgInput.value = imagen;
    option = "edit";
    btnSave.textContent = "Edit";
    myModal.show();
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (option === "new") {
    const newPost = {
      titulo: tituloInput.value,
      contenido: contenidoInput.value,
      img_url: imgInput.value,
    };

    fetch("http://localhost:3000/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    }).then((res) => {
      if (res.ok) {
        alert("post creado correctamente");
        myModal.hide();
        location.reload();
      }
    });
  }
  if (option === "edit") {
    const newPost = {
      titulo: tituloInput.value,
      contenido: contenidoInput.value,
      img_url: imgInput.value,
    };
    fetch(`http://localhost:3000/api/post/${idForm}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    }).then((res) => {
      if (res.ok) {
        alert("post editado");
        myModal.hide();
        location.reload();
      }
    });
  }
});
// document.addEventListener("click", (event) => {
//   if (event.target.matches("#btn-delete")) {
//     const article = event.target.closest(".col-4");
//     const articleId = article.dataset.id;

//     fetch(`http://localhost:3000/api/post/${articleId}`, {
//       method: "DELETE",
//     })
//       .then((res) => {
//         if (res.ok) {
//           article.remove();
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
// });
