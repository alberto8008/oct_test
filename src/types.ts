export interface CurrencyRate {
    country: string;
    code: string; // Currency code (e.g., 'EUR')
    rate: number;
    date: string; // Date of the rate
  }
  
  export interface CurrencyResponse {
    [key: string]: {
      code: string;
      name: string;
      rate: number;
      date: string;
    };
  }
  