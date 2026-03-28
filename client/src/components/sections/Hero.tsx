import { motion } from "framer-motion";

export function Hero() {
  const cvUrl = `${import.meta.env.BASE_URL}andrei_ciudacov_senior_dotnet_developer.pdf`;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.14),_transparent_32%),radial-gradient(circle_at_80%_20%,_rgba(255,255,255,0.08),_transparent_24%),linear-gradient(135deg,_rgba(255,255,255,0.08),_transparent_45%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(255,255,255,0.05),_transparent_30%,_rgba(0,0,0,0.3)_70%,_rgba(0,0,0,0.7)_100%)]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/50 to-background"></div>
      </div>

      <div className="container relative z-10 px-6 md:px-12 mx-auto text-center md:text-left flex flex-col items-center md:items-start pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs font-medium tracking-wide text-white/80 uppercase"
        >
          Senior .NET Backend Developer
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-white mb-6 leading-tight max-w-4xl"
        >
          Building robust <br className="hidden md:block" />
          <span className="text-gradient">distributed systems.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mb-10 leading-relaxed font-light"
        >
          Focused on data processing pipelines, performance-critical applications, integrations, and real-time processing. Based in Chisinau, Moldova.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <a 
            href={cvUrl}
            download
            className="px-8 py-4 bg-white text-black rounded-full font-medium tracking-wide hover:bg-white/90 transition-colors text-center"
          >
            Download CV
          </a>
          <a 
            href="#contact" 
            className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-medium tracking-wide hover:bg-white/10 transition-colors backdrop-blur-md text-center"
          >
            Contact Me
          </a>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/40 tracking-widest uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-white/10 relative overflow-hidden">
          <motion.div 
            animate={{ y: [0, 48] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-white/50"
          />
        </div>
      </motion.div>
    </section>
  );
}
