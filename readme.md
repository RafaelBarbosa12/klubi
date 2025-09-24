# 🚗 Buscador Inteligente de Carros - IA Assistant# 🚗 Buscador Inteligente de Carros - IA Assistant



Uma aplicação web moderna que utiliza Inteligência Artificial para busca inteligente de veículos, desenvolvida com Next.js 14 e TypeScript.Uma aplicação web moderna que utiliza Inteligência Artificial para busca inteligente de veículos, desenvolvida com Next.js 14 e TypeScript.



## 🎯 Visão Geral## 🎯 Visão Geral



Este projeto implementa um sistema de busca de carros que combina **consultor virtual com IA** e **busca semântica avançada**. A aplicação entende consultas em linguagem natural como "algo barato em São Paulo" ou "carro para família" e retorna resultados personalizados.Este projeto implementa um sistema de busca de carros que combina **consultor virtual com IA** e **busca semântica avançada**. A aplicação entende consultas em linguagem natural como "algo barato em São Paulo" ou "carro para família" e retorna resultados personalizados.



## ✨ Principais Funcionalidades## ✨ Principais Funcionalidades



### 🤖 IA Conversacional### 🤖 IA Conversacional

- **Chat interface** intuitiva com consultor virtual- **Chat interface** intuitiva com consultor virtual

- **Processamento de linguagem natural** para entender intenções- **Processamento de linguagem natural** para entender intenções

- **Respostas contextuais** personalizadas para cada busca- **Respostas contextuais** personalizadas para cada busca

- **Sugestões inteligentes** baseadas nos critérios do usuário- **Sugestões inteligentes** baseadas nos critérios do usuário



### 🔍 Busca Semântica Avançada### 🔍 Busca Semântica Avançada

- **Filtros por palavras-chave**: "barato", "caro", "econômico", "família", "SUV"- **Filtros por palavras-chave**: "barato", "caro", "econômico", "família", "SUV"

- **Busca por localização**: São Paulo, Rio de Janeiro, Campinas, etc.- **Busca por localização**: São Paulo, Rio de Janeiro, Campinas, etc.

- **Filtros de marca e modelo**: BYD, Toyota, Honda, Volkswagen, etc.- **Filtros de marca e modelo**: BYD, Toyota, Honda, Volkswagen, etc.

- **Ranking automático** por relevância e critérios específicos- **Ranking automático** por relevância e critérios específicos



### 💡 Sistema Híbrido de IA### 💡 Sistema Híbrido de IA

- **Google Gemini API** como sistema principal (quando disponível)- **Google Gemini API** como sistema principal (quando disponível)

- **Sistema de fallback inteligente** para garantir funcionamento contínuo- **Sistema de fallback inteligente** para garantir funcionamento contínuo

- **Logs detalhados** para monitoramento e debugging- **Logs detalhados** para monitoramento e debugging



## 🏗️ Arquitetura Técnica## 🏗️ Arquitetura Técnica



### Stack Principal### Stack Principal

- **Frontend**: Next.js 14 com App Router- **Frontend**: Next.js 14 com App Router

- **Linguagem**: TypeScript para type safety- **Linguagem**: TypeScript para type safety

- **Estilização**: Tailwind CSS com componentes responsivos- **Estilização**: Tailwind CSS com componentes responsivos

- **IA**: Google Gemini API + Sistema de fallback proprietário- **IA**: Google Gemini API + Sistema de fallback proprietário

- **Deploy**: Vercel (produção) + desenvolvimento local- **Deploy**: Vercel (produção) + desenvolvimento local



### Estrutura do Projeto### Estrutura do Projeto

``````

├── app/├── app/

│   ├── layout.tsx          # Layout global│   ├── layout.tsx          # Layout global

│   ├── page.tsx            # Página principal│   ├── page.tsx            # Página principal

│   └── api/search/         # API de busca│   └── api/search/         # API de busca

├── components/├── components/

│   ├── ChatInterface.tsx   # Interface do chat│   ├── ChatInterface.tsx   # Interface do chat

│   └── CarCard.tsx         # Card de exibição de carros│   └── CarCard.tsx         # Card de exibição de carros

├── lib/├── lib/

│   ├── gemini-service.ts   # Serviço do Gemini│   ├── gemini-service.ts   # Serviço do Gemini

│   └── fallback-service.ts # Sistema de fallback│   └── fallback-service.ts # Sistema de fallback

├── types/├── types/

│   └── index.ts            # Definições de tipos│   └── index.ts            # Definições de tipos

└── data/└── data/

    └── cars.json           # Base de dados    └── cars.json           # Base de dados

``````



