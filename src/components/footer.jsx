import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 50 }} 

      whileInView={{ opacity: 1, y: 0 }} 

      transition={{ duration: 0.5, ease: "easeOut" }} 
    
      className="bg-[#1e1e1e] text-gray-400 py-6 text-center text-sm" 
    >
      <p>&copy; 2025 Andrew M C Li. All rights reserved.</p>
    </motion.footer>
  );
}
