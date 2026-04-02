import { Product, Service, ExpertTip } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Ração Premium Gatos',
    price: 89.90,
    image: 'https://images.unsplash.com/photo-1589924691106-073b19f5939c?auto=format&fit=crop&q=80&w=400',
    category: 'Alimentação'
  },
  {
    id: 'p2',
    name: 'Brinquedo Mordedor Cão',
    price: 35.00,
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=400',
    category: 'Brinquedos'
  },
  {
    id: 'p3',
    name: 'Caminha Nuvem P',
    price: 120.00,
    image: 'https://images.unsplash.com/photo-1591946614421-1dbf52d3dbad?auto=format&fit=crop&q=80&w=400',
    category: 'Acessórios'
  },
  {
    id: 'p4',
    name: 'Arranhador Torre',
    price: 159.00,
    image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&q=80&w=400',
    category: 'Acessórios'
  },
  {
    id: 'p5',
    name: 'Shampoo Neutro Pet',
    price: 28.50,
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=400',
    category: 'Higiene'
  },
  {
    id: 'p6',
    name: 'Coleira Ajustável',
    price: 45.00,
    image: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&q=80&w=400',
    category: 'Acessórios'
  }
];

export const SERVICES: Service[] = [
  {
    id: 's1',
    name: 'Banho & Tosa',
    price: 75.00,
    description: 'Um banho relaxante com produtos específicos e tosa higiênica.',
    icon: 'Bath',
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 's2',
    name: 'Consulta Veterinária',
    price: 150.00,
    description: 'Check-up completo com nossos especialistas apaixonados por animais.',
    icon: 'Stethoscope',
    image: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 's3',
    name: 'Hospedagem Pet',
    price: 90.00,
    description: 'Seu pet se sentirá em casa com muito carinho e diversão.',
    icon: 'Home',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 's4',
    name: 'Adestramento',
    price: 120.00,
    description: 'Aulas positivas para melhorar o comportamento do seu amigão.',
    icon: 'Bone',
    image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=600'
  }
];

export const TIPS: ExpertTip[] = [
  {
    id: 't1',
    title: 'A importância da hidratação',
    content: 'Mantenha sempre água fresca disponível. Gatos, em especial, preferem fontes de água corrente.',
    author: 'Dra. Marina Silva',
    category: 'Saúde'
  },
  {
    id: 't2',
    title: 'Brincadeiras diárias',
    content: 'Pelo menos 15 minutos de brincadeira ativa ajudam a reduzir o estresse e a obesidade pet.',
    author: 'Adestrador João Paulo',
    category: 'Bem-estar'
  },
  {
    id: 't3',
    title: 'Vacinação em dia',
    content: 'Não esqueça o reforço anual das vacinas. A prevenção é o melhor remédio para uma vida longa.',
    author: 'Dr. Ricardo Mello',
    category: 'Saúde'
  }
];
