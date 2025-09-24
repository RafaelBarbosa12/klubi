import { Car, SearchResult } from '@/types';

export class FallbackCarSearchService {
  
  // Base de conhecimento expandida
  private readonly BRANDS = {
    'byd': ['byd'],
    'toyota': ['toyota'],
    'honda': ['honda'],
    'volkswagen': ['volkswagen', 'vw', 'volks'],
    'chevrolet': ['chevrolet', 'chevy', 'gm'],
    'hyundai': ['hyundai', 'hb20', 'hb'],
    'renault': ['renault'],
    'fiat': ['fiat'],
    'jeep': ['jeep'],
    'peugeot': ['peugeot']
  };

  private readonly MODELS = {
    'dolphin': ['dolphin'],
    'corolla': ['corolla'],
    'civic': ['civic'],
    't-cross': ['t-cross', 'tcross', 't cross'],
    'onix': ['onix'],
    'hb20': ['hb20', 'hb-20', 'hb 20'],
    'kwid': ['kwid'],
    'pulse': ['pulse'],
    'renegade': ['renegade'],
    '208': ['208', 'peugeot 208']
  };

  private readonly LOCATIONS = {
    'sao paulo': ['sao paulo', 'são paulo', 'sp', 'sampa'],
    'rio de janeiro': ['rio de janeiro', 'rio', 'rj'],
    'campinas': ['campinas'],
    'belo horizonte': ['belo horizonte', 'bh', 'mg'],
    'curitiba': ['curitiba', 'cwb', 'pr'],
    'porto alegre': ['porto alegre', 'poa', 'rs']
  };

  private readonly PRICE_KEYWORDS = {
    'barato': { max: 80000, priority: 'lowest' },
    'economico': { max: 85000, priority: 'lowest' },
    'em conta': { max: 85000, priority: 'lowest' },
    'acessivel': { max: 90000, priority: 'lowest' },
    'popular': { max: 85000, priority: 'lowest' },
    'baixo custo': { max: 80000, priority: 'lowest' },
    'custo beneficio': { max: 100000, priority: 'balanced' },
    'caro': { min: 110000, priority: 'highest' },
    'premium': { min: 120000, priority: 'highest' },
    'luxo': { min: 120000, priority: 'highest' }
  };

  private readonly CAR_TYPES = {
    'suv': ['renegade', 't-cross'],
    'sedan': ['corolla', 'civic'],
    'hatch': ['onix', 'hb20', 'kwid', '208', 'pulse'],
    'compacto': ['onix', 'hb20', 'kwid', '208'],
    'familia': ['renegade', 't-cross', 'corolla', 'civic'],
    'urbano': ['onix', 'hb20', 'kwid', '208'],
    'eletrico': ['dolphin'],
    'sustentavel': ['dolphin'],
    'ecologico': ['dolphin']
  };

  searchCars(query: string, cars: Car[]): SearchResult {
    const queryLower = this.normalizeString(query);
    console.log('🔍 [FALLBACK] Buscando por:', query, '-> normalizado:', queryLower);
    
    // 1. Análise multi-critério avançada
    const filters = this.extractFilters(queryLower);
    console.log('📊 [FALLBACK] Filtros detectados:', JSON.stringify(filters, null, 2));
    
    // 2. Aplicar todos os filtros combinados
    let filteredCars = this.applyFilters(cars, filters);
    console.log('🚗 [FALLBACK] Carros após filtros:', filteredCars.map(c => `${c.Name} ${c.Model} - R$ ${c.Price}`));
    
    // 3. Ordenar por relevância e critérios
    filteredCars = this.rankResults(filteredCars, filters);
    console.log('⭐ [FALLBACK] Carros após ranking:', filteredCars.map(c => `${c.Name} ${c.Model} - R$ ${c.Price}`));
    
    // 4. Gerar resposta contextual
    if (filteredCars.length > 0) {
      return {
        cars: filteredCars.slice(0, 3),
        message: this.generateContextualMessage(query, filteredCars, filters),
        suggestions: this.generateSmartSuggestions(filters)
      };
    }

    // 5. Fallback inteligente
    return this.generateFallbackResponse(query, cars, filters);
  }

