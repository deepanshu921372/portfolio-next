'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useTransition } from 'react';
import '@/styles/admin.css';

const sidebarItems = [
  { id: 'personal', label: 'Personal Data', icon: '👤' },
  { id: 'skills', label: 'Skills', icon: '🛠️' },
  { id: 'stats', label: 'Stats', icon: '📊' },
  { id: 'projects', label: 'Projects', icon: '💼' },
  { id: 'journey', label: 'Journey', icon: '🚀' },
  { id: 'education', label: 'Education', icon: '🎓' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isPending, startTransition] = useTransition();

  const currentSection = pathname.split('/').pop() || 'personal';

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin');
    } catch (error) {
      console.error('Logout failed:', error);
    }
    setIsLoggingOut(false);
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Portfolio Admin</h2>
        </div>

        <nav className="sidebar-nav">
          {sidebarItems.map((item) => (
            <Link
              key={item.id}
              href={`/admin/dashboard/${item.id}`}
              className={`sidebar-item ${currentSection === item.id ? 'active' : ''}`}
              prefetch={true}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <a href="/" target="_blank" className="view-site-btn">
            View Site →
          </a>
          <button
            onClick={handleLogout}
            className="logout-btn"
            disabled={isLoggingOut}
          >
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </aside>

      <main className="admin-content">
        <div className={`content-wrapper ${isPending ? 'loading' : ''}`}>
          {children}
        </div>
      </main>
    </div>
  );
}
