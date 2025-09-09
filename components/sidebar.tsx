"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { 
  Home, 
  User, 
  Briefcase, 
  FolderKanban, 
  Code2, 
  Mail, 
  Menu, 
  X,
  File
} from "lucide-react";
import { personalData } from "@/data/portfolio";
import { useRouter } from "next/navigation";

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "About", path: "/about", icon: User },
  { name: "Experience", path: "/experience", icon: Briefcase },
  { name: "Projects", path: "/projects", icon: FolderKanban },
  { name: "Skills", path: "/skills", icon: Code2 },
  { name: "Contact", path: "/contact", icon: Mail },
  { name: "Resume", path: "https://drive.google.com/file/d/1mnYw1BEDul0xVjg0K-r72s3Hg3peOISx/view?usp=sharing", icon: File },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const router = useRouter();

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button
          onClick={toggleMobileMenu}
          className={`p-2 rounded-full bg-primary text-primary-foreground transition-transform duration-300 hover:scale-110 ${isMobileMenuOpen ? "hidden" : "block"}`}
        >
          {/* {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />} */}
           <Menu size={24}/>
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isMobile && (
        <div
          className={cn(
            "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-all duration-300",
            isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          <div
            className={cn(
              "fixed left-0 top-0 h-full w-64 bg-card shadow-lg transition-transform duration-500 ease-in-out transform z-50",
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            <div className="flex flex-col h-full p-4">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold">{personalData.name}</h2>
                <button onClick={toggleMobileMenu} className="transition-transform duration-300 hover:rotate-90">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="flex-1">
                <ul className="space-y-4">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.path}>
                        {item.name === "Resume" ? (
                          <a
                            href={item.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                              "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-300",
                              "hover:bg-muted hover:translate-x-2"
                            )}
                          >
                            <Icon className="h-5 w-5" />
                            <span>{item.name}</span>
                          </a>
                        ) : (
                          <Link
                            href={item.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                              "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-300",
                              pathname === item.path
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-muted hover:translate-x-2"
                            )}
                          >
                            <Icon className="h-5 w-5" />
                            <span>{item.name}</span>
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <div className="mt-auto pt-4 flex justify-center">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:flex fixed left-0 top-0 h-full w-20 bg-card shadow-md flex-col items-center py-8 z-40">
        <div className="flex flex-col items-center justify-between h-full">
          <div className="flex flex-col items-center gap-8">
            <div onClick={() => router.push("/")} className="w-12 h-12 cursor-pointer rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl transition-transform duration-300 hover:scale-110">
              {personalData.name.charAt(0)}
            </div>
            <nav>
              <ul className="flex flex-col items-center gap-6">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.path;
                  return (
                    <li key={item.path} className="group">
                      {item.name === "Resume" ? (
                        <a
                          href={item.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "relative flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300",
                            "hover:bg-muted hover:scale-110"
                          )}
                        >
                          <Icon className="h-5 w-5" />
                          <span className="absolute -right-20 bg-card px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
                            {item.name}
                          </span>
                        </a>
                      ) : (
                        <Link
                          href={item.path}
                          className={cn(
                            "relative flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300",
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-muted hover:scale-110"
                          )}
                        >
                          <Icon className="h-5 w-5" />
                          <span className="absolute -right-20 bg-card px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
                            {item.name}
                          </span>
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}