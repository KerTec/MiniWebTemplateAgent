import { ProjectConfig } from '@shared/schema';

export function generateBusinessComponentTemplates(config: ProjectConfig): string {
  let html = '';
  
  if (config.businessComponents.vatCalculator) {
    html += `
            <section class="vat-calculator-section">
                <div class="card">
                    <h3><i class="fas fa-calculator"></i> Calculateur TVA</h3>
                    <form class="vat-form">
                        <div class="form-group">
                            <label class="form-label" for="vat-amount">Montant</label>
                            <input type="number" id="vat-amount" class="form-input" placeholder="Montant" step="0.01">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="vat-rate">Taux TVA (%)</label>
                            <select id="vat-rate" class="form-input">
                                <option value="20">Standard (20%)</option>
                                <option value="10">Réduit (10%)</option>
                                <option value="5.5">Super réduit (5.5%)</option>
                                <option value="0">Exempt (0%)</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Type de calcul</label>
                            <div class="radio-group">
                                <label class="radio-label">
                                    <input type="radio" name="vat-type" value="ht-to-ttc" checked>
                                    HT → TTC
                                </label>
                                <label class="radio-label">
                                    <input type="radio" name="vat-type" value="ttc-to-ht">
                                    TTC → HT
                                </label>
                            </div>
                        </div>
                        <button type="button" class="btn btn-primary" onclick="calculateVAT()">Calculer</button>
                    </form>
                    <div id="vat-results" class="vat-results"></div>
                </div>
            </section>`;
  }
  
  if (config.businessComponents.priceSimulator) {
    html += `
            <section class="price-simulator-section">
                <div class="card">
                    <h3><i class="fas fa-tags"></i> Simulateur de prix</h3>
                    <form class="price-form">
                        <div class="form-group">
                            <label class="form-label" for="base-price">Prix de base</label>
                            <input type="number" id="base-price" class="form-input" placeholder="Prix de base" step="0.01">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="quantity">Quantité</label>
                            <input type="number" id="quantity" class="form-input" placeholder="Quantité" min="1" value="1">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="discount">Remise (%)</label>
                            <input type="number" id="discount" class="form-input" placeholder="Remise" min="0" max="100" step="0.1">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="shipping">Frais de port</label>
                            <input type="number" id="shipping" class="form-input" placeholder="Frais de port" step="0.01">
                        </div>
                        <button type="button" class="btn btn-primary" onclick="simulatePrice()">Simuler</button>
                    </form>
                    <div id="price-results" class="price-results"></div>
                </div>
            </section>`;
  }
  
  if (config.businessComponents.filterableTable) {
    html += `
            <section class="table-section">
                <div class="card">
                    <h3><i class="fas fa-table"></i> Table filtrable</h3>
                    <div class="table-controls">
                        <input type="text" id="table-search" class="search-input" placeholder="Rechercher dans la table...">
                        <button type="button" class="btn btn-secondary" onclick="addTableRow()">Ajouter ligne</button>
                        <button type="button" class="btn btn-primary" onclick="exportTableData()">Exporter</button>
                    </div>
                    <div class="table-container">
                        <table class="table" id="business-table">
                            <thead>
                                <tr>
                                    <th data-sort="name">Nom <i class="fas fa-sort"></i></th>
                                    <th data-sort="date">Date <i class="fas fa-sort"></i></th>
                                    <th data-sort="status">Statut <i class="fas fa-sort"></i></th>
                                    <th data-sort="amount">Montant <i class="fas fa-sort"></i></th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="business-table-body">
                                <!-- Data will be populated by JavaScript -->
                            </tbody>
                        </table>
                    </div>
                    <div class="pagination-controls" id="table-pagination"></div>
                </div>
            </section>`;
  }
  
  if (config.businessComponents.csvExport) {
    html += `
            <section class="export-section">
                <div class="card">
                    <h3><i class="fas fa-download"></i> Export de données</h3>
                    <div class="export-controls">
                        <div class="form-group">
                            <label class="form-label">Type d'export</label>
                            <select id="export-type" class="form-input">
                                <option value="csv">CSV</option>
                                <option value="json">JSON</option>
                                <option value="excel">Excel</option>
                                <option value="pdf">PDF</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Données à exporter</label>
                            <select id="export-data" class="form-input">
                                <option value="table">Données du tableau</option>
                                <option value="forms">Données des formulaires</option>
                                <option value="all">Toutes les données</option>
                            </select>
                        </div>
                        <button type="button" class="btn btn-primary" onclick="performExport()">Exporter</button>
                    </div>
                    <div id="export-status" class="export-status"></div>
                </div>
            </section>`;
  }
  
  return html;
}

