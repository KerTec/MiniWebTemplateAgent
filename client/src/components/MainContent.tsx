import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StructureTab from './StructureTab';
import PreviewTab from './PreviewTab';
import FilesTab from './FilesTab';
import GenerationConsole from './GenerationConsole';
import { ProjectConfig, GenerationProgress, TabType } from '@/types/project';
import { Progress } from '@/components/ui/progress';

interface MainContentProps {
  config: ProjectConfig;
  progress: GenerationProgress;
  isGenerating: boolean;
}

export default function MainContent({ config, progress, isGenerating }: MainContentProps) {
  const [activeTab, setActiveTab] = useState<TabType>('structure');

  const getProgressColor = () => {
    switch (progress.step) {
      case 'error':
        return 'bg-red-500';
      case 'complete':
        return 'bg-green-500';
      default:
        return 'bg-primary';
    }
  };

  const getStatusText = () => {
    switch (progress.step) {
      case 'error':
        return 'Erreur';
      case 'complete':
        return 'Terminé';
      case 'generating':
        return 'En cours';
      default:
        return 'Prêt';
    }
  };

  return (
    <main className="flex-1 p-6">
      <div className="space-y-6">
        {/* Status/Progress Bar */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-900">Statut de Génération</h3>
              <span className="text-sm text-secondary">{getStatusText()}</span>
            </div>
            <div className="space-y-2">
              <Progress value={progress.percentage} className="h-2" />
              <p className="text-sm text-secondary">{progress.message}</p>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Card>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabType)}>
            <div className="border-b border-border px-4">
              <TabsList className="h-auto p-0 bg-transparent">
                <TabsTrigger 
                  value="structure" 
                  className="py-3 px-1 border-b-2 border-transparent data-[state=active]:border-primary rounded-none"
                >
                  <span className="flex items-center">
                    <i className="fas fa-sitemap mr-2"></i>
                    Structure
                  </span>
                </TabsTrigger>
                <TabsTrigger 
                  value="preview" 
                  className="py-3 px-1 border-b-2 border-transparent data-[state=active]:border-primary rounded-none"
                >
                  <span className="flex items-center">
                    <i className="fas fa-eye mr-2"></i>
                    Aperçu Code
                  </span>
                </TabsTrigger>
                <TabsTrigger 
                  value="files" 
                  className="py-3 px-1 border-b-2 border-transparent data-[state=active]:border-primary rounded-none"
                >
                  <span className="flex items-center">
                    <i className="fas fa-folder mr-2"></i>
                    Fichiers
                  </span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="structure" className="p-6">
              <StructureTab config={config} />
            </TabsContent>

            <TabsContent value="preview" className="p-6">
              <PreviewTab config={config} />
            </TabsContent>

            <TabsContent value="files" className="p-6">
              <FilesTab config={config} />
            </TabsContent>
          </Tabs>
        </Card>

        {/* Generation Console */}
        <GenerationConsole 
          progress={progress} 
          isGenerating={isGenerating} 
        />
      </div>
    </main>
  );
}
