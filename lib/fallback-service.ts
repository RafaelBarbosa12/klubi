import { Car, SearchResult } from '@/types';

export class FallbackCarSearchService {
  
  searchCars(query: string, cars: Car[]): SearchResult {
    const queryLower = query.toLowerCase();
    
    // Busca por palavras-chave
    let matchedCars = cars.filter(car => {
      const carText = `${car.Name} ${car.Model} ${car.Location}`.toLowerCase();
      return carText.includes(queryLower) || 
             queryLower.includes(car.Name.toLowerCase()) ||
             queryLower.includes(car.Model.toLowerCase()) ||
             queryLower.includes(car.Location.toLowerCase());
    });

    // Busca por preço se mencionar valores
    const priceMatch = query.match(/(\d+\.?\d*)\s*(?:mil|k|reais?|r\$)/i);
    if (priceMatch) {
      const targetPrice = parseFloat(priceMatch[1]) * (query.includes('mil') || query.includes('k') ? 1000 : 1);
      const tolerance = targetPrice * 0.2; // 20% de tolerância
      
      const priceFilteredCars = cars.filter(car => 
        Math.abs(car.Price - targetPrice) <= tolerance
      );
      
      if (priceFilteredCars.length > 0) {
        matchedCars = [...matchedCars, ...priceFilteredCars];
      }
    }

    // Remove duplicatas
    const uniqueCars = matchedCars.filter((car, index, self) => 
      index === self.findIndex(c => c.Name === car.Name && c.Model === car.Model)
    );

    if (uniqueCars.length > 0) {
      return {
        cars: uniqueCars.slice(0, 3),
        message: this.generateResponseMessage(query, uniqueCars),
        suggestions: this.generateSuggestions(query, uniqueCars)
      };
    }

    // Se não encontrar nada, sugere carros mais baratos
    const cheapestCars = cars.sort((a, b) => a.Price - b.Price).slice(0, 3);
    
    return {
      cars: cheapestCars,
      message: 'Não encontrei exatamente o que você procura, mas aqui estão algumas opções interessantes que podem te interessar:',
      suggestions: ['Ver mais opções', 'Ajustar orçamento', 'Mudar localização']
    };
  }

  private generateResponseMessage(query: string, cars: Car[]): string {
    const queryLower = query.toLowerCase();
    
    if (cars.length === 1) {
      const car = cars[0];
      return `Perfeito! Encontrei o ${car.Name} ${car.Model} por ${this.formatPrice(car.Price)} em ${car.Location}. É exatamente o que você estava procurando! 🚗✨`;
    }

    if (queryLower.includes('barato') || queryLower.includes('econômico')) {
      return `Ótimas opções econômicas! Encontrei ${cars.length} carros que cabem no seu bolso. Todos são conhecidos pela economia e confiabilidade! 💰`;
    }

    if (queryLower.includes('suv') || queryLower.includes('família')) {
      return `Excelentes opções para família! Encontrei ${cars.length} veículos espaçosos e seguros. Perfeitos para quem precisa de conforto e praticidade! 👨‍👩‍👧‍👦`;
    }

    return `Encontrei ${cars.length} opções que combinam com o que você está procurando! Todas são excelentes escolhas com ótimo custo-benefício. 🎯`;
  }

  private generateSuggestions(query: string, cars: Car[]): string[] {
    const suggestions = ['Ver detalhes', 'Comparar preços'];
    
    const queryLower = query.toLowerCase();
    
    if (!queryLower.includes('são paulo')) {
      suggestions.push('Ver opções em São Paulo');
    }
    
    if (!queryLower.includes('usado')) {
      suggestions.push('Ver carros usados');
    }
    
    if (cars.some(car => car.Price > 100000)) {
      suggestions.push('Ver opções mais econômicas');
    }
    
    return suggestions;
  }

  private formatPrice(price: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  }
}