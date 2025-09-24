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

    // Tentar Gemini primeiro, fallback garantido para busca local
    try {
      const geminiService = new GeminiCarSearchService();
      const result = await geminiService.searchCars(message, carsData);
      console.log('✅ [API] Gemini funcionou!');
      return NextResponse.json({
        ...result,
        message: `🤖 ${result.message}`
      });
    } catch (geminiError) {
      console.log('🔄 [API] Gemini falhou, usando FALLBACK INTELIGENTE para:', message);
      
      const searchService = new FallbackCarSearchService();
      const result = searchService.searchCars(message, carsData);
      console.log('✅ [API] Fallback executado com sucesso!');
      
      return NextResponse.json({
        ...result,
        message: `🤖 ${result.message}`
      });
    }

  } catch (error) {
    console.error('💥 [API] ERRO GERAL:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}