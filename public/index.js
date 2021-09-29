const socket = io();
//New product Form:
const submitBtn = document.getElementById("submitBtn");
const formTitle = document.getElementById("formTitle");
const formPrice = document.getElementById("formPrice");
const formThumbnail = document.getElementById("formThumbnail");

submitBtn.addEventListener("click", (event) => {
  savedInfo(formTitle.value, formPrice.value, formThumbnail.value);
  formTitle.innerHTML = "";
  formPrice.innerHTML = "";
  formThumbnail.innerHTML = "";
});

const savedInfo = (title, price, thumbnail) => {
  const newProduct = { title: title, price: price, thumbnail: thumbnail };
  socket.emit("newProduct", newProduct);
};

socket.on("sentProduct", (data) => {
  const { id, title, price, thumbnail } = data.newProd;
  showProduct(data);
});

function showProduct(data) {
  const tableContainer = document.getElementById("tableContainer");
  if(data.productos.length > 0)
  {
    const mockDiv = document.createElement('div');
    let tableHeader =`
      <table>
          <thead  class="tableHeader">
              <tr>
                  <th scope="col">Prod. ID</th>
                  <th scope="col">Product</th>
                  <th scope="col">Price</th>
                  <th scope="col">Picture</th>
              </tr>
          </thead>
          `;
    let tableContent = data.productos.map(x => `
             <tr>
              <th scope="row" class='id'>${x.id}</th>
              <td class='title'>${x.title}</td>
              <td class='price'>${x.price}</td>
              <td class='thumbnail'><img src=${x.thumbnail} alt=${x.title} ></td>
          </tr>
      `).join(' ');
    let tableBody =`
          <tbody class='tableBody' id='tableBody'>
              ${tableContent}
          </tbody>
          </table>
      `;
    mockDiv.innerHTML=tableHeader + tableBody;
  
    tableContainer.innerHTML="";
    tableContainer.appendChild(mockDiv)
    console.log(mockDiv)
  }
  else{
    tableContainer.innerHTML=`<span>No hay productos!</span>`
  }
}