### Sistema de Busca Inteligente### Sistema de Busca Inteligente



#### Palavras-chave Suportadas:#### Palavras-chave Suportadas:

- **Preço**: `barato`, `econômico`, `caro`, `premium`, `luxo`- **Preço**: `barato`, `econômico`, `caro`, `premium`, `luxo`

- **Localização**: `são paulo`, `rio de janeiro`, `campinas`, `belo horizonte`- **Localização**: `são paulo`, `rio de janeiro`, `campinas`, `belo horizonte`

- **Tipos**: `suv`, `sedan`, `hatch`, `família`, `urbano`, `elétrico`- **Tipos**: `suv`, `sedan`, `hatch`, `família`, `urbano`, `elétrico`

- **Marcas**: `byd`, `toyota`, `honda`, `volkswagen`, `chevrolet`- **Marcas**: `byd`, `toyota`, `honda`, `volkswagen`, `chevrolet`



#### Casos de Uso Atendidos:#### Casos de Uso Atendidos:

1. ✅ **Busca exata**: "BYD Dolphin São Paulo" → Encontra o modelo específico1. ✅ **Busca exata**: "BYD Dolphin São Paulo" → Encontra o modelo específico

2. 🪙 **Busca por preço**: "algo barato" → Filtra carros até R$ 80.0002. 🪙 **Busca por preço**: "algo barato" → Filtra carros até R$ 80.000

3. 🌎 **Busca por localização**: "carros em Curitiba" → Mostra disponíveis na cidade3. 🌎 **Busca por localização**: "carros em Curitiba" → Mostra disponíveis na cidade

4. 🎯 **Busca inteligente**: "SUV para família" → Sugere Renegade e T-Cross4. 🎯 **Busca inteligente**: "SUV para família" → Sugere Renegade e T-Cross



## 🚀 Como Executar## 🚀 Como Executar



### Pré-requisitos### Pré-requisitos

- Node.js 18+ - Node.js 18+ 

- npm ou yarn- npm ou yarn



### Instalação### Instalação

```bash```bash

# Clone o repositório# Clone o repositório

git clone https://github.com/RafaelBarbosa12/klubi.gitgit clone https://github.com/RafaelBarbosa12/klubi.git

cd klubicd klubi



# Instale as dependências# Instale as dependências

npm installnpm install



# Configure variáveis (opcional - Gemini API)# Configure variáveis (opcional - Gemini API)

cp .env.example .env.localcp .env.example .env.local

# Adicione sua chave da API do Gemini em GOOGLE_API_KEY# Adicione sua chave da API do Gemini em GOOGLE_API_KEY



# Execute em desenvolvimento# Execute em desenvolvimento

npm run devnpm run dev

``````



### Build e Deploy### Build e Deploy

```bash```bash

# Build para produção# Build para produção

npm run buildnpm run build



# Inicie servidor de produção# Inicie servidor de produção

npm startnpm start

``````



## 🔧 Decisões Técnicas## 🔧 Decisões Técnicas



### Por que Next.js 14?### Por que Next.js 14?

- **App Router** para roteamento moderno- **App Router** para roteamento moderno

- **API Routes** para backend integrado- **API Routes** para backend integrado

- **SSR/SSG** para performance otimizada- **SSR/SSG** para performance otimizada

- **Vercel** como plataforma nativa de deploy- **Vercel** como plataforma nativa de deploy



### Por que Sistema Híbrido de IA?### Por que Sistema Híbrido de IA?

- **Gemini API**: Processamento avançado de linguagem natural- **Gemini API**: Processamento avançado de linguagem natural

- **Sistema Fallback**: Garante funcionamento mesmo sem API externa- **Sistema Fallback**: Garante funcionamento mesmo sem API externa

- **Logs Detalhados**: Facilita debugging e monitoramento- **Logs Detalhados**: Facilita debugging e monitoramento

- **Performance**: Resposta rápida mesmo com falhas de conectividade- **Performance**: Resposta rápida mesmo com falhas de conectividade



### Por que TypeScript?### Por que TypeScript?

- **Type Safety**: Reduz bugs em produção- **Type Safety**: Reduz bugs em produção

- **IntelliSense**: Melhor experiência de desenvolvimento  - **IntelliSense**: Melhor experiência de desenvolvimento  

- **Manutenibilidade**: Código mais legível e documentado- **Manutenibilidade**: Código mais legível e documentado

- **Escalabilidade**: Facilita crescimento do projeto- **Escalabilidade**: Facilita crescimento do projeto



## 🤖 Sobre a IA Implementation## 🤖 Sobre a IA Implementation



### Google Gemini API### Google Gemini API

