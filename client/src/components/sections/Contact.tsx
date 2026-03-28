import { motion } from "framer-motion";

export function Contact() {
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-white/[0.02]"></div>
      
      <div className="container relative z-10 mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-sm font-medium tracking-widest text-white/40 uppercase mb-4">What's Next</h2>
          <h3 className="text-4xl md:text-6xl font-medium tracking-tight mb-8 text-white">
            Let's build something <br/>great together.
          </h3>
          
          <p className="text-xl text-white/60 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            I'm open to remote .NET roles. Whether you have a specific system in mind or need help scaling your architecture, I'd love to discuss it.
          </p>
          
          <a 
            href="mailto:andrei.ciudacov@proton.me" 
            className="inline-block px-10 py-5 bg-white text-black rounded-full font-medium tracking-wide text-lg hover:bg-white/90 hover:scale-105 transition-all duration-300"
          >
            Say Hello
          </a>
        </motion.div>
      </div>
      
      <footer className="relative z-10 container mx-auto px-6 md:px-12 mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
        <p>&copy; {new Date().getFullYear()} Andrei Ciudacov. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="mailto:andrei.ciudacov@proton.me" className="hover:text-white transition-colors">Email</a>
          <a href="https://linkedin.com/in/andrei-ciudacov-518b16179" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
      </footer>
    </section>
  );
}
