import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProjectConfig } from '@/types/project';
import { FileCode, FileText, File, Eye } from 'lucide-react';

interface FilesTabProps {
  config: ProjectConfig;
}

export default function FilesTab({ config }: FilesTabProps) {
  const files = [
    {
      name: 'index.html',
      icon: FileCode,
      color: 'text-orange-500',
      description: 'Structure HTML sémantique avec composants',
      size: '2.1 KB',
      sizeColor: 'bg-blue-100 text-blue-700',
    },
    {
      name: 'style.css',
      icon: FileText,
      color: 'text-blue-500',
      description: 'Variables CSS et styles modulaires',
      size: '1.8 KB',
      sizeColor: 'bg-green-100 text-green-700',
    },
    {
      name: 'script.js',
      icon: FileCode,
      color: 'text-purple-500',
      description: 'Logique métier et gestion des composants',
      size: '3.4 KB',
      sizeColor: 'bg-yellow-100 text-yellow-700',
    },
    {
      name: 'README.md',
      icon: File,
      color: 'text-gray-500',
      description: 'Documentation et instructions d\'utilisation',
      size: '0.9 KB',
      sizeColor: 'bg-gray-100 text-gray-700',
    },
  ];

  const handlePreviewFile = (filename: string) => {
    console.log(`Preview file: ${filename}`);
    // Could open a modal with file preview
  };

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-medium text-gray-900">Fichiers du Projet</h4>
      <div className="space-y-3">
        {files.map((file) => {
          const IconComponent = file.icon;
          
          return (
            <div key={file.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <IconComponent className={`h-5 w-5 ${file.color} mr-3`} />
                <div>
                  <span className="font-medium text-gray-900">{file.name}</span>
                  <p className="text-sm text-secondary">{file.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className={`text-xs ${file.sizeColor}`}>
                  {file.size}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handlePreviewFile(file.name)}
                  className="text-primary hover:text-blue-700"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Project Summary */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h5 className="font-medium text-blue-900 mb-2">Résumé du Projet</h5>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-blue-700 font-medium">Nom:</span>
            <span className="ml-2 text-blue-800">{config.name || 'Non défini'}</span>
          </div>
          <div>
            <span className="text-blue-700 font-medium">Auteur:</span>
            <span className="ml-2 text-blue-800">{config.author || 'Non défini'}</span>
          </div>
          <div>
            <span className="text-blue-700 font-medium">Composants:</span>
            <span className="ml-2 text-blue-800">
              {Object.values(config.formComponents).filter(Boolean).length + 
               Object.values(config.businessComponents).filter(Boolean).length + 
               Object.values(config.uiComponents).filter(Boolean).length}
            </span>
          </div>
          <div>
            <span className="text-blue-700 font-medium">Logiques métier:</span>
            <span className="ml-2 text-blue-800">
              {Object.values(config.business).filter(Boolean).length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
