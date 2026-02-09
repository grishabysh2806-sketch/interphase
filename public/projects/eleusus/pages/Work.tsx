import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchCaseStudies } from '../services/api';
import { CaseStudy, Language } from '../types';
import { Loader2, Cpu, Monitor, Wifi, Zap } from 'lucide-react';
import Modal from '../components/Modal';

const Work: React.FC<{ lang: Language }> = ({ lang }) => {
  const [cases, setCases] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<CaseStudy | null>(null);

  useEffect(() => {
    fetchCaseStudies().then(data => {
      setCases(data);
      setLoading(false);
    });
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 py-16"
    >
      <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-bold mb-8 md:mb-16 text-stroke text-transparent stroke-neo-acid text-center md:text-left break-words">
        BATTLE_STATIONS
      </h1>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-64">
           <Loader2 className="animate-spin text-neo-acid w-16 h-16" />
           <p className="mt-4 font-mono text-neo-acid blink">ACCESSING MAINFRAME...</p>
        </div>
      ) : (
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-12"
        >
          {cases.map((project, index) => (
            <motion.div 
              key={project.id}
              variants={item}
              className="flex flex-col gap-8 bg-gray-900/50 border border-neo-purple p-6 hover:border-neo-pink transition-colors group"
            >
               <div className="w-full flex flex-col justify-center items-start space-y-4">
                  <div className="flex gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-neo-purple text-xs font-mono text-neo-cyan border border-neo-cyan rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-4xl font-display font-bold text-white group-hover:text-neo-pink transition-colors">
                    {project.title}
                  </h2>
                  <h3 className="text-xl text-gray-400 font-mono">{project.client} // {project.year}</h3>
                  <p className="text-lg text-gray-300 font-body border-l-2 border-neo-acid pl-4">
                    {project.description}
                  </p>
                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="mt-4 px-6 py-2 border-2 border-white text-white font-bold hover:bg-white hover:text-black transition-all"
                  >
                    VIEW SPECS
                  </button>
               </div>
            </motion.div>
          ))}
        </motion.div>
      )}
      
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title}
      >
        {selectedProject && (
          <div className="space-y-6">
            <div className="flex justify-between items-center text-sm font-mono text-gray-400 border-b border-gray-800 pb-4">
               <span>CLIENT: {selectedProject.client}</span>
               <span>STATUS: {selectedProject.year}</span>
            </div>

            <p className="text-xl text-white font-body leading-relaxed">
              {selectedProject.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
               <div className="bg-gray-900 p-4 border border-gray-700">
                  <div className="flex items-center gap-2 text-neo-acid mb-2">
                    <Cpu size={20} />
                    <span className="font-bold font-display">CPU / GPU</span>
                  </div>
                  <div className="text-sm font-mono text-gray-300">Intel i9-14900K + RTX 4090 OC</div>
               </div>
               <div className="bg-gray-900 p-4 border border-gray-700">
                  <div className="flex items-center gap-2 text-neo-cyan mb-2">
                    <Monitor size={20} />
                    <span className="font-bold font-display">DISPLAY</span>
                  </div>
                  <div className="text-sm font-mono text-gray-300">ASUS ROG Swift 540Hz TN Panel</div>
               </div>
               <div className="bg-gray-900 p-4 border border-gray-700">
                  <div className="flex items-center gap-2 text-neo-pink mb-2">
                    <Wifi size={20} />
                    <span className="font-bold font-display">NETWORK</span>
                  </div>
                  <div className="text-sm font-mono text-gray-300">10Gbps Fiber Dedicated Line</div>
               </div>
               <div className="bg-gray-900 p-4 border border-gray-700">
                  <div className="flex items-center gap-2 text-white mb-2">
                    <Zap size={20} />
                    <span className="font-bold font-display">POWER</span>
                  </div>
                  <div className="text-sm font-mono text-gray-300">Uninterruptible Power Supply (UPS)</div>
               </div>
            </div>
            
            <div className="text-center pt-4">
               <div className="inline-block text-xs font-mono text-gray-500 animate-pulse">
                 SYSTEM SPECS RETRIEVED FROM DATABASE
               </div>
            </div>
          </div>
        )}
      </Modal>

      <style>{`
        .text-stroke {
          -webkit-text-stroke: 2px #ccff00;
        }
        .blink {
          animation: blink 1s infinite;
        }
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </motion.div>
  );
};

export default Work;
