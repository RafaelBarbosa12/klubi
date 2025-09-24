// Teste manual da API do Gemini
// Execute: node test-gemini.js

const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGemini() {
  const apiKey = 'AIzaSyDdZGSZeFdPZbxZ6uDiGjnnV-81i1AJaKk';
  
  console.log('Testando API Key do Gemini...');
  
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = 'Diga olá em português';
    
    console.log('Enviando teste...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ Sucesso! Resposta:', text);
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
    
    if (error.message.includes('API key not valid')) {
      console.log('\n🔧 Possíveis soluções:');
      console.log('1. Verifique se a chave foi copiada corretamente');
      console.log('2. Confirme se a API está habilitada no Google Cloud');
      console.log('3. Aguarde alguns minutos (APIs novas podem demorar)');
      console.log('4. Verifique se não há restrições de IP/domínio');
    }
  }
}

testGemini();