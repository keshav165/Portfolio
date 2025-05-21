import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/yourusername',
    icon: Github,
  },
  {
    name: 'Twitter',
    href: 'https://x.com/yourusername',
    icon: Twitter,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/yourusername',
    icon: Linkedin,
  },
  {
    name: 'Email',
    href: 'mailto:your.email@example.com',
    icon: Mail,
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Let's work together
              </h3>
              <p className="text-foreground/80">
                Have a project in mind or want to chat? Feel free to reach out!
              </p>
              <div className="flex items-center space-x-4 pt-2">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/60 hover:text-primary transition-colors"
                    aria-label={social.name}
                  >
                    <social.icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="md:col-span-3 md:col-start-9">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h4 className="text-sm font-semibold text-foreground/90 uppercase tracking-wider">
                Navigation
              </h4>
              <nav className="flex flex-col space-y-2">
                <Link
                  href="/"
                  className="text-foreground/60 hover:text-primary transition-colors text-sm"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="text-foreground/60 hover:text-primary transition-colors text-sm"
                >
                  About
                </Link>
                <Link
                  href="/work"
                  className="text-foreground/60 hover:text-primary transition-colors text-sm"
                >
                  Work
                </Link>
                <Link
                  href="/blog"
                  className="text-foreground/60 hover:text-primary transition-colors text-sm"
                >
                  Blog
                </Link>
                <Link
                  href="/contact"
                  className="text-foreground/60 hover:text-primary transition-colors text-sm"
                >
                  Contact
                </Link>
              </nav>
            </motion.div>
          </div>
        </div>

        <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-foreground/60">
            © {currentYear} Keshav. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-sm text-foreground/60 hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-foreground/60 hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