export function generateBusinessComponentsCSS(config: ProjectConfig, framework: string): string {
  if (framework !== 'none') return '';
  
  let css = '';
  
  if (config.businessComponents.vatCalculator) {
    css += `

/* VAT Calculator */
.vat-results {
    margin-top: 1rem;
    padding: 1rem;
    background-color: var(--surface-color);
    border-radius: var(--radius);
    border-left: 4px solid var(--primary-color);
}

.vat-result-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--border-color);
}

.vat-result-item:last-child {
    border-bottom: none;
    font-weight: bold;
    font-size: 1.1rem;
}

.vat-result-label {
    color: var(--secondary-color);
}

.vat-result-value {
    color: var(--primary-color);
    font-weight: 500;
}`;
  }
  
  if (config.businessComponents.priceSimulator) {
    css += `

/* Price Simulator */
.price-results {
    margin-top: 1rem;
    padding: 1rem;
    background-color: var(--surface-color);
    border-radius: var(--radius);
    border-left: 4px solid hsl(142, 76%, 36%);
}

.price-breakdown {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.price-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.25rem 0;
}

.price-total {
    border-top: 2px solid var(--border-color);
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    font-weight: bold;
    font-size: 1.2rem;
    color: var(--primary-color);
}`;
  }
  
  if (config.businessComponents.filterableTable) {
    css += `

/* Filterable Table */
.table-controls {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
    align-items: center;
}

.table-container {
    overflow-x: auto;
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
}

.table {
    width: 100%;
    border-collapse: collapse;
    background-color: var(--background-color);
}

.table th {
    background-color: var(--surface-color);
    padding: 1rem;
    text-align: left;
    font-weight: 600;
    border-bottom: 2px solid var(--border-color);
    cursor: pointer;
    user-select: none;
    position: relative;
}

.table th:hover {
    background-color: hsl(60, 4.8%, 92%);
}

.table th[data-sort] i {
    margin-left: 0.5rem;
    opacity: 0.5;
    transition: opacity 0.2s;
}

.table th[data-sort]:hover i {
    opacity: 1;
}

.table td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--border-color);
}

.table tbody tr:hover {
    background-color: var(--surface-color);
}

.status {
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.875rem;
    font-weight: 500;
}

.status-actif {
    background-color: hsl(142, 76%, 36%);
    color: white;
}

.status-en-attente {
    background-color: hsl(48, 96%, 53%);
    color: hsl(20, 14.3%, 4.1%);
}

.status-inactif {
    background-color: var(--destructive);
    color: white;
}

.pagination-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1rem;
}

.pagination-btn {
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--border-color);
    background-color: var(--background-color);
    border-radius: var(--radius);
    cursor: pointer;
    transition: all 0.2s;
}

.pagination-btn:hover:not(:disabled) {
    background-color: var(--surface-color);
}

.pagination-btn.active {
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
}

.pagination-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}`;
  }
  
  if (config.businessComponents.csvExport) {
    css += `

/* Export Components */
.export-controls {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    align-items: end;
}

.export-status {
    margin-top: 1rem;
    padding: 1rem;
    background-color: var(--surface-color);
    border-radius: var(--radius);
    display: none;
}

.export-status.show {
    display: block;
}

.export-status.success {
    border-left: 4px solid hsl(142, 76%, 36%);
}

.export-status.error {
    border-left: 4px solid var(--destructive);
}

.export-progress {
    width: 100%;
    height: 8px;
    background-color: var(--border-color);
    border-radius: 4px;
    overflow: hidden;
    margin-top: 0.5rem;
}

.export-progress-bar {
    height: 100%;
    background-color: var(--primary-color);
    width: 0%;
    transition: width 0.3s ease;
}`;
  }
  
  return css;
}

