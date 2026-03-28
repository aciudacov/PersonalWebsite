import { motion } from "framer-motion";

export function Experience() {
  const experiences = [
    {
      role: "Senior .NET Developer",
      company: "EBZ Group via Proxify (Remote)",
      period: "Apr 2025 - Present",
      description: "Contributed to a microservices-based enterprise platform for automotive assembly-line planning. Designed and implemented reusable UI infrastructure and data-driven components, focusing on performance and scalability in complex hierarchical datasets. Optimized rendering and state synchronization across multiple views."
    },
    {
      role: ".NET Backend Developer",
      company: "Software Mind Romania & Moldova (Hybrid)",
      period: "Apr 2022 - Oct 2025",
      description: "Bettech Gaming: Backend developer on a microservices-based SaaS betting platform, implementing APIs, integrating third-party services, resolving production issues. Worked on search optimizations with Elasticsearch and introduced Datadog. DataStation: Contributed to full rewrite of legacy ASP compliance system to Blazor/.NET, migrating stored procedures to EF queries."
    },
    {
      role: "Junior .NET Developer",
      company: "STARLAB Moldova (On-site)",
      period: "Aug 2021 - Apr 2022",
      description: "Worked on internal CRM systems and microservices. Delivered new features, resolved production issues, and developed an internal Blazor application for customer and service management, including payment handling."
    },
    {
      role: "Junior .NET Backend Developer",
      company: "Extenda Retail via Stefanini EMEA (Remote)",
      period: "Apr 2020 - Aug 2021",
      description: "Backend developer on an end-to-end retail platform spanning POS, kiosks, and warehouse management. Responsible for API development, bug fixing, and performance improvements."
    },
    {
      role: "QA Engineer",
      company: "Raymond James via Allied Testing (On-site)",
      period: "Jul 2018 - Mar 2020",
      description: "Manual QA on a database migration from SQL Server to Oracle and an internal web-based trading management platform. Validated schema accuracy using SQL analysis and tested complex trading workflows."
    }
  ];

  return (
    <section id="experience" className="py-32 relative border-t border-white/5 bg-gradient-to-b from-transparent to-white/[0.02]">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 text-center"
        >
          <h2 className="text-sm font-medium tracking-widest text-white/40 uppercase mb-4">Background</h2>
          <h3 className="text-3xl md:text-5xl font-medium tracking-tight text-white">
            Experience.
          </h3>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
              className="group relative flex flex-col md:flex-row gap-6 md:gap-12 p-8 md:p-10 border-b border-white/10 hover:bg-white/5 transition-colors"
            >
              <div className="md:w-1/3 pt-1">
                <span className="text-sm text-white/50 font-mono tracking-wide block mb-1">{exp.period}</span>
                <span className="text-sm text-white/40">{exp.company}</span>
              </div>
              <div className="md:w-2/3">
                <h4 className="text-xl font-medium text-white mb-4 group-hover:text-white transition-colors">{exp.role}</h4>
                <p className="text-white/60 font-light leading-relaxed text-sm">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-20 text-center"
          >
            <h4 className="text-lg font-medium text-white mb-2">Education</h4>
            <p className="text-white/60">State University of Moldova (USM)</p>
            <p className="text-white/40 text-sm font-mono mt-1">Bachelor of Computer Science &bull; 2014 - 2018</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
