import { ProjectConfig } from '@shared/schema';

export function generateFormComponentTemplates(config: ProjectConfig): string {
  let html = '';
  
  if (config.formComponents.textInput || config.formComponents.emailInput || config.formComponents.phoneInput) {
    html += `
            <section class="form-inputs-section">
                <div class="card">
                    <h3>Champs de saisie</h3>
                    <form class="component-form" id="inputs-form">`;
    
    if (config.formComponents.textInput) {
      html += `
                        <div class="form-group">
                            <label class="form-label" for="text-input">Texte</label>
                            <input type="text" id="text-input" name="textInput" class="form-input" placeholder="Saisir du texte">
                            <div class="error-message" data-field="textInput"></div>
                        </div>`;
    }
    
    if (config.formComponents.emailInput) {
      html += `
                        <div class="form-group">
                            <label class="form-label" for="email-input">Email</label>
                            <input type="email" id="email-input" name="emailInput" class="form-input" placeholder="exemple@email.com">
                            <div class="error-message" data-field="emailInput"></div>
                        </div>`;
    }
    
    if (config.formComponents.phoneInput) {
      html += `
                        <div class="form-group">
                            <label class="form-label" for="phone-input">Téléphone</label>
                            <input type="tel" id="phone-input" name="phoneInput" class="form-input" placeholder="01 23 45 67 89">
                            <div class="error-message" data-field="phoneInput"></div>
                        </div>`;
    }
    
    html += `
                    </form>
                </div>
            </section>`;
  }
  
  if (config.formComponents.textarea) {
    html += `
            <section class="textarea-section">
                <div class="card">
                    <h3>Zone de texte</h3>
                    <form class="component-form">
                        <div class="form-group">
                            <label class="form-label" for="message-textarea">Message</label>
                            <textarea id="message-textarea" name="message" class="form-input" rows="4" placeholder="Votre message ici..."></textarea>
                        </div>
                    </form>
                </div>
            </section>`;
  }
  
  if (config.formComponents.select) {
    html += `
            <section class="select-section">
                <div class="card">
                    <h3>Liste déroulante</h3>
                    <form class="component-form">
                        <div class="form-group">
                            <label class="form-label" for="category-select">Catégorie</label>
                            <select id="category-select" name="category" class="form-input">
                                <option value="">Sélectionner une option</option>
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                            </select>
                        </div>
                    </form>
                </div>
            </section>`;
  }
  
  if (config.formComponents.radio) {
    html += `
            <section class="radio-section">
                <div class="card">
                    <h3>Boutons radio</h3>
                    <form class="component-form">
                        <div class="form-group">
                            <fieldset>
                                <legend class="form-label">Choix unique</legend>
                                <div class="radio-group">
                                    <label class="radio-label">
                                        <input type="radio" name="radioChoice" value="choice1" class="radio-input">
                                        <span class="radio-text">Choix 1</span>
                                    </label>
                                    <label class="radio-label">
                                        <input type="radio" name="radioChoice" value="choice2" class="radio-input">
                                        <span class="radio-text">Choix 2</span>
                                    </label>
                                    <label class="radio-label">
                                        <input type="radio" name="radioChoice" value="choice3" class="radio-input">
                                        <span class="radio-text">Choix 3</span>
                                    </label>
                                </div>
                            </fieldset>
                        </div>
                    </form>
                </div>
            </section>`;
  }
  
  if (config.formComponents.checkbox) {
    html += `
            <section class="checkbox-section">
                <div class="card">
                    <h3>Cases à cocher</h3>
                    <form class="component-form">
                        <div class="form-group">
                            <fieldset>
                                <legend class="form-label">Choix multiples</legend>
                                <div class="checkbox-group">
                                    <label class="checkbox-label">
                                        <input type="checkbox" name="features" value="feature1" class="checkbox-input">
                                        <span class="checkbox-text">Fonctionnalité 1</span>
                                    </label>
                                    <label class="checkbox-label">
                                        <input type="checkbox" name="features" value="feature2" class="checkbox-input">
                                        <span class="checkbox-text">Fonctionnalité 2</span>
                                    </label>
                                    <label class="checkbox-label">
                                        <input type="checkbox" name="features" value="feature3" class="checkbox-input">
                                        <span class="checkbox-text">Fonctionnalité 3</span>
                                    </label>
                                </div>
                            </fieldset>
                        </div>
                    </form>
                </div>
            </section>`;
  }
  
  if (config.formComponents.dateInput) {
    html += `
            <section class="date-section">
                <div class="card">
                    <h3>Sélecteur de date</h3>
                    <form class="component-form">
                        <div class="form-group">
                            <label class="form-label" for="date-input">Date</label>
                            <input type="date" id="date-input" name="dateInput" class="form-input">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="datetime-input">Date et heure</label>
                            <input type="datetime-local" id="datetime-input" name="datetimeInput" class="form-input">
                        </div>
                    </form>
                </div>
            </section>`;
  }
  
  if (config.formComponents.buttons) {
    html += `
            <section class="buttons-section">
                <div class="card">
                    <h3>Boutons d'action</h3>
                    <div class="button-group">
                        <button type="button" class="btn btn-primary" onclick="handleSubmit()">Envoyer</button>
                        <button type="button" class="btn btn-secondary" onclick="handleReset()">Réinitialiser</button>
                        <button type="button" class="btn btn-success" onclick="handleSave()">Sauvegarder</button>
                        <button type="button" class="btn btn-danger" onclick="handleDelete()">Supprimer</button>
                    </div>
                </div>
            </section>`;
  }
  
  return html;
}

