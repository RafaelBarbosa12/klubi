# 🚗 Car Search AI - Buscador Inteligente de Carros

Um assistente de IA para busca de carros desenvolvido com Next.js 14, TypeScript e Google Gemini AI.

## 🎯 Demonstração

![Car Search AI](https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop)

**Funcionalidades:**
- 🤖 Chat inteligente com IA
- 🔍 Busca semântica avançada 
- 💡 Recomendações personalizadas
- 📱 Interface responsiva
- ⚡ Respostas em tempo real

## 🚀 Como Executar o Projeto

### **1. Pré-requisitos**
- Node.js 18+ 
- npm ou yarn
- Chave da API do Google Gemini

### **2. Instalação**

```bash
# Clone o repositório
git clone <seu-repositorio>
cd tech-challenge

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.local.example .env.local
```

### **3. Configuração do Google Gemini**

1. Acesse [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Crie uma API Key gratuita
3. Adicione no arquivo `.env.local`:

```bash
GEMINI_API_KEY=sua_chave_aqui
```

### **4. Executar o Projeto**

```bash
# Modo desenvolvimento
npm run dev

# Abra no navegador
# http://localhost:3000
```

## 🏗️ Arquitetura do Projeto

```
/
├── app/                    # App Router (Next.js 14)
│   ├── api/search/         # API route para busca
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Página inicial
│   └── globals.css         # Estilos globais
├── components/             # Componentes React
│   ├── CarCard.tsx         # Card do carro
│   └── ChatInterface.tsx   # Interface de chat
├── lib/                    # Utilitários
│   └── gemini-service.ts   # Serviço do Gemini AI
├── types/                  # Definições TypeScript
│   └── index.ts            # Interfaces principais
├── data/                   # Base de dados
│   └── cars.json           # Dados dos carros
└── README.md               # Este arquivo
```

## 🧠 Lógica da IA

### **Fluxo de Busca:**

1. **Input do usuário** → Prompt estruturado
2. **Gemini AI** → Análise semântica 
3. **Matching** → Busca na base de dados
4. **Response** → Recomendações + explicações

### **Casos de Uso Tratados:**

- ✅ **Match exato**: "BYD Dolphin em São Paulo"
- 💰 **Preço diferente**: Sugere alternativas próximas
- 🌍 **Localização diferente**: Sugere cidades próximas
- 🔄 **Sem match**: Recomenda baseado em preferências

## 💡 Decisões Técnicas

### **Por que Next.js 14?**
- **App Router**: Arquitetura moderna
- **API Routes**: Backend integrado
- **TypeScript**: Type safety
- **Deploy fácil**: Vercel integration

### **Por que Google Gemini?**
- **Gratuito**: 15 requests/minuto 
- **Qualidade**: Excelente para NLP
- **Sem setup complexo**: Plug & play

### **Por que Tailwind CSS?**
- **Desenvolvimento rápido**
- **Design system consistente**
- **Responsividade built-in**

## 🎨 Experiência do Usuário

### **Interface Conversacional**
- Chat natural e intuitivo
- Feedback visual (loading, animações)
- Cards visuais dos carros
- Modal de interesse

### **Inteligência Contextual**
- Entende linguagem natural
- Mantém contexto da conversa
- Sugere alternativas inteligentes
- Explica recomendações

## 📦 Deploy

### **Vercel (Recomendado)**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Configure environment variables no dashboard
```

### **Outras Opções**
- Netlify
- Railway
- Digital Ocean App Platform

## 🧪 Casos de Teste

### **Teste 1: Busca Exata** ✅
```
Input: "Quero um BYD Dolphin em São Paulo"
Expected: Retorna o BYD Dolphin exato
Status: ✅ Funcionando
```

### **Teste 2: Preço Diferente** 💰
```
Input: "BYD Dolphin por até R$ 80 mil"
Expected: Sugere o carro + justificativa de preço
Status: ✅ Funcionando
```

### **Teste 3: Localização Diferente** 🌍
```
Input: "Honda Civic em Brasília"  
Expected: Sugere o Civic no RJ + cidades próximas
Status: ✅ Funcionando
```

## 💼 Plano de Negócios

### **1. Modelo de Negócios**
- **B2B2C**: Parcerias com concessionárias
- **Comissão por venda**: 2-3% do valor do veículo
- **Lead generation**: R$ 50-100 por lead qualificado
- **Plano premium**: Funcionalidades avançadas para revendas

### **2. Estratégia de Aquisição**
- **SEO**: "comprar carro usado", "carros baratos"
- **Google Ads**: Segmentação por intenção de compra
- **Partnerships**: Concessionárias, financeiras
- **Social Media**: TikTok/Instagram com demonstrações

### **3. Estimativa de CAC**
- **Orgânico (SEO)**: R$ 15-25 por usuário
- **Paid Ads**: R$ 35-50 por usuário  
- **Referral**: R$ 10-15 por usuário
- **Meta CAC**: R$ 30/usuário

### **4. LTV (Lifetime Value)**
- **Comissão média**: R$ 2.500 por venda
- **Taxa de conversão**: 5-8%
- **LTV estimado**: R$ 125-200 por usuário
- **Ratio LTV/CAC**: 4-6x (saudável)

### **5. Monetização**
- **Comissões**: 70% da receita
- **Leads premium**: 20% da receita  
- **Publicidade**: 8% da receita
- **SaaS (ferramentas B2B)**: 2% da receita

### **6. Retenção de Usuários**
- **Alertas de preço**: Notifica quando carro desejado baixa preço
- **Comparação de mercado**: Análises mensais de preços
- **Troca programada**: "Seu carro vale X, que tal um upgrade?"
- **Gamificação**: Pontos por interações, cashback

## 🚀 Próximos Passos

### **Fase 2 (1-2 semanas)**
- [ ] Filtros avançados (ano, km, combustível)
- [ ] Comparação side-by-side
- [ ] Sistema de favoritos
- [ ] Notificações push

### **Fase 3 (1 mês)**
- [ ] Integração com APIs de concessionárias
- [ ] Sistema de agendamento de test-drive
- [ ] Chat com vendedores reais
- [ ] Avaliação de veículos para troca

## 🔧 Troubleshooting

### **Erro de API Key**
```
Error: GEMINI_API_KEY não encontrada
```
**Solução**: Verifique o arquivo `.env.local`

### **Erro de CORS**
```
CORS policy error
```
**Solução**: Verifique se está usando `http://localhost:3000`

## 📞 Contato

**Desenvolvido por:** [Seu Nome]  
**Email:** [seu@email.com]  
**LinkedIn:** [linkedin.com/in/seu-perfil]

---

**⭐ Se gostou do projeto, deixe uma estrela no GitHub!**