import { GoogleGenerativeAI } from '@google/generative-ai';
import { Car, SearchResult } from '@/types';

export class GeminiCarSearchService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY não encontrada nas variáveis de ambiente');
    }
    
    console.log('Inicializando Gemini com API Key:', apiKey.substring(0, 10) + '...');
    
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 1000,
      }
    });
  }

  async searchCars(query: string, cars: Car[]): Promise<SearchResult> {
    const prompt = this.createSearchPrompt(query, cars);
    
    try {
      console.log('Enviando requisição para Gemini...');
      const result = await this.model.generateContent({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      });
      
      const response = await result.response;
      const text = response.text();
      console.log('Resposta do Gemini:', text.substring(0, 100) + '...');
      
      return this.parseGeminiResponse(text, cars);
    } catch (error) {
      console.error('Erro ao buscar carros:', error);
      return this.fallbackSearch(query, cars);
    }
  }

  private createSearchPrompt(query: string, cars: Car[]): string {
    return `Você é um consultor especialista em vendas de carros. Analise a consulta e retorne carros relevantes.

BASE DE DADOS (${cars.length} carros):
${cars.map((car, index) => `${index}: ${car.Name} ${car.Model} - R$ ${car.Price} - ${car.Location}`).join('\n')}

CONSULTA: "${query}"

Retorne apenas um JSON válido:
{
  "cars": [0, 1, 2],
  "message": "Mensagem amigável explicando as recomendações",
  "suggestions": ["Sugestão 1", "Sugestão 2"]
}`;
  }

  private parseGeminiResponse(text: string, cars: Car[]): SearchResult {
    try {
      // Limpa a resposta para extrair apenas o JSON
      const cleanText = text.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleanText);
      
      // Mapeia os IDs para objetos Car
      const resultCars = parsed.cars?.map((id: number) => cars[id]).filter(Boolean) || [];
      
      return {
        cars: resultCars,
        message: parsed.message || 'Encontrei algumas opções para você!',
        suggestions: parsed.suggestions || []
      };
    } catch (error) {
      console.error('Erro ao parsear resposta do Gemini:', error);
      return {
        cars: [],
        message: 'Desculpe, houve um problema ao processar sua busca. Tente novamente.',
        suggestions: []
      };
    }
  }

  private fallbackSearch(query: string, cars: Car[]): SearchResult {
    const queryLower = query.toLowerCase();
    
    // Busca simples por palavras-chave
    const matchedCars = cars.filter(car => {
      const carText = `${car.Name} ${car.Model} ${car.Location}`.toLowerCase();
      return carText.includes(queryLower) || 
             queryLower.includes(car.Name.toLowerCase()) ||
             queryLower.includes(car.Model.toLowerCase());
    });

    if (matchedCars.length > 0) {
      return {
        cars: matchedCars.slice(0, 3), // Limita a 3 resultados
        message: `Encontrei ${matchedCars.length} opção(ões) para você!`,
        suggestions: ['Ver mais detalhes', 'Buscar modelos similares']
      };
    }

    // Se não encontrar nada, sugere carros mais baratos
    const cheapestCars = cars.sort((a, b) => a.Price - b.Price).slice(0, 3);
    
    return {
      cars: cheapestCars,
      message: 'Não encontrei exatamente o que você procura, mas aqui estão algumas opções interessantes:',
      suggestions: ['Ajustar orçamento', 'Ver outras marcas']
    };
  }
}