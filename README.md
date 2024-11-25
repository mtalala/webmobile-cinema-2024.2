#Criando um projeto de Sala de Cinema em NextJS

Este projeto foi desenvolvido utilizando Next.js, um framework React utilizado para a criação de aplicações web. Em seguida, encontrará uma explicação da estrutura de diretórios e arquivos do projeto.


##1. Inicializando o projeto

![image](https://github.com/user-attachments/assets/ef8b8feb-ef02-4a8d-b718-1b08cd055146)

Caso não possua um projeto NextJS, você precisará ter o Node.js instalado em sua máquina, e deverá executar o seguinte comando em seu Terminal:

```
npx create-next-app@latest
```

Após feito, você deverá:

1. Adicionar em seu projeto o arquivo dados.json

##2. Modificando os arquivos JS e CSS

###Página inicial:

No arquivo ```src/app/pages.js```, proveniente da criação do nosso projeto NextJS você precisará:

###1. Utilizar o React com um componente funcional:
  O componente Home é responsável por exibir uma interface para a seleção de assentos de um evento, como uma sessão de cinema. Ele utiliza o React com os hooks useState e useEffect para gerenciar estado e efeitos colaterais.
###4. Carregar dados externos:
- Os dados sobre o evento e os assentos são carregados de um arquivo dados.json usando a função fetch no hook useEffect.
- Certifique-se de que o arquivo dados.json está corretamente configurado no diretório público do projeto.
###3. Gerenciar estados dinâmicos:
- ```dados```: Armazena as informações do evento, incluindo título, horário, sinopse, direção, e o estado de disponibilidade dos assentos.
- ```assentosSelecionados```: Lista que contém os números dos assentos selecionados pelo usuário.
- ```compraConfirmada```: Indica se a compra foi realizada com sucesso.
###4. Implementar lógica de interação:
####- Seleção de assentos:
A função ```selecionarAssento``` permite alternar entre selecionar e desmarcar assentos, atualizando o estado de ```assentosSelecionados```.
####- Cálculo de preço total:
A função ```calcularPrecoTotal``` multiplica o número de assentos selecionados pelo preço unitário (dados.preco).
####- Confirmação de compra:
A função ```confirmarCompra``` marca os assentos selecionados como indisponíveis, reseta a seleção e exibe uma mensagem de confirmação temporária.
###5. Estilização:
- As classes CSS utilizadas no componente são importadas do arquivo ```page.module.css```. Este arquivo contém os estilos que definem a aparência do layout, como a organização dos assentos, sinopse, preço e estado dos botões.
###6. Elementos da interface:
- Um título e horário do evento são exibidos dinamicamente a partir dos dados carregados.
- Uma grade de assentos mostra o estado de cada assento (livre, selecionado, ou indisponível), que muda com base nas interações do usuário.
- Informações adicionais, como sinopse, data de lançamento e direção, são exibidas ao lado da grade de assentos.
- Um botão de compra calcula o preço total e confirma a aquisição, desde que ao menos um assento esteja selecionado.
###7. Mensagens dinâmicas:
- Se os dados ainda não tiverem sido carregados, é exibida a mensagem "Carregando...".
- Após a confirmação de compra, uma mensagem "Compra confirmada!" é exibida temporariamente.
Este arquivo demonstra como estruturar uma página dinâmica e interativa no Next.js utilizando React e hooks modernos. Certifique-se de integrar corretamente os arquivos CSS e o JSON para uma funcionalidade completa.

##Utilizando CSS:

Para a aplicação dos estilos, serão criadas classes no arquivo da página, para efetuar a aplicação. Assim como será feita a seleção de elementos padrão.

###CSS global:

O CSS Global é utilizado quando você deseja aplicar estilos em toda a aplicação, sem restrições de escopo.

https://github.com/mtalala/react/blob/main/imagens/image4.png![image](https://github.com/user-attachments/assets/4cdff612-4510-4a69-ad90-7bc4ad6b4e20)

No Next.js, o CSS global será importado no arquivo layout.js. Isso assegura que os estilos globais sejam carregados e aplicados em todas as páginas da aplicação.

###CSS Module:

Os CSS Modules são utilizados para aplicar estilos locais, ou seja, os estilos são automaticamente encapsulados no componente de origem, o que evita que os estilos sejam transferidos para outros componentes.

![image](https://github.com/user-attachments/assets/23cdbdcb-d1a6-4756-9886-054f9f23b7fb)

Para utilizar o CSS Modules, basta criar arquivos de estilo com a extensão.module.css. Estes arquivos podem ser importados diretamente para o componente em que deseja aplicá-los.

##3. Adicionando os estilos

###Arquivo ```globals.css```

O arquivo ```globals.css``` define estilos globais e variáveis CSS que afetam toda a aplicação. Suas principais funções são:

####1. Definição de variáveis de tema (:root):
####Modo claro:
- ```--background```: cor de fundo branca (#ffffff).
- ```--foreground```: cor do texto preta (#171717).
####Modo escuro (via media query prefers-color-scheme: dark):
- ```--background```: cor de fundo escura (#070710).
- ```--foreground```: cor do texto clara (#ededed).
####2. Estilo base para HTML e Body:
- Impede o overflow horizontal com ```max-width: 100vw``` e ```overflow-x: hidden```.
- Utiliza uma fonte padrão (Arial, Helvetica, sans-serif) com suavização para melhor legibilidade.
####3. Reset e padrões globais:
- Remove margens e padding de todos os elementos (```* { padding: 0; margin: 0; }```).
- Define ```box-sizing: border-box``` para incluir bordas e padding no tamanho total de elementos.
####4. Links e esquemas de cores:
- Links (```a```) herdam a cor e não possuem sublinhado por padrão.
- Configuração do esquema de cores para o navegador respeitar os temas claro/escuro.
####5. Estilização e comportamento dos assentos:
- Define tamanhos e estilos para os estados dos assentos (```.livre, .selecionado, .indisponivel```).
####6. Centralização do conteúdo:
- O body é configurado para centralizar vertical e horizontalmente os elementos da página.

###Arquivo ```page.module.css```

O arquivo ```page.module.css``` fornece estilos específicos para a página principal da aplicação. Ele organiza e estiliza a interface de forma modular.

####Principais classes e funcionalidades:

####1. Container e Layout Geral:
- ```.container```: Define a área principal da página com largura e altura totais e alinhamento centralizado.
####2. Elementos textuais:
- ```.horario```: Estiliza o horário do evento com fonte maior e cor cinza.
- ```.sinopse```, ```.dataLancamento```, ```.direcao```: Apresentam informações do evento com fonte de 18px, alinhamento à esquerda e margens consistentes.
####3. Grade de assentos:
- ```.assentos```: Utiliza ```display: grid``` para organizar os assentos em 8 colunas com espaçamento entre os elementos.
- ```.assento```: Define os tamanhos, bordas arredondadas e cores para os estados (livre, selecionado, indisponível).
####4. Botão de compra:
- ```.botaoComprar```: Estiliza o botão com fundo vermelho (#d32f2f), texto branco, bordas arredondadas e um cursor de ponteiro. Desabilitado quando nenhum assento está selecionado.
####5. Layout responsivo e flexível:
- ```.blocos```: Define a estrutura flexível dos elementos (grade de assentos e informações do evento) com ```flex-wrap``` para adaptação em telas menores.
- Media queries ajustam a disposição de ```.cadeiras``` e ```.informac``` para diferentes tamanhos de tela (por exemplo, 100% de largura em dispositivos pequenos e 50% ou 33% em telas maiores).
####6. Indicação de estados e feedback visual:
- ```.confirmacao```: Exibe uma mensagem de confirmação de compra com fundo verde e animação de fade-in/out.
- ```.divtela```: Representa a tela do cinema com um retângulo cinza.
- ```.bolalivre```, ```.bolaselec```, ```.bolaindisp```: Indicadores visuais dos estados dos assentos (livre, selecionado, indisponível).
####7. Responsividade avançada:
#####Adaptações específicas para:
- Orientação Portrait: Itens ocupam 100% da largura.
- Orientação Landscape: Divisão em três colunas para melhor aproveitamento do espaço horizontal.















