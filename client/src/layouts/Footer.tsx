import { Link } from "react-router-dom";
import Heading3 from "../components/Headings/Heading3";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer-container">
      <footer className="border-t-4 border-marker-black">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 py-8">
            <div>
              <Heading3>About</Heading3>
              <p className="text-marker-black text-sm mt-2 leading-relaxed">
                A developer's scratchpad for thoughts on code, architecture, and the occasional rant about type safety.
              </p>
            </div>
            
            <div>
              <Heading3>Quick Links</Heading3>
              <nav className="flex flex-col space-y-2 mt-2">
                <Link to="/" className="text-marker-black hover:text-marker-blue transition-colors duration-200 text-sm font-medium">Home</Link>
                <Link to="/posts" className="text-marker-black hover:text-marker-blue transition-colors duration-200 text-sm font-medium">Posts</Link>
                <Link to="/about" className="text-marker-black hover:text-marker-blue transition-colors duration-200 text-sm font-medium">About</Link>
              </nav>
            </div>
            
            <div>
              <Heading3>Connect</Heading3>
              <div className="flex flex-col space-y-2 mt-2">
                <a href="https://github.com/Azizham66" target="_blank" rel="noopener noreferrer" className="text-marker-black hover:text-marker-blue transition-colors duration-200 text-sm font-medium inline-flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github size-4">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                    <path d="M9 18c-4.51 2-5-2-7-2"/>
                  </svg> 
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/abdulaziz-hamzah-46241a331" target="_blank" rel="noopener noreferrer" className="text-marker-black hover:text-marker-blue transition-colors duration-200 text-sm font-medium inline-flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin size-4">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect width="4" height="12" x="2" y="9"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg> 
                  LinkedIn
                </a>
                <a href="mailto:azizhz2006@gmail.com" className="text-marker-black hover:text-marker-blue transition-colors duration-200 text-sm font-medium inline-flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail size-4">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg> 
                  Email
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t-2 border-marker-black py-6 text-center">
            <p className="text-marker-black text-sm font-medium">
              © {currentYear} Abdulaziz Hamzah. All rights reserved. Built with Node.js, TypeScript, and too much coffee.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