A aplicação foi projetada para usar a **Google Gemini API** como sistema principal de IA, proporcionando:A aplicação foi projetada para usar a **Google Gemini API** como sistema principal de IA, proporcionando:

- Processamento avançado de linguagem natural- Processamento avançado de linguagem natural

- Compreensão contextual das consultas- Compreensão contextual das consultas

- Respostas conversacionais inteligentes- Respostas conversacionais inteligentes



**Nota**: Por questões de custo, a API não foi implementada na versão atual, mas toda a arquitetura está preparada para integração futura.**Nota**: Por questões de custo, a API não foi implementada na versão atual, mas toda a arquitetura está preparada para integração futura.



### Sistema de Fallback Inteligente### Sistema de Fallback Inteligente

Para garantir funcionamento contínuo, desenvolvemos um sistema proprietário que:Para garantir funcionamento contínuo, desenvolvemos um sistema proprietário que:

- Processa consultas em linguagem natural- Processa consultas em linguagem natural

- Aplica filtros semânticos avançados  - Aplica filtros semânticos avançados  

- Gera respostas contextuais- Gera respostas contextuais

- Oferece sugestões personalizadas- Oferece sugestões personalizadas



## 💼 Plano de Negócios## 💼 Plano de Negócios



### 1. Modelo de Negócios### 1. Modelo de Negócios

**Marketplace B2B2C com Revenue Share****Marketplace B2B2C com Revenue Share**

- Conectar concessionárias e vendedores à usuários finais- Conectar concessionárias e vendedores à usuários finais

- Cobrança de comissão por venda realizada (3-5%)- Cobrança de comissão por venda realizada (3-5%)

- Planos premium para concessionárias (destaque, analytics, leads)- Planos premium para concessionárias (destaque, analytics, leads)

- Monetização via dados de comportamento de compra (anonimizados)- Monetização via dados de comportamento de compra (anonimizados)



### 2. Estratégia de Aquisição de Usuários### 2. Estratégia de Aquisição de Usuários

**Multicanal com foco em performance marketing****Multicanal com foco em performance marketing**

- **Digital**: Google Ads, Facebook/Instagram, YouTube (CAC R$ 80-120)- **Digital**: Google Ads, Facebook/Instagram, YouTube (CAC R$ 80-120)

- **Orgânico**: SEO para "comprar carro", blog automotivo, comparadores- **Orgânico**: SEO para "comprar carro", blog automotivo, comparadores

- **Parcerias**: Influencers automotivos, canais do YouTube, concessionárias- **Parcerias**: Influencers automotivos, canais do YouTube, concessionárias

- **Offline**: Eventos automotivos, test-drives, parcerias com financeiras- **Offline**: Eventos automotivos, test-drives, parcerias com financeiras



### 3. Estimativa de CAC (Custo de Aquisição)### 3. Estimativa de CAC (Custo de Aquisição)

- **Canais pagos**: R$ 100-150 por usuário qualificado- **Canais pagos**: R$ 100-150 por usuário qualificado

- **SEO/Orgânico**: R$ 40-60 por usuário (após investimento inicial)- **SEO/Orgânico**: R$ 40-60 por usuário (após investimento inicial)

- **Indicação**: R$ 30-50 por usuário (programa de cashback)- **Indicação**: R$ 30-50 por usuário (programa de cashback)

- **Meta**: CAC médio de R$ 80 com LTV/CAC ratio de 5:1- **Meta**: CAC médio de R$ 80 com LTV/CAC ratio de 5:1



### 4. Proposta de LTV (Lifetime Value)### 4. Proposta de LTV (Lifetime Value)

**LTV Target: R$ 400-500 por usuário****LTV Target: R$ 400-500 por usuário**

- **Venda primária**: R$ 150-300 em comissões por transação- **Venda primária**: R$ 150-300 em comissões por transação

- **Serviços complementares**: Seguro, financiamento, inspeção (+R$ 100-200)- **Serviços complementares**: Seguro, financiamento, inspeção (+R$ 100-200)

- **Recompra**: 30% dos usuários compram novamente em 3-5 anos- **Recompra**: 30% dos usuários compram novamente em 3-5 anos

- **Maximização**: programa de fidelidade, marketplace de serviços, dados premium- **Maximização**: programa de fidelidade, marketplace de serviços, dados premium



### 5. Estratégias de Monetização### 5. Estratégias de Monetização

1. **Comissão por venda**: 3-5% sobre valor da transação1. **Comissão por venda**: 3-5% sobre valor da transação

2. **Leads qualificados**: R$ 50-150 por lead para concessionárias2. **Leads qualificados**: R$ 50-150 por lead para concessionárias

