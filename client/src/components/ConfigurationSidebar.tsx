import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Settings, FileCode, Puzzle, Calculator, Wand2, Layout, FormInput, MousePointer } from 'lucide-react';
import { ProjectConfig } from '@/types/project';
import { useState } from 'react';

interface ConfigurationSidebarProps {
  config: ProjectConfig;
  onUpdateConfig: (updates: Partial<ProjectConfig>) => void;
  onUpdateStructure: (updates: Partial<ProjectConfig['structure']>) => void;
  onUpdateFormComponents: (updates: Partial<ProjectConfig['formComponents']>) => void;
  onUpdateBusinessComponents: (updates: Partial<ProjectConfig['businessComponents']>) => void;
  onUpdateUIComponents: (updates: Partial<ProjectConfig['uiComponents']>) => void;
  onUpdateBusiness: (updates: Partial<ProjectConfig['business']>) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export default function ConfigurationSidebar({
  config,
  onUpdateConfig,
  onUpdateStructure,
  onUpdateFormComponents,
  onUpdateBusinessComponents,
  onUpdateUIComponents,
  onUpdateBusiness,
  onGenerate,
  isGenerating,
}: ConfigurationSidebarProps) {
  const [openSections, setOpenSections] = useState({
    project: true,
    structure: true,
    forms: false,
    business: false,
    ui: false,
    logic: false,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const formComponentsData = [
    { key: 'textInput', label: 'Champ texte', desc: 'Input text basique avec validation' },
    { key: 'emailInput', label: 'Email', desc: 'Input email avec validation format' },
    { key: 'phoneInput', label: 'Téléphone', desc: 'Input téléphone avec masque' },
    { key: 'textarea', label: 'Textarea', desc: 'Zone de texte multiligne' },
    { key: 'select', label: 'Select (dropdown)', desc: 'Liste déroulante d\'options' },
    { key: 'radio', label: 'Radio', desc: 'Boutons radio exclusifs' },
    { key: 'checkbox', label: 'Checkbox', desc: 'Cases à cocher multiples' },
    { key: 'dateInput', label: 'Date', desc: 'Sélecteur de date' },
    { key: 'buttons', label: 'Boutons', desc: 'Submit, reset, actions' },
  ];

  const businessComponentsData = [
    { key: 'vatCalculator', label: 'Calculateur de TVA', desc: 'Calculs HT/TTC automatiques' },
    { key: 'priceSimulator', label: 'Simulateur de prix', desc: 'Calculs de prix avec remises' },
    { key: 'filterableTable', label: 'Tableau filtrable', desc: 'Table avec tri et recherche' },
    { key: 'csvExport', label: 'Export CSV', desc: 'Export des données en CSV' },
  ];

  const uiComponentsData = [
    { key: 'conditionalDisplay', label: 'Affichage conditionnel', desc: 'Masquer/afficher selon conditions' },
    { key: 'jsonDisplay', label: 'Affichage JSON', desc: 'Formatage JSON coloré' },
    { key: 'searchZone', label: 'Zone de recherche', desc: 'Barre de recherche avec filtres' },
    { key: 'pagination', label: 'Pagination', desc: 'Navigation entre pages' },
    { key: 'copyButton', label: 'Bouton copier', desc: 'Copie dans le presse-papiers' },
    { key: 'notifications', label: 'Notifications', desc: 'Alertes et messages toast' },
    { key: 'badges', label: 'Badges dynamiques', desc: 'Labels colorés avec statuts' },
    { key: 'progressBar', label: 'Barre de progression', desc: 'Indicateur de progression' },
    { key: 'fileUpload', label: 'Upload fichier', desc: 'Zone de glisser-déposer' },
    { key: 'counter', label: 'Compteur/chronomètre', desc: 'Compteur avec timer' },
    { key: 'richEditor', label: 'Éditeur enrichi', desc: 'Éditeur de texte avec formatage' },
    { key: 'modal', label: 'Modal simple', desc: 'Fenêtres modales réutilisables' },
  ];

  return (
    <aside className="w-80 bg-white border-r border-border min-h-screen p-6 overflow-y-auto">
      <div className="space-y-4">
        {/* Project Configuration */}
        <Collapsible open={openSections.project} onOpenChange={() => toggleSection('project')}>
          <Card>
            <CollapsibleTrigger asChild>
              <CardHeader className="pb-3 cursor-pointer hover:bg-gray-50">
                <CardTitle className="text-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <Settings className="h-5 w-5 text-primary mr-2" />
                    Configuration Projet
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${openSections.project ? 'rotate-180' : ''}`} />
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="project-name">Nom du projet</Label>
                  <Input
                    id="project-name"
                    value={config.name}
                    onChange={(e) => onUpdateConfig({ name: e.target.value })}
                    placeholder="mon-mini-outil"
                  />
                </div>
                <div>
                  <Label htmlFor="project-description">Description</Label>
                  <Textarea
                    id="project-description"
                    value={config.description || ''}
                    onChange={(e) => onUpdateConfig({ description: e.target.value })}
                    placeholder="Description courte du projet"
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="project-author">Auteur</Label>
                  <Input
                    id="project-author"
                    value={config.author || ''}
                    onChange={(e) => onUpdateConfig({ author: e.target.value })}
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <Label htmlFor="css-framework">Framework CSS</Label>
                  <Select value={config.cssFramework} onValueChange={(value: 'none' | 'bulma' | 'pico') => onUpdateConfig({ cssFramework: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un framework" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Vanilla CSS (aucun)</SelectItem>
                      <SelectItem value="bulma">Bulma CSS</SelectItem>
                      <SelectItem value="pico">Pico.css</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* HTML Structure */}
        <Collapsible open={openSections.structure} onOpenChange={() => toggleSection('structure')}>
          <Card>
            <CollapsibleTrigger asChild>
              <CardHeader className="pb-3 cursor-pointer hover:bg-gray-50">
                <CardTitle className="text-md flex items-center justify-between">
                  <div className="flex items-center">
                    <Layout className="h-4 w-4 text-orange-500 mr-2" />
                    Structure HTML
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${openSections.structure ? 'rotate-180' : ''}`} />
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-2">
                {Object.entries(config.structure).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={`structure-${key}`}
                      checked={value}
                      onCheckedChange={(checked) => 
                        onUpdateStructure({ [key]: checked as boolean })
                      }
                    />
                    <Label htmlFor={`structure-${key}`} className="text-sm">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Label>
                  </div>
                ))}
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Form Components */}
        <Collapsible open={openSections.forms} onOpenChange={() => toggleSection('forms')}>
          <Card>
            <CollapsibleTrigger asChild>
              <CardHeader className="pb-3 cursor-pointer hover:bg-gray-50">
                <CardTitle className="text-md flex items-center justify-between">
                  <div className="flex items-center">
                    <FormInput className="h-4 w-4 text-green-500 mr-2" />
                    Composants de Formulaire ({Object.values(config.formComponents).filter(Boolean).length}/9)
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${openSections.forms ? 'rotate-180' : ''}`} />
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-2">
                {formComponentsData.map(({ key, label, desc }) => (
                  <div key={key} className="border border-border rounded-lg p-2 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id={`form-${key}`}
                        checked={config.formComponents[key as keyof ProjectConfig['formComponents']]}
                        onCheckedChange={(checked) => 
                          onUpdateFormComponents({ [key]: checked as boolean })
                        }
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label htmlFor={`form-${key}`} className="text-sm font-medium">
                          {label}
                        </Label>
                        <p className="text-xs text-secondary mt-1">{desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Business Components */}
        <Collapsible open={openSections.business} onOpenChange={() => toggleSection('business')}>
          <Card>
            <CollapsibleTrigger asChild>
              <CardHeader className="pb-3 cursor-pointer hover:bg-gray-50">
                <CardTitle className="text-md flex items-center justify-between">
                  <div className="flex items-center">
                    <Calculator className="h-4 w-4 text-blue-500 mr-2" />
                    Composants Métier ({Object.values(config.businessComponents).filter(Boolean).length}/4)
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${openSections.business ? 'rotate-180' : ''}`} />
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-2">
                {businessComponentsData.map(({ key, label, desc }) => (
                  <div key={key} className="border border-border rounded-lg p-2 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id={`business-${key}`}
                        checked={config.businessComponents[key as keyof ProjectConfig['businessComponents']]}
                        onCheckedChange={(checked) => 
                          onUpdateBusinessComponents({ [key]: checked as boolean })
                        }
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label htmlFor={`business-${key}`} className="text-sm font-medium">
                          {label}
                        </Label>
                        <p className="text-xs text-secondary mt-1">{desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* UI Components */}
        <Collapsible open={openSections.ui} onOpenChange={() => toggleSection('ui')}>
          <Card>
            <CollapsibleTrigger asChild>
              <CardHeader className="pb-3 cursor-pointer hover:bg-gray-50">
                <CardTitle className="text-md flex items-center justify-between">
                  <div className="flex items-center">
                    <MousePointer className="h-4 w-4 text-purple-500 mr-2" />
                    Composants UI ({Object.values(config.uiComponents).filter(Boolean).length}/12)
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${openSections.ui ? 'rotate-180' : ''}`} />
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-2">
                {uiComponentsData.map(({ key, label, desc }) => (
                  <div key={key} className="border border-border rounded-lg p-2 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id={`ui-${key}`}
                        checked={config.uiComponents[key as keyof ProjectConfig['uiComponents']]}
                        onCheckedChange={(checked) => 
                          onUpdateUIComponents({ [key]: checked as boolean })
                        }
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label htmlFor={`ui-${key}`} className="text-sm font-medium">
                          {label}
                        </Label>
                        <p className="text-xs text-secondary mt-1">{desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Business Logic */}
        <Collapsible open={openSections.logic} onOpenChange={() => toggleSection('logic')}>
          <Card>
            <CollapsibleTrigger asChild>
              <CardHeader className="pb-3 cursor-pointer hover:bg-gray-50">
                <CardTitle className="text-md flex items-center justify-between">
                  <div className="flex items-center">
                    <Puzzle className="h-4 w-4 text-red-500 mr-2" />
                    Logiques Métier
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${openSections.logic ? 'rotate-180' : ''}`} />
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-3">
                {[
                  { key: 'vat', label: 'Calculs TVA', desc: 'Calculs HT/TTC avec taux configurables' },
                  { key: 'conversions', label: 'Conversions', desc: 'Unités, devises, formats de date' },
                  { key: 'export', label: 'Export CSV/JSON', desc: 'Export des données en différents formats' },
                  { key: 'localStorage', label: 'Persistance Local', desc: 'Sauvegarde localStorage/sessionStorage' },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="border border-border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id={`business-${key}`}
                        checked={config.business[key as keyof ProjectConfig['business']]}
                        onCheckedChange={(checked) => 
                          onUpdateBusiness({ [key]: checked as boolean })
                        }
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label htmlFor={`business-${key}`} className="text-sm font-medium">
                          {label}
                        </Label>
                        <p className="text-xs text-secondary mt-1">{desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Generate Button */}
        <Button 
          onClick={onGenerate}
          disabled={isGenerating || !config.name.trim()}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
        >
          <Wand2 className="h-4 w-4 mr-2" />
          {isGenerating ? 'Génération...' : 'Générer le Projet'}
        </Button>
      </div>
    </aside>
  );
}