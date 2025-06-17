import { useProjectConfig } from '@/hooks/useProjectConfig';
import { useToast } from '@/hooks/use-toast';
import ConfigurationSidebar from '@/components/ConfigurationSidebar';
import MainContent from '@/components/MainContent';
import { Button } from '@/components/ui/button';
import { Download, HelpCircle } from 'lucide-react';

export default function Home() {
  const {
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
  } = useProjectConfig();

  const { toast } = useToast();

  const handleGenerate = async () => {
    try {
      await generateProject();
      toast({
        title: "Projet généré avec succès !",
        description: "Le téléchargement va commencer automatiquement.",
      });
    } catch (error: any) {
      toast({
        title: "Erreur lors de la génération",
        description: error.message || "Une erreur est survenue",
        variant: "destructive",
      });
    }
  };

  const handleDownloadZip = () => {
    if (!config.name.trim()) {
      toast({
        title: "Configuration incomplète",
        description: "Veuillez saisir un nom de projet avant de générer.",
        variant: "destructive",
      });
      return;
    }
    handleGenerate();
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="bg-white border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <i className="fas fa-code text-primary text-2xl"></i>
            <h1 className="text-xl font-semibold text-gray-900">Agent Template</h1>
            <span className="text-sm text-secondary bg-gray-100 px-2 py-1 rounded">v1.0</span>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="text-secondary hover:text-gray-900">
              <HelpCircle className="h-4 w-4" />
            </Button>
            <Button onClick={handleDownloadZip} disabled={isGenerating} className="bg-primary hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Télécharger ZIP
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex">
        <ConfigurationSidebar
          config={config}
          onUpdateConfig={updateConfig}
          onUpdateStructure={updateStructure}
          onUpdateFormComponents={updateFormComponents}
          onUpdateBusinessComponents={updateBusinessComponents}
          onUpdateUIComponents={updateUIComponents}
          onUpdateBusiness={updateBusiness}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
        />
        
        <MainContent
          config={config}
          progress={progress}
          isGenerating={isGenerating}
        />
      </div>
    </div>
  );
}
