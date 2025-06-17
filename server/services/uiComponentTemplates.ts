import { ProjectConfig } from '@shared/schema';

export function generateUIComponentTemplates(config: ProjectConfig): string {
  let html = '';
  
  if (config.uiComponents.searchZone) {
    html += `
            <section class="search-section">
                <div class="card">
                    <h3><i class="fas fa-search"></i> Zone de recherche</h3>
                    <div class="search-container">
                        <input type="text" id="global-search" class="search-input" placeholder="Rechercher...">
                        <div class="search-filters">
                            <select id="search-category" class="filter-select">
                                <option value="">Toutes catégories</option>
                                <option value="products">Produits</option>
                                <option value="users">Utilisateurs</option>
                                <option value="orders">Commandes</option>
                            </select>
                            <button type="button" class="btn btn-primary" onclick="performSearch()">Rechercher</button>
                        </div>
                    </div>
                    <div id="search-results" class="search-results"></div>
                </div>
            </section>`;
  }
  
  if (config.uiComponents.notifications) {
    html += `
            <section class="notifications-section">
                <div class="card">
                    <h3><i class="fas fa-bell"></i> Système de notifications</h3>
                    <div class="notification-controls">
                        <button type="button" class="btn btn-success" onclick="showNotification('Succès!', 'success')">Succès</button>
                        <button type="button" class="btn btn-danger" onclick="showNotification('Erreur!', 'error')">Erreur</button>
                        <button type="button" class="btn btn-secondary" onclick="showNotification('Information', 'info')">Info</button>
                        <button type="button" class="btn btn-warning" onclick="showNotification('Attention!', 'warning')">Attention</button>
                    </div>
                </div>
            </section>`;
  }
  
  if (config.uiComponents.progressBar) {
    html += `
            <section class="progress-section">
                <div class="card">
                    <h3><i class="fas fa-tasks"></i> Barres de progression</h3>
                    <div class="progress-group">
                        <label>Progression: <span id="progress-value">0%</span></label>
                        <div class="progress-bar">
                            <div class="progress-fill" id="progress-fill"></div>
                        </div>
                        <div class="progress-controls">
                            <button type="button" class="btn btn-primary" onclick="updateProgress(25)">25%</button>
                            <button type="button" class="btn btn-primary" onclick="updateProgress(50)">50%</button>
                            <button type="button" class="btn btn-primary" onclick="updateProgress(75)">75%</button>
                            <button type="button" class="btn btn-success" onclick="updateProgress(100)">100%</button>
                        </div>
                    </div>
                </div>
            </section>`;
  }
  
  if (config.uiComponents.badges) {
    html += `
            <section class="badges-section">
                <div class="card">
                    <h3><i class="fas fa-tags"></i> Badges et compteurs</h3>
                    <div class="badge-group">
                        <span class="badge badge-primary">Nouveau <span class="badge-count" id="new-count">3</span></span>
                        <span class="badge badge-success">Validé <span class="badge-count" id="validated-count">12</span></span>
                        <span class="badge badge-warning">En attente <span class="badge-count" id="pending-count">5</span></span>
                        <span class="badge badge-danger">Erreur <span class="badge-count" id="error-count">1</span></span>
                    </div>
                    <button type="button" class="btn btn-secondary" onclick="updateBadgeCounts()">Actualiser compteurs</button>
                </div>
            </section>`;
  }
  
  if (config.uiComponents.copyButton) {
    html += `
            <section class="copy-section">
                <div class="card">
                    <h3><i class="fas fa-copy"></i> Copie presse-papiers</h3>
                    <div class="copy-examples">
                        <div class="copy-item">
                            <input type="text" value="Texte à copier" id="copy-text" class="form-input" readonly>
                            <button type="button" class="btn btn-primary copy-btn" onclick="copyToClipboard('copy-text')">Copier</button>
                        </div>
                        <div class="copy-item">
                            <textarea id="copy-textarea" class="form-input" readonly>Contenu multiligne
à copier dans le presse-papiers</textarea>
                            <button type="button" class="btn btn-primary copy-btn" onclick="copyToClipboard('copy-textarea')">Copier</button>
                        </div>
                    </div>
                </div>
            </section>`;
  }
  
  if (config.uiComponents.counter) {
    html += `
            <section class="counter-section">
                <div class="card">
                    <h3><i class="fas fa-calculator"></i> Compteurs</h3>
                    <div class="counter-group">
                        <div class="counter-item">
                            <h4>Compteur simple</h4>
                            <div class="counter-display">
                                <button type="button" class="btn btn-secondary" onclick="updateCounter(-1)">-</button>
                                <span class="counter-value" id="counter-value">0</span>
                                <button type="button" class="btn btn-secondary" onclick="updateCounter(1)">+</button>
                            </div>
                        </div>
                        <div class="counter-item">
                            <h4>Chronomètre</h4>
                            <div class="timer-display" id="timer-display">00:00:00</div>
                            <div class="timer-controls">
                                <button type="button" class="btn btn-success" onclick="startTimer()">Start</button>
                                <button type="button" class="btn btn-warning" onclick="pauseTimer()">Pause</button>
                                <button type="button" class="btn btn-danger" onclick="resetTimer()">Reset</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>`;
  }
  
  if (config.uiComponents.modal) {
    html += `
            <section class="modal-section">
                <div class="card">
                    <h3><i class="fas fa-window-restore"></i> Fenêtres modales</h3>
                    <div class="modal-controls">
                        <button type="button" class="btn btn-primary" onclick="openModal('info-modal')">Modale Info</button>
                        <button type="button" class="btn btn-warning" onclick="openModal('confirm-modal')">Modale Confirmation</button>
                        <button type="button" class="btn btn-success" onclick="openModal('form-modal')">Modale Formulaire</button>
                    </div>
                </div>
            </section>
            
            <!-- Modals -->
            <div id="info-modal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4>Information</h4>
                        <button type="button" class="modal-close" onclick="closeModal('info-modal')">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>Ceci est une modale d'information avec du contenu exemple.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onclick="closeModal('info-modal')">Fermer</button>
                    </div>
                </div>
            </div>
            
            <div id="confirm-modal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4>Confirmation</h4>
                        <button type="button" class="modal-close" onclick="closeModal('confirm-modal')">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>Êtes-vous sûr de vouloir effectuer cette action ?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" onclick="confirmAction()">Confirmer</button>
                        <button type="button" class="btn btn-secondary" onclick="closeModal('confirm-modal')">Annuler</button>
                    </div>
                </div>
            </div>
            
            <div id="form-modal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4>Formulaire</h4>
                        <button type="button" class="modal-close" onclick="closeModal('form-modal')">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form id="modal-form">
                            <div class="form-group">
                                <label class="form-label">Nom</label>
                                <input type="text" class="form-input" name="name" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Email</label>
                                <input type="email" class="form-input" name="email" required>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" onclick="submitModalForm()">Envoyer</button>
                        <button type="button" class="btn btn-secondary" onclick="closeModal('form-modal')">Annuler</button>
                    </div>
                </div>
            </div>`;
  }
  
  return html;
}

