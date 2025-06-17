import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ProjectConfig, FileType } from '@/types/project';

interface PreviewTabProps {
  config: ProjectConfig;
}

export default function PreviewTab({ config }: PreviewTabProps) {
  const [activeFile, setActiveFile] = useState<FileType>('html');

  const getPreviewContent = (fileType: FileType): string => {
    switch (fileType) {
      case 'html':
        return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.name || 'Mon Mini-Outil'}</title>
    <meta name="description" content="${config.description || 'Application web générée par Agent Template'}">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    ${config.structure.header ? `<header class="app-header">
        <div class="container">
            <h1>${config.name || 'Mon Mini-Outil'}</h1>
            ${config.description ? `<p class="description">${config.description}</p>` : ''}
        </div>
    </header>` : ''}
    
    ${config.structure.nav ? `<nav class="app-nav">
        <div class="container">
            <ul class="nav-menu">
                <li><a href="#home" class="nav-link active">Accueil</a></li>
                <li><a href="#about" class="nav-link">À propos</a></li>
                <li><a href="#contact" class="nav-link">Contact</a></li>
            </ul>
        </div>
    </nav>` : ''}
    
    <main class="app-main">
        <div class="container">
            <h2>Contenu principal</h2>
            <!-- Composants générés ici -->
        </div>
    </main>
    
    ${config.structure.footer ? `<footer class="app-footer">
        <div class="container">
            <p>&copy; 2025 ${config.name || 'Mon Mini-Outil'}. ${config.author ? `Créé par ${config.author}.` : ''}</p>
        </div>
    </footer>` : ''}
    
    <script src="script.js"></script>
</body>
</html>`;

      case 'css':
        return `:root {
    --primary-color: hsl(207, 90%, 54%);
    --secondary-color: hsl(25, 5.3%, 44.7%);
    --background-color: hsl(0, 0%, 100%);
    --text-color: hsl(20, 14.3%, 4.1%);
    --border-color: hsl(20, 5.9%, 90%);
    --radius: 8px;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: var(--text-color);
    background-color: var(--background-color);
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
}

.app-header {
    background-color: var(--surface-color);
    border-bottom: 1px solid var(--border-color);
    padding: 1rem 0;
}

/* Framework CSS */
${config.cssFramework !== 'none' ? `
/* ${config.cssFramework === 'bulma' ? 'Bulma' : 'Pico.css'} sera inclus via CDN */` : ''}

/* Styles pour les composants sélectionnés */
${Object.values(config.formComponents).some(Boolean) ? `
.form-group {
    margin-bottom: 1rem;
}

.form-input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
}` : ''}

${config.businessComponents.filterableTable ? `
.table {
    width: 100%;
    border-collapse: collapse;
}

.table th,
.table td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid var(--border-color);
}` : ''}`;

      case 'js':
        return `(function() {
    'use strict';
    
    // Configuration du projet
    const AppConfig = {
        name: "${config.name || 'Mon Mini-Outil'}",
        cssFramework: "${config.cssFramework}",
        features: {
            formComponents: ${JSON.stringify(config.formComponents, null, 12)},
            businessComponents: ${JSON.stringify(config.businessComponents, null, 12)},
            uiComponents: ${JSON.stringify(config.uiComponents, null, 12)},
            business: ${JSON.stringify(config.business, null, 12)}
        }
    };
    
    // État de l'application
    const AppState = {
        currentView: 'home',
        data: {}
    };
    
    // Utilitaires
    const Utils = {
        $(selector) {
            return document.querySelector(selector);
        },
        
        $$(selector) {
            return document.querySelectorAll(selector);
        },
        
        on(element, event, handler) {
            if (typeof element === 'string') {
                element = this.$(element);
            }
            if (element) {
                element.addEventListener(event, handler);
            }
        }
    };
    
    ${config.business.vat ? `
    // Calculateur TVA
    const VATCalculator = {
        calculateTTC(ht, rate = 20) {
            return ht * (1 + rate / 100);
        },
        
        calculateHT(ttc, rate = 20) {
            return ttc / (1 + rate / 100);
        }
    };` : ''}
    
    ${config.business.export ? `
    // Gestionnaire d'export
    const ExportManager = {
        exportCSV(data, filename) {
            // Logique d'export CSV
        },
        
        exportJSON(data, filename) {
            // Logique d'export JSON
        }
    };` : ''}
    
    // Initialisation
    function init() {
        console.log('${config.name || 'Application'} initialisée');
        
        ${Object.values(config.formComponents).some(Boolean) ? 'initFormComponents();' : ''}
        ${config.businessComponents.filterableTable ? 'initFilterableTable();' : ''}
        ${config.uiComponents.modal ? 'initModals();' : ''}
        ${config.businessComponents.vatCalculator ? 'initVATCalculator();' : ''}
    }
    
    // Démarrage
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();`;

      case 'readme':
        return `# ${config.name || 'Mon Mini-Outil'}

${config.description || 'Application web générée par Agent Template'}

## Description

Ce projet a été généré automatiquement par Agent Template.

${config.author ? `**Auteur:** ${config.author}` : ''}

## Structure du projet

- \`index.html\` - Structure HTML principale
- \`style.css\` - Styles CSS avec variables
- \`script.js\` - Logique JavaScript
- \`README.md\` - Documentation

## Fonctionnalités

### Composants inclus

#### Formulaires
${Object.entries(config.formComponents).filter(([_, enabled]) => enabled).map(([key, _]) => `- ${key}`).join('\n') || '- Aucun composant de formulaire'}

#### Métier
${Object.entries(config.businessComponents).filter(([_, enabled]) => enabled).map(([key, _]) => `- ${key}`).join('\n') || '- Aucun composant métier'}

#### Interface
${Object.entries(config.uiComponents).filter(([_, enabled]) => enabled).map(([key, _]) => `- ${key}`).join('\n') || '- Aucun composant UI'}

### Logiques métier
${Object.entries(config.business).filter(([_, enabled]) => enabled).map(([key, _]) => `- ${key}`).join('\n') || '- Aucune logique métier sélectionnée'}

## Utilisation

1. Ouvrez \`index.html\` dans votre navigateur
2. Aucune dépendance externe requise
3. Fonctionne hors ligne

---

Généré par Agent Template v1.0`;

      default:
        return '';
    }
  };

  const fileButtons = [
    { type: 'html' as FileType, label: 'HTML', icon: 'fas fa-file-code' },
    { type: 'css' as FileType, label: 'CSS', icon: 'fas fa-palette' },
    { type: 'js' as FileType, label: 'JS', icon: 'fas fa-code' },
    { type: 'readme' as FileType, label: 'README', icon: 'fas fa-file-text' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-medium text-gray-900">Aperçu du Code Généré</h4>
        <div className="flex space-x-2">
          {fileButtons.map(({ type, label, icon }) => (
            <Button
              key={type}
              variant={activeFile === type ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFile(type)}
              className="text-sm"
            >
              <i className={`${icon} mr-1`}></i>
              {label}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Code Display */}
      <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm overflow-x-auto max-h-96 overflow-y-auto">
        <pre className="text-gray-300 whitespace-pre-wrap">
          <code>{getPreviewContent(activeFile)}</code>
        </pre>
      </div>
    </div>
  );
}
