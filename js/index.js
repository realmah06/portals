
        // DOM Elements
const productContainer = document.getElementById('product-container');
const supplierContainer = document.getElementById('supplier-container');
const salesTableBody = document.getElementById('sales-table-body');
const reportResults = document.getElementById('report-results');
const productModal = document.getElementById('product-modal');
const supplierModal = document.getElementById('supplier-modal');
const saleModal = document.getElementById('sale-modal');
const productForm = document.getElementById('product-form');
const supplierForm = document.getElementById('supplier-form');
const saleForm = document.getElementById('sale-form');
const addProductBtn = document.getElementById('add-product-btn');
const addSupplierBtn = document.getElementById('add-supplier-btn');
const newSaleBtn = document.getElementById('new-sale-btn');
const closeBtns = document.querySelectorAll('.close-btn');
const productSearch = document.getElementById('product-search');
const categoryFilter = document.getElementById('category-filter');
const saleSearch = document.getElementById('sale-search');
const saleDateFilter = document.getElementById('sale-date-filter');
const generateReportBtn = document.getElementById('generate-report-btn');
const exportReportBtn = document.getElementById('export-report-btn');
const reportType = document.getElementById('report-type');
const reportStartDate = document.getElementById('report-start-date');
const reportEndDate = document.getElementById('report-end-date');
const saleProductSelect = document.getElementById('sale-product-select');
const saleProductQuantity = document.getElementById('sale-product-quantity');
const addToSaleBtn = document.getElementById('add-to-sale-btn');
const saleProductList = document.getElementById('sale-product-list');
const saleSubtotal = document.getElementById('sale-subtotal');
const saleTax = document.getElementById('sale-tax');
const saleTotal = document.getElementById('sale-total');
const cartCount = document.getElementById('cart-count');

