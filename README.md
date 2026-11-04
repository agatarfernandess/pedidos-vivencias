# Pedidos disponíveis

Ecrã onde um profissional vê os pedidos de serviços de reparação disponíveis,
filtra-os por cidade e aceita os que lhe interessam.

Feito com React, TypeScript e Vite.

## Como pôr a correr

É preciso ter o Node.js 18 ou mais recente.

```bash
npm install
npm run dev
```

Depois abre o endereço que aparece no terminal (normalmente http://localhost:5173).

Para correr os testes:

```bash
npm test
```

## O que a aplicação faz

- Mostra cada pedido com o tipo de serviço, a cidade, a data e a hora, a duração e o valor.
- Permite filtrar por cidade.
- Cada pedido tem um botão "Aceitar" que o retira da lista.
- Mostra mensagens diferentes quando já não há pedidos nenhuns e quando não há pedidos na cidade escolhida.
- Simula um carregamento de um segundo e mostra "A carregar pedidos…" enquanto espera.
- Assinala os pedidos urgentes e ordena-os por data.

## Algumas decisões

- **Estado mínimo:** o estado guarda só os pedidos disponíveis e a cidade escolhida. A lista visível é calculada a partir dos dois em cada render, para nunca ficar dessincronizada.
- **Formatação:** o valor vem em cêntimos e a data em UTC. Uso `Intl.NumberFormat` e `Intl.DateTimeFormat` com `pt-PT` e o fuso `Europe/Lisbon`, para que a hora fique certa também no horário de verão.
- **Cidades do filtro:** são uma lista fixa, para que uma cidade não desapareça do filtro quando se aceitam todos os seus pedidos.

## O que faria a seguir com mais tempo

- Ir buscar os pedidos a uma API, com tratamento de erros e a possibilidade de tentar de novo.
- Guardar o pedido aceite no servidor, com confirmação e a opção de desfazer.
- Mais filtros e ordenação (por tipo de serviço, valor ou urgência).
- Mais testes e uma revisão de acessibilidade mais cuidada.
