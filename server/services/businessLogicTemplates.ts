import { ProjectConfig } from '@shared/schema';

export function getBusinessLogicTemplates(config: ProjectConfig): string {
  let js = '';
  
  if (config.business.vat) {
    js += getVATCalculatorTemplate();
  }
  
  if (config.business.conversions) {
    js += getConversionsTemplate();
  }
  
  if (config.business.export) {
    js += getExportTemplate();
  }
  
  if (Object.values(config.formComponents).some(Boolean)) {
    js += getFormValidationTemplate();
  }
  
  if (config.businessComponents.filterableTable) {
    js += getFilterableTableTemplate();
  }
  
  if (config.uiComponents.modal) {
    js += getModalTemplate();
  }
  
  return js;
}

function getVATCalculatorTemplate(): string {
  return `
    
    // VAT Calculator
    const VATCalculator = {
        rates: {
            standard: 20,
            reduced: 10,
            super_reduced: 5.5,
            zero: 0
        },
        
        calculateTTC(ht, rate = 20) {
            return ht * (1 + rate / 100);
        },
        
        calculateHT(ttc, rate = 20) {
            return ttc / (1 + rate / 100);
        },
        
        calculateVAT(ht, rate = 20) {
            return ht * (rate / 100);
        },
        
        formatResult(amount) {
            return Utils.formatCurrency(amount);
        }
    };`;
}

function getConversionsTemplate(): string {
  return `
    
    // Unit Conversions
    const Conversions = {
        length: {
            m: 1,
            km: 1000,
            cm: 0.01,
            mm: 0.001,
            ft: 0.3048,
            in: 0.0254
        },
        
        weight: {
            kg: 1,
            g: 0.001,
            lb: 0.453592,
            oz: 0.0283495
        },
        
        temperature: {
            celsiusToFahrenheit(c) {
                return (c * 9/5) + 32;
            },
            
            fahrenheitToCelsius(f) {
                return (f - 32) * 5/9;
            }
        },
        
        convert(value, fromUnit, toUnit, type) {
            if (!this[type]) return null;
            
            const baseValue = value * this[type][fromUnit];
            return baseValue / this[type][toUnit];
        }
    };`;
}

function getExportTemplate(): string {
  return `
    
    // Export functionality (enhanced in Utils)
    const ExportManager = {
        exportTableData(tableId, filename) {
            const table = Utils.$(tableId);
            if (!table) return;
            
            const data = this.extractTableData(table);
            Utils.exportCSV(data, filename || 'table-data');
        },
        
        extractTableData(table) {
            const rows = table.querySelectorAll('tbody tr');
            const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent.trim());
            
            return Array.from(rows).map(row => {
                const cells = row.querySelectorAll('td');
                const rowData = {};
                
                headers.forEach((header, index) => {
                    if (cells[index]) {
                        rowData[header] = cells[index].textContent.trim();
                    }
                });
                
                return rowData;
            });
        },
        
        exportFormData(formId, filename) {
            const form = Utils.$(formId);
            if (!form) return;
            
            const formData = new FormData(form);
            const data = {};
            
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            
            Utils.exportJSON([data], filename || 'form-data');
        }
    };`;
}

function getFormValidationTemplate(): string {
  return `
    
    // Form Validation
    function initFormValidation() {
        const forms = Utils.$$('.validated-form');
        
        forms.forEach(form => {
            Utils.on(form, 'submit', function(e) {
                e.preventDefault();
                
                if (validateForm(this)) {
                    handleFormSubmit(this);
                }
            });
            
            // Real-time validation
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                Utils.on(input, 'blur', () => validateField(input));
                Utils.on(input, 'input', () => clearFieldError(input));
            });
        });
    }
    
    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    function validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        const required = field.hasAttribute('required');
        
        let isValid = true;
        let errorMessage = '';
        
        // Required validation
        if (required && !value) {
            isValid = false;
            errorMessage = 'Ce champ est obligatoire';
        }
        
        // Type-specific validation
        if (value && type === 'email') {
            const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Format d\\'email invalide';
            }
        }
        
        if (value && type === 'tel') {
            const phoneRegex = /^[\\d\\s\\-\\+\\(\\)]+$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Format de téléphone invalide';
            }
        }
        
        showFieldError(field, isValid ? '' : errorMessage);
        return isValid;
    }
    
    function showFieldError(field, message) {
        const errorElement = Utils.$(\`[data-field="\${field.name}"]\`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = message ? 'block' : 'none';
        }
        
        field.classList.toggle('error', !!message);
    }
    
    function clearFieldError(field) {
        showFieldError(field, '');
    }
    
    function handleFormSubmit(form) {
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        console.log('Form submitted:', data);
        
        // Store in app state
        AppState.data.formSubmissions = AppState.data.formSubmissions || [];
        AppState.data.formSubmissions.push({
            ...data,
            timestamp: new Date().toISOString()
        });
        
        // Show success message
        alert('Formulaire envoyé avec succès !');
        form.reset();
    }`;
}

