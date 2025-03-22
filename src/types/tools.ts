export interface Tool {
  id: string;
  name: string;
  description: string;
  config?: string;
  instructions: string[];
}