export function generateFormComponentsCSS(config: ProjectConfig, framework: string): string {
  if (framework !== 'none') return '';
  
  let css = '';
  
  if (Object.values(config.formComponents).some(Boolean)) {
    css += `
/* Form Components Styles */
.component-form {
    max-width: 600px;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: var(--text-color);
}

.form-input {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid var(--border-color);
    border-radius: var(--radius);
    font-family: inherit;
    font-size: 1rem;
    transition: border-color 0.2s, box-shadow 0.2s;
    background-color: var(--background-color);
}

.form-input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px hsla(207, 90%, 54%, 0.1);
}

.form-input.error {
    border-color: var(--destructive);
}

.error-message {
    color: var(--destructive);
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: none;
}

.error-message.show {
    display: block;
}`;
  }
  
  if (config.formComponents.radio) {
    css += `

/* Radio Buttons */
.radio-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.radio-label {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: var(--radius);
    transition: background-color 0.2s;
}

.radio-label:hover {
    background-color: var(--surface-color);
}

.radio-input {
    margin-right: 0.75rem;
    transform: scale(1.2);
}

.radio-text {
    font-size: 1rem;
}`;
  }
  
  if (config.formComponents.checkbox) {
    css += `

/* Checkboxes */
.checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.checkbox-label {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: var(--radius);
    transition: background-color 0.2s;
}

.checkbox-label:hover {
    background-color: var(--surface-color);
}

.checkbox-input {
    margin-right: 0.75rem;
    transform: scale(1.2);
}

.checkbox-text {
    font-size: 1rem;
}`;
  }
  
  if (config.formComponents.buttons) {
    css += `

/* Button Groups */
.button-group {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    align-items: center;
}

.btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: var(--radius);
    font-family: inherit;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.btn-primary {
    background-color: var(--primary-color);
    color: white;
}

.btn-primary:hover:not(:disabled) {
    background-color: hsl(207, 90%, 48%);
}

.btn-secondary {
    background-color: var(--surface-color);
    color: var(--text-color);
    border: 1px solid var(--border-color);
}

.btn-secondary:hover:not(:disabled) {
    background-color: hsl(60, 4.8%, 92%);
}

.btn-success {
    background-color: hsl(142, 76%, 36%);
    color: white;
}

.btn-success:hover:not(:disabled) {
    background-color: hsl(142, 76%, 32%);
}

.btn-danger {
    background-color: var(--destructive);
    color: white;
}

.btn-danger:hover:not(:disabled) {
    background-color: hsl(0, 84.2%, 55%);
}`;
  }
  
  return css;
}

