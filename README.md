# Barbershop Template

O Barbershop Template é um repositório de código-fonte que oferece uma estrutura flexível e reutilizável para o desenvolvimento de websites para barbearias. Projetado para atender às necessidades exclusivas das barbearias, este template é uma solução abrangente que pode ser facilmente personalizada e adaptada para diferentes estilos e identidades de marca, utilizado pelas barbearias **"Sr. Xavier"** e **"Corte de Gringo"**.

## Ferramentas Utilizadas

- **React.js**: Biblioteca JavaScript para construção de interfaces de usuário.
- **TypeScript**: Linguagem de programação que adiciona tipagem estática ao JavaScript.
- **Next.js**: Framework React para desenvolvimento de aplicativos web com renderização do lado do servidor (`SSR`) e geração de páginas estáticas.
- **Zod**: Biblioteca para validação de dados em TypeScript.
- **Zustand**: Biblioteca para gerenciamento de estado em aplicações React.
- **Sonner**: Componente de notificação React focado na experiência do usuário.
- **Tailwind CSS**: Framework CSS para criação de interfaces com componentes pré-projetados e utilitários.
- **React Hook Form**: Biblioteca para gerenciamento de formulários em React utilizando hooks.
- **JSON Web Token (JWT)**: Método para representar informações de forma segura e compacta, amplamente utilizado em sistemas de autenticação e autorização para aplicações web.
- **ASAAS**: `API` para facilitar operações financeiras, oferecendo recursos como formas de pagamento, gestão de cobranças, emissão de notas fiscais, antecipação de recebíveis e pagamentos a fornecedores, tudo centralizado em uma única plataforma para simplificar a administração financeira.
- **Firebase**: Plataforma completa para desenvolvimento de aplicativos, oferecendo serviços integrados como autenticação de usuários, armazenamento em nuvem e banco de dados em tempo real.
- **Shadcn/ui**: Biblioteca de componentes prontos para uso, oferecendo uma variedade de elementos de interface flexíveis e personalizáveis para aprimorar o desenvolvimento e a experiência do usuário.
- **TanStack Table**: Uma biblioteca altamente personalizável para criar tabelas avançadas em aplicações React.

## Funcionalidades Principais

- **Criação de Contas**

  - Usuários podem criar contas para gerenciar seus agendamentos.

- **Role-based Access**

  - Existem três tipos de conta de usuário: `USER`, `EMPLOYEE` e `ADMIN`. Este sistema de acesso baseado em `ROLES` permite diferentes níveis de permissão para diferentes usuários do sistema.

- **Agendamentos**

  - Os status dos agendamentos são: `Pago`, `Pendente` e `Cancelado`.

  - Usuários podem fazer agendamentos estando logados, utilizando o menu de agendamentos para gerenciá-los. Além disso, para prevenir spam por parte de usuários deslogados, implementamos o `reCAPTCHA`. Dessa forma, mesmo aqueles que não estão logados podem fazer agendamentos, mas precisarão passar pelo `reCAPTCHA` como uma medida de segurança contra atividades automáticas indesejadas, como o envio massivo de agendamentos.

  - Se a `ROLE` for `USER`, o usuário verá apenas os agendamentos que ele marcou. Se for `EMPLOYEE`, verá todos os agendamentos marcados para ele.

  - Se um `EMPLOYEE` tentar realizar um agendamento, ele poderá marcar um agendamento para um cliente presente no estabelecimento ou marcar o horário como horário de almoço.

  - Os horários dos agendamentos são dinâmicos, alternando entre `Disponível`, `Reservado`, `Almoço` e `Expirado`.

  - Os Agendamentos são feitos com base em um calendário, onde os usuários podem selecionar uma data e hora, bem como o profissional que realizará o serviço.

  - Os três métodos de pagamento disponíveis são `Cartão de Crédito`, `PIX` e `Dinheiro`.

  - Usuários têm acesso aos horários reservados para o dia atual, com atualização em tempo real das informações de agendamento e status, semelhante a uma sala de espera virtual.

  - Os `EMPLOYEES` têm acesso aos detalhes diários dos agendamentos marcados com eles, incluindo ganhos, presenças, ausências e o total de cortes realizados.

  - É possível filtrar por data e status do agendamento na tela de agendamentos, além de ver as informações do agendamento, como nome do cliente, nome do profissional, status, preço do corte, nome do corte, presença, data do agendamento e método de pagamento.

- **Dashboard**

  Área restrita somente para `ADMINISTRADORES`, onde é possível:

  - Ver os detalhes dos profissionais do estabelecimento, incluindo ganhos (agendamentos já pagos) e ganhos futuros (agendamentos pendentes para datas futuras), com opções de filtrar por data, status ou profissional. Além disso, é possível ver as mesmas informações presentes na tela de agendamentos.

  - Realizar ações relacionadas aos agendamentos, como alterar o status, alterar a presença dos usuários (se compareceram ou não), cancelar agendamentos e obter o `ID` do agendamento ou o link de pagamento, se necessário.

  - `ADMINS` também podem criar, editar e excluir cortes de cabelo, definindo nome, preço, descrição e fazendo upload de imagens para serem mostradas no site.

- **Transações**

  Esta seção também é exclusiva para `ADMINISTRADORES`, fornecendo funcionalidades essenciais para o gerenciamento financeiro da barbearia:

  - Facilita transferências através de opções como `TED` ou `PIX`.

  - Fornece acesso rápido ao saldo atual da conta da barbearia, garantindo uma visão financeira clara.
  - Apresenta uma lista das transferências mais recentes, permitindo um acompanhamento eficiente das transações mais recentes.

  - Disponibiliza um extrato financeiro detalhado, registrando todas as transferências realizadas, incluindo informações como nome, data e valor.
