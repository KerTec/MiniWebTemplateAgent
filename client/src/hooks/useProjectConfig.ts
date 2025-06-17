import { useState, useCallback } from 'react';
import { ProjectConfig, GenerationProgress } from '@/types/project';

const defaultConfig: ProjectConfig = {
  name: '',
  description: '',
  author: '',
  cssFramework: 'none',
  structure: {
    header: true,
    nav: true,
    main: true,
    sidebar: false,
    footer: true,
  },
  formComponents: {
    textInput: false,
    emailInput: false,
    phoneInput: false,
    textarea: false,
    select: false,
    radio: false,
    checkbox: false,
    dateInput: false,
    buttons: false,
  },
  businessComponents: {
    vatCalculator: false,
    priceSimulator: false,
    filterableTable: false,
    csvExport: false,
  },
  uiComponents: {
    conditionalDisplay: false,
    jsonDisplay: false,
    searchZone: false,
    pagination: false,
    copyButton: false,
    notifications: false,
    badges: false,
    progressBar: false,
    fileUpload: false,
    counter: false,
    richEditor: false,
    modal: false,
  },
  business: {
    vat: false,
    conversions: false,
    export: false,
    localStorage: false,
  },
};

export function useProjectConfig() {
  const [config, setConfig] = useState<ProjectConfig>(defaultConfig);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState<GenerationProgress>({
    step: 'ready',
    percentage: 0,
    message: 'Prêt à générer',
  });

  const updateConfig = useCallback((updates: Partial<ProjectConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  }, []);

  const updateStructure = useCallback((updates: Partial<ProjectConfig['structure']>) => {
    setConfig(prev => ({
      ...prev,
      structure: { ...prev.structure, ...updates }
    }));
  }, []);

  const updateFormComponents = useCallback((updates: Partial<ProjectConfig['formComponents']>) => {
    setConfig(prev => ({
      ...prev,
      formComponents: { ...prev.formComponents, ...updates }
    }));
  }, []);

  const updateBusinessComponents = useCallback((updates: Partial<ProjectConfig['businessComponents']>) => {
    setConfig(prev => ({
      ...prev,
      businessComponents: { ...prev.businessComponents, ...updates }
    }));
  }, []);

  const updateUIComponents = useCallback((updates: Partial<ProjectConfig['uiComponents']>) => {
    setConfig(prev => ({
      ...prev,
      uiComponents: { ...prev.uiComponents, ...updates }
    }));
  }, []);

  const updateBusiness = useCallback((updates: Partial<ProjectConfig['business']>) => {
    setConfig(prev => ({
      ...prev,
      business: { ...prev.business, ...updates }
    }));
  }, []);

  const generateProject = useCallback(async () => {
    if (!config.name.trim()) {
      throw new Error('Le nom du projet est requis');
    }

    setIsGenerating(true);
    setProgress({
      step: 'validating',
      percentage: 10,
      message: 'Validation de la configuration...',
    });

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProgress({
        step: 'generating',
        percentage: 30,
        message: 'Génération des templates...',
      });

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur lors de la génération');
      }

      setProgress({
        step: 'downloading',
        percentage: 80,
        message: 'Préparation du téléchargement...',
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${config.name || 'mini-tool'}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setProgress({
        step: 'complete',
        percentage: 100,
        message: 'Projet généré avec succès !',
      });

      setTimeout(() => {
        setProgress({
          step: 'ready',
          percentage: 0,
          message: 'Prêt à générer',
        });
      }, 3000);

    } catch (error: any) {
      setProgress({
        step: 'error',
        percentage: 0,
        message: error.message || 'Erreur lors de la génération',
      });
      
      setTimeout(() => {
        setProgress({
          step: 'ready',
          percentage: 0,
          message: 'Prêt à générer',
        });
      }, 5000);
      
      throw error;
    } finally {
      setIsGenerating(false);
    }
  }, [config]);

  const resetConfig = useCallback(() => {
    setConfig(defaultConfig);
    setProgress({
      step: 'ready',
      percentage: 0,
      message: 'Prêt à générer',
    });
  }, []);

  return {
    config,
    isGenerating,
    progress,
    updateConfig,
    updateStructure,
    updateFormComponents,
    updateBusinessComponents,
    updateUIComponents,
    updateBusiness,
    generateProject,
    resetConfig,
  };
}
