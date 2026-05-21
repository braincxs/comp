// let toggle = document.querySelector(".toggle");
// let navigation = document.querySelector(".navigation");
// let main = document.querySelector(".main");

// toggle.onclick = function () {
//   navigation.classList.toggle("active");
//   main.classList.toggle("active");
// };
// let navLinks = document.querySelectorAll(".navigation ul li a");

// navLinks.forEach(link => {
//     // 1. Handle Single Click
//     link.addEventListener("click", function(event) {
//         let href = this.getAttribute("href");
        
//         // Prevent normal navigation for real links so it doesn't trigger on a single click
//         if (href && href !== "#" && !this.hasAttribute("onclick")) {
//             event.preventDefault();
//         }

//         // If the sidebar is closed, expand it
//         if (navigation.classList.contains("active")) {
//             event.preventDefault(); // Prevent any action if they are just opening the menu
//             navigation.classList.remove("active");
//             main.classList.remove("active");
//         }
//     });

//     // 2. Handle Double Click
//     link.addEventListener("dblclick", function(event) {
//         let href = this.getAttribute("href");
//         let target = this.getAttribute("target");

//         // Only navigate if it's a real link (not an empty link or an onclick button like Reset)
//         if (href && href !== "#" && !this.hasAttribute("onclick")) {
//             if (target === "_blank") {
//                 window.open(href, '_blank'); // Opens in a new tab for your Ward links
//             } else {
//                 window.location.href = href; // Opens in the same tab
//             }
//         }
//     });
// });

// // ==========================================
// // Dynamic Medical Form Submission Logic
// // ==========================================

// const recordForm = document.getElementById("recordForm");
// const recordTableBody = document.getElementById("recordTableBody");

// // Safety check: Only attach the event listener if the form exists on the page
// if (recordForm) {
//     recordForm.addEventListener("submit", function(event) {
//         // Prevent the form from reloading the page
//         event.preventDefault(); 

//         // 1. Get the values the user typed in
//         const nameValue = document.getElementById("patientName").value;
//         const typeValue = document.getElementById("reportType").value;
//         const ambValue = document.getElementById("ambulanceStatus").value;
//         const statusValue = document.getElementById("patientStatus").value;

//         // 2. Format the status text to match the medical theme
//         let statusText = "";
//         if(statusValue === "delivered") statusText = "Discharged";
//         if(statusValue === "pending") statusText = "Admitted";
//         if(statusValue === "return") statusText = "Critical";
//         if(statusValue === "inProgress") statusText = "Stable";

//         // 3. Create a brand new table row element
//         const newRow = document.createElement("tr");

//         // 4. Inject the HTML into the new row for the 5 columns (including Delete button)
//         newRow.innerHTML = `
//             <td>${nameValue}</td>
//             <td>${typeValue}</td>
//             <td>${ambValue}</td>
//             <td><span class="status ${statusValue}">${statusText}</span></td>
//             <td>
//                 <button class="delete-row-btn" onclick="removeRow(this)">
//                     <ion-icon name="trash-outline"></ion-icon>
//                 </button>
//             </td>
//         `;

//         // 5. Add the new row to the bottom of the table
//         recordTableBody.appendChild(newRow);

//         // 6. Clear out the form so it's ready for the next entry
//         recordForm.reset(); 
//     });
// }

// function resetDatabase() {
//     if (confirm("Are you sure you want to delete all registered accounts?")) {
//         localStorage.removeItem('medical_users');
//         alert("Database cleared! Redirecting to login...");
//         window.location.href = "/comp/login/login.html";
//     }
// }

// // --- New Function: Remove Single Row ---
// function removeRow(button) {
//     // 'button' is inside a <td>, which is inside a <tr>
//     const row = button.closest("tr");
//     row.remove();
// }

// // --- New Function: Clear All Rows ---
// function clearAllRows() {
//     if (confirm("Are you sure you want to delete ALL medical reports?")) {
//         const tableBody = document.getElementById("recordTableBody");
//         if (tableBody) {
//             tableBody.innerHTML = ""; // Removes all HTML inside the tbody
//         }
//     }
// }
// // ==========================================
// // Sidebar Dropdown Logic
// // ==========================================
// const dropdownBtn = document.querySelector(".dropdown-btn");
// const dropdownParent = document.querySelector(".dropdown");

