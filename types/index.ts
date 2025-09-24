export interface Car {
  Name: string;
  Model: string;
  Image: string;
  Price: number;
  Location: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  cars?: Car[];
}

export interface SearchFilters {
  brand?: string;
  model?: string;
  maxPrice?: number;
  minPrice?: number;
  location?: string;
}

export interface SearchResult {
  cars: Car[];
  message: string;
  suggestions?: string[];
}