// Data
let products = JSON.parse(localStorage.getItem('products')) || [];
let suppliers = JSON.parse(localStorage.getItem('suppliers')) || [];
let sales = JSON.parse(localStorage.getItem('sales')) || [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize the app
function init() {
    // Load sample data if empty
    if (products.length === 0) {
        loadSampleProducts();
    }
    
    if (suppliers.length === 0) {
        loadSampleSuppliers();
    }
    
    // Render all data
    renderProducts();
    renderSuppliers();
    renderSales();
    updateCartCount();
    
    // Set default dates
    const today = new Date().toISOString().split('T')[0];
    saleDateFilter.value = today;
    reportStartDate.value = today;
    reportEndDate.value = today;
    document.getElementById('sale-date').value = today;
}

// Load sample products
function loadSampleProducts() {
    products = [
        {
            id: 1,
            name: 'NPK Fertilizer 20-10-10',
            category: 'fertilizer',
            price: 25.99,
            stock: 100,
            supplierId: 1,
            description: 'Balanced NPK fertilizer for general use'
        },
        {
            id: 2,
            name: 'Urea Fertilizer',
            category: 'fertilizer',
            price: 19.99,
            stock: 150,
            supplierId: 1,
            description: 'High nitrogen fertilizer for leafy growth'
        },
        {
            id: 3,
            name: 'Organic Compost',
            category: 'fertilizer',
            price: 15.50,
            stock: 80,
            supplierId: 2,
            description: '100% organic compost for soil improvement'
        }
        // {
        //     id: 4,
        //     name: 'Insecticide Spray',
        //     category: 'pesticide',
        //     price: 12.75,
        //     stock: 60,
        //     supplierId: 3,
        //     description: 'Effective against common garden pests'
        // }
    ];
    
    saveProducts();
}

// Load sample suppliers
function loadSampleSuppliers() {
    suppliers = [
        {
            id: 1,
            name: 'AgroSupplies Inc.',
            contact: 'John Smith',
            phone: '(555) 123-4567',
            email: 'john@agrosupplies.com',
            address: '123 Farm Rd, Agricultural City'
        },
        {
            id: 2,
            name: 'Organic Growers Co.',
            contact: 'Sarah Johnson',
            phone: '(555) 987-6543',
            email: 'sarah@organicgrowers.com',
            address: '456 Green Valley, Organic Town'
        },
        {
            id: 3,
            name: 'Pest Control Solutions',
            contact: 'Mike Brown',
            phone: '(555) 456-7890',
            email: 'mike@pestcontrol.com',
            address: '789 Bug St, Pestville'
        }
    ];
    
    saveSuppliers();
}

// Save products to localStorage
function saveProducts() {
    localStorage.setItem('products', JSON.stringify(products));
}

// Save suppliers to localStorage
function saveSuppliers() {
    localStorage.setItem('suppliers', JSON.stringify(suppliers));
}

// Save sales to localStorage
function saveSales() {
    localStorage.setItem('sales', JSON.stringify(sales));
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Generate unique ID
function generateId() {
    return Date.now();
}

// Render products
function renderProducts(filteredProducts = null) {
    const productsToRender = filteredProducts || products;
    
    productContainer.innerHTML = '';
    
    if (productsToRender.length === 0) {
        productContainer.innerHTML = '<p class="no-products">No products found. Add some products to get started.</p>';
        return;
    }
    
    productsToRender.forEach(product => {
        const supplier = suppliers.find(s => s.id === product.supplierId);
        const supplierName = supplier ? supplier.name : 'Unknown Supplier';
        
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <i class="fas fa-seedling"></i>
            </div>
            <div class="product-details">
                <h3>${product.name}</h3>
                <span class="product-category">${product.category}</span>
                <p class="product-price">₦${product.price.toFixed(2)}</p>  
                 <div class="product-actions">
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>           
            </div>
        `;
        
        productContainer.appendChild(productCard);
    });
    
    // Add event listeners
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        });
    });
    
    document.querySelectorAll('.edit-product').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            openEditProductModal(productId);
        });
    });
    
    document.querySelectorAll('.delete-product').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            deleteProduct(productId);
        });
    });
}

// Render suppliers
function renderSuppliers() {
    supplierContainer.innerHTML = '';
    
    if (suppliers.length === 0) {
        supplierContainer.innerHTML = '<p class="no-suppliers">No suppliers found. Add some suppliers to get started.</p>';
        return;
    }
    
    suppliers.forEach(supplier => {
        const supplierCard = document.createElement('div');
        supplierCard.className = 'supplier-card';
        supplierCard.innerHTML = `
            <h3>${supplier.name}</h3>
            <p class="supplier-contact">Contact: ${supplier.contact}</p>
            <p class="supplier-info"><i class="fas fa-phone"></i> ${supplier.phone}</p>
            <p class="supplier-info"><i class="fas fa-envelope"></i> ${supplier.email}</p>
            <p class="supplier-info"><i class="fas fa-map-marker-alt"></i> ${supplier.address}</p>
            <div class="supplier-actions">
                <button class="edit-supplier" data-id="${supplier.id}"><i class="fas fa-edit"></i> Edit</button>
                <button class="delete-supplier" data-id="${supplier.id}"><i class="fas fa-trash"></i> Delete</button>
            </div>
        `;
        
        supplierContainer.appendChild(supplierCard);
    });
    
    // Add event listeners
    document.querySelectorAll('.edit-supplier').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const supplierId = parseInt(e.target.getAttribute('data-id'));
            openEditSupplierModal(supplierId);
        });
    });
    
    document.querySelectorAll('.delete-supplier').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const supplierId = parseInt(e.target.getAttribute('data-id'));
            deleteSupplier(supplierId);
        });
    });
}

// Render sales
function renderSales(filteredSales = null) {
    const salesToRender = filteredSales || sales;
    
    salesTableBody.innerHTML = '';
    
    if (salesToRender.length === 0) {
        salesTableBody.innerHTML = '<tr><td colspan="7" class="no-sales">No sales found. Create a new sale to get started.</td></tr>';
        return;
    }
    
    salesToRender.forEach(sale => {
        const saleRow = document.createElement('tr');
        
        // Calculate total products
        const productCount = sale.products.reduce((total, item) => total + item.quantity, 0);
        
        saleRow.innerHTML = `
            <td>${sale.id}</td>
            <td>${sale.date}</td>
            <td>${sale.customer}</td>
            <td>${productCount} items</td>
            <td>$${sale.total.toFixed(2)}</td>
            <td><span class="sale-status status-${sale.status}">${sale.status}</span></td>
            <td class="sale-actions">
                <button class="view-sale" data-id="${sale.id}"><i class="fas fa-eye"></i></button>
                <button class="cancel-sale" data-id="${sale.id}"><i class="fas fa-times"></i></button>
            </td>
        `;
        
        salesTableBody.appendChild(saleRow);
    });
    
    // Add event listeners
    document.querySelectorAll('.view-sale').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const saleId = parseInt(e.target.getAttribute('data-id'));
            viewSale(saleId);
        });
    });
    
    document.querySelectorAll('.cancel-sale').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const saleId = parseInt(e.target.getAttribute('data-id'));
            cancelSale(saleId);
        });
    });
}

// Open add product modal
function openAddProductModal() {
    document.getElementById('product-modal-title').textContent = 'Add New Product';
    document.getElementById('product-id').value = '';
    productForm.reset();
    
    // Populate supplier dropdown
    const supplierSelect = document.getElementById('product-supplier');
    supplierSelect.innerHTML = '<option value="">Select Supplier</option>';
    suppliers.forEach(supplier => {
        const option = document.createElement('option');
        option.value = supplier.id;
        option.textContent = supplier.name;
        supplierSelect.appendChild(option);
    });
    
    productModal.style.display = 'block';
}

// Open edit product modal
function openEditProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    document.getElementById('product-modal-title').textContent = 'Edit Product';
    document.getElementById('product-id').value = product.id;
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-category').value = product.category;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-stock').value = product.stock;
    document.getElementById('product-description').value = product.description || '';
    
    // Populate supplier dropdown
    const supplierSelect = document.getElementById('product-supplier');
    supplierSelect.innerHTML = '<option value="">Select Supplier</option>';
    suppliers.forEach(supplier => {
        const option = document.createElement('option');
        option.value = supplier.id;
        option.textContent = supplier.name;
        option.selected = supplier.id === product.supplierId;
        supplierSelect.appendChild(option);
    });
    
    productModal.style.display = 'block';
}

// Handle product form submission
productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const id = document.getElementById('product-id').value;
    const name = document.getElementById('product-name').value;
    const category = document.getElementById('product-category').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const stock = parseInt(document.getElementById('product-stock').value);
    const supplierId = parseInt(document.getElementById('product-supplier').value);
    const description = document.getElementById('product-description').value;
    
    if (id) {
        // Update existing product
        const index = products.findIndex(p => p.id === parseInt(id));
        if (index !== -1) {
            products[index] = {
                ...products[index],
                name,
                category,
                price,
                stock,
                supplierId,
                description
            };
        }
    } else {
        // Add new product
        const newProduct = {
            id: generateId(),
            name,
            category,
            price,
            stock,
            supplierId,
            description
        };
        products.push(newProduct);
    }
    
    saveProducts();
    renderProducts();
    closeModal(productModal);
});

// Delete product
function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        products = products.filter(p => p.id !== productId);
        saveProducts();
        renderProducts();
    }
}

// Open add supplier modal
function openAddSupplierModal() {
    document.getElementById('supplier-modal-title').textContent = 'Add New Supplier';
    document.getElementById('supplier-id').value = '';
    supplierForm.reset();
    supplierModal.style.display = 'block';
}

// Open edit supplier modal
function openEditSupplierModal(supplierId) {
    const supplier = suppliers.find(s => s.id === supplierId);
    if (!supplier) return;
    
    document.getElementById('supplier-modal-title').textContent = 'Edit Supplier';
    document.getElementById('supplier-id').value = supplier.id;
    document.getElementById('supplier-name').value = supplier.name;
    document.getElementById('supplier-contact').value = supplier.contact;
    document.getElementById('supplier-phone').value = supplier.phone;
    document.getElementById('supplier-email').value = supplier.email;
    document.getElementById('supplier-address').value = supplier.address;
    
    supplierModal.style.display = 'block';
}

// Handle supplier form submission
supplierForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const id = document.getElementById('supplier-id').value;
    const name = document.getElementById('supplier-name').value;
    const contact = document.getElementById('supplier-contact').value;
    const phone = document.getElementById('supplier-phone').value;
    const email = document.getElementById('supplier-email').value;
    const address = document.getElementById('supplier-address').value;
    
    if (id) {
        // Update existing supplier
        const index = suppliers.findIndex(s => s.id === parseInt(id));
        if (index !== -1) {
            suppliers[index] = {
                ...suppliers[index],
                name,
                contact,
                phone,
                email,
                address
            };
        }
    } else {
        // Add new supplier
        const newSupplier = {
            id: generateId(),
            name,
            contact,
            phone,
            email,
            address
        };
        suppliers.push(newSupplier);
    }
    
    saveSuppliers();
    renderSuppliers();
    closeModal(supplierModal);
});

// Delete supplier
function deleteSupplier(supplierId) {
    // Check if supplier has products
    const supplierProducts = products.filter(p => p.supplierId === supplierId);
    
    if (supplierProducts.length > 0) {
        alert('This supplier has associated products. Please update or delete those products first.');
        return;
    }
    
    if (confirm('Are you sure you want to delete this supplier?')) {
        suppliers = suppliers.filter(s => s.id !== supplierId);
        saveSuppliers();
        renderSuppliers();
    }
}

// Open new sale modal
function openNewSaleModal() {
    saleForm.reset();
    document.getElementById('sale-date').value = new Date().toISOString().split('T')[0];
    saleProductList.innerHTML = '';
    updateSaleTotals();
    
    // Populate product dropdown
    saleProductSelect.innerHTML = '<option value="">Select Product</option>';
    products.forEach(product => {
        if (product.stock > 0) {
            const option = document.createElement('option');
            option.value = product.id;
            option.textContent = `${product.name} ($${product.price.toFixed(2)}, Stock: ${product.stock})`;
            saleProductSelect.appendChild(option);
        }
    });
    
    saleModal.style.display = 'block';
}

// Add product to sale
addToSaleBtn.addEventListener('click', () => {
    const productId = parseInt(saleProductSelect.value);
    const quantity = parseInt(saleProductQuantity.value);
    
    if (!productId || isNaN(quantity) || quantity <= 0) {
        alert('Please select a product and enter a valid quantity');
        return;
    }
    
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    if (quantity > product.stock) {
        alert(`Not enough stock. Only ${product.stock} available.`);
        return;
    }
    
    // Check if product already in sale
    const existingItem = Array.from(saleProductList.children).find(item => 
        parseInt(item.getAttribute('data-id')) === productId
    );
    
    if (existingItem) {
        const existingQuantity = parseInt(existingItem.querySelector('.sale-product-quantity').textContent);
        const newQuantity = existingQuantity + quantity;
        
        if (newQuantity > product.stock) {
            alert(`Adding this quantity would exceed available stock. Only ${product.stock - existingQuantity} more available.`);
            return;
        }
        
        existingItem.querySelector('.sale-product-quantity').textContent = newQuantity;
    } else {
        const saleProductItem = document.createElement('div');
        saleProductItem.className = 'sale-product-item';
        saleProductItem.setAttribute('data-id', productId);
        saleProductItem.innerHTML = `
            <div class="sale-product-info">
                <p>${product.name}</p>
                <p>$${product.price.toFixed(2)} each</p>
            </div>
            <div class="sale-product-quantity">${quantity}</div>
            <button class="remove-product">&times;</button>
        `;
        
        saleProductList.appendChild(saleProductItem);
        
        // Add event listener to remove button
        saleProductItem.querySelector('.remove-product').addEventListener('click', () => {
            saleProductItem.remove();
            updateSaleTotals();
        });
    }
    
    updateSaleTotals();
    saleProductQuantity.value = 1;
});

// Update sale totals
function updateSaleTotals() {
    let subtotal = 0;
    
    Array.from(saleProductList.children).forEach(item => {
        const productId = parseInt(item.getAttribute('data-id'));
        const quantity = parseInt(item.querySelector('.sale-product-quantity').textContent);
        const product = products.find(p => p.id === productId);
        
        if (product) {
            subtotal += product.price * quantity;
        }
    });
    
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;
    
    saleSubtotal.textContent = subtotal.toFixed(2);
    saleTax.textContent = tax.toFixed(2);
    saleTotal.textContent = total.toFixed(2);
}

// Handle sale form submission
saleForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const customer = document.getElementById('sale-customer').value;
    const date = document.getElementById('sale-date').value;
    const saleProducts = Array.from(saleProductList.children);
    
    if (!customer || saleProducts.length === 0) {
        alert('Please enter customer name and add at least one product');
        return;
    }
    
    // Calculate totals
    let subtotal = 0;
    const productsInSale = [];
    
    saleProducts.forEach(item => {
        const productId = parseInt(item.getAttribute('data-id'));
        const quantity = parseInt(item.querySelector('.sale-product-quantity').textContent);
        const product = products.find(p => p.id === productId);
        
        if (product) {
            subtotal += product.price * quantity;
            productsInSale.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity
            });
            
            // Update product stock
            const productIndex = products.findIndex(p => p.id === productId);
            if (productIndex !== -1) {
                products[productIndex].stock -= quantity;
            }
        }
    });
    
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;
    
    // Create new sale
    const newSale = {
        id: generateId(),
        customer,
        date,
        products: productsInSale,
        subtotal,
        tax,
        total,
        status: 'completed'
    };
    
    sales.push(newSale);
    saveSales();
    saveProducts();
    renderSales();
    closeModal(saleModal);
});

// View sale details
function viewSale(saleId) {
    const sale = sales.find(s => s.id === saleId);
    if (!sale) return;
    
    alert(`Sale #${sale.id}\nDate: ${sale.date}\nCustomer: ${sale.customer}\nStatus: ${sale.status}\n\nProducts:\n${
        sale.products.map(p => `${p.quantity}x ${p.name} @ $${p.price.toFixed(2)}`).join('\n')
    }\n\nSubtotal: $${sale.subtotal.toFixed(2)}\nTax: $${sale.tax.toFixed(2)}\nTotal: $${sale.total.toFixed(2)}`);
}

// Cancel sale
function cancelSale(saleId) {
    const sale = sales.find(s => s.id === saleId);
    if (!sale) return;
    
    if (sale.status === 'cancelled') {
        alert('This sale is already cancelled');
        return;
    }
    
    if (confirm('Are you sure you want to cancel this sale?')) {
        // Restore product stock
        sale.products.forEach(saleProduct => {
            const product = products.find(p => p.id === saleProduct.id);
            if (product) {
                product.stock += saleProduct.quantity;
            }
        });
        
        // Update sale status
        sale.status = 'cancelled';
        
        saveSales();
        saveProducts();
        renderSales();
    }
}

// Generate report
generateReportBtn.addEventListener('click', () => {
    const type = reportType.value;
    const startDate = reportStartDate.value;
    const endDate = reportEndDate.value;
    
    if (!startDate || !endDate) {
        alert('Please select start and end dates');
        return;
    }
    
    if (new Date(startDate) > new Date(endDate)) {
        alert('Start date must be before end date');
        return;
    }
    
    let filteredSales = sales.filter(sale => {
        const saleDate = new Date(sale.date);
        return saleDate >= new Date(startDate) && saleDate <= new Date(endDate);
    });
    
    if (filteredSales.length === 0) {
        reportResults.innerHTML = '<p>No sales found for the selected period.</p>';
        return;
    }
    
    let reportContent = '';
    let chartData = {};
    
    switch (type) {
        case 'daily':
            reportContent = generateDailyReport(filteredSales);
            chartData = prepareDailyChartData(filteredSales);
            break;
        case 'weekly':
            reportContent = generateWeeklyReport(filteredSales);
            chartData = prepareWeeklyChartData(filteredSales);
            break;
        case 'monthly':
            reportContent = generateMonthlyReport(filteredSales);
            chartData = prepareMonthlyChartData(filteredSales);
            break;
        case 'product':
            reportContent = generateProductReport(filteredSales);
            chartData = prepareProductChartData(filteredSales);
            break;
    }
    
    reportResults.innerHTML = reportContent;
    renderChart(chartData);
});

// Generate daily report
function generateDailyReport(sales) {
    // Group sales by date
    const salesByDate = {};
    
    sales.forEach(sale => {
        if (!salesByDate[sale.date]) {
            salesByDate[sale.date] = {
                date: sale.date,
                count: 0,
                total: 0
            };
        }
        
        salesByDate[sale.date].count++;
        salesByDate[sale.date].total += sale.total;
    });
    
    // Sort by date
    const sortedDates = Object.keys(salesByDate).sort();
    
    let html = '<h3>Daily Sales Report</h3>';
    html += '<table class="report-table"><thead><tr><th>Date</th><th>Sales Count</th><th>Total Revenue</th></tr></thead><tbody>';
    
    sortedDates.forEach(date => {
        const dayData = salesByDate[date];
        html += `
            <tr>
                <td>${dayData.date}</td>
                <td>${dayData.count}</td>
                <td>$${dayData.total.toFixed(2)}</td>
            </tr>
        `;
    });
    
    // Calculate totals
    const totalCount = sales.length;
    const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
    
    html += `
        <tr class="report-total">
            <td>Total</td>
            <td>${totalCount}</td>
            <td>$${totalRevenue.toFixed(2)}</td>
        </tr>
    `;
    
    html += '</tbody></table>';
    return html;
}

// Generate weekly report
function generateWeeklyReport(sales) {
    // Group sales by week
    const salesByWeek = {};
    
    sales.forEach(sale => {
        const date = new Date(sale.date);
        const weekStart = getWeekStartDate(date).toISOString().split('T')[0];
        
        if (!salesByWeek[weekStart]) {
            salesByWeek[weekStart] = {
                weekStart,
                count: 0,
                total: 0
            };
        }
        
        salesByWeek[weekStart].count++;
        salesByWeek[weekStart].total += sale.total;
    });
    
    // Sort by week
    const sortedWeeks = Object.keys(salesByWeek).sort();
    
    let html = '<h3>Weekly Sales Report</h3>';
    html += '<table class="report-table"><thead><tr><th>Week Starting</th><th>Sales Count</th><th>Total Revenue</th></tr></thead><tbody>';
    
    sortedWeeks.forEach(weekStart => {
        const weekData = salesByWeek[weekStart];
        html += `
            <tr>
                <td>${weekData.weekStart}</td>
                <td>${weekData.count}</td>
                <td>$${weekData.total.toFixed(2)}</td>
            </tr>
        `;
    });
    
    // Calculate totals
    const totalCount = sales.length;
    const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
    
    html += `
        <tr class="report-total">
            <td>Total</td>
            <td>${totalCount}</td>
            <td>$${totalRevenue.toFixed(2)}</td>
        </tr>
    `;
    
    html += '</tbody></table>';
    return html;
}

// Generate monthly report
function generateMonthlyReport(sales) {
    // Group sales by month
    const salesByMonth = {};
    
    sales.forEach(sale => {
        const date = new Date(sale.date);
        const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        
        if (!salesByMonth[monthYear]) {
            salesByMonth[monthYear] = {
                monthYear,
                count: 0,
                total: 0
            };
        }
        
        salesByMonth[monthYear].count++;
        salesByMonth[monthYear].total += sale.total;
    });
    
    // Sort by month
    const sortedMonths = Object.keys(salesByMonth).sort();
    
    let html = '<h3>Monthly Sales Report</h3>';
    html += '<table class="report-table"><thead><tr><th>Month</th><th>Sales Count</th><th>Total Revenue</th></tr></thead><tbody>';
    
    sortedMonths.forEach(monthYear => {
        const monthData = salesByMonth[monthYear];
        const [year, month] = monthYear.split('-');
        const monthName = new Date(year, month - 1).toLocaleString('default', { month: 'long' });
        
        html += `
            <tr>
                <td>${monthName} ${year}</td>
                <td>${monthData.count}</td>
                <td>$${monthData.total.toFixed(2)}</td>
            </tr>
        `;
    });
    
    // Calculate totals
    const totalCount = sales.length;
    const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
    
    html += `
        <tr class="report-total">
            <td>Total</td>
            <td>${totalCount}</td>
            <td>$${totalRevenue.toFixed(2)}</td>
        </tr>
    `;
    
    html += '</tbody></table>';
    return html;
}

// Generate product report
function generateProductReport(sales) {
    // Get all products sold
    const productSales = {};
    
    sales.forEach(sale => {
        sale.products.forEach(product => {
            if (!productSales[product.id]) {
                productSales[product.id] = {
                    id: product.id,
                    name: product.name,
                    quantity: 0,
                    revenue: 0
                };
            }
            
            productSales[product.id].quantity += product.quantity;
            productSales[product.id].revenue += product.price * product.quantity;
        });
    });
    
    // Convert to array and sort by revenue
    const productArray = Object.values(productSales).sort((a, b) => b.revenue - a.revenue);
    
    let html = '<h3>Product Performance Report</h3>';
    html += '<table class="report-table"><thead><tr><th>Product</th><th>Quantity Sold</th><th>Revenue</th></tr></thead><tbody>';
    
    productArray.forEach(product => {
        html += `
            <tr>
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>$${product.revenue.toFixed(2)}</td>
            </tr>
        `;
    });
    
    // Calculate totals
    const totalQuantity = productArray.reduce((sum, product) => sum + product.quantity, 0);
    const totalRevenue = productArray.reduce((sum, product) => sum + product.revenue, 0);
    
    html += `
        <tr class="report-total">
            <td>Total</td>
            <td>${totalQuantity}</td>
            <td>$${totalRevenue.toFixed(2)}</td>
        </tr>
    `;
    
    html += '</tbody></table>';
    return html;
}

// Prepare daily chart data
function prepareDailyChartData(sales) {
    // Group sales by date
    const salesByDate = {};
    
    sales.forEach(sale => {
        if (!salesByDate[sale.date]) {
            salesByDate[sale.date] = 0;
        }
        
        salesByDate[sale.date] += sale.total;
    });
    
    // Sort by date
    const sortedDates = Object.keys(salesByDate).sort();
    
    return {
        type: 'line',
        labels: sortedDates,
        data: sortedDates.map(date => salesByDate[date]),
        label: 'Daily Revenue',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        borderColor: 'rgba(76, 175, 80, 1)'
    };
}

// Prepare weekly chart data
function prepareWeeklyChartData(sales) {
    // Group sales by week
    const salesByWeek = {};
    
    sales.forEach(sale => {
        const date = new Date(sale.date);
        const weekStart = getWeekStartDate(date).toISOString().split('T')[0];
        
        if (!salesByWeek[weekStart]) {
            salesByWeek[weekStart] = 0;
        }
        
        salesByWeek[weekStart] += sale.total;
    });
    
    // Sort by week
    const sortedWeeks = Object.keys(salesByWeek).sort();
    
    return {
        type: 'bar',
        labels: sortedWeeks,
        data: sortedWeeks.map(week => salesByWeek[week]),
        label: 'Weekly Revenue',
        backgroundColor: 'rgba(56, 142, 60, 0.2)',
        borderColor: 'rgba(56, 142, 60, 1)'
    };
}

// Prepare monthly chart data
function prepareMonthlyChartData(sales) {
    // Group sales by month
    const salesByMonth = {};
    
    sales.forEach(sale => {
        const date = new Date(sale.date);
        const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        
        if (!salesByMonth[monthYear]) {
            salesByMonth[monthYear] = 0;
        }
        
        salesByMonth[monthYear] += sale.total;
    });
    
    // Sort by month and format labels
    const sortedMonths = Object.keys(salesByMonth).sort();
    const monthLabels = sortedMonths.map(monthYear => {
        const [year, month] = monthYear.split('-');
        return new Date(year, month - 1).toLocaleString('default', { month: 'short' }) + ' ' + year;
    });
    
    return {
        type: 'bar',
        labels: monthLabels,
        data: sortedMonths.map(month => salesByMonth[month]),
        label: 'Monthly Revenue',
        backgroundColor: 'rgba(139, 195, 74, 0.2)',
        borderColor: 'rgba(139, 195, 74, 1)'
    };
}

// Prepare product chart data
function prepareProductChartData(sales) {
    // Get all products sold
    const productSales = {};
    
    sales.forEach(sale => {
        sale.products.forEach(product => {
            if (!productSales[product.id]) {
                productSales[product.id] = {
                    name: product.name,
                    revenue: 0
                };
            }
            
            productSales[product.id].revenue += product.price * product.quantity;
        });
    });
    
    // Convert to array and sort by revenue
    const productArray = Object.values(productSales).sort((a, b) => b.revenue - a.revenue);
    
    // Take top 10 products
    const topProducts = productArray.slice(0, 10);
    
    return {
        type: 'doughnut',
        labels: topProducts.map(product => product.name),
        data: topProducts.map(product => product.revenue),
        label: 'Product Revenue',
        backgroundColor: [
            'rgba(76, 175, 80, 0.7)',
            'rgba(56, 142, 60, 0.7)',
            'rgba(139, 195, 74, 0.7)',
            'rgba(67, 160, 71, 0.7)',
            'rgba(46, 125, 50, 0.7)',
            'rgba(200, 230, 201, 0.7)',
            'rgba(165, 214, 167, 0.7)',
            'rgba(129, 199, 132, 0.7)',
            'rgba(102, 187, 106, 0.7)',
            'rgba(27, 94, 32, 0.7)'
        ]
    };
}

// Render chart
function renderChart(chartData) {
    const ctx = document.getElementById('report-chart').getContext('2d');
    
    // Destroy existing chart if it exists
    if (window.salesChart) {
        window.salesChart.destroy();
    }
    
    if (chartData.type === 'doughnut') {
        window.salesChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: chartData.labels,
                datasets: [{
                    data: chartData.data,
                    backgroundColor: chartData.backgroundColor,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
    } else {
        window.salesChart = new Chart(ctx, {
            type: chartData.type,
            data: {
                labels: chartData.labels,
                datasets: [{
                    label: chartData.label,
                    data: chartData.data,
                    backgroundColor: chartData.backgroundColor,
                    borderColor: chartData.borderColor,
                    borderWidth: 1,
                    fill: chartData.type === 'line'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

// Get week start date (Monday)
function getWeekStartDate(date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
    return new Date(date.setDate(diff));
}

// Export report to CSV
exportReportBtn.addEventListener('click', () => {
    const reportTypeValue = reportType.value;
    const startDate = reportStartDate.value;
    const endDate = reportEndDate.value;
    
    if (!startDate || !endDate) {
        alert('Please select start and end dates');
        return;
    }
    
    let csvContent = '';
    let filename = '';
    
    switch (reportTypeValue) {
        case 'daily':
            csvContent = generateDailyCSV(sales, startDate, endDate);
            filename = `daily_sales_${startDate}_to_${endDate}.csv`;
            break;
        case 'weekly':
            csvContent = generateWeeklyCSV(sales, startDate, endDate);
            filename = `weekly_sales_${startDate}_to_${endDate}.csv`;
            break;
        case 'monthly':
            csvContent = generateMonthlyCSV(sales, startDate, endDate);
            filename = `monthly_sales_${startDate}_to_${endDate}.csv`;
            break;
        case 'product':
            csvContent = generateProductCSV(sales, startDate, endDate);
            filename = `product_sales_${startDate}_to_${endDate}.csv`;
            break;
    }
    
    downloadCSV(csvContent, filename);
});

// Generate daily CSV
function generateDailyCSV(sales, startDate, endDate) {
    const filteredSales = sales.filter(sale => {
        const saleDate = new Date(sale.date);
        return saleDate >= new Date(startDate) && saleDate <= new Date(endDate);
    });
    
    // Group sales by date
    const salesByDate = {};
    
    filteredSales.forEach(sale => {
        if (!salesByDate[sale.date]) {
            salesByDate[sale.date] = {
                date: sale.date,
                count: 0,
                total: 0
            };
        }
        
        salesByDate[sale.date].count++;
        salesByDate[sale.date].total += sale.total;
    });
    
    // Sort by date
    const sortedDates = Object.keys(salesByDate).sort();
    
    let csv = 'Date,Sales Count,Total Revenue\n';
    
    sortedDates.forEach(date => {
        const dayData = salesByDate[date];
        csv += `${dayData.date},${dayData.count},${dayData.total.toFixed(2)}\n`;
    });
    
    // Add totals
    const totalCount = filteredSales.length;
    const totalRevenue = filteredSales.reduce((sum, sale) => sum + sale.total, 0);
    csv += `Total,${totalCount},${totalRevenue.toFixed(2)}\n`;
    
    return csv;
}

// Generate weekly CSV
function generateWeeklyCSV(sales, startDate, endDate) {
    const filteredSales = sales.filter(sale => {
        const saleDate = new Date(sale.date);
        return saleDate >= new Date(startDate) && saleDate <= new Date(endDate);
    });
    
    // Group sales by week
    const salesByWeek = {};
    
    filteredSales.forEach(sale => {
        const date = new Date(sale.date);
        const weekStart = getWeekStartDate(date).toISOString().split('T')[0];
        
        if (!salesByWeek[weekStart]) {
            salesByWeek[weekStart] = {
                weekStart,
                count: 0,
                total: 0
            };
        }
        
        salesByWeek[weekStart].count++;
        salesByWeek[weekStart].total += sale.total;
    });
    
    // Sort by week
    const sortedWeeks = Object.keys(salesByWeek).sort();
    
    let csv = 'Week Starting,Sales Count,Total Revenue\n';
    
    sortedWeeks.forEach(weekStart => {
        const weekData = salesByWeek[weekStart];
        csv += `${weekData.weekStart},${weekData.count},${weekData.total.toFixed(2)}\n`;
    });
    
    // Add totals
    const totalCount = filteredSales.length;
    const totalRevenue = filteredSales.reduce((sum, sale) => sum + sale.total, 0);
    csv += `Total,${totalCount},${totalRevenue.toFixed(2)}\n`;
    
    return csv;
}

// Generate monthly CSV
function generateMonthlyCSV(sales, startDate, endDate) {
    const filteredSales = sales.filter(sale => {
        const saleDate = new Date(sale.date);
        return saleDate >= new Date(startDate) && saleDate <= new Date(endDate);
    });
    
    // Group sales by month
    const salesByMonth = {};
    
    filteredSales.forEach(sale => {
        const date = new Date(sale.date);
        const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        
        if (!salesByMonth[monthYear]) {
            salesByMonth[monthYear] = {
                monthYear,
                count: 0,
                total: 0
            };
        }
        
        salesByMonth[monthYear].count++;
        salesByMonth[monthYear].total += sale.total;
    });
    
    // Sort by month
    const sortedMonths = Object.keys(salesByMonth).sort();
    
    let csv = 'Month,Sales Count,Total Revenue\n';
    
    sortedMonths.forEach(monthYear => {
        const monthData = salesByMonth[monthYear];
        const [year, month] = monthYear.split('-');
        const monthName = new Date(year, month - 1).toLocaleString('default', { month: 'long' });
        
        csv += `${monthName} ${year},${monthData.count},${monthData.total.toFixed(2)}\n`;
    });
    
    // Add totals
    const totalCount = filteredSales.length;
    const totalRevenue = filteredSales.reduce((sum, sale) => sum + sale.total, 0);
    csv += `Total,${totalCount},${totalRevenue.toFixed(2)}\n`;
    
    return csv;
}

// Generate product CSV
function generateProductCSV(sales, startDate, endDate) {
    const filteredSales = sales.filter(sale => {
        const saleDate = new Date(sale.date);
        return saleDate >= new Date(startDate) && saleDate <= new Date(endDate);
    });
    
    // Get all products sold
    const productSales = {};
    
    filteredSales.forEach(sale => {
        sale.products.forEach(product => {
            if (!productSales[product.id]) {
                productSales[product.id] = {
                    id: product.id,
                    name: product.name,
                    quantity: 0,
                    revenue: 0
                };
            }
            
            productSales[product.id].quantity += product.quantity;
            productSales[product.id].revenue += product.price * product.quantity;
        });
    });
    
    // Convert to array and sort by revenue
    const productArray = Object.values(productSales).sort((a, b) => b.revenue - a.revenue);
    
    let csv = 'Product,Quantity Sold,Revenue\n';
    
    productArray.forEach(product => {
        csv += `${product.name},${product.quantity},${product.revenue.toFixed(2)}\n`;
    });
    
    // Add totals
    const totalQuantity = productArray.reduce((sum, product) => sum + product.quantity, 0);
    const totalRevenue = productArray.reduce((sum, product) => sum + product.revenue, 0);
    csv += `Total,${totalQuantity},${totalRevenue.toFixed(2)}\n`;
    
    return csv;
}

// Download CSV file
function downloadCSV(csvContent, filename) {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        if (existingItem.quantity >= product.stock) {
            alert(`Cannot add more. Only ${product.stock} available in stock.`);
            return;
        }
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartCount();
    alert(`${product.name} added to cart`);
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Close modal
function closeModal(modal) {
    modal.style.display = 'none';
}

// Event listeners
addProductBtn.addEventListener('click', openAddProductModal);
addSupplierBtn.addEventListener('click', openAddSupplierModal);
newSaleBtn.addEventListener('click', openNewSaleModal);

closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.modal');
        closeModal(modal);
    });
});

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target);
    }
});

// Search and filter products
productSearch.addEventListener('input', () => {
    const searchTerm = productSearch.value.toLowerCase();
    const category = categoryFilter.value;
    
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                             (product.description && product.description.toLowerCase().includes(searchTerm));
        const matchesCategory = category === 'all' || product.category === category;
        
        return matchesSearch && matchesCategory;
    });
    
    renderProducts(filteredProducts);
});

categoryFilter.addEventListener('change', () => {
    productSearch.dispatchEvent(new Event('input'));
});

// Search and filter sales
saleSearch.addEventListener('input', () => {
    const searchTerm = saleSearch.value.toLowerCase();
    const dateFilter = saleDateFilter.value;
    
    const filteredSales = sales.filter(sale => {
        const matchesSearch = sale.customer.toLowerCase().includes(searchTerm) || 
                             String(sale.id).includes(searchTerm);
        const matchesDate = !dateFilter || sale.date === dateFilter;
        
        return matchesSearch && matchesDate;
    });
    
    renderSales(filteredSales);
});

saleDateFilter.addEventListener('change', () => {
    saleSearch.dispatchEvent(new Event('input'));
});

// Initialize the app
document.addEventListener('DOMContentLoaded', init);

 




     