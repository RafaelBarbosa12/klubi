#!/bin/bash
# Setup script para Windows (PowerShell)

echo "🚗 Configurando Car Search AI..."

# Verificar se Node.js está instalado
node --version || {
    echo "❌ Node.js não encontrado. Instale Node.js 18+ primeiro."
    exit 1
}

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

# Configurar variáveis de ambiente
if [ ! -f .env.local ]; then
    echo "⚙️ Configurando variáveis de ambiente..."
    cp .env.local.example .env.local
    echo "🔑 IMPORTANTE: Configure sua GEMINI_API_KEY em .env.local"
    echo "   1. Acesse https://makersuite.google.com/app/apikey"
    echo "   2. Crie uma API key gratuita"
    echo "   3. Substitua 'your_gemini_api_key_here' pela sua chave"
fi

echo "✅ Setup completo!"
echo "🚀 Execute 'npm run dev' para iniciar o projeto"
echo "🌐 Abra http://localhost:3000 no seu navegador"