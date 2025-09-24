import { NextRequest, NextResponse } from 'next/server';
import { GeminiCarSearchService } from '@/lib/gemini-service';
import { FallbackCarSearchService } from '@/lib/fallback-service';
import carsData from '@/data/cars.json';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    
    if (!message) {
      return NextResponse.json(
        { error: 'Mensagem é obrigatória' },
        { status: 400 }
      );
    }

    // Usar Gemini AI (você já pagou por isso!)
    try {
      const geminiService = new GeminiCarSearchService();
      const result = await geminiService.searchCars(message, carsData);
      return NextResponse.json(result);
    } catch (geminiError) {
      console.log('Erro no Gemini, usando fallback:', geminiError);
      
      // Fallback apenas se a API falhar
      const fallbackService = new FallbackCarSearchService();
      const result = fallbackService.searchCars(message, carsData);
      
      return NextResponse.json({
        ...result,
        message: `⚠️ ${result.message}\n\n*IA temporariamente indisponível - usando busca local*`
      });
    }

  } catch (error) {
    console.error('Erro na API de busca:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}