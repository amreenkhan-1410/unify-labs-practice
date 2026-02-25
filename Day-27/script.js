const API = "http://localhost:3000/users";

// GET users
async function getUsers() {
    const res = await fetch(API);
    const users = await res.json();

    const list = document.getElementById("userList");
    list.innerHTML = "";

    users.forEach(user => {
        const li = document.createElement("li");
        li.innerText = `ID: ${user.id} | Name: ${user.name} | Age: ${user.age}`;
        list.appendChild(li);
    });
}

// POST user
async function addUser() {
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;

    await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, age })
    });

    alert("User Added");
    getUsers();
}

// PATCH user
async function updateUser() {
    const id = document.getElementById("updateId").value;
    const name = document.getElementById("updateName").value;

    await fetch(`${API}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
    });

    alert("User Updated");
    getUsers();
}

// DELETE user
async function deleteUser() {
    const id = document.getElementById("deleteId").value;

    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    alert("User Deleted");
    getUsers();
}