// if (dropdownBtn) {
//     dropdownBtn.addEventListener("click", function(event) {
//         event.preventDefault(); // Prevents the page from jumping to the top
//         dropdownParent.classList.toggle("active");
//     });
// }
// Sidebar Elements
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");
const dropdownParent = document.querySelector(".dropdown");
const dropdownBtn = document.querySelector(".dropdown-btn");

// ==========================================
// 1. Sidebar Toggle & Auto-Close Ward
// ==========================================
toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");

  // If the sidebar is CLOSED (has 'active' class), force the Ward dropdown to close
  if (navigation.classList.contains("active") && dropdownParent) {
    dropdownParent.classList.remove("active");
  }
};

// ==========================================
// 2. Ward Dropdown Toggle Logic
// ==========================================
if (dropdownBtn) {
    dropdownBtn.addEventListener("click", function(event) {
        event.preventDefault(); // Prevents jumping to the top of the page
        dropdownParent.classList.toggle("active");
    });
}

// ==========================================
// 3. Auto-Expand Sidebar & Double-Click Navigation
// ==========================================
let navLinks = document.querySelectorAll(".navigation ul li a");

navLinks.forEach(link => {
    // SINGLE CLICK: Handles Sidebar Expansion
    link.addEventListener("click", function(event) {
        let href = this.getAttribute("href");
        
        // Prevent immediate navigation on single click for real links
        if (href && href !== "#" && !this.hasAttribute("onclick")) {
            event.preventDefault();
        }

        // If sidebar is currently collapsed (has 'active' class), expand it
        if (navigation.classList.contains("active")) {
            event.preventDefault(); 
            navigation.classList.remove("active");
            main.classList.remove("active");
        }
    });

    // DOUBLE CLICK: Handles actual navigation
    link.addEventListener("dblclick", function(event) {
        let href = this.getAttribute("href");
        let target = this.getAttribute("target");

        // Only navigate if it's a real link (not the Brand or Reset button)
        if (href && href !== "#" && !this.hasAttribute("onclick")) {
            if (target === "_blank") {
                window.open(href, '_blank'); // Opens Ward links in new tab
            } else {
                window.location.href = href; // Opens in same tab
            }
        }
    });
});

// ==========================================
// 4. Medical Form Submission Logic
// ==========================================
const recordForm = document.getElementById("recordForm");
const recordTableBody = document.getElementById("recordTableBody");

if (recordForm) {
    recordForm.addEventListener("submit", function(event) {
        event.preventDefault(); 

        const nameValue = document.getElementById("patientName").value;
        const typeValue = document.getElementById("reportType").value;
        const ambValue = document.getElementById("ambulanceStatus").value;
        const statusValue = document.getElementById("patientStatus").value;

        let statusText = "";
        if(statusValue === "delivered") statusText = "Discharged";
        if(statusValue === "pending") statusText = "Admitted";
        if(statusValue === "return") statusText = "Critical";
        if(statusValue === "inProgress") statusText = "Stable";

        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${nameValue}</td>
            <td>${typeValue}</td>
            <td>${ambValue}</td>
            <td><span class="status ${statusValue}">${statusText}</span></td>
            <td>
                <button class="delete-row-btn" onclick="removeRow(this)">
                    <ion-icon name="trash-outline"></ion-icon>
                </button>
            </td>
        `;

        recordTableBody.appendChild(newRow);
        recordForm.reset(); 
    });
}

// ==========================================
// 5. Utility Functions (Reset & Remove)
// ==========================================
function resetDatabase() {
    if (confirm("Are you sure you want to delete all registered accounts?")) {
        localStorage.removeItem('medical_users');
        alert("Database cleared! Redirecting to login...");
        window.location.href = "/comp/login/login.html";
    }
}

function removeRow(button) {
    const row = button.closest("tr");
    row.remove();
}

function clearAllRows() {
    if (confirm("Are you sure you want to delete ALL medical reports?")) {
        if (recordTableBody) {
            recordTableBody.innerHTML = ""; 
        }
    }
}