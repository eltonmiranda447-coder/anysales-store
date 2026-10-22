# AnySales — Loja online

Loja demonstrativa responsiva para a AnySales, com identidade visual azul e branco, catálogo pesquisável, filtro por categoria e carrinho de compras.

## Ficheiros

- `index.html` — estrutura da página e componentes da loja.
- `styles.css` — identidade visual, layout responsivo e estilos para telemóvel/computador.
- `script.js` — produtos de demonstração, pesquisa, filtros, carrinho e preparação da encomenda.

## Como visualizar

1. Abre o ficheiro `index.html` no navegador, ou publica o repositório com GitHub Pages.
2. Os produtos e preços actuais são apenas exemplos para demonstração.
3. Edita a lista `PRODUCTS` no início de `script.js` com os produtos reais, preços em MT, descrições e categorias.
4. Substitui os emojis por fotografias reais dos produtos, se disponíveis.

## Configurar encomendas por WhatsApp

Antes de divulgar a loja, define o número comercial com indicativo do país, apenas dígitos. Por exemplo, um número moçambicano começa por `258`.

No início de `script.js`, antes do evento do botão de checkout, podes acrescentar:

```js
window.ANYSALES_WHATSAPP_NUMBER = "258XXXXXXXXX";
```

Substitui o exemplo pelo número oficial da loja. Sem esse número, o checkout de demonstração gera um ficheiro de texto com o resumo da encomenda, em vez de enviar para um contacto não configurado.

## Publicar com GitHub Pages

1. No GitHub, abre **Settings → Pages**.
2. Em **Build and deployment**, selecciona **Deploy from a branch**.
3. Escolhe a branch `main` e a pasta `/(root)`, depois carrega em **Save**.
4. Aguarda a publicação e abre o endereço indicado nessa secção.

## Antes de lançar

- [ ] Confirmar nome, fotografias, stock e preços reais.
- [ ] Configurar e testar o contacto WhatsApp comercial.
- [ ] Definir entregas, custos, prazos e zonas atendidas.
- [ ] Informar os métodos de pagamento realmente aceites.
- [ ] Testar o site em telemóveis e computadores.
- [ ] Acrescentar política de privacidade, devoluções e termos aplicáveis.
- [ ] Se precisares de pagamentos online, integrar um fornecedor real e testar o fluxo de forma segura.

## Limitações desta versão

Esta é uma **montra frontend de demonstração**. Não tem base de dados, gestão de stock, painel administrativo, contas de clientes nem pagamentos online integrados. O carrinho funciona no navegador, mas ainda não é persistente. Não recolhe nem processa dados de cartão bancário.

## Tecnologias

HTML, CSS e JavaScript sem framework ou dependências de build. A fonte DM Sans é carregada do Google Fonts; o site continua utilizável com fontes alternativas se não houver ligação externa.