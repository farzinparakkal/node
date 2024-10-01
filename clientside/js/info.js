async function loadEmployee() {
    const params = new URLSearchParams(window.location.search);
    const empId = params.get('empId');

    const res = await fetch('http://localhost:3000/employee/' + empId);
    const data = await res.json();

    document.getElementById('employee-info').innerHTML = `
        <div>ID: ${data.empId}</div>
        <div>Name: ${data.name}</div>
        <div>Description: ${data.des}</div>
        <div>Salary: ${data.salary}</div>
        <div>Experience: ${data.exp}</div>
        <div>Email: ${data.email}</div>
        <div>Phone: ${data.phone}</div>
    `;
}

function goBack() {
    window.history.back();
}

async function editEmployee() {
    const params = new URLSearchParams(window.location.search);
    const empId = params.get('empId');
    location.href = 'editEmp.html?empId=' + empId;
}

function showConfirmBox() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('confirm-box').style.display = 'block';
}

function cancelDelete() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('confirm-box').style.display = 'none';
}

async function confirmDelete() {
    const params = new URLSearchParams(window.location.search);
    const empId = params.get('empId');
    const res = await fetch('http://localhost:3000/deleteEmployee/' + empId, {
        method: 'DELETE'
    });
    if (res.ok) {
        alert("Employee deleted");
        location.href = '/';
    } else {
        alert("Failed to delete employee");
    }
}

loadEmployee();