let products = JSON.parse(localStorage.getItem('products')) || [];

// Render Table
function renderTable() {
    const table = document.getElementById('productTable');
    table.innerHTML = '';
    products.forEach((product, index) => {
        table.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td><img src="${product.photo}" alt="${product.name}"></td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.description}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editProduct(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteProduct(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
    localStorage.setItem('products', JSON.stringify(products));
}

// Add Product
document.getElementById('productForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('description').value;
    const photo = document.getElementById('photo').value;

    products.push({ name, price, description, photo });
    renderTable();
    this.reset();
});

// Delete Product
function deleteProduct(index) {
    products.splice(index, 1);
    renderTable();
}

// Edit Product
function editProduct(index) {
    document.getElementById('editIndex').value = index;
    document.getElementById('editName').value = products[index].name;
    document.getElementById('editPrice').value = products[index].price;
    document.getElementById('editDescription').value = products[index].description;
    document.getElementById('editPhoto').value = products[index].photo;
    new bootstrap.Modal(document.getElementById('editModal')).show();
}

// Save Edit
document.getElementById('saveEdit').addEventListener('click', function() {
    const index = document.getElementById('editIndex').value;
    products[index].name = document.getElementById('editName').value;
    products[index].price = document.getElementById('editPrice').value;
    products[index].description = document.getElementById('editDescription').value;
    products[index].photo = document.getElementById('editPhoto').value;
    renderTable();
    bootstrap.Modal.getInstance(document.getElementById('editModal')).hide();
});

// Search
document.getElementById('search').addEventListener('input', function() {
    const keyword = this.value.toLowerCase();
    const rows = document.querySelectorAll('#productTable tr');
    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(keyword) ? '' : 'none';
    });
});

renderTable();
