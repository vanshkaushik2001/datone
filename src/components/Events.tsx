import { motion } from 'motion/react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const events = [
  {
    id: 1,
    name: 'Underground Cypher Night',
    date: 'Jan 25, 2026',
    time: '8:00 PM',
    location: 'Mumbai Street Studio',
    attendees: 156,
    image: 'https://images.unsplash.com/photo-1656283384093-1e227e621fad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGNvbmNlcnQlMjBjcm93ZHxlbnwxfHx8fDE3Njg2MTA1MjN8MA&ixlib=rb-4.1.0&q=80&w=600',
  },
  {
    id: 2,
    name: 'DHH Showcase 2026',
    date: 'Feb 5, 2026',
    time: '7:00 PM',
    location: 'Delhi Underground',
    attendees: 243,
    image: 'https://images.unsplash.com/photo-1767462372392-31b5b98e480e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bmRlcmdyb3VuZCUyMGNvbmNlcnQlMjB2ZW51ZXxlbnwxfHx8fDE3Njg2NDM4NDh8MA&ixlib=rb-4.1.0&q=80&w=600',
  },
  {
    id: 3,
    name: 'Beat Battle Vol. 12',
    date: 'Feb 15, 2026',
    time: '6:00 PM',
    location: 'Bangalore Beat Lab',
    attendees: 98,
    image: 'https://images.unsplash.com/photo-1656283384093-1e227e621fad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGNvbmNlcnQlMjBjcm93ZHxlbnwxfHx8fDE3Njg2MTA1MjN8MA&ixlib=rb-4.1.0&q=80&w=600',
  },
  {
    id: 4,
    name: 'DATONE Open Mic',
    date: 'Feb 22, 2026',
    time: '9:00 PM',
    location: 'Pune Poetry Spot',
    attendees: 187,
    image: 'https://images.unsplash.com/photo-1767462372392-31b5b98e480e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bmRlcmdyb3VuZCUyMGNvbmNlcnQlMjB2ZW51ZXxlbnwxfHx8fDE3Njg2NDM4NDh8MA&ixlib=rb-4.1.0&q=80&w=600',
  },
];

export function Events() {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-20 bg-[#082F49]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <Calendar size={36} className="text-[#FFE3A5]" />
          <h2 className="text-4xl md:text-5xl font-black text-[#FFE3A5] uppercase tracking-tight">
            Upcoming Events
          </h2>
        </div>
        <p className="text-[#A9B2AC] text-lg">
          Join the culture. Show up. Represent.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="group bg-[#0a3a5a] overflow-hidden border-l-4 border-[#FFE3A5] hover:border-[#4A0807] transition-all duration-300 cursor-pointer"
          >
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-1/3 aspect-square sm:aspect-auto relative overflow-hidden">
                <ImageWithFallback
                  src={event.image}
                  alt={event.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#4A0807] opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
              </div>
              
              <div className="sm:w-2/3 p-6">
                <h3 className="text-2xl font-black text-[#FFE3A5] mb-3 group-hover:text-[#4A0807] transition-colors">
                  {event.name}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-[#A9B2AC]">
                    <Calendar size={16} />
                    <span>{event.date} · {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#A9B2AC]">
                    <MapPin size={16} />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#A9B2AC]">
                    <Users size={16} />
                    <span>{event.attendees} attending</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-[#FFE3A5] text-[#082F49] font-black uppercase text-sm hover:bg-[#4A0807] hover:text-[#FFE3A5] transition-all duration-300"
                >
                  RSVP
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