  private normalizeString(text: string): string {
    return text.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .replace(/[^\w\s]/g, ' ') // Remove pontuação
      .replace(/\s+/g, ' ') // Normaliza espaços
      .trim();
  }

  private extractFilters(query: string) {
    const filters = {
      brands: [] as string[],
      models: [] as string[],
      locations: [] as string[],
      priceRange: null as any,
      carTypes: [] as string[],
      hasMultipleCriteria: false
    };

    // Detectar marcas
    Object.entries(this.BRANDS).forEach(([brand, variations]) => {
      if (variations.some(variation => query.includes(variation))) {
        filters.brands.push(brand);
      }
    });

    // Detectar modelos
    Object.entries(this.MODELS).forEach(([model, variations]) => {
      if (variations.some(variation => query.includes(variation))) {
        filters.models.push(model);
      }
    });

    // Detectar localizações
    Object.entries(this.LOCATIONS).forEach(([location, variations]) => {
      if (variations.some(variation => query.includes(variation))) {
        filters.locations.push(location);
      }
    });

    // Detectar critérios de preço
    Object.entries(this.PRICE_KEYWORDS).forEach(([keyword, criteria]) => {
      if (query.includes(keyword)) {
        console.log(`💰 [FALLBACK] Detectado palavra-chave de preço: "${keyword}" -> critério:`, criteria);
        filters.priceRange = criteria;
      }
    });

    // Detectar tipos de carro
    Object.entries(this.CAR_TYPES).forEach(([type, models]) => {
      if (query.includes(type)) {
        filters.carTypes.push(type);
      }
    });

    // Verificar se tem múltiplos critérios
    const criteriaCount = [
      filters.brands.length,
      filters.models.length, 
      filters.locations.length,
      filters.priceRange ? 1 : 0,
      filters.carTypes.length
    ].filter(count => count > 0).length;

    filters.hasMultipleCriteria = criteriaCount > 1;

    return filters;
  }

  private applyFilters(cars: Car[], filters: any): Car[] {
    return cars.filter(car => {
      let matches = true;

      // Filtro por marca
      if (filters.brands.length > 0) {
        const carBrand = this.normalizeString(car.Name);
        const matchesBrand = filters.brands.some((brand: string) => 
          this.BRANDS[brand as keyof typeof this.BRANDS]?.some(variation => 
            carBrand.includes(variation)
          )
        );
        if (!matchesBrand) matches = false;
      }

      // Filtro por modelo
      if (filters.models.length > 0) {
        const carModel = this.normalizeString(car.Model);
        const matchesModel = filters.models.some((model: string) => 
          this.MODELS[model as keyof typeof this.MODELS]?.some(variation => 
            carModel.includes(variation)
          )
        );
        if (!matchesModel) matches = false;
      }

      // Filtro por localização
      if (filters.locations.length > 0) {
        const carLocation = this.normalizeString(car.Location);
        const matchesLocation = filters.locations.some((location: string) => 
          this.LOCATIONS[location as keyof typeof this.LOCATIONS]?.some(variation => 
            carLocation.includes(variation)
          )
        );
        if (!matchesLocation) matches = false;
      }

      // Filtro por preço
      if (filters.priceRange) {
        const { min, max } = filters.priceRange;
        if (min && car.Price < min) matches = false;
        if (max && car.Price > max) matches = false;
      }

      // Filtro por tipo de carro
      if (filters.carTypes.length > 0) {
        const carModel = this.normalizeString(car.Model);
        const matchesType = filters.carTypes.some((type: string) => {
          const typeModels = this.CAR_TYPES[type as keyof typeof this.CAR_TYPES];
          return typeModels?.some(model => carModel.includes(model));
        });
        if (!matchesType) matches = false;
      }

      return matches;
    });
  }

