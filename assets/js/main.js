// Validar formulario
function validateForm() {
    // Obtengo los valores de los campos
    let email = document.getElementById('inputEmail').value;
    let name = document.getElementById('inputName').value;
    let phone = document.getElementById('inputPhone').value;

    // Validar campo correo
    if (email === "") {
        alert("El correo electrónico es requerido");
        return false;
    } else if (!email.includes("@")) {
        alert('El correo electrónico ingresado no es válido');
        return false;
    }

    // Validar campo nombre
    if (name === "") {
        alert("El nombre completo es requerido");
        return false;
    }

    // Validar campo teléfono
    if (phone === "") {
        alert("El teléfono es requerido");
        return false;
    }

    // Si pasa las validaciones
    return true;
}

function addData() {
    if (validateForm()) {
        // Obtengo los valores de los campos
        let email = document.getElementById('inputEmail').value;
        let name = document.getElementById('inputName').value;
        let phone = document.getElementById('inputPhone').value;
        let listPeople;

        if (localStorage.getItem('listPeople') === null) {
            listPeople = [];
        } else {
            listPeople = JSON.parse(localStorage.getItem('listPeople'));
        }

        listPeople.push({
            email: email,
            name: name,
            phone: phone
        });

        // Agrego al local storage
        localStorage.setItem('listPeople', JSON.stringify(listPeople));

        shadowData();
        // Limpio los campos después de agregar los datos
        limpiarData();
    }
}

function shadowData() {
    let listPeople;

    if (localStorage.getItem('listPeople') === null) {
        listPeople = [];
    } else {
        listPeople = JSON.parse(localStorage.getItem('listPeople'));
    }

    let html = "";

    listPeople.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.email + "</td>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.phone + "</td>";
        html += "<td><button onclick='updateData(" + index + ")' class='btn btn-warning'>Editar Datos</button> <button onclick='deleteData(" + index + ")' class='btn btn-danger' id='btnDelete'>Eliminar Datos</button></td>";
        html += "</tr>";
    });

    document.querySelector('#tableData tbody').innerHTML = html;
}

// Cargar datos al cargar la página
window.onload = shadowData;

function deleteData(index) {
    let listPeople;

    if (localStorage.getItem('listPeople') === null) {
        listPeople = [];
    } else {
        listPeople = JSON.parse(localStorage.getItem('listPeople'));
    }

    listPeople.splice(index, 1);
    localStorage.setItem('listPeople', JSON.stringify(listPeople));
    shadowData();
}

function updateData(index) {
    // Cambiar visibilidad botón
    document.getElementById("btnAdd").style.display = 'none';
    document.getElementById("btnDelete").style.display = 'none';
    document.getElementById("btnUpdate", btnAdd).style.display = 'block';
btnDelete

    let listPeople;

    if (localStorage.getItem('listPeople') === null) {
        listPeople = [];
    } else {
        listPeople = JSON.parse(localStorage.getItem('listPeople'));
    }

    // Rellenar formulario con Data
    document.getElementById('inputEmail').value = listPeople[index].email;
    document.getElementById('inputName').value = listPeople[index].name;
    document.getElementById('inputPhone').value = listPeople[index].phone;

    // Actualizar
    document.querySelector("#btnUpdate").onclick = function () {
        if (validateForm()) {
            // Actualizar datos
            listPeople[index].email = document.getElementById('inputEmail').value;
            listPeople[index].name = document.getElementById('inputName').value;
            listPeople[index].phone = document.getElementById('inputPhone').value;
            // Guardar
            localStorage.setItem('listPeople', JSON.stringify(listPeople));
            // Actualizar tabla
            shadowData();
            limpiarData();
            // Cambiar visibilidad de botones
            document.getElementById("btnAdd").style.display = 'block';
            document.getElementById("btnDelete").style.display = 'block';
            document.getElementById("btnUpdate").style.display = 'none';
        }
    };
}

function limpiarData() {
    document.getElementById('inputEmail').value = "";
    document.getElementById('inputName').value = "";
    document.getElementById('inputPhone').value = "";
}
