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

    console.log('� [API] SEMPRE USAR FALLBACK para:', message);
    
    // FORÇAR USO DO FALLBACK SEMPRE
    const searchService = new FallbackCarSearchService();
    console.log('🔧 [API] Instanciando FallbackCarSearchService...');
    
    const result = searchService.searchCars(message, carsData);
    console.log('✅ [API] Resultado do fallback:', result);
    
    return NextResponse.json({
      ...result,
      message: `🤖 ${result.message}`
    });

  } catch (error) {
    console.error('💥 [API] ERRO GERAL:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}