import {
  BarChart3,
  Calendar,
  Crown,
  Medal,
  Trophy,
  Users,
} from 'lucide-react';

export const VIDEO_ID_DEMO = 'e9mw9iG_9LY';
export const VIDEO_ID_SHORTS = '29bk25RGY6Y';
export const MOBILE_BREAKPOINT = 768;
export const SCROLL_THRESHOLD = 20;

export const FEATURES = [
  {
    icon: Trophy,
    title: 'Gestão de Torneios',
    description: 'Crie e gerencie torneios de forma simples e eficiente',
    color: 'text-yellow-500'
  },
  {
    icon: Users,
    title: 'Rankings Dinâmicos',
    description: 'Acompanhe classificações do jogadores',
    color: 'text-orange-500'
  },
  {
    icon: BarChart3,
    title: 'Estatísticas Detalhadas',
    description: 'Visualize vitórias, derrotas, pontos e saldo de cada participante',
    color: 'text-green-500'
  },
  {
    icon: Calendar,
    title: 'Histórico Completo',
    description: 'Mantenha registro de todos os torneios e resultados',
    color: 'text-purple-500'
  }
];

export const EXAMPLES = [
  {
    title: 'Liga Clubinho CBS',
    subtitle: '31/10/2026',
    status: 'Em andamento',
    participants: '23 jogadores',
    games: 253,
    link: 'https://podiodigital.app.br/torneio/liga-clubinho-cbs_qdq2xegD'
  },
  {
    title: 'BT da Lu',
    subtitle: '14/03/2026',
    status: 'Finalizado',
    participants: '7 duplas',
    games: 13,
    link: 'https://podiodigital.app.br/torneio/bt-da-lu_S2s2XoVi'
  },
  {
    title: '2º Torneio de Futevôlei - Prime Beach (Misto)',
    subtitle: '14/03/2026',
    status: 'Finalizado',
    participants: '15 duplas',
    games: 32,
    link: 'https://podiodigital.app.br/torneio/misto_p5Mp8sqr'
  },
  {
    title: '2º Torneio de Futevôlei - Prime Beach (Masculino Intermediário)',
    subtitle: '14/03/2026',
    status: 'Finalizado',
    participants: '12 duplas',
    games: 38,
    link: 'https://podiodigital.app.br/torneio/masculino-intermediario_fiecv8dt'
  },
  {
    title: 'Areal super 8',
    subtitle: '22/02/2026',
    status: 'Finalizado',
    participants: '8 jogadores',
    games: 14,
    link: 'https://podiodigital.app.br/rei-rainha/areal-super-8_7G76t3Ma'
  },
  {
    title: 'Olimpíadas Maçônicas - Volei MISTO',
    subtitle: '16/11/2025',
    status: 'Finalizado',
    participants: '9 duplas',
    games: 19,
    link: 'https://podiodigital.app.br/torneio/olimpiadas-maconicas-volei-misto_VcUdCi2w'
  },
  {
    title: 'Olimpíadas Maçônicas - Beach Tennis MASCULINO',
    subtitle: '15/11/2025',
    status: 'Finalizado',
    participants: '10 duplas',
    games: 15,
    link: 'https://podiodigital.app.br/torneio/olimpiadas-maconicas-bt-masculino_DFQXXVwH'
  },
    {
    title: 'Mista Sorteada CBS',
    subtitle: '14/11/2025',
    status: 'Finalizado',
    participants: '14 duplas',
    games: 26,
    link: 'https://podiodigital.app.br/torneio/mista-sorteada-cbs_pa7b24Ew'
  },
  {
    title: 'Torneio Interno Masculino PNA - Etapa Chiquinho',
    subtitle: '24/10/2025',
    status: 'Finalizado',
    participants: '5 duplas',
    games: 11,
    link: 'https://podiodigital.app.br/torneio/torneio-interno-masculino-pna_ujDgztsJ'
  },
  {
    title: 'REI DA QUADRA OPEN',
    subtitle: '26/07/2025',
    status: 'Finalizado',
    participants: '12 jogadores',
    games: 33,
    link: 'https://podiodigital.app.br/rei-rainha/rei-da-quadra-open_aVikY52a'
  },
];

export const PRICING = [
  {
    name: 'Torneio Avulso',
    sub: 'Sem compromisso',
    price: 'R$ 1,00',
    per: 'por participante',
    icon: Trophy,
    color: 'text-blue-500',
    features: [
      'Organização de 1 torneio',
      'Cálculo automático de pontuações',
      'Classificações de grupos automáticas',
      'Mata-mata gerado automaticamente',
      'Link para participantes acompanharem os jogos',
    ],
    highlight: false,
    buttonText: 'Contratar Avulso',
  },
  {
    name: 'Mensalidade Premium',
    sub: 'Perfeito para arenas',
    price: 'R$ 80,00',
    per: 'por mês',
    icon: Crown,
    color: 'text-orange-500',
    features: [
      'Torneios ilimitados',
      'Rei/Rainha ilimitados',
      'Jogos gerados automaticamente',
      'Cálculo automático de pontuações',
      'Classificação automática',
      'Mata-mata gerado automaticamente',
      'Link para participantes acompanharem os jogos',
    ],
    highlight: true,
    buttonText: 'Assinar Mensalidade',
  },
  {
    name: 'Rei/Rainha Avulso',
    sub: 'Fácil e Rápido',
    price: 'R$ 2,00',
    per: 'por participante',
    icon: Medal,
    color: 'text-green-500',
    features: [
      'Organização de 1 evento Rei/Rainha',
      'Jogos gerados automaticamente',
      'Cálculo automático de pontuações',
      'Classificação automática',
      'Link para participantes acompanharem os jogos',
    ],
    highlight: false,
    buttonText: 'Contratar Avulso',
  },
];

export const INSTAGRAM_POSTS = [
  'https://www.instagram.com/p/DVGXWrukbPh/',
  'https://www.instagram.com/p/DT6ZYEeEQPc/',
  'https://www.instagram.com/p/DUyj8eNkbO0/',
];