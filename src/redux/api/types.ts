export interface IGenericResponse {
  status: string;
  message: string;
}

export interface IProduct {
  product_name: string;
  product_module: string;
  module_description: string;
  source_check: string[];
  source_text: string;
  source_image: string;
  source_url: string;
  input_box_title: string;
  input_box_description: string;
  export_check: string[];
  export_word: string;
  export_pdf: string;
  export_text: string;
}

export interface IProductHeadings {
  product_name: string;
  product_module: string;
}
