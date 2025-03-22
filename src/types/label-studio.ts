export interface LabelStudioConstructor {
  new (root: string, options: LabelStudioOptions): LabelStudioInstance;
}

declare global {
  interface Window {
    LabelStudio?: {
      new (root: string, options: LabelStudioOptions): LabelStudioInstance;
    };
  }
}

export interface LabelStudioOptions {
  config: string;
  task: LabelStudioTask;
  interfaces: string[];
  user: LabelStudioUser;
}

export interface LabelStudioTask {
  annotations: Array<Record<string, unknown>>;
  predictions: Array<Record<string, unknown>>;
  id: number;
  data: Record<string, unknown>;
}

export interface LabelStudioUser {
  pk: number;
  firstName: string;
  lastName: string;
}

export interface LabelStudioInstance {
  on: (event: string, callback: (...args: any[]) => void) => void;
  annotationStore: {
    addAnnotation: (options: { userGenerate: boolean }) => { id: string };
    selectAnnotation: (id: string) => void;
  };
}
