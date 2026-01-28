import { motion } from 'motion/react';
import { ShoppingBag, Heart } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useState } from 'react';

const products = [
  // Playing Cards
  {
    id: 1,
    name: 'DATONE Black Playing Cards',
    price: '₹499',
    category: 'Playing Cards',
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGNhcmRzfGVufDB8fHx8fDE3Njg2NDM4NDh8MA&ixlib=rb-4.1.0&q=80&w=600',
    colors: ['Black'],
    sizes: ['Standard Deck'],
  },
  {
    id: 2,
    name: 'DATONE Gold Playing Cards',
    price: '₹599',
    category: 'Playing Cards',
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwY2FyZHN8ZW58MHx8fHx8fDE3Njg2NDM4NDh8MA&ixlib=rb-4.1.0&q=80&w=600',
    colors: ['Gold'],
    sizes: ['Standard Deck'],
  },
  // Caps
  {
    id: 3,
    name: 'DATONE Classic Cap - Black',
    price: '₹799',
    category: 'Caps',
    image: 'https://images.unsplash.com/photo-1564069114553-7639e50fb158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGNhcHxlbnwwfHx8fHwxNzY4NjQzODQ4fDA&ixlib=rb-4.1.0&q=80&w=600',
    colors: ['Black'],
    sizes: ['One Size'],
  },
  {
    id: 4,
    name: 'DATONE Urban Cap - Cream',
    price: '₹799',
    category: 'Caps',
    image: 'https://images.unsplash.com/photo-1564069114553-7639e50fb158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhbSUyMGNhcHxlbnwwfHx8fHwxNzY4NjQzODQ4fDA&ixlib=rb-4.1.0&q=80&w=600',
    colors: ['Cream'],
    sizes: ['One Size'],
  },
  {
    id: 5,
    name: 'DATONE Maroon Cap',
    price: '₹799',
    category: 'Caps',
    image: 'https://images.unsplash.com/photo-1564069114553-7639e50fb158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJvb24lMjBjYXB8ZW58MHx8fHx8fDE3Njg2NDM4NDh8MA&ixlib=rb-4.1.0&q=80&w=600',
    colors: ['Maroon'],
    sizes: ['One Size'],
  },
  {
    id: 6,
    name: 'DATONE Street Cap - Navy',
    price: '₹799',
    category: 'Caps',
    image: 'https://images.unsplash.com/photo-1564069114553-7639e50fb158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXZ5JTIwY2FwfGVufDB8fHx8fDE3Njg2NDM4NDh8MA&ixlib=rb-4.1.0&q=80&w=600',
    colors: ['Navy'],
    sizes: ['One Size'],
  },
  {
    id: 7,
    name: 'DATONE Hip-Hop Cap - Grey',
    price: '₹799',
    category: 'Caps',
    image: 'https://images.unsplash.com/photo-1564069114553-7639e50fb158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmV5JTIwY2FwfGVufDB8fHx8fDE3Njg2NDM4NDh8MA&ixlib=rb-4.1.0&q=80&w=600',
    colors: ['Grey'],
    sizes: ['One Size'],
  },
  {
    id: 8,
    name: 'DATONE Festival Cap - Red',
    price: '₹799',
    category: 'Caps',
    image: 'https://images.unsplash.com/photo-1564069114553-7639e50fb158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBjYXB8ZW58MHx8fHx8fDE3Njg2NDM4NDh8MA&ixlib=rb-4.1.0&q=80&w=600',
    colors: ['Red'],
    sizes: ['One Size'],
  },
];

export function Explore() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState<number[]>([]);

  const categories = ['All', 'Playing Cards', 'Caps'];

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-[#082F49] to-[#0a3a5a]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <div className="flex items-center gap-4 mb-4">
          <ShoppingBag size={48} className="text-[#FFE3A5]" />
          <div>
            <h1 className="text-5xl md:text-6xl font-black text-[#FFE3A5] uppercase tracking-tight">
              Explore
            </h1>
            <p className="text-[#A9B2AC] text-lg mt-2">
              Playing Cards & Caps - Rep the Movement
            </p>
          </div>
        </div>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-12"
      >
        <div className="flex gap-3 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 font-bold uppercase text-sm transition-all ${
                selectedCategory === category
                  ? 'bg-[#FFE3A5] text-[#082F49]'
                  : 'bg-[#0a3a5a] text-[#A9B2AC] hover:bg-[#FFE3A5]/20 hover:text-[#FFE3A5] border border-[#FFE3A5]/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Products Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="group bg-[#0a3a5a] border border-[#FFE3A5]/10 hover:border-[#FFE3A5]/30 transition-all duration-300 overflow-hidden relative"
          >
            {/* Favorite Button */}
            <button
              onClick={() => toggleFavorite(product.id)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-[#082F49]/80 hover:bg-[#FFE3A5] flex items-center justify-center transition-all group/fav"
            >
              <Heart
                size={20}
                className={`transition-all ${
                  favorites.includes(product.id)
                    ? 'fill-[#FFE3A5] text-[#FFE3A5]'
                    : 'text-[#FFE3A5] group-hover/fav:fill-[#082F49] group-hover/fav:text-[#082F49]'
                }`}
              />
            </button>

            <div className="relative aspect-[3/4] overflow-hidden bg-[#082F49]">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#082F49] via-transparent opacity-60" />
              <div className="absolute inset-0 bg-[#4A0807] opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
              
              {/* Quick View on Hover */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <button className="w-full px-4 py-3 bg-[#FFE3A5] text-[#082F49] font-black uppercase hover:bg-[#4A0807] hover:text-[#FFE3A5] transition-all">
                  Quick View
                </button>
              </motion.div>
            </div>

            <div className="p-6">
              <div className="mb-3">
                <span className="text-xs text-[#A9B2AC] uppercase tracking-wider">
                  {product.category}
                </span>
              </div>
              
              <h3 className="text-xl font-black text-[#FFE3A5] mb-2 group-hover:text-[#4A0807] transition-colors">
                {product.name}
              </h3>
              
              <p className="text-2xl font-black text-[#FFE3A5] mb-4">{product.price}</p>

              {/* Colors */}
              <div className="mb-3">
                <p className="text-xs text-[#A9B2AC] mb-2">Colors:</p>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <div
                      key={color}
                      className="px-2 py-1 bg-[#082F49] border border-[#FFE3A5]/20 text-[#A9B2AC] text-xs"
                    >
                      {color}
                    </div>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mb-4">
                <p className="text-xs text-[#A9B2AC] mb-2">Sizes:</p>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <div
                      key={size}
                      className="w-10 h-10 bg-[#082F49] border border-[#FFE3A5]/20 text-[#A9B2AC] text-xs flex items-center justify-center hover:bg-[#FFE3A5] hover:text-[#082F49] transition-all cursor-pointer"
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-6 py-3 bg-[#FFE3A5] text-[#082F49] font-black uppercase hover:bg-[#4A0807] hover:text-[#FFE3A5] transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag size={18} />
                Add to Cart
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