export function generateFormComponentsJS(config: ProjectConfig): string {
  let js = '';
  
  if (Object.values(config.formComponents).some(Boolean)) {
    js += `
    
    // Form Components Management
    function initFormComponents() {
        // Enhanced form validation
        const forms = Utils.$$('.component-form');
        
        forms.forEach(form => {
            // Real-time validation
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                Utils.on(input, 'input', () => validateField(input));
                Utils.on(input, 'blur', () => validateField(input));
            });
            
            // Form submission handling
            Utils.on(form, 'submit', function(e) {
                e.preventDefault();
                if (validateForm(this)) {
                    handleFormData(this);
                }
            });
        });`;
    
    if (config.formComponents.phoneInput) {
      js += `
        
        // Phone number formatting
        const phoneInputs = Utils.$$('input[type="tel"]');
        phoneInputs.forEach(input => {
            Utils.on(input, 'input', function() {
                this.value = formatPhoneNumber(this.value);
            });
        });`;
    }
    
    if (config.formComponents.dateInput) {
      js += `
        
        // Date validation and formatting
        const dateInputs = Utils.$$('input[type="date"], input[type="datetime-local"]');
        dateInputs.forEach(input => {
            Utils.on(input, 'change', function() {
                validateDateInput(this);
            });
        });`;
    }
    
    js += `
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
        if (value) {
            switch (type) {
                case 'email':
                    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
                    if (!emailRegex.test(value)) {
                        isValid = false;
                        errorMessage = 'Format d\\'email invalide';
                    }
                    break;
                    
                case 'tel':
                    const phoneRegex = /^[\\d\\s\\-\\+\\(\\)]+$/;
                    if (!phoneRegex.test(value)) {
                        isValid = false;
                        errorMessage = 'Format de téléphone invalide';
                    }
                    break;
                    
                case 'text':
                    if (value.length < 2) {
                        isValid = false;
                        errorMessage = 'Au moins 2 caractères requis';
                    }
                    break;
            }
        }
        
        showFieldError(field, isValid ? '' : errorMessage);
        return isValid;
    }
    
    function showFieldError(field, message) {
        const errorElement = Utils.$(\`[data-field="\${field.name}"]\`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.toggle('show', !!message);
        }
        
        field.classList.toggle('error', !!message);
    }
    
    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    function handleFormData(form) {
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            if (data[key]) {
                // Handle multiple values (checkboxes)
                if (Array.isArray(data[key])) {
                    data[key].push(value);
                } else {
                    data[key] = [data[key], value];
                }
            } else {
                data[key] = value;
            }
        }
        
        // Store in app state
        AppState.data.formData = AppState.data.formData || [];
        AppState.data.formData.push({
            ...data,
            timestamp: new Date().toISOString(),
            formId: form.id || 'unnamed-form'
        });
        
        console.log('Form data submitted:', data);
        
        // Show success notification
        if (typeof showNotification === 'function') {
            showNotification('Données enregistrées avec succès !', 'success');
        } else {
            alert('Formulaire envoyé avec succès !');
        }
    }`;
    
    if (config.formComponents.phoneInput) {
      js += `
    
    function formatPhoneNumber(value) {
        // Remove all non-digits
        const digits = value.replace(/\\D/g, '');
        
        // Format as French phone number
        if (digits.length <= 10) {
            return digits.replace(/(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{2})/, '$1 $2 $3 $4 $5');
        }
        
        return digits.substring(0, 10).replace(/(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{2})/, '$1 $2 $3 $4 $5');
    }`;
    }
    
    if (config.formComponents.dateInput) {
      js += `
    
    function validateDateInput(input) {
        const value = input.value;
        const today = new Date();
        const inputDate = new Date(value);
        
        let isValid = true;
        let message = '';
        
        if (input.hasAttribute('data-min-date')) {
            const minDate = new Date(input.getAttribute('data-min-date'));
            if (inputDate < minDate) {
                isValid = false;
                message = 'La date doit être dans le futur';
            }
        }
        
        if (input.hasAttribute('data-max-date')) {
            const maxDate = new Date(input.getAttribute('data-max-date'));
            if (inputDate > maxDate) {
                isValid = false;
                message = 'La date dépasse la limite autorisée';
            }
        }
        
        showFieldError(input, isValid ? '' : message);
        return isValid;
    }`;
    }
    
    if (config.formComponents.buttons) {
      js += `
    
    // Button handlers
    function handleSubmit() {
        const forms = Utils.$$('.component-form');
        forms.forEach(form => {
            if (validateForm(form)) {
                handleFormData(form);
            }
        });
    }
    
    function handleReset() {
        const forms = Utils.$$('.component-form');
        forms.forEach(form => {
            form.reset();
            // Clear error messages
            const errorMessages = form.querySelectorAll('.error-message');
            errorMessages.forEach(msg => {
                msg.classList.remove('show');
                msg.textContent = '';
            });
            // Remove error styling
            const errorFields = form.querySelectorAll('.error');
            errorFields.forEach(field => field.classList.remove('error'));
        });
        
        if (typeof showNotification === 'function') {
            showNotification('Formulaires réinitialisés', 'info');
        }
    }
    
    function handleSave() {
        const forms = Utils.$$('.component-form');
        const allData = [];
        
        forms.forEach(form => {
            const formData = new FormData(form);
            const data = {};
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            if (Object.keys(data).length > 0) {
                allData.push(data);
            }
        });
        
        if (allData.length > 0) {
            Utils.storage.set('savedForms', allData);
            if (typeof showNotification === 'function') {
                showNotification('Données sauvegardées localement', 'success');
            } else {
                alert('Données sauvegardées !');
            }
        }
    }
    
    function handleDelete() {
        if (confirm('Êtes-vous sûr de vouloir supprimer toutes les données ?')) {
            Utils.storage.remove('savedForms');
            AppState.data.formData = [];
            handleReset();
            
            if (typeof showNotification === 'function') {
                showNotification('Données supprimées', 'warning');
            } else {
                alert('Données supprimées !');
            }
        }
    }`;
    }
  }
  
  return js;
}