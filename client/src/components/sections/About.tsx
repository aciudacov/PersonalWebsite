import { motion } from "framer-motion";

export function About() {
  const skillCategories = [
    {
      title: "Backend & Core",
      skills: [".NET", "C#", "ASP.NET Core", "Web API", "REST", "Entity Framework"]
    },
    {
      title: "Frontend & UI",
      skills: ["Blazor", "Blazor Hybrid", "JavaScript", "jQuery", "MAUI"]
    },
    {
      title: "Databases & Storage",
      skills: ["SQL Server", "PostgreSQL", "Oracle", "MongoDB", "Redis", "Elasticsearch", "T-SQL"]
    },
    {
      title: "DevOps & Observability",
      skills: ["Docker", "Datadog"]
    },
    {
      title: "Architecture & Cloud",
      skills: ["Azure", "Microservices", "Performance Optimization", "Concurrent Processing", "Real-time Data Streams"]
    }
  ];

  return (
    <section id="about" className="py-32 relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-sm font-medium tracking-widest text-white/40 uppercase mb-4">Profile</h2>
              <h3 className="text-3xl md:text-5xl font-medium tracking-tight mb-8 text-white leading-tight">
                Architecting <br className="hidden md:block"/>reliable backends and fancy UI.
              </h3>
            </motion.div>
          </div>
          
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="space-y-6 text-white/70 text-lg font-light leading-relaxed mb-12"
            >
              <p>
                I am a .NET developer focused on building distributed systems, data processing pipelines, and performance-critical applications. My experience spans across backend engineering, QA, and modern web UI work.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="space-y-8"
            >
              {skillCategories.map((category, idx) => (
                <div key={idx}>
                  <h4 className="text-white text-sm font-medium tracking-wide uppercase mb-4">{category.title}</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-white/70"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
