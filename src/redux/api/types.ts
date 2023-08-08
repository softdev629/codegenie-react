export interface IGenericResponse {
  status: string;
  message: string;
}

export interface IProduct {
  id: string;
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
  plan_details: IPlanDetail[] | null;
}

export interface IProductHeadings {
  _id: string;
  product_name: string;
  product_module: string;
}

export interface IPlanDetail {
  plan_name: string;
  total_wishes: number;
  price: string;
  period: string;
}

export interface IPrompt {
  _id: string;
  product: string;
  plan: string;
  module: string;
  prompt_name: string;
  order: number;
  prompt: string;
}

export interface IPromptAcceptSchema {
  _id: string;
  product_name: string;
  product_module: string;
  plan: string;
  prompt_name: string;
  order: number;
  prompt: string;
}

export interface IPromptRunSchema {
  product_name: string;
  product_module: string;
  code: string;
}

export interface ISocialSignupSchema {
  provider: string;
  email?: string | null;
  username?: string | null;
  name: string;
}

export interface ISigninReseponseSchema {
  access_token: string;
  role: string;
  verified: boolean;
}

export interface IUser {
  provider: string;
  name: string;
  email: string | null;
  role: string;
  username: string | null;
}
