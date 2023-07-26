export interface IGenericResponse {
  status: string;
  message: string;
}

export interface ISourceLabel {
  text: string;
  checked: boolean;
}

export interface IInputBox {
  label: string;
  description: string;
}

export interface IExportOptions {
  text: string;
  checked: boolean;
}

export interface IProductModule {
  name: string;
  description: string;
  source_labels: ISourceLabel[];
  input_box: IInputBox;
  export_options: IExportOptions[];
}

export interface IProduct {
  type: string;
  name: string;
  modules: IProductModule[];
}
