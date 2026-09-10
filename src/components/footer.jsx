import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 50 }} 

      whileInView={{ opacity: 1, y: 0 }} 

      transition={{ duration: 0.5, ease: "easeOut" }} 
    
      className="bg-ff-bg text-ff-muted py-8 text-center text-sm border-t border-ff-line" 
    >
      <p className="font-mono text-xs tracking-wide text-ff-teal/70 mb-3">
        "Though they are but specks, they shine brighter than the stars at night."
        <span className="text-ff-muted/70"> — Firefly, Honkai: Star Rail</span>
      </p>
      <p>&copy; {new Date().getFullYear()} Andrew M C Li. All rights reserved.</p>
      <p>Website created with React.js, HTML, CSS Tailwind, and Vite</p>
    </motion.footer>
  );
}
