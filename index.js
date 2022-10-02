const form = document.getElementById("transactionForm");

form.addEventListener("submit" , function(event){
   event.preventDefault();
   let transactionFormData = new FormData(form); /*id de form */
   let transactionObj = convertFormDataToTransactionObj(transactionFormData);
   saveTransactionObj(transactionObj);
   insertRowInTransactionTable(transactionObj)
   aplicar()
   })

  document.addEventListener("DOMContentLoaded",function(event) {
    let transactionObjArr = JSON.parse(localStorage.getItem("transactionData"))
    transactionObjArr.forEach(
      function(arrayElement) {
        insertRowInTransactionTable(arrayElement)
        }
    )
    })
  


function convertFormDataToTransactionObj(transactionFormData) {
  let transactionType = transactionFormData.get("transactionType");
  let transactionDescription = transactionFormData.get("transactionDescription");
  let transactionAmount = transactionFormData.get("transactionAmount");
  let transactionDate = transactionFormData.get("transactionDate");
   
   return { /*cuando obtengo los datos los creo en un objeto */
    "transactionType" : transactionType,
    "transactionDescription": transactionDescription,
    "transactionAmount": transactionAmount,
    "transactionDate":transactionDate
   }
  }
 
  function insertRowInTransactionTable(transactionObj) {
    let transactionTableRef = document.getElementById("transactionTable"); /*id de table */
  
    let newTransactionRowRef = transactionTableRef.insertRow(-1);
    newTransactionRowRef.setAttribute(
      "data-transaction-id",
      transactionObj["transactionId"]
    );

    let newTypeCellRef = newTransactionRowRef.insertCell(0);
    newTypeCellRef.textContent = transactionObj["transactionType"];
  
    newTypeCellRef = newTransactionRowRef.insertCell(1);
    newTypeCellRef.textContent = transactionObj["transactionDescription"];
  
    newTypeCellRef = newTransactionRowRef.insertCell(2);
    newTypeCellRef.textContent = transactionObj["transactionAmount"];
  
    newTypeCellRef = newTransactionRowRef.insertCell(3);
    newTypeCellRef.textContent = transactionObj["transactionDate"];
  
    let newDeleteCell = newTransactionRowRef.insertCell(4);
    let deleteButton = document.createElement("button")
    deleteButton.textContent = "Delete"
    newDeleteCell.appendChild(deleteButton);
  
    deleteButton.addEventListener("click", (event) => {
      let transactionRow = event.target.parentNode.parentNode;
      let transactionId = transactionRow.getAttribute("data-transaction-id");
      transactionRow.remove();
      deleteTransactionObj(transactionId);
    });
  }
  
  function deleteTransactionObj(transactionId) {
    let transactionObjArr = JSON.parse(localStorage.getItem("transactionData"));
    //Busco el indice / la poscicion de la transacccion que quiero eliminar
    let transactionIndexInArray = transactionObjArr.findIndex(
      (element) => element.transactionId == transactionId
    );
    //Elimino el elemento de esa poscicion
    transactionObjArr.splice(transactionIndexInArray, 1);
    let transactionArrayJSON = JSON.stringify(transactionObjArr);
    localStorage.setItem("transactionData", transactionArrayJSON);
    eliminar()
  }
  

function saveTransactionObj(transactionObj) {
    let myTransactionArray = JSON.parse(localStorage.getItem("transactionData")) || []; // en caso de no haber nada en el local Storage
    myTransactionArray.push(transactionObj);                                            // que devuelva un array vacio
    //convierto mi array de transaccion a json
    let transactionArrayJSON = JSON.stringify(myTransactionArray);
    //guardo mi array de transaccion en formato Json en el localStorage
    localStorage.setItem("transactionData",transactionArrayJSON)
}


const boton = document.getElementById("#botonDeEnvio");

function aplicar(){
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'success',
    title: 'Agregado'
    })
    }


function eliminar(){
  const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'warning',
        title: 'Delete File'
      
    })
    }

    //////////////////////////////////////////////////////////////////////

    // Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()