export function generateUIComponentsCSS(config: ProjectConfig, framework: string): string {
  if (framework !== 'none') return '';
  
  let css = '';
  
  if (config.uiComponents.searchZone) {
    css += `

/* Search Components */
.search-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.search-input {
    padding: 0.75rem;
    border: 2px solid var(--border-color);
    border-radius: var(--radius);
    font-size: 1rem;
    transition: border-color 0.2s;
}

.search-input:focus {
    outline: none;
    border-color: var(--primary-color);
}

.search-filters {
    display: flex;
    gap: 1rem;
    align-items: center;
    flex-wrap: wrap;
}

.filter-select {
    padding: 0.5rem;
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    background-color: var(--background-color);
}

.search-results {
    margin-top: 1rem;
    padding: 1rem;
    background-color: var(--surface-color);
    border-radius: var(--radius);
    min-height: 100px;
}`;
  }
  
  if (config.uiComponents.notifications) {
    css += `

/* Notification System */
.notification-controls {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.notification-toast {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: var(--radius);
    color: white;
    font-weight: 500;
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
}

.notification-toast.show {
    transform: translateX(0);
}

.notification-toast.success {
    background-color: hsl(142, 76%, 36%);
}

.notification-toast.error {
    background-color: var(--destructive);
}

.notification-toast.warning {
    background-color: hsl(48, 96%, 53%);
    color: hsl(20, 14.3%, 4.1%);
}

.notification-toast.info {
    background-color: var(--primary-color);
}`;
  }
  
  if (config.uiComponents.progressBar) {
    css += `

/* Progress Bars */
.progress-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.progress-bar {
    width: 100%;
    height: 20px;
    background-color: var(--surface-color);
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid var(--border-color);
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--primary-color), hsl(207, 90%, 64%));
    width: 0%;
    transition: width 0.3s ease;
    position: relative;
}

.progress-fill::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
    );
    animation: progressShine 2s infinite;
}

@keyframes progressShine {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}

.progress-controls {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}`;
  }
  
  if (config.uiComponents.badges) {
    css += `

/* Badges */
.badge-group {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 1rem;
}

.badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 500;
}

.badge-primary {
    background-color: var(--primary-color);
    color: white;
}

.badge-success {
    background-color: hsl(142, 76%, 36%);
    color: white;
}

.badge-warning {
    background-color: hsl(48, 96%, 53%);
    color: hsl(20, 14.3%, 4.1%);
}

.badge-danger {
    background-color: var(--destructive);
    color: white;
}

.badge-count {
    background-color: rgba(255, 255, 255, 0.2);
    padding: 0.25rem 0.5rem;
    border-radius: 10px;
    font-size: 0.75rem;
    min-width: 20px;
    text-align: center;
}`;
  }
  
  if (config.uiComponents.copyButton) {
    css += `

/* Copy Components */
.copy-examples {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.copy-item {
    display: flex;
    gap: 0.5rem;
    align-items: flex-start;
}

.copy-item .form-input {
    flex: 1;
}

.copy-btn {
    white-space: nowrap;
}

.copy-btn.copied {
    background-color: hsl(142, 76%, 36%);
    color: white;
}`;
  }
  
  if (config.uiComponents.counter) {
    css += `

/* Counters */
.counter-group {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
}

.counter-item {
    text-align: center;
}

.counter-display {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin: 1rem 0;
}

.counter-value {
    font-size: 2rem;
    font-weight: bold;
    color: var(--primary-color);
    min-width: 80px;
}

.timer-display {
    font-size: 2.5rem;
    font-weight: bold;
    color: var(--primary-color);
    font-family: 'Courier New', monospace;
    margin: 1rem 0;
}

.timer-controls {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    flex-wrap: wrap;
}`;
  }
  
  return css;
}