3. **Planos premium**: R$ 299-999/mês para vendedores profissionais3. **Planos premium**: R$ 299-999/mês para vendedores profissionais

4. **Marketplace de serviços**: comissão em seguros, financiamentos, revisões4. **Marketplace de serviços**: comissão em seguros, financiamentos, revisões

5. **Dados e analytics**: insights de mercado para montadoras (B2B)5. **Dados e analytics**: insights de mercado para montadoras (B2B)



### 6. Estratégias de Retenção### 6. Estratégias de Retenção

- **Gamificação**: pontos por interações, avaliações, indicações- **Gamificação**: pontos por interações, avaliações, indicações

- **Conteúdo personalizado**: newsletter com lançamentos, dicas, ofertas- **Conteúdo personalizado**: newsletter com lançamentos, dicas, ofertas

- **Programa de relacionamento**: lembretes de revisão, IPVA, seguro- **Programa de relacionamento**: lembretes de revisão, IPVA, seguro

- **Comunidade**: fórum de proprietários, grupos por modelo/marca- **Comunidade**: fórum de proprietários, grupos por modelo/marca

- **AI Assistant**: consultor pessoal que aprende preferências do usuário- **AI Assistant**: consultor pessoal que aprende preferências do usuário



## 📊 Métricas de Sucesso## 📊 Métricas de Sucesso

- **Conversão**: >3% de visitantes únicos em leads qualificados- **Conversão**: >3% de visitantes únicos em leads qualificados

- **NPS**: >60 (satisfação dos usuários)- **NPS**: >60 (satisfação dos usuários)

- **Tempo na plataforma**: >5 minutos por sessão- **Tempo na plataforma**: >5 minutos por sessão

- **Taxa de recompra**: >25% em 5 anos- **Taxa de recompra**: >25% em 5 anos

- **LTV/CAC ratio**: >4:1- **LTV/CAC ratio**: >4:1



## 🔮 Roadmap Futuro## 🔮 Roadmap Futuro

- [ ] **IA Avançada**: Integração completa com Gemini API- [ ] **IA Avançada**: Integração completa com Gemini API

- [ ] **Mobile App**: React Native com notificações push  - [ ] **Mobile App**: React Native com notificações push  

- [ ] **Realidade Aumentada**: Visualização 3D dos veículos- [ ] **Realidade Aumentada**: Visualização 3D dos veículos

- [ ] **Marketplace Completo**: Peças, acessórios, serviços- [ ] **Marketplace Completo**: Peças, acessórios, serviços

- [ ] **Expansão Geográfica**: América Latina- [ ] **Expansão Geográfica**: América Latina

- [ ] **Verticais**: Motos, caminhões, implementos- [ ] **Verticais**: Motos, caminhões, implementos



## 🧪 Casos de Teste Implementados## 🧪 Casos de Teste Implementados



### ✅ Cenários Atendidos pelo Desafio:### ✅ Cenários Atendidos pelo Desafio:

1. **Busca de carro existente**: "BYD Dolphin" → Retorna o modelo com informações completas1. **Busca de carro existente**: "BYD Dolphin" → Retorna o modelo com informações completas

2. **Busca com filtro de preço**: "algo barato" → Sugere alternativas dentro do orçamento  2. **Busca com filtro de preço**: "algo barato" → Sugere alternativas dentro do orçamento  

3. **Busca por localização**: "carro em São Paulo" → Filtra por disponibilidade regional3. **Busca por localização**: "carro em São Paulo" → Filtra por disponibilidade regional

4. **Convencimento inteligente**: Sistema sugere alternativas quando critério inicial não é atendido4. **Convencimento inteligente**: Sistema sugere alternativas quando critério inicial não é atendido



### 🎯 Exemplos de Consultas Funcionais:### 🎯 Exemplos de Consultas Funcionais:

- "Quero algo barato" → Kwid (R$ 68k) e HB20 (R$ 79k)- "Quero algo barato" → Kwid (R$ 68k) e HB20 (R$ 79k)

- "Carro para família" → Corolla, Renegade, Civic  - "Carro para família" → Corolla, Renegade, Civic  

- "SUV em São Paulo" → Veículos espaçosos na região- "SUV em São Paulo" → Veículos espaçosos na região

- "Algo econômico em Curitiba" → Opções acessíveis localmente- "Algo econômico em Curitiba" → Opções acessíveis localmente



------



**Desenvolvido com ❤️ usando Next.js, TypeScript e Google Gemini AI****Desenvolvido com ❤️ usando Next.js, TypeScript e Google Gemini AI**