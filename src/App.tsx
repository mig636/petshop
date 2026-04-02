/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  ShoppingCart, 
  X, 
  Plus, 
  Minus, 
  Heart, 
  Bath, 
  Stethoscope, 
  Home, 
  Bone, 
  Star,
  ChevronRight,
  Menu,
  PawPrint,
  Instagram,
  Facebook,
  Twitter
} from 'lucide-react';
import { cn } from './lib/utils';
import { Product, Service, ExpertTip, CartItem } from './types';
import { PRODUCTS, SERVICES, TIPS } from './constants';

const IconMap: Record<string, any> = {
  Bath,
  Stethoscope,
  Home,
  Bone
};

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (item: Product | Service, type: 'product' | 'service') => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { 
        id: item.id, 
        name: item.name, 
        price: item.price, 
        image: item.image, 
        quantity: 1, 
        type 
      }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col paw-pattern">
      {/* Header */}
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-3 md:px-8",
        scrolled ? "bg-white/90 backdrop-blur-md shadow-lg py-2" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-pet-orange p-2 rounded-xl shadow-md">
              <PawPrint className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-display font-bold text-pet-orange tracking-tight">
              Pet<span className="text-pet-blue">Amigo</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-slate-600">
            <a href="#inicio" className="hover:text-pet-orange transition-colors">Início</a>
            <a href="#servicos" className="hover:text-pet-orange transition-colors">Serviços</a>
            <a href="#produtos" className="hover:text-pet-orange transition-colors">Loja</a>
            <a href="#dicas" className="hover:text-pet-orange transition-colors">Dicas</a>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 text-slate-600 hover:text-pet-orange transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-pet-pink text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              className="md:hidden p-3 text-slate-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <button 
              className="hidden md:block bg-pet-blue text-white px-6 py-2 rounded-full font-bold hover:bg-pet-blue/90 transition-all shadow-lg hover:shadow-pet-blue/20"
              onClick={() => setIsBookingOpen(true)}
            >
              Agendar Agora
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-20 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-6 text-xl font-bold text-slate-700">
              <a href="#inicio" onClick={() => setIsMenuOpen(false)}>Início</a>
              <a href="#servicos" onClick={() => setIsMenuOpen(false)}>Serviços</a>
              <a href="#produtos" onClick={() => setIsMenuOpen(false)}>Loja</a>
              <a href="#dicas" onClick={() => setIsMenuOpen(false)}>Dicas</a>
              <button 
                className="bg-pet-orange text-white py-4 rounded-2xl mt-4 shadow-xl"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsBookingOpen(true);
                }}
              >
                Agendar Agora
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section id="inicio" className="relative overflow-hidden px-4 py-12 md:py-24">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-pet-yellow/20 text-pet-orange px-4 py-2 rounded-full font-bold text-sm mb-6">
                <Star className="w-4 h-4 fill-current" />
                <span>O Pet Shop mais amado da cidade</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-black text-slate-900 leading-tight mb-6">
                Tudo que seu <span className="text-pet-orange">melhor amigo</span> merece!
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
                De banho e tosa a consultas veterinárias, cuidamos do seu pet com todo o carinho e profissionalismo que ele precisa para ser feliz.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => {
                    const el = document.getElementById('servicos');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-pet-orange text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-pet-orange/20 hover:scale-105 transition-transform"
                >
                  Ver Serviços
                </button>
                <button 
                  onClick={() => {
                    const el = document.getElementById('produtos');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-white text-pet-blue border-2 border-pet-blue px-8 py-4 rounded-2xl font-bold text-lg hover:bg-pet-blue/5 transition-all"
                >
                  Conhecer a Loja
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -top-10 -left-10 text-pet-orange/20 animate-float" style={{ animationDelay: '0.5s' }}>
                <PawPrint className="w-12 h-12 rotate-12" />
              </div>
              <div className="absolute -bottom-10 -right-10 text-pet-blue/20 animate-float" style={{ animationDelay: '1.2s' }}>
                <PawPrint className="w-16 h-16 -rotate-12" />
              </div>
              <div className="absolute inset-0 bg-pet-yellow rounded-full blur-3xl opacity-20 -z-10 animate-pulse"></div>
              <div className="relative rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 animate-float">
                <img 
                  src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800" 
                  alt="Cachorro Feliz" 
                  className="w-full aspect-square object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Floating elements */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3"
              >
                <div className="bg-pet-pink p-2 rounded-lg">
                  <Heart className="text-white w-5 h-5 fill-current" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold">Clientes Felizes</p>
                  <p className="text-sm font-black">100% Satisfeitos</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section id="servicos" className="py-24 bg-pet-yellow/5 relative overflow-hidden">
          <div className="blob -top-24 -left-24"></div>
          <div className="blob blob-pink -bottom-24 -right-24"></div>
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#fffdfa] to-transparent"></div>
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block bg-pet-orange/10 text-pet-orange px-4 py-2 rounded-full font-bold text-sm mb-4"
              >
                Nossos Cuidados
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-4">Serviços Especiais</h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                Oferecemos uma gama completa de cuidados especializados para garantir a saúde e o bem-estar do seu pet.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {SERVICES.map((service, idx) => {
                const Icon = IconMap[service.icon];
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="group bg-white rounded-[3rem] overflow-hidden border-2 border-transparent hover:border-pet-orange hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <button 
                          onClick={() => addToCart(service, 'service')}
                          className="bg-white text-pet-orange w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-pet-orange hover:text-white transition-all active:scale-95"
                        >
                          <ShoppingCart className="w-5 h-5" /> Adicionar
                        </button>
                      </div>
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-2xl text-pet-orange shadow-lg">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-pet-orange transition-colors">{service.name}</h3>
                      <p className="text-slate-600 mb-6 text-sm leading-relaxed line-clamp-2">
                        {service.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-xs text-slate-400 font-bold uppercase">A partir de</span>
                          <span className="text-2xl font-black text-pet-blue">
                            R$ {service.price.toFixed(2)}
                          </span>
                        </div>
                        <button 
                          onClick={() => setIsBookingOpen(true)}
                          className="bg-pet-orange text-white p-3 rounded-2xl font-bold shadow-lg shadow-pet-orange/20 hover:scale-110 transition-all"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="produtos" className="py-24 bg-pet-pink/5 relative overflow-hidden">
          <div className="blob -top-24 -right-24"></div>
          <div className="blob blob-pink -bottom-24 -left-24"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-pet-pink/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="inline-block bg-pet-pink/10 text-pet-pink px-4 py-2 rounded-full font-bold text-sm mb-4"
                >
                  Mimos & Cuidados
                </motion.div>
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-4">Loja PetAmigo</h2>
                <p className="text-slate-600 text-lg">Os melhores produtos selecionados a dedo para seu amiguinho.</p>
              </div>
              <button className="bg-pet-blue text-white px-10 py-4 rounded-2xl font-bold hover:bg-pet-blue/90 transition-all shadow-xl shadow-pet-blue/20">
                Ver Tudo
              </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              {PRODUCTS.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-[2rem] p-5 shadow-lg hover:shadow-2xl transition-all group hover:-translate-y-2 border-2 border-transparent hover:border-pet-pink/20"
                >
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-4">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-[10px] font-bold px-2 py-1 rounded-lg text-pet-blue uppercase tracking-wider">
                      {product.category}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-800 mb-1 line-clamp-1 group-hover:text-pet-pink transition-colors">{product.name}</h4>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-black text-pet-orange text-lg">R$ {product.price.toFixed(2)}</span>
                    <button 
                      onClick={() => addToCart(product, 'product')}
                      className="bg-pet-blue text-white p-4 rounded-xl hover:bg-pet-orange transition-colors shadow-md hover:scale-110 active:scale-95"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Expert Tips Section */}
        <section id="dicas" className="py-24 relative overflow-hidden">
          <div className="blob blob-pink top-0 left-0 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="blob bottom-0 right-0 translate-x-1/2 translate-y-1/2"></div>
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="bg-pet-orange rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-pet-yellow/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Dicas do Especialista</h2>
                  <p className="text-white/80 max-w-xl mx-auto">Aprenda com quem entende e proporcione uma vida melhor para seu pet.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {TIPS.map((tip) => (
                    <div key={tip.id} className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl text-white hover:bg-white/20 transition-all">
                      <span className="inline-block bg-white text-pet-orange text-[10px] font-black px-3 py-1 rounded-full uppercase mb-4">
                        {tip.category}
                      </span>
                      <h3 className="text-xl font-bold mb-4 leading-tight">{tip.title}</h3>
                      <p className="text-white/80 text-sm mb-6 leading-relaxed italic">
                        "{tip.content}"
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-pet-yellow flex items-center justify-center font-bold text-pet-orange">
                          {tip.author[0]}
                        </div>
                        <span className="text-xs font-bold">{tip.author}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-24 px-4 relative overflow-hidden">
        <div className="absolute -bottom-20 -left-20 text-white/5 animate-float">
          <PawPrint className="w-64 h-64" />
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 relative z-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-pet-orange p-2 rounded-xl">
                <PawPrint className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-display font-bold text-white">
                Pet<span className="text-pet-orange">Amigo</span>
              </span>
            </div>
            <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
              Cuidando com amor e dedicação de quem sempre está ao seu lado. Venha nos visitar e conheça nosso espaço!
            </p>
            <div className="flex gap-4">
              <a href="#" className="bg-white/5 p-3 rounded-xl hover:bg-pet-orange transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/5 p-3 rounded-xl hover:bg-pet-orange transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/5 p-3 rounded-xl hover:bg-pet-orange transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Links Rápidos</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Nossos Serviços</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Loja Online</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Contato</h4>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  <Home className="w-4 h-4 text-pet-orange" />
                </div>
                <span>Rua dos Pets, 123 - Centro</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  <Bone className="w-4 h-4 text-pet-orange" />
                </div>
                <span>(11) 99999-9999</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/10 mt-16 pt-8 text-center text-slate-500 text-sm">
          <p>&copy; 2024 PetAmigo. Todos os direitos reservados. Feito com ❤️ para seu pet.</p>
        </div>
      </footer>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="text-pet-blue w-6 h-6" />
                  <h2 className="text-2xl font-bold">Seu Carrinho</h2>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-3 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="bg-slate-50 p-8 rounded-full mb-6">
                      <ShoppingCart className="w-16 h-16 text-slate-300" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Carrinho Vazio</h3>
                    <p className="text-slate-500 mb-8">Seu pet está esperando por mimos! Adicione alguns produtos.</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="bg-pet-orange text-white px-8 py-3 rounded-xl font-bold shadow-lg"
                    >
                      Continuar Comprando
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4 group">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between mb-1">
                            <h4 className="font-bold text-slate-800">{item.name}</h4>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="p-2 text-slate-400 hover:text-pet-pink transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-sm text-pet-orange font-black mb-3">R$ {item.price.toFixed(2)}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center bg-slate-100 rounded-lg overflow-hidden">
                              <button 
                                onClick={() => updateQuantity(item.id, -1)}
                                className="p-3 hover:bg-slate-200 transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="px-4 text-sm font-bold min-w-[2.5rem] text-center">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, 1)}
                                className="p-3 hover:bg-slate-200 transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            <span className="text-[10px] font-bold uppercase px-2 py-1 bg-slate-100 rounded-md text-slate-400">
                              {item.type === 'service' ? 'Serviço' : 'Produto'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t bg-slate-50">
                  <div className="flex justify-between mb-4">
                    <span className="text-slate-600 font-bold">Subtotal</span>
                    <span className="text-2xl font-black text-pet-blue">R$ {cartTotal.toFixed(2)}</span>
                  </div>
                  <button className="w-full bg-pet-orange text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-pet-orange/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                    Finalizar Compra
                  </button>
                  <p className="text-center text-xs text-slate-400 mt-4">
                    Frete grátis para compras acima de R$ 150,00
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      <AnimatePresence>
        {isBookingOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBookingOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[80]"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg bg-white z-[90] rounded-[2.5rem] p-8 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-black text-slate-900">Agendar Visita</h2>
                <button 
                  onClick={() => setIsBookingOpen(false)}
                  className="p-3 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form className="space-y-4" onSubmit={(e) => {
                e.preventDefault();
                alert('Agendamento solicitado com sucesso! Entraremos em contato.');
                setIsBookingOpen(false);
              }}>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Nome do Pet</label>
                  <input type="text" required className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-pet-orange outline-none transition-colors" placeholder="Ex: Rex" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Seu Telefone</label>
                  <input type="tel" required className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-pet-orange outline-none transition-colors" placeholder="(00) 00000-0000" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Serviço</label>
                  <select className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-pet-orange outline-none transition-colors">
                    {SERVICES.map(s => <option key={s.id}>{s.name}</option>)}
                  </select>
                </div>
                <button type="submit" className="w-full bg-pet-blue text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-pet-blue/20 hover:scale-[1.02] transition-all mt-4">
                  Confirmar Agendamento
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
