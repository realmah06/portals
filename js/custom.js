// document.addEventListener("DOMContentLoaded", function () {
//         // Check if user is logged in
//         const userData = localStorage.getItem("loggedInUser");

//         if (!userData) {
//             // Redirect to login if no user is found
//             window.location.href = "index.html";
//             return;
//         }

//         // Parse the user data
//         const user = JSON.parse(userData);

//         // Display user info in dashboard (example)
//         document.getElementById("user-name").textContent = user.fullName;
//         document.getElementById("user-role").textContent = user.role;
//         document.getElementById("welcome").innerHTML = 'Welcome back to ' + user.role + '&nbsp; Dashboard';
//         document.getElementById("last-login").textContent = new Date().toLocaleString();
//         document.getElementById("search-bar").innerHTML = `<input type='search' id='search' placeholder='Search @ ${user.role} Dashboard'>`;
//         document.querySelectorAll(".profile-img").forEach(el => {el.innerHTML = `<i class="bi bi-person-circle"></i>`;});
//         document.querySelectorAll(".logout").forEach(el => {el.innerHTML = `<button onclick="logout()"><i class="bi bi-box-arrow-left"></i> Logout</button>`;});

//     });


//     function logout() {
//         localStorage.removeItem("loggedInUser");
//         window.location.href = "index.html";
//     }

// const today = new Date().toISOString().split('T')[0];
// const dateInputs = document.querySelectorAll('.date-input');

// dateInputs.forEach(input => {
//     input.value = today;
// });