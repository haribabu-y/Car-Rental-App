// Creating the div element for popup
function openModal(contentHtml) {
    const container = document.getElementById("modalContainer");
    container.innerHTML = `
    <div class="modal-overlay">
        <div class="modal-box">
            <span class="modal-close" onclick="closeModal()">×</span>
            ${contentHtml}
        </div>
    </div>
    `;
}

//adding function to close the popup
function closeModal() {
    document.getElementById("modalContainer").innerHTML = "";
}

// Creating the popup for adding the new record
function openAddModal() {
  document.getElementById("searchInput").value = "";
    const html = `
    <h2>Add Rental Record</h2>
    <p>Rental ID:</p>
    <input type="text" id="rentalId" placeholder="Rental ID *">
    <p class="errmsg" id="rentalIdErr"></p>

    <p>Car Model:</p>
    <input type="text" id="carModal" placeholder="Car Modal *">

    <p>MFD Year:</p>
    <input type="text" id="mfdYear" placeholder="MFD Year">
    <p class="errmsg" id="addmfdYearErr"></p>

    <p>Fuel Type:</p>
    <select id="fuelType">
        <option value=""> Select Fuel Type*</option>
        <option value="Petrol">Petrol</option>
        <option value="Diesel">Diesel</option>
        <option value="EV">EV</option>
    </select>

    <p>Start Date:</p>
    <input type="date" id="startDate">
    <p class="errmsg" id="addStartDateErr"></p>

    <p>End Date:</p>
    <input type="date" id="endDate">
    <p class="errmsg" id="addEndDateErr"></p>

    <p>Customer Name:</p>
    <input type="text" id="customer" placeholder="Customer Name *">

    <p>Start Place:</p>
    <input type="text" id="startPlace" placeholder="Start Place *">

    <p>Destination:</p>
    <input type="text" id="destination" placeholder="Destination *">

    <p>Car Color:</p>
    <input type="text" id="carColor" placeholder="Car Color">

    <label><input type="checkbox" id="singlePassenger">Single Passenger</label>

    <!-- <p style="text-align:center; padding:10px" class="errmsg" id="formErr"></p> -->

    <div class="modal-buttons">
        <button class="okbtn" onclick="saveNewRecord()">Save</button>
        <button class="cancelbtn" onclick="closeModal()">Cancel</button>
    </div>
    `;
    openModal(html);
}

//Creating the popup for editing the record
function openEditModal(record) {
  document.getElementById("searchInput").value = "";
    const html = `
      <h2>Edit Rental Record</h2>

      <p>Rental ID:</P>
      <input type="text" id="rentalId" value="${record.rentalId}" disabled>

      <p>Car Model:</p>
      <input type="text" id="carModal" value="${record.carModal}">

      <p>MFD Year:</P>
      <input type="text" id="mfdYear" value="${record.mfdYear}">
      <p class="errmsg" id="editmfdYearErr"></p>

      <p>Fuel Type:</P>
      <select id="fuelType">
        <option value="" ${record.fuelType === "" ? "selected" : ""}>Select Fuel Type</option>
        <option value="Petrol" ${record.fuelType === "Petrol" ? "selected" : ""}>Petrol</option>
        <option value="Diesel" ${record.fuelType === "Diesel" ? "selected" : ""}>Diesel</option>
        <option value="EV" ${record.fuelType === "EV" ? "selected" : ""}>EV</option>
      </select>

      <p>Start Date:</P>
      <input type="date" id="startDate" value="${record.startDate}">
      <p class="errmsg" id="editStartDateErr"></p>

      <p>End Date:</P>
      <input type="date" id="endDate" value="${record.endDate}">
      <p class="errmsg" id="editEndDateErr"></p>

      <p>Customer:</P>
      <input type="text" id="customer" value="${record.customer}">

      <p>Start Place:</P>
      <input type="text" id="startPlace" value="${record.startPlace}">

      <p>Destination:</P>
      <input type="text" id="destination" value="${record.destination}">

      <p>Car Color:</P>
      <input type="text" id="carColor" value="${record.carColor}">

      <label><input type="checkbox" id="singlePassenger" ${record.singlePassenger ? "checked" : ""}> Single Passenger</label>
  
      <div class="modal-buttons">
        <button class="okbtn" onclick="updateRecord('${record.rentalId}')">Update</button>
        <button class="cancelbtn" onclick="closeModal()">Cancel</button>
      </div>
    `;
    openModal(html);
  }