function getFilterableTableTemplate(): string {
  return `
    
    // Filterable Table
    function initFilterableTable() {
        const table = Utils.$('#data-table');
        if (!table) return;
        
        // Sample data for demonstration
        AppState.data.tableData = AppState.data.tableData || [
            { name: 'Jean Dupont', date: '2025-01-15', status: 'Actif', amount: 1250.00 },
            { name: 'Marie Martin', date: '2025-01-14', status: 'En attente', amount: 890.50 },
            { name: 'Pierre Durand', date: '2025-01-13', status: 'Actif', amount: 2100.75 },
            { name: 'Sophie Bernard', date: '2025-01-12', status: 'Inactif', amount: 456.30 }
        ];
        
        renderTable();
        initTableSearch();
        initTableSort();
        initTableExport();
    }
    
    function renderTable() {
        const tbody = Utils.$('#table-body');
        if (!tbody) return;
        
        tbody.innerHTML = AppState.data.tableData.map((row, index) => \`
            <tr>
                <td>\${row.name}</td>
                <td>\${Utils.formatDate(row.date)}</td>
                <td><span class="status status-\${row.status.toLowerCase().replace(' ', '-')}">\${row.status}</span></td>
                <td>\${Utils.formatCurrency(row.amount)}</td>
                <td>
                    <button class="btn-small btn-primary" onclick="editRow(\${index})">Modifier</button>
                    <button class="btn-small btn-secondary" onclick="deleteRow(\${index})">Supprimer</button>
                </td>
            </tr>
        \`).join('');
    }
    
    function initTableSearch() {
        const searchInput = Utils.$('#table-search');
        if (!searchInput) return;
        
        Utils.on(searchInput, 'input', function() {
            const query = this.value.toLowerCase();
            const rows = Utils.$$('#table-body tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(query) ? '' : 'none';
            });
        });
    }
    
    function initTableSort() {
        const headers = Utils.$$('[data-sort]');
        
        headers.forEach(header => {
            Utils.on(header, 'click', function() {
                const field = this.getAttribute('data-sort');
                sortTable(field);
            });
        });
    }
    
    function sortTable(field) {
        const isCurrentlyAsc = AppState.data.sortField === field && AppState.data.sortDirection === 'asc';
        AppState.data.sortField = field;
        AppState.data.sortDirection = isCurrentlyAsc ? 'desc' : 'asc';
        
        AppState.data.tableData.sort((a, b) => {
            let valueA = a[field];
            let valueB = b[field];
            
            // Handle different data types
            if (field === 'amount') {
                valueA = parseFloat(valueA);
                valueB = parseFloat(valueB);
            } else if (field === 'date') {
                valueA = new Date(valueA);
                valueB = new Date(valueB);
            }
            
            if (valueA < valueB) return AppState.data.sortDirection === 'asc' ? -1 : 1;
            if (valueA > valueB) return AppState.data.sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
        
        renderTable();
    }
    
    function initTableExport() {
        const exportBtn = Utils.$('#export-table');
        if (!exportBtn) return;
        
        Utils.on(exportBtn, 'click', function() {
            ExportManager.exportTableData('#data-table', 'table-export');
        });
    }
    
    function editRow(index) {
        const row = AppState.data.tableData[index];
        console.log('Edit row:', row);
        // Implement edit functionality
    }
    
    function deleteRow(index) {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette ligne ?')) {
            AppState.data.tableData.splice(index, 1);
            renderTable();
        }
    }`;
}

function getModalTemplate(): string {
  return `
    
    // Modal Management
    function initModals() {
        // Modal trigger buttons
        const triggers = Utils.$$('[data-modal]');
        triggers.forEach(trigger => {
            Utils.on(trigger, 'click', function() {
                const modalId = this.getAttribute('data-modal');
                openModal(modalId);
            });
        });
        
        // Modal close buttons
        const closeButtons = Utils.$$('[data-close]');
        closeButtons.forEach(button => {
            Utils.on(button, 'click', function() {
                const modalId = this.getAttribute('data-close');
                closeModal(modalId);
            });
        });
        
        // Close on backdrop click
        const modals = Utils.$$('.modal');
        modals.forEach(modal => {
            Utils.on(modal, 'click', function(e) {
                if (e.target === this) {
                    closeModal(this.id);
                }
            });
        });
        
        // Close on Escape key
        Utils.on(document, 'keydown', function(e) {
            if (e.key === 'Escape') {
                const activeModal = Utils.$('.modal.active');
                if (activeModal) {
                    closeModal(activeModal.id);
                }
            }
        });
    }
    
    function openModal(modalId) {
        const modal = Utils.$('#' + modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeModal(modalId) {
        const modal = Utils.$('#' + modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }`;
}

