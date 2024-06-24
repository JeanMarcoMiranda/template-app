//login-register
export interface AuthResponse {
  user: User;
  access: string;
  refresh: string;
  detail?: string;
  error?: string;
}

export interface RegisterResponse {
  user: User;
  access: string;
  refresh: string;
  detail?: string;
  error?: string;
}

//user
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  birth_date: string;
  url_linkedin: string | null;
  photo: string | null;
  street: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country: string | null;
}

// company
export interface Company {
  id?: number;
  name: string;
  ruc: string;
  pay_condition: string;
  created?: string;
  deleted?: boolean;
  slug: string;
  address: string;
  district: number;
  province: number;
  department: number;
  country: number;
  long?: number;
  lat?: number;
  portada?: string;
  logo?: string;
  logo_alternative?: string;
  show_logo?: boolean;
  delivery_aviable?: boolean;
  phone?: string;
  mobile?: string;
  description?: string;
  information?: string;
  status?: boolean;
  category_restaurant?: number[];
  public_key?: string;
  private_key?: string;
  allow_back_home?: boolean;
  admin_company?: number[];
  info_payment_method?: string;
  color?: string;
}

//menu
export interface Item {
  id: number;
  name: string;
  description?: string;
  company: number[];
  price: string;
  discount_price?: string;
  category: number;
  product?: 'DIETA' | 'VEGET' | 'CONVE';
  product_type?: 'DESAY' | 'ALMUE' | 'CENAC';
  image?: string;
  stock: number;
  status: boolean;
  deliverable: boolean;
  order?: number;
}


// department
export interface Department {
  id: number;
  name: string;
}

// province
export interface Province {
  id: number;
  name: string;
  department: number;
}

// district
export interface District {
  id: number;
  name: string;
  province: number;
}

//cookies
export interface UserCookiesContextType {
  saveUser: (user: User) => void;
  removeUser: () => void;
  getUser: () => User | null;
  saveAccessToken: (token: string) => void;
  removeAccessToken: () => void;
  getAccessToken: () => string | undefined;
  saveRefreshToken: (token: string) => void;
  removeRefreshToken: () => void;
  getRefreshToken: () => string | undefined;
  removeSession: () => void;
}

// types.ts
export interface AxiosErrorResponse {
  response: {
    data: {
      [key: string]: string[];
    };
  };
}

export interface Category {
  id: number;
  week_day?: 'LU' | 'MA' | 'MI' | 'JU' | 'VI' | 'SA' | 'DO';
  the_cart?: number | null;
  items: Item[];
}