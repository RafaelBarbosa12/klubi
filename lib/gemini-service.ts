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
    
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  async searchCars(query: string, cars: Car[]): Promise<SearchResult> {
    const prompt = this.createSearchPrompt(query, cars);
    
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return this.parseGeminiResponse(text, cars);
    } catch (error) {
      console.error('Erro ao buscar carros:', error);
      return this.fallbackSearch(query, cars);
    }
  }

  private createSearchPrompt(query: string, cars: Car[]): string {
    return `
Você é um consultor especialista em vendas de carros. Analise a consulta do usuário e encontre os melhores carros da base de dados.

BASE DE DADOS:
${JSON.stringify(cars, null, 2)}

CONSULTA DO USUÁRIO: "${query}"

INSTRUÇÕES:
1. Encontre carros que correspondam à consulta do usuário
2. Se não houver correspondência exata, sugira alternativas próximas
3. Considere: marca, modelo, preço, localização
4. Seja conversacional e persuasivo
5. Explique por que está sugerindo cada carro
6. Se o preço for maior que o orçamento, justifique o valor
7. Se a localização for diferente, sugira cidades próximas

FORMATO DA RESPOSTA:
{
  "cars": [IDs dos carros recomendados],
  "message": "Mensagem conversacional explicando as recomendações",
  "suggestions": ["Sugestão 1", "Sugestão 2"]
}

Retorne APENAS o JSON válido, sem texto adicional.
`;
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