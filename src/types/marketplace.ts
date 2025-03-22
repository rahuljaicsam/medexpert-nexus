export interface Dataset {
  id: string;
  title: string;
  description: string;
  type: string;
  size: string;
  price: number;
  format: string[];
  preview: string;
  compliance: string[];
  downloads: number;
  rating: number;
}