export function generateBusinessComponentsJS(config: ProjectConfig): string {
  let js = '';
  
  if (Object.values(config.businessComponents).some(Boolean)) {
    js += `
    
    // Business Components Management
    function initBusinessComponents() {`;
    
    if (config.businessComponents.vatCalculator) {
      js += `
        initVATCalculator();`;
    }
    
    if (config.businessComponents.priceSimulator) {
      js += `
        initPriceSimulator();`;
    }
    
    if (config.businessComponents.filterableTable) {
      js += `
        initBusinessTable();`;
    }
    
    if (config.businessComponents.csvExport) {
      js += `
        initExportSystem();`;
    }
    
    js += `
    }`;
    
    // Add specific implementations
    if (config.businessComponents.vatCalculator) {
      js += `
    
    function initVATCalculator() {
        const vatForm = Utils.$('.vat-form');
        if (vatForm) {
            const inputs = vatForm.querySelectorAll('input, select');
            inputs.forEach(input => {
                Utils.on(input, 'input', calculateVAT);
            });
        }
    }
    
    function calculateVAT() {
        const amount = parseFloat(Utils.$('#vat-amount').value) || 0;
        const rate = parseFloat(Utils.$('#vat-rate').value) || 0;
        const type = Utils.$('input[name="vat-type"]:checked').value;
        const resultsDiv = Utils.$('#vat-results');
        
        if (amount <= 0) {
            resultsDiv.innerHTML = '';
            return;
        }
        
        let ht, ttc, vatAmount;
        
        if (type === 'ht-to-ttc') {
            ht = amount;
            vatAmount = ht * (rate / 100);
            ttc = ht + vatAmount;
        } else {
            ttc = amount;
            ht = ttc / (1 + rate / 100);
            vatAmount = ttc - ht;
        }
        
        resultsDiv.innerHTML = \`
            <div class="vat-result-item">
                <span class="vat-result-label">Montant HT:</span>
                <span class="vat-result-value">\${Utils.formatCurrency(ht)}</span>
            </div>
            <div class="vat-result-item">
                <span class="vat-result-label">TVA (\${rate}%):</span>
                <span class="vat-result-value">\${Utils.formatCurrency(vatAmount)}</span>
            </div>
            <div class="vat-result-item">
                <span class="vat-result-label">Montant TTC:</span>
                <span class="vat-result-value">\${Utils.formatCurrency(ttc)}</span>
            </div>
        \`;
    }`;
    }
    
    if (config.businessComponents.priceSimulator) {
      js += `
    
    function initPriceSimulator() {
        const priceForm = Utils.$('.price-form');
        if (priceForm) {
            const inputs = priceForm.querySelectorAll('input');
            inputs.forEach(input => {
                Utils.on(input, 'input', simulatePrice);
            });
        }
    }
    
    function simulatePrice() {
        const basePrice = parseFloat(Utils.$('#base-price').value) || 0;
        const quantity = parseInt(Utils.$('#quantity').value) || 1;
        const discount = parseFloat(Utils.$('#discount').value) || 0;
        const shipping = parseFloat(Utils.$('#shipping').value) || 0;
        const resultsDiv = Utils.$('#price-results');
        
        if (basePrice <= 0) {
            resultsDiv.innerHTML = '';
            return;
        }
        
        const subtotal = basePrice * quantity;
        const discountAmount = subtotal * (discount / 100);
        const discountedPrice = subtotal - discountAmount;
        const total = discountedPrice + shipping;
        
        resultsDiv.innerHTML = \`
            <div class="price-breakdown">
                <div class="price-item">
                    <span>Prix unitaire:</span>
                    <span>\${Utils.formatCurrency(basePrice)}</span>
                </div>
                <div class="price-item">
                    <span>Quantité:</span>
                    <span>\${quantity}</span>
                </div>
                <div class="price-item">
                    <span>Sous-total:</span>
                    <span>\${Utils.formatCurrency(subtotal)}</span>
                </div>
                \${discount > 0 ? \`
                <div class="price-item">
                    <span>Remise (\${discount}%):</span>
                    <span>-\${Utils.formatCurrency(discountAmount)}</span>
                </div>
                \` : ''}
                \${shipping > 0 ? \`
                <div class="price-item">
                    <span>Frais de port:</span>
                    <span>\${Utils.formatCurrency(shipping)}</span>
                </div>
                \` : ''}
                <div class="price-item price-total">
                    <span>Total:</span>
                    <span>\${Utils.formatCurrency(total)}</span>
                </div>
            </div>
        \`;
    }`;
    }
    
    if (config.businessComponents.filterableTable) {
      js += `
    
    let businessTableData = [
        { id: 1, name: 'Jean Dupont', date: '2025-01-15', status: 'Actif', amount: 1250.00 },
        { id: 2, name: 'Marie Martin', date: '2025-01-14', status: 'En attente', amount: 890.50 },
        { id: 3, name: 'Pierre Durand', date: '2025-01-13', status: 'Actif', amount: 2100.75 },
        { id: 4, name: 'Sophie Bernard', date: '2025-01-12', status: 'Inactif', amount: 456.30 },
        { id: 5, name: 'Michel Lefebvre', date: '2025-01-11', status: 'Actif', amount: 1789.25 }
    ];
    let currentPage = 1;
    let itemsPerPage = 5;
    let sortField = '';
    let sortDirection = 'asc';
    
    function initBusinessTable() {
        renderBusinessTable();
        initTableSearch();
        initTableSort();
        initTablePagination();
    }
    
    function renderBusinessTable() {
        const tbody = Utils.$('#business-table-body');
        if (!tbody) return;
        
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageData = getFilteredData().slice(startIndex, endIndex);
        
        tbody.innerHTML = pageData.map(row => \`
            <tr>
                <td>\${row.name}</td>
                <td>\${Utils.formatDate(row.date)}</td>
                <td><span class="status status-\${row.status.toLowerCase().replace(' ', '-')}">\${row.status}</span></td>
                <td>\${Utils.formatCurrency(row.amount)}</td>
                <td>
                    <button class="btn btn-secondary btn-sm" onclick="editTableRow(\${row.id})">Modifier</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteTableRow(\${row.id})">Supprimer</button>
                </td>
            </tr>
        \`).join('');
        
        updatePagination();
    }
    
    function getFilteredData() {
        const searchTerm = Utils.$('#table-search').value.toLowerCase();
        let filtered = businessTableData;
        
        if (searchTerm) {
            filtered = businessTableData.filter(row =>
                Object.values(row).some(value =>
                    value.toString().toLowerCase().includes(searchTerm)
                )
            );
        }
        
        if (sortField) {
            filtered.sort((a, b) => {
                let aVal = a[sortField];
                let bVal = b[sortField];
                
                if (sortField === 'amount') {
                    aVal = parseFloat(aVal);
                    bVal = parseFloat(bVal);
                } else if (sortField === 'date') {
                    aVal = new Date(aVal);
                    bVal = new Date(bVal);
                }
                
                if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
                if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
                return 0;
            });
        }
        
        return filtered;
    }
    
    function initTableSearch() {
        const searchInput = Utils.$('#table-search');
        if (searchInput) {
            Utils.on(searchInput, 'input', () => {
                currentPage = 1;
                renderBusinessTable();
            });
        }
    }
    
    function initTableSort() {
        const headers = Utils.$$('#business-table th[data-sort]');
        headers.forEach(header => {
            Utils.on(header, 'click', function() {
                const field = this.getAttribute('data-sort');
                if (sortField === field) {
                    sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
                } else {
                    sortField = field;
                    sortDirection = 'asc';
                }
                renderBusinessTable();
            });
        });
    }
    
    function initTablePagination() {
        updatePagination();
    }
    
    function updatePagination() {
        const totalItems = getFilteredData().length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const paginationDiv = Utils.$('#table-pagination');
        
        if (!paginationDiv || totalPages <= 1) {
            if (paginationDiv) paginationDiv.innerHTML = '';
            return;
        }
        
        let paginationHTML = \`
            <button class="pagination-btn" onclick="changePage(\${currentPage - 1})" \${currentPage === 1 ? 'disabled' : ''}>
                <i class="fas fa-chevron-left"></i>
            </button>
        \`;
        
        for (let i = 1; i <= totalPages; i++) {
            paginationHTML += \`
                <button class="pagination-btn \${i === currentPage ? 'active' : ''}" onclick="changePage(\${i})">
                    \${i}
                </button>
            \`;
        }
        
        paginationHTML += \`
            <button class="pagination-btn" onclick="changePage(\${currentPage + 1})" \${currentPage === totalPages ? 'disabled' : ''}>
                <i class="fas fa-chevron-right"></i>
            </button>
        \`;
        
        paginationDiv.innerHTML = paginationHTML;
    }
    
    function changePage(page) {
        const totalPages = Math.ceil(getFilteredData().length / itemsPerPage);
        if (page >= 1 && page <= totalPages) {
            currentPage = page;
            renderBusinessTable();
        }
    }
    
    function addTableRow() {
        const newRow = {
            id: Math.max(...businessTableData.map(r => r.id)) + 1,
            name: 'Nouveau contact',
            date: new Date().toISOString().split('T')[0],
            status: 'En attente',
            amount: 0
        };
        businessTableData.push(newRow);
        renderBusinessTable();
        if (typeof showNotification === 'function') {
            showNotification('Nouvelle ligne ajoutée', 'success');
        }
    }
    
    function editTableRow(id) {
        const row = businessTableData.find(r => r.id === id);
        if (row) {
            const newName = prompt('Nom:', row.name);
            const newAmount = prompt('Montant:', row.amount);
            if (newName !== null) row.name = newName;
            if (newAmount !== null) row.amount = parseFloat(newAmount) || 0;
            renderBusinessTable();
            if (typeof showNotification === 'function') {
                showNotification('Ligne modifiée', 'success');
            }
        }
    }
    
    function deleteTableRow(id) {
        if (confirm('Supprimer cette ligne ?')) {
            businessTableData = businessTableData.filter(r => r.id !== id);
            renderBusinessTable();
            if (typeof showNotification === 'function') {
                showNotification('Ligne supprimée', 'warning');
            }
        }
    }
    
    function exportTableData() {
        const data = getFilteredData();
        Utils.exportCSV(data, 'table-data');
        if (typeof showNotification === 'function') {
            showNotification('Données exportées', 'success');
        }
    }`;
    }
    
    if (config.businessComponents.csvExport) {
      js += `
    
    function initExportSystem() {
        // Export system initialized
    }
    
    function performExport() {
        const exportType = Utils.$('#export-type').value;
        const exportData = Utils.$('#export-data').value;
        const statusDiv = Utils.$('#export-status');
        
        // Get data based on selection
        let data = [];
        switch (exportData) {
            case 'table':
                data = businessTableData || [];
                break;
            case 'forms':
                data = AppState.data.formSubmissions || [];
                break;
            case 'all':
                data = {
                    tableData: businessTableData || [],
                    formData: AppState.data.formSubmissions || [],
                    exportDate: new Date().toISOString()
                };
                break;
        }
        
        if (!data || (Array.isArray(data) && data.length === 0)) {
            statusDiv.innerHTML = '<p>Aucune donnée à exporter</p>';
            statusDiv.className = 'export-status show error';
            return;
        }
        
        // Show progress
        statusDiv.innerHTML = \`
            <p>Export en cours...</p>
            <div class="export-progress">
                <div class="export-progress-bar" id="export-progress-bar"></div>
            </div>
        \`;
        statusDiv.className = 'export-status show';
        
        // Simulate progress
        let progress = 0;
        const progressBar = Utils.$('#export-progress-bar');
        const progressInterval = setInterval(() => {
            progress += 20;
            progressBar.style.width = progress + '%';
            
            if (progress >= 100) {
                clearInterval(progressInterval);
                
                // Perform actual export
                const filename = \`export-\${Date.now()}\`;
                
                try {
                    switch (exportType) {
                        case 'csv':
                            if (Array.isArray(data)) {
                                Utils.exportCSV(data, filename);
                            } else {
                                Utils.exportCSV([data], filename);
                            }
                            break;
                        case 'json':
                            Utils.exportJSON(data, filename);
                            break;
                        case 'excel':
                            // Fallback to CSV for Excel
                            if (Array.isArray(data)) {
                                Utils.exportCSV(data, filename);
                            } else {
                                Utils.exportCSV([data], filename);
                            }
                            break;
                        case 'pdf':
                            // Fallback to JSON for PDF
                            Utils.exportJSON(data, filename);
                            break;
                    }
                    
                    statusDiv.innerHTML = '<p>Export terminé avec succès!</p>';
                    statusDiv.className = 'export-status show success';
                    
                    if (typeof showNotification === 'function') {
                        showNotification(\`Export \${exportType.toUpperCase()} terminé\`, 'success');
                    }
                } catch (error) {
                    statusDiv.innerHTML = '<p>Erreur lors de l\'export</p>';
                    statusDiv.className = 'export-status show error';
                    
                    if (typeof showNotification === 'function') {
                        showNotification('Erreur lors de l\'export', 'error');
                    }
                }
                
                // Hide status after 3 seconds
                setTimeout(() => {
                    statusDiv.className = 'export-status';
                }, 3000);
            }
        }, 200);
    }`;
    }
  }
  
  return js;
}