export function generateUIComponentsJS(config: ProjectConfig): string {
  let js = '';
  
  if (Object.values(config.uiComponents).some(Boolean)) {
    js += `
    
    // UI Components Management
    function initUIComponents() {`;
    
    if (config.uiComponents.searchZone) {
      js += `
        initSearchComponents();`;
    }
    
    if (config.uiComponents.notifications) {
      js += `
        initNotificationSystem();`;
    }
    
    if (config.uiComponents.progressBar) {
      js += `
        initProgressBars();`;
    }
    
    if (config.uiComponents.badges) {
      js += `
        initBadgeSystem();`;
    }
    
    if (config.uiComponents.copyButton) {
      js += `
        initCopyButtons();`;
    }
    
    if (config.uiComponents.counter) {
      js += `
        initCounters();`;
    }
    
    if (config.uiComponents.modal) {
      js += `
        initModalSystem();`;
    }
    
    js += `
    }`;
    
    // Add specific implementations
    if (config.uiComponents.searchZone) {
      js += `
    
    function initSearchComponents() {
        const searchInput = Utils.$('#global-search');
        const searchBtn = Utils.$('button[onclick="performSearch()"]');
        
        if (searchInput) {
            Utils.on(searchInput, 'keyup', function(e) {
                if (e.key === 'Enter') {
                    performSearch();
                }
            });
        }
    }
    
    function performSearch() {
        const query = Utils.$('#global-search').value;
        const category = Utils.$('#search-category').value;
        const resultsDiv = Utils.$('#search-results');
        
        if (!query.trim()) {
            resultsDiv.innerHTML = '<p>Veuillez saisir un terme de recherche.</p>';
            return;
        }
        
        // Simulate search results
        const mockResults = [
            { type: 'product', title: 'Produit exemple', description: 'Description du produit' },
            { type: 'user', title: 'Utilisateur exemple', description: 'Profil utilisateur' },
            { type: 'order', title: 'Commande #12345', description: 'Détails de la commande' }
        ];
        
        const filteredResults = category ? 
            mockResults.filter(r => r.type === category) : 
            mockResults;
            
        resultsDiv.innerHTML = filteredResults.length ? 
            filteredResults.map(result => \`
                <div class="search-result-item">
                    <h4>\${result.title}</h4>
                    <p>\${result.description}</p>
                    <small>Recherche: "\${query}"</small>
                </div>
            \`).join('') :
            '<p>Aucun résultat trouvé.</p>';
    }`;
    }
    
    if (config.uiComponents.notifications) {
      js += `
    
    function initNotificationSystem() {
        // Notification system already initialized via global functions
    }
    
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = \`notification-toast \${type}\`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Hide and remove notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }`;
    }
    
    if (config.uiComponents.progressBar) {
      js += `
    
    function initProgressBars() {
        // Progress bar controls are handled via onclick events
    }
    
    function updateProgress(value) {
        const progressFill = Utils.$('#progress-fill');
        const progressValue = Utils.$('#progress-value');
        
        if (progressFill && progressValue) {
            progressFill.style.width = value + '%';
            progressValue.textContent = value + '%';
        }
    }`;
    }
    
    if (config.uiComponents.badges) {
      js += `
    
    function initBadgeSystem() {
        // Badge system initialized
        updateBadgeCounts();
    }
    
    function updateBadgeCounts() {
        const counts = {
            'new-count': Math.floor(Math.random() * 10),
            'validated-count': Math.floor(Math.random() * 20) + 10,
            'pending-count': Math.floor(Math.random() * 8),
            'error-count': Math.floor(Math.random() * 3)
        };
        
        Object.entries(counts).forEach(([id, count]) => {
            const element = Utils.$('#' + id);
            if (element) {
                element.textContent = count;
            }
        });
    }`;
    }
    
    if (config.uiComponents.copyButton) {
      js += `
    
    function initCopyButtons() {
        // Copy functionality initialized via onclick events
    }
    
    function copyToClipboard(elementId) {
        const element = Utils.$('#' + elementId);
        if (!element) return;
        
        const text = element.value || element.textContent;
        
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Copié dans le presse-papiers!', 'success');
            
            // Visual feedback
            const btn = element.parentNode.querySelector('.copy-btn');
            if (btn) {
                btn.classList.add('copied');
                btn.textContent = 'Copié!';
                setTimeout(() => {
                    btn.classList.remove('copied');
                    btn.textContent = 'Copier';
                }, 2000);
            }
        }).catch(() => {
            showNotification('Erreur lors de la copie', 'error');
        });
    }`;
    }
    
    if (config.uiComponents.counter) {
      js += `
    
    let counterValue = 0;
    let timerInterval = null;
    let timerSeconds = 0;
    let timerRunning = false;
    
    function initCounters() {
        updateCounterDisplay();
        updateTimerDisplay();
    }
    
    function updateCounter(delta) {
        counterValue += delta;
        updateCounterDisplay();
    }
    
    function updateCounterDisplay() {
        const display = Utils.$('#counter-value');
        if (display) {
            display.textContent = counterValue;
        }
    }
    
    function startTimer() {
        if (!timerRunning) {
            timerRunning = true;
            timerInterval = setInterval(() => {
                timerSeconds++;
                updateTimerDisplay();
            }, 1000);
        }
    }
    
    function pauseTimer() {
        if (timerRunning) {
            timerRunning = false;
            clearInterval(timerInterval);
        }
    }
    
    function resetTimer() {
        timerRunning = false;
        timerSeconds = 0;
        clearInterval(timerInterval);
        updateTimerDisplay();
    }
    
    function updateTimerDisplay() {
        const display = Utils.$('#timer-display');
        if (display) {
            const hours = Math.floor(timerSeconds / 3600);
            const minutes = Math.floor((timerSeconds % 3600) / 60);
            const seconds = timerSeconds % 60;
            
            display.textContent = \`\${hours.toString().padStart(2, '0')}:\${minutes.toString().padStart(2, '0')}:\${seconds.toString().padStart(2, '0')}\`;
        }
    }`;
    }
    
    if (config.uiComponents.modal) {
      js += `
    
    function initModalSystem() {
        // Modal system initialized via onclick events
        
        // Close modals on backdrop click
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('modal')) {
                closeModal(e.target.id);
            }
        });
        
        // Close modals on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const activeModal = document.querySelector('.modal.active');
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
    }
    
    function confirmAction() {
        showNotification('Action confirmée!', 'success');
        closeModal('confirm-modal');
    }
    
    function submitModalForm() {
        const form = Utils.$('#modal-form');
        if (form) {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Validate required fields
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'var(--destructive)';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (isValid) {
                console.log('Modal form data:', data);
                showNotification('Formulaire envoyé!', 'success');
                form.reset();
                closeModal('form-modal');
            } else {
                showNotification('Veuillez remplir tous les champs requis', 'error');
            }
        }
    }`;
    }
  }
  
  return js;
}