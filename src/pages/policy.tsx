import { SEO } from '@components/common/seo';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type TPOLICYS = {
  id: string;
  title: string;
  sections: Array<{
    id: string;
    title?: string;
    content: Array<{
      type: string;
      text?: string;
      subtitle?: string;
      list?: Array<{
        title?: string;
        text: string;
      }>;
      items?: Array<{
        title: string;
        text: string;
      }>;
    }>;
  }>;
};

const POLICYS: TPOLICYS[] = [
  {
    id: 'o-que-coletamos',
    title: '1. O Que Coletamos',
    sections: [
      {
        id: 'o-que-coletamos',
        title: '1.1 Informações que você nos fornece',
        content: [
          {
            type: 'paragraph',
            text: 'Para usar alguns de nossos produtos e serviços, você precisa ter uma conta, e para criar uma conta, você precisa nos fornecer certas informações. Da mesma forma, se você usar nossos produtos e serviços pagos, não podemos fornecê-los sem obter informações de pagamento. Basicamente, certas informações são necessárias se você quiser usar muitos de nossos produtos e serviços.'
          },
          {
            type: 'list',
            items: [
              {
                title: 'Contas Pessoais',
                text: 'Se você criar uma conta, deve nos fornecer algumas informações para que possamos fornecer nossos serviços a você. Isso inclui um nome de exibição (por exemplo, “Criadores”); um nome de usuário (por exemplo, @Fococa.meCriadores); uma senha; um endereço de e-mail ou número de telefone; uma data de nascimento; seu idioma de exibição; e informações de login de terceiros (se você escolher esse método de login). Você também pode escolher compartilhar sua localização em seu perfil e postagens e carregar seu livro de endereços no Fococa.me para ajudar a encontrar pessoas que você possa conhecer. Suas informações de perfil, que incluem seu nome de exibição e nome de usuário, são sempre públicas, mas você pode usar seu nome real ou um pseudônimo. E lembre-se, você pode criar várias contas no Fococa.me, por exemplo, para expressar diferentes partes de sua identidade, profissional ou de outra forma.'
              },
              {
                title: 'Contas Profissionais',
                text: 'Se você criar uma conta profissional, também precisará nos fornecer uma categoria profissional e poderá nos fornecer outras informações, incluindo endereço, e-mail de contato e número de telefone de contato, todos os quais serão sempre públicos.'
              },
              {
                title: 'Informações de Pagamento',
                text: 'Para comprar anúncios ou outras ofertas fornecidas como parte de nossos produtos e serviços pagos, você precisará nos fornecer informações de pagamento, incluindo número do cartão de crédito ou débito, data de validade do cartão, código CVV e endereço de cobrança.'
              },
              {
                title: 'Preferências',
                text: 'Quando você define suas preferências usando suas configurações, coletamos essas informações para que possamos respeitar suas preferências.'
              },
              {
                title: 'Informações Biométricas',
                text: 'Com base no seu consentimento, podemos coletar e usar suas informações biométricas para fins de segurança, proteção e identificação.'
              },
              {
                title: 'Candidaturas a Emprego / Recomendações',
                text: 'Podemos coletar e usar suas informações pessoais (como seu histórico de emprego, histórico educacional, preferências de emprego, habilidades e capacidades, atividade e engajamento na busca de emprego, etc.) para recomendar empregos potenciais para você, compartilhar com potenciais empregadores quando você se candidata a um emprego, permitir que empregadores encontrem candidatos potenciais e mostrar-lhe publicidade mais relevante.'
              }
            ]
          }
        ]
      },
      {
        id: '1.2',
        title: '1.2 Informações que coletamos quando você usa o Fococa.me',
        content: [
          {
            type: 'paragraph',
            text: 'Quando você usa nossos serviços, coletamos informações sobre como você usa nossos produtos e serviços. Usamos essas informações para fornecer produtos e serviços a você, para ajudar a manter o Fococa.me mais seguro e respeitoso para todos e mais relevante para você.'
          },
          {
            type: 'paragraph',
            text: 'Informações de Uso.'
          },
          {
            type: 'list',
            items: [
              {
                title: 'Posts e Outros Conteúdos',
                text: 'Postagens e outros conteúdos que você publica (incluindo a data, o aplicativo e a versão do Fococa.me) e informações sobre sua atividade de transmissão (por exemplo, Espaços), incluindo transmissões que você criou e quando as criou, suas listas, favoritos e comunidades das quais você faz parte.'
              },
              {
                title: 'Interações com Conteúdos de Outros Usuários',
                text: 'Suas interações com o conteúdo de outros usuários, como repostagens, curtidas, favoritos, compartilhamentos, respostas, se outros usuários mencionam ou marcam você em conteúdo ou se você menciona ou marca outros, e transmissões nas quais você participou (incluindo seu histórico de visualização, escuta, comentários, fala e reações).'
              },
              {
                title: 'Interações na Plataforma',
                text: 'Como você interage com outros na plataforma, como pessoas que você segue e pessoas que o seguem, metadados relacionados a Mensagens Criptografadas e quando você usa Mensagens Diretas, incluindo o conteúdo das mensagens, os destinatários e a data e hora das mensagens.'
              },
              {
                title: 'Comunicações com a Empresa',
                text: 'Se você se comunicar conosco, como por e-mail, coletaremos informações sobre a comunicação e seu conteúdo.'
              },
              {
                title: 'Links Interagidos',
                text: 'Coletamos informações sobre os links com os quais você interage em nossos serviços (incluindo em nossos e-mails enviados a você).'
              },
              {
                title: 'Candidaturas a Emprego / Recomendações',
                text: 'Podemos coletar e usar suas informações pessoais (como seu histórico de emprego, histórico educacional, preferências de emprego, habilidades e capacidades, atividade e engajamento na busca de emprego, etc.) para recomendar empregos potenciais para você, compartilhar com potenciais empregadores quando você se candidata a um emprego, permitir que empregadores encontrem candidatos potenciais e mostrar-lhe publicidade mais relevante.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'como-usamos',
    title: '2. Como Usamos as Informações',
    sections: [
      {
        id: 'como-usamos',
        title: '2.1 Operar, melhorar e personalizar nossos serviços.',
        content: [
          {
            type: 'paragraph',
            text: 'Usamos as informações que coletamos para fornecer e operar os produtos e serviços do Fococa.me. Também usamos as informações que coletamos para melhorar e personalizar nossos produtos e serviços para que você tenha uma experiência melhor no Fococa.me, incluindo mostrar conteúdo e anúncios mais relevantes, sugerir pessoas e tópicos para seguir, possibilitar e ajudar você a descobrir afiliados, aplicativos de terceiros e serviços. Podemos usar as informações que coletamos e informações disponíveis publicamente para ajudar a treinar nossos modelos de aprendizado de máquina ou inteligência artificial para os fins descritos nesta política. Podemos usar as informações que coletamos das contas de outros serviços que você escolhe conectar à sua conta do Fococa.me para fornecer recursos como postagem cruzada ou autenticação cruzada de serviços e para operar nossos serviços. Usamos suas informações de contato para ajudar outros a encontrar sua conta, se suas configurações permitirem, incluindo através de serviços de terceiros e aplicativos de clientes. Usamos suas informações para fornecer nossos serviços de publicidade e conteúdo patrocinado, sujeito às suas configurações, o que ajuda a tornar os anúncios no Fococa.me mais relevantes para você. Também usamos essas informações para medir a eficácia dos anúncios e para ajudar a reconhecer seus dispositivos para exibir anúncios em e fora do Fococa.me. Alguns de nossos parceiros de anúncios também nos permitem coletar informações semelhantes diretamente de seus sites ou aplicativos ao integrar nossa tecnologia de publicidade. Informações compartilhadas por parceiros de anúncios e afiliados ou coletadas pelo Fococa.me dos sites e aplicativos de parceiros de anúncios e afiliados podem ser combinadas com outras informações que você compartilha com o Fococa.me e que o Fococa.me recebe, gera ou infere sobre você, conforme descrito em outras partes de nossa Política de Privacidade.'
          }
        ]
      },
      {
        id: '2.2',
        title: '2.2 Promover segurança e proteção.',
        content: [
          {
            type: 'paragraph',
            text: 'Usamos as informações que coletamos para garantir a segurança e proteção de nossos usuários, nossos produtos, serviços e sua conta. Isso inclui verificar sua identidade, autenticar sua conta e defender contra fraudes, uso não autorizado e atividades ilegais. Também usamos as informações para avaliar e afetar a segurança e a qualidade do conteúdo no Fococa.me - isso inclui investigar e aplicar nossas políticas e termos, bem como a lei aplicável.'
          }
        ]
      },
      {
        id: '2.3',
        title: '2.3 Medir, analisar e melhorar nossos serviços.',
        content: [
          {
            type: 'paragraph',
            text: 'Usamos as informações que coletamos para medir e analisar a eficácia de nossos produtos e serviços e para entender melhor como você os usa, a fim de aprimorá-los.'
          }
        ]
      },
      {
        id: '2.4',
        title: '2.4 Comunicar com você sobre nossos serviços.',
        content: [
          {
            type: 'paragraph',
            text: 'Usamos as informações que coletamos para comunicar com você sobre nossos produtos e serviços, incluindo atualizações de produtos e mudanças em nossas políticas e termos. Se você estiver aberto a ouvir de nós, também podemos enviar mensagens de marketing de tempos em tempos.'
          }
        ]
      },
      {
        id: '2.5',
        title: '2.5 Pesquisa',
        content: [
          {
            type: 'paragraph',
            text: 'Usamos as informações que você compartilha conosco ou que coletamos para realizar pesquisas, estudos, testes de produtos e solução de problemas para nos ajudar a operar e melhorar nossos produtos e serviços.'
          }
        ]
      }
    ]
  },
  {
    id: 'compartilhamento',
    title: '3. Política de Privacidade',
    sections: [
      {
        id: 'compartilhamento',
        title: 'Compartilhamento de Informações',
        content: [
          {
            type: 'paragraph',
            text: 'Você deve conhecer as formas como compartilhamos suas informações, por que as compartilhamos e como você pode controlá-las. Existem cinco maneiras gerais pelas quais compartilhamos suas informações.'
          },
          {
            type: 'paragraph',
            text: '3.1 Quando você publica e compartilha.',
            list: [
              {
                title: 'Com o público geral.',
                text: 'Você está nos direcionando a divulgar essas informações o mais amplamente possível. O conteúdo do Fococa.me, incluindo suas informações de perfil (por exemplo, nome/pseudônimo, nome de usuário, fotos de perfil), está disponível para visualização pelo público geral. O público não precisa estar logado para visualizar alguns conteúdos no Fococa.me. Eles também podem encontrar conteúdo do Fococa.me fora do Fococa.me, por exemplo, a partir de resultados de pesquisa em mecanismos de busca na Internet.'
              },
              {
                title: 'Com outros usuários do Fococa.me.',
                text: 'Dependendo das suas configurações e com base nos produtos e serviços do Fococa.me que você usa, compartilhamos: Suas interações com o conteúdo do Fococa.me de outros usuários, como curtidas e pessoas que você segue. Conteúdo que você envia para um usuário específico do Fococa.me, como por meio de Mensagens Diretas. Lembre-se de que se você compartilhou informações como Mensagens Diretas ou posts protegidos com outra pessoa que acessa o Fococa.me por meio de um serviço de terceiros, as informações podem ser compartilhadas com o serviço de terceiros.'
              },
              {
                title: 'Com parceiros.',
                text: 'Dependendo das suas configurações, também fornecemos a certos terceiros informações para nos ajudar a oferecer ou operar nossos produtos e serviços. Você pode aprender mais sobre essas parcerias em nosso Centro de Ajuda. Você pode controlar se o Fococa.me compartilha suas informações pessoais com esses parceiros usando a opção “Compartilhamento de dados com parceiros comerciais” nas suas configurações de Privacidade e Segurança. (Essa configuração não controla o compartilhamento descrito em outras partes desta Política de Privacidade, como quando compartilhamos informações com nossos provedores de serviços ou por meio de parcerias diferentes das descritas neste artigo do Centro de Ajuda.)'
              }
            ]
          },
          {
            type: 'paragraph',
            text: '3.2 Com terceiros e integrações de terceiros.',
            list: [
              {
                title: 'Com provedores de serviços.',
                text: 'Podemos compartilhar suas informações com nossos provedores de serviços que realizam funções e fornecem serviços em nosso nome, incluindo provedores de serviços de pagamento que facilitam pagamentos; provedores de serviços que hospedam nossos vários blogs e wikis; provedores de serviços que nos ajudam a entender o uso de nossos serviços; provedores de sistemas de rastreamento de candidatos para enviar e receber dados de candidatos e empregos para potenciais empregadores; e aqueles que fornecem serviços de detecção de fraude.'
              },
              {
                title: 'Com anunciantes.',
                text: 'A receita publicitária nos permite oferecer nossos produtos e serviços. Os anunciantes podem aprender informações a partir do seu engajamento com seus anúncios no Fococa.me ou fora dele. Por exemplo, se você clicar em um link externo ou anúncio em nossos serviços, esse anunciante ou operador de site pode descobrir que você veio do Fococa.me, junto com outras informações associadas ao anúncio que você clicou, como características do público que ele pretendia atingir e outros identificadores gerados pelo Fococa.me para esse anúncio. Eles também podem coletar outras informações pessoais suas, como identificadores de cookies ou seu endereço IP.'
              },
              {
                title: 'Conteúdo e integrações de terceiros.',
                text: 'Compartilhamos ou divulgamos suas informações com seu consentimento ou por sua orientação, como quando você autoriza um cliente ou aplicativo de terceiros a acessar sua conta ou quando você nos direciona a compartilhar seu feedback com uma empresa. Da mesma forma, para melhorar sua experiência, trabalhamos com parceiros de terceiros para exibir seu conteúdo em vídeo no Fococa.me ou para permitir o compartilhamento entre plataformas. Quando você assiste ou interage com o conteúdo de nossos parceiros de vídeo ou de compartilhamento entre plataformas, eles podem receber e processar suas informações pessoais conforme descrito em suas políticas de privacidade. Para o conteúdo em vídeo, você pode ajustar suas configurações de reprodução automática se preferir que o conteúdo não seja reproduzido automaticamente.'
              },
              {
                title: 'Por meio de nossas APIs.',
                text: 'Usamos tecnologia como APIs e incorporações para tornar as informações públicas do Fococa.me disponíveis para sites, aplicativos e outros para seu uso, por exemplo, exibindo postagens em um site de notícias ou analisando o que as pessoas dizem no Fococa.me. Geralmente, tornamos esse conteúdo disponível em quantidades limitadas gratuitamente e cobramos taxas de licenciamento para acesso em grande escala. Temos termos padrão que regem como essas informações podem ser usadas e um programa de conformidade para fazer cumprir esses termos. Mas esses indivíduos e empresas não estão afiliados ao Fococa.me, e suas ofertas podem não refletir atualizações que você faz no Fococa.me. Para mais informações sobre como disponibilizamos dados públicos do Fococa.me para o mundo, visite https://developer.fococa.me.'
              }
            ]
          },
          {
            type: 'paragraph',
            text: '3.3 Quando exigido por lei, para prevenir danos ou no interesse público.',
            subtitle:
              'Podemos preservar, usar, compartilhar ou divulgar suas informações se acreditarmos que é razoavelmente necessário para:',
            list: [
              {
                text: '• cumprir uma lei, regulamento, processo legal ou solicitação governamental;'
              },
              {
                text: '• proteger a segurança de qualquer pessoa, proteger a segurança ou integridade de nossa plataforma, incluindo ajudar a prevenir spam, abuso ou atores maliciosos em nossos serviços;'
              },
              {
                text: '• explicar por que removemos conteúdo ou contas de nossos serviços (por exemplo, por violação das Nossas Regras);'
              },
              {
                text: '• abordar fraudes, questões de segurança ou técnicas;'
              },
              {
                text: '• ou proteger nossos direitos ou propriedade, ou os direitos ou propriedade de quem usa nossos serviços.'
              }
            ]
          },
          {
            type: 'paragraph',
            text: '3.4 Com nossos afiliados.',
            list: [
              {
                text: 'Podemos compartilhar informações entre nossos afiliados para fornecer nossos produtos e serviços.'
              }
            ]
          },
          {
            type: 'paragraph',
            text: '3.5 Como resultado de uma mudança na propriedade.',
            list: [
              {
                text: 'Podemos compartilhar, vender ou transferir informações sobre você em conexão com uma fusão, aquisição, reorganização, venda de ativos ou falência. Esta Política de Privacidade se aplicará às suas informações pessoais que forem compartilhadas com (antes e depois do fechamento de qualquer transação) ou transferidas para a nova entidade.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'tempo-armazenamento',
    title: '4.  Por Quanto Tempo Mantemos Informações',
    sections: [
      {
        id: 'tempo-armazenamento',
        content: [
          {
            type: 'paragraph',
            subtitle:
              'Mantemos diferentes tipos de informações por períodos variados:',
            list: [
              {
                text: '• Mantemos suas informações de perfil e conteúdo enquanto sua conta estiver ativa.'
              },
              {
                text: '• Em geral, mantemos outros dados pessoalmente identificáveis que coletamos quando você usa nossos produtos e serviços por no máximo 18 meses.'
              },
              {
                text: '• Lembre-se de que o conteúdo público pode existir em outros lugares mesmo depois de você removê-lo do Fococa.me. Por exemplo, motores de busca e outros terceiros podem reter cópias das suas postagens por mais tempo, com base em suas próprias políticas de privacidade, mesmo depois de serem excluídas ou expiradas no Fococa.me. Você pode ler mais sobre a visibilidade em mecanismos de busca aqui.'
              },
              {
                text: '• Caso você viole nossas Regras e sua conta seja suspensa, podemos manter os identificadores que você usou para criar a conta (ou seja, endereço de e-mail ou número de telefone) indefinidamente para evitar que infratores reincidentes criem novas contas.'
              },
              {
                text: '• Podemos manter certas informações por mais tempo do que nossas políticas especificam para cumprir com requisitos legais e por razões de segurança e proteção.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'controle',
    title: '5.  Controle',
    sections: [
      {
        id: 'controle',
        content: [
          {
            type: 'paragraph',
            text: '5.1 Acesso, Correção, Portabilidade',
            list: [
              {
                text: '• Você pode acessar, corrigir ou modificar as informações que forneceu a nós editando seu perfil e ajustando as configurações da sua conta.'
              },
              {
                text: '• Você pode aprender mais sobre as informações que coletamos ou inferimos sobre você em Seus Dados do Fococa.me e solicitar o acesso a informações adicionais aqui.'
              }
            ]
          },
          {
            type: 'paragraph',
            text: '5.2 Exclusão de Suas Informações',
            subtitle:
              'Se você seguir as instruções aqui, sua conta será desativada e seus dados serão colocados na fila para exclusão. Quando desativada, sua conta do Fococa.me, incluindo seu nome de exibição, nome de usuário e perfil público, não será mais visível no Fococa.me, Fococa.me para iOS e Fococa.me para Android. Até 30 dias após a desativação, ainda é possível restaurar sua conta do Fococa.me caso tenha sido desativada acidentalmente ou incorretamente.',
            list: []
          },
          {
            type: 'paragraph',
            text: '5.3 Objeção, Restrição ou Retirada do Seu Consentimento',
            subtitle:
              'Você pode gerenciar suas configurações de privacidade e outros recursos da conta aqui. Se você alterar suas configurações, pode levar algum tempo para que suas escolhas sejam totalmente refletidas em nossos sistemas. Você também pode notar mudanças na sua experiência no Fococa.me ou limitações em sua capacidade de acessar certos recursos, dependendo das configurações que você ajustou. Você também pode gerenciar configurações adicionais ao interagir com certos conteúdos e recursos em diferentes partes da plataforma, como se um Espaço está sendo gravado ou se vídeos que você envia podem ser baixados por outros. O Fococa.me adere aos Princípios de Autorregulação da Digital Advertising Alliance para Publicidade Comportamental Online (também referidos como "publicidade baseada em interesses") e respeita a ferramenta de escolha do DAA para você optar por não participar da publicidade baseada em interesses em https://optout.aboutads.info/.',
            list: []
          },
          {
            type: 'paragraph',
            text: '5.4 Solicitações de Agentes Autorizados',
            subtitle:
              'Para enviar uma solicitação relacionada ao acesso, modificação ou exclusão de suas informações, ou das informações de outra pessoa se você for seu agente autorizado, você também pode entrar em contato conosco conforme especificado na seção Como Contatar o Fococa.me abaixo de nossa Política de Privacidade. Podemos exigir que você forneça informações adicionais para verificação.',
            list: []
          }
        ]
      }
    ]
  },
  {
    id: 'direitos',
    title: '6.  Seus Direitos e os Nossos',
    sections: [
      {
        id: 'direitos',
        content: [
          {
            type: 'paragraph',
            subtitle:
              'Oferecemos o Fococa.me para pessoas de todo o mundo e fornecemos muitas das mesmas ferramentas e controles de privacidade para todos os nossos usuários, independentemente de onde vivem. No entanto, sua experiência pode ser ligeiramente diferente da de usuários em outros países para garantir que o Fococa.me respeite os requisitos locais.'
          }
        ]
      }
    ]
  },
  {
    id: 'audiencia',
    title: '7.  Audiência do Fofoca.me',
    sections: [
      {
        id: 'audiencia',
        content: [
          {
            type: 'paragraph',
            subtitle:
              'Nossos serviços não são direcionados a crianças, e você não pode usar nossos serviços se tiver menos de 13 anos. Você também deve ter idade suficiente para consentir com o processamento de seus dados pessoais em seu país (em alguns países, podemos permitir que seus pais ou responsáveis o façam em seu nome).'
          }
        ]
      }
    ]
  },
  {
    id: 'mudancas',
    title: '8.  Mudanças nas Políticas de Privacidade',
    sections: [
      {
        id: 'mudancas',
        content: [
          {
            type: 'paragraph',
            subtitle:
              'A versão mais recente desta Política de Privacidade rege o processamento dos seus dados pessoais, e podemos revisá-la de tempos em tempos conforme necessário.'
          },
          {
            type: 'paragraph',
            subtitle:
              'Se revisarmos esta Política de Privacidade e fizermos alterações que considerarmos significativas, forneceremos um aviso e a oportunidade de revisar a Política de Privacidade revisada antes de você continuar a usar o Fococa.me.'
          }
        ]
      }
    ]
  },
  {
    id: 'geral',
    title: '9.  Geral',
    sections: [
      {
        id: 'geral',
        content: [
          {
            type: 'paragraph',
            subtitle:
              'A Política de Privacidade do Fococa.me é escrita em português, mas está disponível em vários idiomas por meio de traduções. O Fococa.me se esforça para que as traduções sejam o mais precisas possível em relação à versão original em inglês. No entanto, em caso de discrepâncias ou inconsistências, a versão em inglês da Política de Privacidade do Fococa.me prevalecerá. Você reconhece que o inglês será o idioma de referência para interpretar e construir os termos da Política de Privacidade do Fococa.me.'
          }
        ]
      }
    ]
  },
  {
    id: 'contato',
    title: '10.  Como Entrar em Contato com o Fofoca.me',
    sections: [
      {
        id: 'contato',
        content: [
          {
            type: 'paragraph',
            subtitle:
              'Queremos ouvir você se tiver dúvidas ou comentários sobre esta Política de Privacidade. Você pode nos contatar através da nossa página de Consultas sobre a Política de Privacidade ou escrevendo para o endereço apropriado abaixo.'
          },
          {
            type: 'paragraph',
            subtitle: 'adm@fofoca.me'
          }
        ]
      }
    ]
  }
];

const POLICYS_LINK = [
  {
    id: 'o-que-coletamos',
    title: 'O Que Coletamos'
  },
  {
    id: 'como-usamos',
    title: 'Como Usamos'
  },
  {
    id: 'compartilhamento',
    title: 'Compartilhamento'
  },
  {
    id: 'tempo-armazenamento',
    title: 'Tempo de Armazenamento'
  },
  {
    id: 'controle',
    title: 'Assumindo o Controle'
  },
  {
    id: 'direitos',
    title: 'Direitos'
  },
  {
    id: 'audiencia',
    title: 'Audiência'
  },
  {
    id: 'mudancas',
    title: 'Mudanças'
  },
  {
    id: 'geral',
    title: 'Geral'
  },
  {
    id: 'contato',
    title: 'Contato'
  }
];

export default function Policy(): JSX.Element {
  const [activeLink, setActiveLink] = useState<string>('');

  return (
    <div className='grid min-h-screen grid-rows-[1fr,auto] gap-12 px-52'>
      <SEO
        title='Fofoca-me - A nossa rede social!'
        description='Na Fofoca.me, levamos a sua privacidade a sério. Confira nossa Política de Privacidade para saber como coletamos, utilizamos e protegemos seus dados pessoais. Garantimos transparência e segurança no tratamento de suas informações. Saiba mais sobre seus direitos e como gerenciar suas preferências de privacidade.'
      />

      <header className='sticky top-0 z-10 flex items-center gap-2 bg-black'>
        <i className='!m-0 self-center lg:mb-10 lg:self-auto'>
          <Link href='/'>
            <Image
              alt='Logo da fofoca-me'
              width={64}
              height={64}
              src={'/logo-fofocame.png'}
            />
          </Link>
        </i>

        <span className='font-bold'>Política de Privacidade do Fofoca.me</span>
      </header>

      <div>
        <h1 className='text-8xl font-bold text-[#EF2182]'>
          Política de Privacidade do Fofoca.me
        </h1>
      </div>

      <div className='flex items-start gap-16 bg-white p-10 text-gray-900'>
        <div className='sticky top-16 flex flex-col gap-2 py-2'>
          {POLICYS_LINK.map((link) => (
            <Link
              key={link.id}
              href={`#${link.id}`}
              className={`rounded-lg p-2 font-medium  transition hover:transition ${
                activeLink === link.id
                  ? 'bg-[#EF2182] text-white'
                  : 'text-[#EF2182] hover:bg-[#EF2182]/10'
              }`}
              onClick={() => setActiveLink(link.id)}
            >
              {link.title}
            </Link>
          ))}
        </div>

        <div className='flex flex-col gap-2'>
          {POLICYS.map((section) => (
            <div key={section.id} id={section.id}>
              <h3 className='mb-4 text-5xl font-bold'>{section.title}</h3>
              {section.sections.map((subsection) => (
                <div key={subsection.id}>
                  <span className='text-lg font-bold'>{subsection.title}</span>
                  {subsection.content.map((item, index) => {
                    if (item.type === 'paragraph')
                      return (
                        <div
                          key={item.text}
                          className='mb-6 flex flex-col gap-2'
                        >
                          <span className={item.list ? 'font-bold' : ''}>
                            {item.text}
                          </span>
                          <span>{item.subtitle}</span>

                          {item.list ? (
                            <ul
                              key={index}
                              className='flex flex-col gap-4 px-4'
                            >
                              {item.list?.map((listItem, listIndex) => (
                                <li key={listIndex}>
                                  <p>
                                    <span className='font-bold'>
                                      {listItem.title}
                                    </span>{' '}
                                    {listItem.text}
                                  </p>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      );

                    if (item.type === 'list')
                      return (
                        <ul
                          key={index}
                          className='my-6 flex flex-col gap-4 px-4'
                        >
                          {item.items?.map((listItem, listIndex) => (
                            <li key={listIndex}>
                              <p>
                                <span className='font-bold'>
                                  {listItem.title}:
                                </span>{' '}
                                {listItem.text}
                              </p>
                            </li>
                          ))}
                        </ul>
                      );

                    return null;
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