  private rankResults(cars: Car[], filters: any): Car[] {
    return cars.sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;

      // Score por critério de preço
      if (filters.priceRange?.priority === 'lowest') {
        scoreA += (150000 - a.Price) / 1000;
        scoreB += (150000 - b.Price) / 1000;
      } else if (filters.priceRange?.priority === 'highest') {
        scoreA += a.Price / 1000;
        scoreB += b.Price / 1000;
      }

      // Score por relevância de tipo
      if (filters.carTypes.length > 0) {
        const typeScore = 50;
        if (filters.carTypes.includes('familia') && ['renegade', 'corolla'].includes(a.Model.toLowerCase())) {
          scoreA += typeScore;
        }
        if (filters.carTypes.includes('familia') && ['renegade', 'corolla'].includes(b.Model.toLowerCase())) {
          scoreB += typeScore;
        }
      }

      return scoreB - scoreA;
    });
  }

  private generateContextualMessage(query: string, cars: Car[], filters: any): string {
    const count = cars.length;
    
    if (filters.hasMultipleCriteria) {
      let parts = [];
      if (filters.brands.length > 0) parts.push(`da marca ${filters.brands.join(' ou ')}`);
      if (filters.locations.length > 0) parts.push(`em ${filters.locations.join(' ou ')}`);
      if (filters.priceRange) parts.push('no seu orçamento');
      
      return `Perfeito! Encontrei ${count} opção(ões) ${parts.join(' ')}! 🎯 Esses carros atendem exatamente aos seus critérios combinados.`;
    }

    if (filters.priceRange?.priority === 'lowest') {
      return `Excelentes opções econômicas! 💰 Encontrei ${count} carro(s) com ótimo custo-benefício, ideais para quem busca economia.`;
    }

    if (filters.carTypes.includes('suv')) {
      return `Ótimas opções de SUV! 🚙 Encontrei ${count} veículo(s) espaçoso(s) e versátil(is), perfeitos para aventuras e conforto.`;
    }

    if (filters.carTypes.includes('familia')) {
      return `Perfeito para família! 👨‍👩‍👧‍👦 ${count} opção(ões) espaçosa(s) e segura(s), ideais para viagens e uso diário.`;
    }

    if (filters.brands.length > 0) {
      return `Ótima escolha de marca! ✨ Encontrei ${count} opção(ões) da ${filters.brands.join(' e ')}, conhecida(s) pela qualidade e confiabilidade.`;
    }

    if (filters.locations.length > 0) {
      return `Encontrei ${count} opção(ões) disponível(is) em ${filters.locations.join(' e ')}! 📍 Todos próximos a você.`;
    }

    return `Encontrei ${count} opção(ões) que combinam com o que você procura! 🚗`;
  }

  private generateSmartSuggestions(filters: any): string[] {
    const suggestions = ['Ver detalhes'];

    if (filters.priceRange?.priority === 'lowest') {
      suggestions.push('Ver financiamento', 'Comparar economia');
    }

    if (filters.carTypes.includes('familia')) {
      suggestions.push('Ver espaço interno', 'Comparar segurança');
    }

    if (filters.locations.length === 0) {
      suggestions.push('Ver outras cidades');
    }

    if (!filters.priceRange) {
      suggestions.push('Ajustar orçamento');
    }

    return suggestions;
  }

  private generateFallbackResponse(query: string, cars: Car[], filters: any): SearchResult {
    // Se tem filtro de preço mas não encontrou nada, relaxa o critério
    if (filters.priceRange) {
      const relaxedCars = cars.filter(car => {
        if (filters.priceRange.max) {
          return car.Price <= (filters.priceRange.max * 1.2); // 20% de tolerância
        }
        return true;
      }).sort((a, b) => a.Price - b.Price).slice(0, 3);

      if (relaxedCars.length > 0) {
        return {
          cars: relaxedCars,
          message: `Não encontrei exatamente na sua faixa, mas aqui estão opções próximas ao seu orçamento! 💡 Considere que o custo-benefício pode compensar.`,
          suggestions: ['Revisar orçamento', 'Ver financiamento', 'Comparar alternativas']
        };
      }
    }

    // Fallback geral: mix de preços
    const sortedByPrice = [...cars].sort((a, b) => a.Price - b.Price);
    const fallbackCars = [
      sortedByPrice[0], // Mais barato
      sortedByPrice[Math.floor(sortedByPrice.length / 2)], // Intermediário
      sortedByPrice[sortedByPrice.length - 1] // Mais caro
    ].filter(Boolean);

    return {
      cars: fallbackCars,
      message: `Baseado na sua busca, selecionei uma variedade de opções interessantes! 🎯 Cada uma tem suas vantagens específicas.`,
      suggestions: ['Refinar busca', 'Ver todas opções', 'Falar com consultor']
    };
  }
}