// creating the popup for viewing the existing record
function openViewModal(record) {
  document.getElementById("searchInput").value = "";
    const html = `
    <div class="viewblock">
      <h2>View Rental record</h2>
      <p><strong>Rental ID:</strong> ${record.rentalId}</p>
      <p><strong>Car Modal:</strong> ${record.carModal}</p>
      <p><strong>MFD Year:</strong> ${record.mfdYear}</p>
      <p><strong>Fuel:</strong> ${record.fuelType}</p>
      <p><strong>Start Date:</strong> ${record.startDate}</p>
      <p><strong>End Date:</strong> ${record.endDate}</p>
      <p><strong>Customer:</strong> ${record.customer}</p>
      <p><strong>Start Place:</strong> ${record.startPlace}</p>
      <p><strong>Destination:</strong> ${record.destination}</p>
      <p><strong>Car Color:</strong> ${record.carColor}</p>
      <p><strong>Single Passenger:</strong> ${record.singlePassenger ? "Yes" : "No"}</p>
  
      <div class="modal-buttons">
         <button class="cancelbtn" onclick="closeModal()">Close</button>
      </div>
    </div>
    `;
    openModal(html);
}

//Creating the popup for the delete method for confirming the deletion
function openDeleteModal(id) {
  document.getElementById("searchInput").value = "";
    const html = `
    <h3>Are you sure you want to delect this record!</h3>
    <div class="modal-buttons">
        <button class="okbtn" onclick="delectRecord('${id}')">Yes, Delete</button>
        <button class="cancelbtn" onclick="closeModal()">Canel</button>
    </div>
    `;
    openModal(html);
}

// function to get data from the local storage
function getRecords() {
    return JSON.parse(localStorage.getItem("rentalRecords") || "[]");
  }

//function to save or update the record to the local storage
function saveRecords(records) {
  localStorage.setItem("rentalRecords", JSON.stringify(records));
}


