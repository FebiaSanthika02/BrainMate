import React from 'react';
import { Brain, GraduationCap } from 'lucide-react';

const Navbar = ({ onReset }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={onReset}
        >
          <div className="w-10 h-10 primary-gradient rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Brain className="text-white" size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight">StudyPulse <span className="text-primary">AI</span></span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-muted">
          <a href="#" className="hover:text-white transition-colors">Features</a>
          <a href="#" className="hover:text-white transition-colors">How it works</a>
          <a href="#" className="hover:text-white transition-colors">Community</a>
        </div>

        <div className="flex items-center gap-4">
          <button className="btn btn-outline text-sm py-2">Sign In</button>
          <button className="btn btn-primary text-sm py-2">Get Started</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
