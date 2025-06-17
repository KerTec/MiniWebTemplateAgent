import { Badge } from '@/components/ui/badge';
import { ProjectConfig } from '@/types/project';
import { FileCode, Folder, FileText, File } from 'lucide-react';

interface StructureTabProps {
  config: ProjectConfig;
}

export default function StructureTab({ config }: StructureTabProps) {
  const selectedFormComponents = Object.entries(config.formComponents)
    .filter(([_, enabled]) => enabled)
    .map(([key, _]) => key);

  const selectedBusinessComponents = Object.entries(config.businessComponents)
    .filter(([_, enabled]) => enabled)
    .map(([key, _]) => key);

  const selectedUIComponents = Object.entries(config.uiComponents)
    .filter(([_, enabled]) => enabled)
    .map(([key, _]) => key);

  const selectedBusiness = Object.entries(config.business)
    .filter(([_, enabled]) => enabled)
    .map(([key, _]) => {
      const descriptions = {
        vat: 'Calculs TVA automatiques',
        conversions: 'Conversions d\'unités',
        export: 'Export CSV/JSON',
        localStorage: 'Sauvegarde locale',
      };
      return descriptions[key as keyof typeof descriptions] || key;
    });

  const totalComponents = selectedFormComponents.length + selectedBusinessComponents.length + selectedUIComponents.length;

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">Structure du Projet Généré</h4>
        <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
          <div className="space-y-1">
            <div className="flex items-center text-gray-600">
              <Folder className="h-4 w-4 text-yellow-500 mr-2" />
              <span>{config.name || 'mon-mini-outil'}/</span>
            </div>
            <div className="ml-6 space-y-1">
              <div className="flex items-center text-gray-700">
                <FileCode className="h-4 w-4 text-orange-500 mr-2" />
                index.html
                <Badge variant="secondary" className="ml-2 text-xs">Structure HTML</Badge>
              </div>
              <div className="flex items-center text-gray-700">
                <FileText className="h-4 w-4 text-blue-500 mr-2" />
                style.css
                <Badge variant="secondary" className="ml-2 text-xs">Styles + Variables</Badge>
              </div>
              <div className="flex items-center text-gray-700">
                <FileCode className="h-4 w-4 text-purple-500 mr-2" />
                script.js
                <Badge variant="secondary" className="ml-2 text-xs">Logique + Composants</Badge>
              </div>
              <div className="flex items-center text-gray-700">
                <File className="h-4 w-4 text-gray-500 mr-2" />
                README.md
                <Badge variant="secondary" className="ml-2 text-xs">Documentation</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <h5 className="font-medium text-blue-900 mb-2">Composants Sélectionnés ({totalComponents})</h5>
          <div className="space-y-2 text-sm">
            {selectedFormComponents.length > 0 && (
              <div>
                <span className="font-medium text-blue-800">Formulaires:</span>
                <ul className="text-blue-700 ml-2">
                  {selectedFormComponents.map((component, index) => (
                    <li key={index}>• {component}</li>
                  ))}
                </ul>
              </div>
            )}
            {selectedBusinessComponents.length > 0 && (
              <div>
                <span className="font-medium text-blue-800">Métier:</span>
                <ul className="text-blue-700 ml-2">
                  {selectedBusinessComponents.map((component, index) => (
                    <li key={index}>• {component}</li>
                  ))}
                </ul>
              </div>
            )}
            {selectedUIComponents.length > 0 && (
              <div>
                <span className="font-medium text-blue-800">UI:</span>
                <ul className="text-blue-700 ml-2">
                  {selectedUIComponents.map((component, index) => (
                    <li key={index}>• {component}</li>
                  ))}
                </ul>
              </div>
            )}
            {totalComponents === 0 && (
              <p className="text-blue-600 italic">Aucun composant sélectionné</p>
            )}
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <h5 className="font-medium text-green-900 mb-2">Logiques Métier</h5>
          {selectedBusiness.length > 0 ? (
            <ul className="text-sm text-green-700 space-y-1">
              {selectedBusiness.map((business, index) => (
                <li key={index}>• {business}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-green-600 italic">Aucune logique métier sélectionnée</p>
          )}
        </div>
      </div>
    </div>
  );
}
