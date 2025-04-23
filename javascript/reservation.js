const user = localStorage.getItem("loggedInUser") || "admin";

// creating the div to display the popup
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

//Creating the contents for the popup
function openDeleteModal(id) {
    const html = `
    <h3>Are you sure you want to delect this record!</h3>
    <div class="modal-buttons">
        <button class="okbtn" onclick="deleteRecord('${id}')">Yes, Delete</button>
        <button class="cancelbtn" onclick="closeModal()">Canel</button>
    </div>
    `;
    openModal(html);
}

// function for closing the popup
function closeModal() {
    document.getElementById("modalContainer").innerHTML = "";
}

// getting the records from the local storage
function getRecords() {
        return JSON.parse(localStorage.getItem("rentalRecords") || "[]");
}

// Saving the new records to the stirage
function saveNewRecord(records) {
    localStorage.setItem("rentalRecords", JSON.stringify(records));
}

// function to delete the record
function deleteRecord(id) {
    const records = getRecords();
    const updated = records.filter(r => r.rentalId !== id);
    saveNewRecord(updated);
    closeModal();
    renderReservations();
}

// function to render the records from the service page and based on the number of records creating the that number of record cards
function renderReservations() {
    const container = document.getElementById("reservationContainer")
    const records = getRecords();

    if(records.length === 0) {
        container.innerHTML = "<p>No reservations available.</p>";
        return;
    }

    container.innerHTML = "";
    records.forEach(rec => {
        var staticimg = "/images/carimg"+(Math.floor(Math.random()*10)+1)+".jpg";
        // console.log(staticimg);
        const card = document.createElement("div");
        card.className = "reservation-card";
        card.innerHTML = `
             <img src="${staticimg}" alt="car image">
             <h3>${rec.carModal}</h3>
             <p><strong>Rental ID:</strong> ${rec.rentalId}</p>
             <p><strong>Customer:</strong> ${rec.customer}</p>
             <p><strong>Start Date:</strong> ${rec.startDate}</p>
             <p><strong>Ens Date:</strong> ${rec.endDate}</p>
             <p><strong>Destination:</strong> ${rec.destination}</p>
        `;
        // if user is admin creating the delete button
        if(user.toLowerCase() == "admin") {
            const btn = document.createElement("button");
            btn.className = "delete-btn";
            btn.textContent = "Delete";
            btn.onclick = () => {
                // const confirmDelete = confirm(`Are you sure you want to delete reservation ${rec.rentalId}?`);
                // if(confirmDelete) {
                //     deleteRecord(rec.rentalId);
                // }
                openDeleteModal(rec.rentalId);
            };
            card.appendChild(btn);
        }
        container.appendChild(card);
    });
}

// render all the records and creating the cards after loading the page
window.onload = renderReservations();