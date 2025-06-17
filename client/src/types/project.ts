export interface ProjectStructure {
  header: boolean;
  nav: boolean;
  main: boolean;
  sidebar: boolean;
  footer: boolean;
}

export interface FormComponents {
  textInput: boolean;
  emailInput: boolean;
  phoneInput: boolean;
  textarea: boolean;
  select: boolean;
  radio: boolean;
  checkbox: boolean;
  dateInput: boolean;
  buttons: boolean;
}

export interface BusinessComponents {
  vatCalculator: boolean;
  priceSimulator: boolean;
  filterableTable: boolean;
  csvExport: boolean;
}

export interface UIComponents {
  conditionalDisplay: boolean;
  jsonDisplay: boolean;
  searchZone: boolean;
  pagination: boolean;
  copyButton: boolean;
  notifications: boolean;
  badges: boolean;
  progressBar: boolean;
  fileUpload: boolean;
  counter: boolean;
  richEditor: boolean;
  modal: boolean;
}

export interface ProjectBusiness {
  vat: boolean;
  conversions: boolean;
  export: boolean;
  localStorage: boolean;
}

export interface ProjectConfig {
  name: string;
  description?: string;
  author?: string;
  cssFramework: 'none' | 'bulma' | 'pico';
  structure: ProjectStructure;
  formComponents: FormComponents;
  businessComponents: BusinessComponents;
  uiComponents: UIComponents;
  business: ProjectBusiness;
}

export interface GenerationProgress {
  step: string;
  percentage: number;
  message: string;
}

export type TabType = 'structure' | 'preview' | 'files';
export type FileType = 'html' | 'css' | 'js' | 'readme';
