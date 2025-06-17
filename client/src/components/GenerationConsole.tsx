import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { GenerationProgress } from '@/types/project';

interface GenerationConsoleProps {
  progress: GenerationProgress;
  isGenerating: boolean;
}

export default function GenerationConsole({ progress, isGenerating }: GenerationConsoleProps) {
  const consoleRef = useRef<HTMLDivElement>(null);

  const getLogMessages = () => {
    const messages = [
      '[INFO] Agent Template v1.0 - Prêt à générer',
      '[INFO] Configuration chargée',
    ];

    if (isGenerating) {
      switch (progress.step) {
        case 'validating':
          messages.push('[INFO] Validation de la configuration...');
          break;
        case 'generating':
          messages.push('[INFO] Génération des templates HTML/CSS/JS...');
          break;
        case 'downloading':
          messages.push('[INFO] Préparation du fichier ZIP...');
          break;
        case 'complete':
          messages.push('[SUCCESS] Projet généré avec succès !');
          break;
        case 'error':
          messages.push(`[ERROR] ${progress.message}`);
          break;
      }
    } else {
      if (progress.step === 'ready') {
        messages.push('[WAIT] En attente de sélection...');
      }
    }

    return messages;
  };

  const clearConsole = () => {
    // This would reset the console in a real implementation
    console.log('Console cleared');
  };

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [progress, isGenerating]);

  const logMessages = getLogMessages();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Console de Génération</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearConsole}
            className="text-secondary hover:text-gray-900"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Effacer
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div 
          ref={consoleRef}
          className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm h-40 overflow-y-auto"
        >
          <div className="space-y-1">
            {logMessages.map((message, index) => (
              <div 
                key={index} 
                className={`
                  ${message.includes('[ERROR]') ? 'text-red-400' : ''}
                  ${message.includes('[SUCCESS]') ? 'text-green-400' : ''}
                  ${message.includes('[WAIT]') ? 'text-yellow-400' : ''}
                  ${message.includes('[INFO]') ? 'text-blue-400' : ''}
                `}
              >
                {message}
              </div>
            ))}
            {!isGenerating && progress.step === 'ready' && (
              <div className="text-gray-500 animate-pulse">_</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