// funnction to load the records from the local storage adding it in the table while loading the page
function loadRentalRecords() {
    const tableBody = document.getElementById("rentalTableBody");
    const records = getRecords();

    if(records.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="10"> No records found</td></tr>`;
        return;
    }

    tableBody.innerHTML = "";
    records.forEach((rec) => {
      const row = document.createElement("tr");
      // const carcolor = rec.carColor;
      // console.log(carcolor);

      //deleting the finished bookings
      let bookingEndDate = new Date(rec.endDate);
      if(bookingEndDate < new Date()) {
        delectRecord(rec.rentalId);
      }
      
      row.innerHTML = `
        <td>${rec.rentalId}</td>
        <td>${rec.carModal}</td>
        <td>${rec.mfdYear}</td>
        <td>${(rec.fuelType === undefined || rec.fuelType == "undefined" || rec.fuelType.length == 0) ? "-" : rec.fuelType}</td>
        <td>${rec.startDate}</td>
        <td>${rec.endDate}</td>
        <td>${rec.customer}</td>
        <td>${rec.destination}</td>
        <td>${(rec.carColor === undefined || rec.carColor == "undefined" || rec.carColor.length == 0) ? "-" : rec.carColor}</td>
        <td class="actionbtns">
          <button class="seebtn" onclick='openViewModal(${JSON.stringify(rec)})'>View</button>
          <button class="editbtn" onclick='openEditModal(${JSON.stringify(rec)})'>Edit</button>
          <button class="deletebtn" onclick='openDeleteModal("${rec.rentalId}")'>Del</button>
        </td>
      `;
      tableBody.appendChild(row);
    });

    sortTable();
}

// function to get values from the input fields and saving the new record in the local storage
function saveNewRecord() {
    const rec = {
        rentalId: document.getElementById("rentalId").value.trim(),
        carModal: document.getElementById("carModal").value.trim(),
        mfdYear: document.getElementById("mfdYear").value.trim(),
        fuelType: document.getElementById("fuelType").value,
        startDate: document.getElementById("startDate").value,
        endDate: document.getElementById("endDate").value,
        customer: document.getElementById("customer").value.trim(),
        startPlace: document.getElementById("startPlace").value.trim(),
        destination: document.getElementById("destination").value.trim(),
        carColor: document.getElementById("carColor").value.trim(),
        singlePassenger: document.getElementById("singlePassenger").checked,
        bookedBy: localStorage.getItem("loggedInUser") || "admin"
    };

    if (!rec.rentalId || !rec.carModal || !rec.customer || !rec.destination || !rec.startPlace || !rec.startDate || !rec.endDate) {
        alert("Please fill all mandatory fields!");
        // document.getElementById("formErr").textContent = "Please Fill All Mandatory Fields!";
        return;
    } 
    // else {
    //   document.getElementById(formErr).textContent = "";
    // }

    //Validating the rental id
    const rentalIdValue = document.getElementById("rentalId").value.trim();
    if(rentalIdValue == "" || isNaN(Number(rentalIdValue))) {
      // alert("Invalid rental id");
      document.getElementById("rentalIdErr").textContent = "Invalid Rental ID.";
      return;
    } else {
      document.getElementById("rentalIdErr").textContent = "";
    }
    // document.getElementById("rentalId").value = "";

    //Checking id rental ID is already present or not
    const records = getRecords();
    if(records.find(r => r.rentalId === rec.rentalId)) {
        // alert("Renatl ID already exists!");
        document.getElementById("rentalIdErr").textContent = "Rental ID already exists!";
        return;
    } else {
      document.getElementById("rentalIdErr").textContent = "";
    }

    //Validating the Start Date
    let  today = new Date();
    today.setHours(0,0,0,0);
    if(new Date(document.getElementById("startDate").value) <= today) {
      // alert("Please fill the start date greater then or equals to today");
      document.getElementById("addStartDateErr").textContent = "Please fill the Start date greater than or Equals to today";
      return;
    } else {
      document.getElementById("addStartDateErr").textContent = "";
    }

    //Validating the End date
    if(new Date(document.getElementById("startDate").value) > new Date(document.getElementById("endDate").value)) {
      // alert("Please fill the end date greater than start date");
      document.getElementById("addEndDateErr").textContent = "Please fill the end date greater than start date";
      return;
    } else {
      document.getElementById("addEndDateErr").textContent = "";
    }

    //validating the mfd year of the car
    let mfdyear = new Date(parseInt(rec.mfdYear),1).getFullYear();
    let thisyear = new Date().getFullYear();

    if(mfdyear > thisyear) {
      document.getElementById("addmfdYearErr").textContent = "Year must be less than present year!";
      return;
    } else {
      document.getElementById("addmfdYearErr").textContent  = "";
    }

    // const records = getRecords();
    // if(records.find(r => r.rentalId === rec.rentalId)) {
    //     alert("Renatl ID already exists!");
    //     return;
    // }

    records.push(rec);
    saveRecords(records);
    closeModal();
    loadRentalRecords();
}

// function to make changes in the existing record in the table by 
function updateRecord(id) {
    const records = getRecords();
    // console.log(records);
    const index = records.findIndex(r => r.rentalId === id);    
    if (index === -1) return;
    
    records[index].carModal = document.getElementById("carModal").value.trim();
    // console.log(records[index].carModal);
    records[index].mfdYear = document.getElementById("mfdYear").value.trim();
    records[index].fuelType = document.getElementById("fuelType").value;
    records[index].startDate = document.getElementById("startDate").value;
    records[index].endDate = document.getElementById("endDate").value;
    records[index].customer = document.getElementById("customer").value.trim();
    records[index].startPlace = document.getElementById("startPlace").value.trim();
    records[index].destination = document.getElementById("destination").value.trim();
    records[index].carColor = document.getElementById("carColor").value.trim();
    records[index].singlePassenger = document.getElementById("singlePassenger").checked;

    //Validating the maditory input fields
    if(!records[index].carModal || !records[index].mfdYear || !records[index].startDate || !records[index].endDate || !records[index].customer || !records[index].startPlace || !records[index].destination) {
      alert("Please fill all mandatory fields!")
      return;
    }  

    //Validating the Start date
    let today = new Date();
    today.setHours(0,0,0,0); 
    if(new Date(document.getElementById("startDate").value) <= today) {
      // alert("Please select the date greater than today");
      document.getElementById("editStartDateErr").textContent = "please Select the start date greater than today";
      return;
    } else {
      document.getElementById("editStartDateErr").textContent = "";
    }

    //Validating the End Date
    if(new Date(document.getElementById("startDate").value) > new Date(document.getElementById("endDate").value)) {
      // alert("Please select the end date greater than the start date");
      document.getElementById("editEndDateErr").textContent = "Please select the date greater than the starting date";
      return;
    } else {
      document.getElementById("editEndDateErr").textContent = "";
    }
  
    saveRecords(records);
    closeModal();
    loadRentalRecords();
  }

//function to delete record from the table when getting conformation from the popup
function delectRecord(id) {
    let records = getRecords();
    records = records.filter(r => r.rentalId !== id);
    saveRecords(records);
    closeModal();
    // renderReservations();
    loadRentalRecords();
    
}

// function to search the record based on the rental id
function searchRecord() {
    const searchId = document.getElementById("searchInput").value.trim().toLowerCase();
    const tableBody = document.getElementById("rentalTableBody");
    const records = getRecords();
  
    const filtered = records.filter(r => r.rentalId.toLowerCase() === searchId);
  
    if (filtered.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="10">No records found</td></tr>`;
      return;
    }
  
    tableBody.innerHTML = "";
    filtered.forEach((rec) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${rec.rentalId}</td>
        <td>${rec.carModal}</td>
        <td>${rec.mfdYear}</td>
        <td>${rec.fuelType}</td>
        <td>${rec.startDate}</td>
        <td>${rec.endDate}</td>
        <td>${rec.customer}</td>
        <td>${rec.destination}</td>
        <td>${rec.carColor}</td>
        <td class="actionbtns">
          <button class="seebtn" onclick='openViewModal(${JSON.stringify(rec)})'>View</button>
          <button class="editbtn" onclick='openEditModal(${JSON.stringify(rec)})'>Eidt</button>
          <button class="deletebtn" onclick='openDeleteModal("${rec.rentalId}")'>Del</button>
        </td>
      `;
      tableBody.appendChild(row);
    });

    //Making the text input field empty after search
    document.getElementById("searchInput").value = "";
  }

//Sorting the table 
function sortTable() {
  const myTableBody = document.getElementById("rentalTableBody");
  const rows = Array.from(myTableBody.querySelectorAll("tr"));

  rows.sort((rowA, rowB) => {
    const rentalidA = parseInt(rowA.cells[0].textContent);
    const rentalidB = parseInt(rowB.cells[0].textContent);

    if(rentalidA < rentalidB) {
      return -1;
    } else if(rentalidA > rentalidB) {
      return 1;
    } else {
      return 0;
    }
  });
  
  while(myTableBody.firstChild) {
    myTableBody.removeChild(myTableBody.firstChild);
  }

  rows.forEach((row) => {
    myTableBody.appendChild(row);
  });

  //sorting the date in the storage
  const storedRecords = getRecords();
  // console.log(storedRecords);
  
  let records = [];

  if(storedRecords) {
    records = storedRecords;
  } else {
    alert("No data Available!");
    return;
  }

  records.sort((recordA, recordB) => {
    const ridA = parseInt(recordA.rentalId);
    const ridB = parseInt(recordB.rentalId);

    if(ridA < ridB) {
      return -1;
    } else if(ridA > ridB) {
      return 1;
    } else {
      return 0;
    }
  });
  // console.log(records);

  saveRecords(records);

}

