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
    <input type="text" id="rentalId" placeholder="Rental ID *">
    <input type="text" id="carModal" placeholder="Car Modal *">
    <input type="text" id="mfdYear" placeholder="MFD Year">
    <select id="fuelType">
        <option value=""> Select Fuel Type</option>
        <option value="Petrol">Petrol</option>
        <option value="Diesel">Diesel</option>
    </select>
    <input type="date" id="startDate">
    <input type="date" id="endDate">
    <input type="text" id="customer" placeholder="Customer Name *">
    <input type="text" id="startPlace" placeholder="Start Place *">
    <input type="text" id="destination" placeholder="Destination *">
    <label><input type="checkbox" id="singlePassenger">Single Passenger</label>

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
      <input type="text" id="rentalId" value="${record.rentalId}" disabled>
      <input type="text" id="carModal" value="${record.carModal}">
      <input type="text" id="mfdYear" value="${record.mfdYear}">
      <select id="fuelType">
        <option value="Petrol" ${record.fuelType === "Petrol" ? "selected" : ""}>Petrol</option>
        <option value="Diesel" ${record.fuelType === "Diesel" ? "selected" : ""}>Diesel</option>
      </select>
      <input type="date" id="startDate" value="${record.startDate}">
      <input type="date" id="endDate" value="${record.endDate}">
      <input type="text" id="customer" value="${record.customer}">
      <input type="text" id="startPlace" value="${record.startPlace}">
      <input type="text" id="destination" value="${record.destination}">
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
    <p><strong>Single Passenger:</strong> ${record.singlePassenger ? "Yes" : "No"}</p>
  
    <div class="modal-buttons">
       <button class="cancelbtn" onclick="closeModal()">Close</button>
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
        tableBody.innerHTML = `<tr><td colspan="9"> No records found</td></tr>`;
        return;
    }

    tableBody.innerHTML = "";
    records.forEach((rec) => {
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
        <td class="actionbtns">
          <button class="seebtn" onclick='openViewModal(${JSON.stringify(rec)})'>View</button>
          <button class="editbtn" onclick='openEditModal(${JSON.stringify(rec)})'>Edit</button>
          <button class="deletebtn" onclick='openDeleteModal("${rec.rentalId}")'>Del</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
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
        singlePassenger: document.getElementById("singlePassenger").checked,
        bookedBy: localStorage.getItem("loggedInUser") || "admin"
    };

    if (!rec.rentalId || !rec.carModal || !rec.customer || !rec.destination || !rec.startPlace || !rec.startDate || !rec.endDate) {
        alert("Please fill all mandatory fields!");
        return;
    }

    const records = getRecords();
    if(records.find(r => r.rentalId === rec.rentalId)) {
        alert("Renatl ID already exists!");
        return;
    }

    records.push(rec);
    saveRecords(records);
    closeModal();
    loadRentalRecords();
}

// function to make changes in the existing record in the table by 
function updateRecord(id) {
    const records = getRecords();
    const index = records.findIndex(r => r.rentalId === id);
    if (index === -1) return;
    
    records[index].carModal = document.getElementById("carModal").value.trim();
    records[index].mfdYear = document.getElementById("mfdYear").value.trim();
    records[index].fuelType = document.getElementById("fuelType").value;
    records[index].startDate = document.getElementById("startDate").value;
    records[index].endDate = document.getElementById("endDate").value;
    records[index].customer = document.getElementById("customer").value.trim();
    records[index].startPlace = document.getElementById("startPlace").value.trim();
    records[index].destination = document.getElementById("destination").value.trim();
    records[index].singlePassenger = document.getElementById("singlePassenger").checked;
  
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
      tableBody.innerHTML = `<tr><td colspan="9">No records found</td></tr>`;
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


