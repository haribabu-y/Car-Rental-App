const user = localStorage.getItem("loggedInUser") || "admin";

function getRecords() {
    try {
        const stored = JSON.parse(localStorage.getItem("rentalRecords") || "[]");
        if(stored.length > 0) return stored;
    } catch(err) {
        console.error("Error reading localStroage", err);
    }

}

function aveRecords(records) {
    localStorage.setItem("rentalRecords", JSON.stringify(records));
}

function deleteRecord(id) {
    const records = getRecords();
    const updated = records.filter(r => r.rentalId !== id);
    saveNewRecord(updated);
    renderReservations();
}

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
        console.log(staticimg);
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
        if(user.toLowerCase() == "admin") {
            const btn = document.createElement("button");
            btn.className = "delete-btn";
            btn.textContent = "Delete";
            btn.onclick = () => {
                const confirmDelete = confirm(`Are you sure you want to delete reservation ${rec.rentalId}?`);
                if(confirmDelete) {
                    deleteRecord(rec.rentalId);
                }
            };
            card.appendChild(btn);
        }
        container.appendChild(card);
    });
}

window.onload = renderReservations;