function getChartTemplate(): string {
  return `
    
    // Chart Management
    function initCharts() {
        const canvas = Utils.$('#main-chart');
        if (!canvas) return;
        
        AppState.components.chart = {
            canvas: canvas,
            ctx: canvas.getContext('2d'),
            data: [
                { label: 'Janvier', value: 65 },
                { label: 'Février', value: 78 },
                { label: 'Mars', value: 90 },
                { label: 'Avril', value: 56 },
                { label: 'Mai', value: 82 }
            ],
            colors: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6']
        };
        
        renderChart('bar');
        
        const typeSelect = Utils.$('#chart-type');
        const updateBtn = Utils.$('#update-chart');
        
        if (typeSelect) {
            Utils.on(typeSelect, 'change', function() {
                renderChart(this.value);
            });
        }
        
        if (updateBtn) {
            Utils.on(updateBtn, 'click', function() {
                const type = typeSelect ? typeSelect.value : 'bar';
                renderChart(type);
            });
        }
    }
    
    function renderChart(type) {
        const chart = AppState.components.chart;
        if (!chart) return;
        
        const { ctx, data, colors } = chart;
        const canvas = chart.canvas;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        switch (type) {
            case 'bar':
                renderBarChart(ctx, data, colors, canvas.width, canvas.height);
                break;
            case 'line':
                renderLineChart(ctx, data, colors, canvas.width, canvas.height);
                break;
            case 'pie':
                renderPieChart(ctx, data, colors, canvas.width, canvas.height);
                break;
        }
        
        renderChartLegend(data, colors);
    }
    
    function renderBarChart(ctx, data, colors, width, height) {
        const margin = 40;
        const chartWidth = width - 2 * margin;
        const chartHeight = height - 2 * margin;
        const barWidth = chartWidth / data.length;
        const maxValue = Math.max(...data.map(d => d.value));
        
        data.forEach((item, index) => {
            const barHeight = (item.value / maxValue) * chartHeight;
            const x = margin + index * barWidth + barWidth * 0.1;
            const y = height - margin - barHeight;
            
            ctx.fillStyle = colors[index % colors.length];
            ctx.fillRect(x, y, barWidth * 0.8, barHeight);
            
            // Labels
            ctx.fillStyle = '#333';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(item.label, x + barWidth * 0.4, height - margin + 15);
            ctx.fillText(item.value, x + barWidth * 0.4, y - 5);
        });
    }
    
    function renderLineChart(ctx, data, colors, width, height) {
        const margin = 40;
        const chartWidth = width - 2 * margin;
        const chartHeight = height - 2 * margin;
        const stepX = chartWidth / (data.length - 1);
        const maxValue = Math.max(...data.map(d => d.value));
        
        ctx.strokeStyle = colors[0];
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        data.forEach((item, index) => {
            const x = margin + index * stepX;
            const y = height - margin - (item.value / maxValue) * chartHeight;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
            
            // Points
            ctx.fillStyle = colors[0];
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, 2 * Math.PI);
            ctx.fill();
            
            // Labels
            ctx.fillStyle = '#333';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(item.label, x, height - margin + 15);
        });
        
        ctx.strokeStyle = colors[0];
        ctx.stroke();
    }
    
    function renderPieChart(ctx, data, colors, width, height) {
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 3;
        const total = data.reduce((sum, item) => sum + item.value, 0);
        
        let currentAngle = 0;
        
        data.forEach((item, index) => {
            const sliceAngle = (item.value / total) * 2 * Math.PI;
            
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            ctx.closePath();
            
            ctx.fillStyle = colors[index % colors.length];
            ctx.fill();
            
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            currentAngle += sliceAngle;
        });
    }
    
    function renderChartLegend(data, colors) {
        const legend = Utils.$('#chart-legend');
        if (!legend) return;
        
        legend.innerHTML = data.map((item, index) => \`
            <div class="legend-item">
                <span class="legend-color" style="background-color: \${colors[index % colors.length]}"></span>
                <span class="legend-label">\${item.label}: \${item.value}</span>
            </div>
        \`).join('');
    }`;
}
