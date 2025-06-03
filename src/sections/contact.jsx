import {
  Mail,
  Linkedin,
  Phone,
} from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="bg-[#1e1e1e] text-white py-20 px-6 flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Contact Me</h2>
      <div className="flex space-x-8">
        <a href="mailto:amcli@uwaterloo.ca" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition duration-300">
          <Mail className="w-8 h-8" />
        </a>
        <a href="https://www.linkedin.com/in/andrewmcli/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition duration-300">
          <Linkedin className="w-8 h-8" />
        </a>
        <a href="tel:7787065362" className="text-white hover:text-blue-400 transition duration-300">
          <Phone className="w-8 h-8" />
        </a>
      </div>
    </section>
  );
}