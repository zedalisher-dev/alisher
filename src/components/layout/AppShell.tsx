import { NavLink } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { AuthModal } from './AuthModal';

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL as string;

const NAV = [
  { to: '/news', label: 'Новости' },
  { to: '/quiz', label: '🧠 Викторина' },
  { to: '/explore', label: 'Comic Vine' },
  { to: '/read', label: 'Архив' },
  { to: '/xkcd', label: 'xkcd' },
  { to: '/library', label: 'Библиотека' },
];

export function AppShell({ children }: { children: ReactNode }) {
  const { user, loading, showAuthModal, openAuthModal, signOut } = useAuth();

  return (
    <div className="app">
      <header className="app-header">
        <NavLink to="/" className="logo" end>
          😎 Comics Geek
        </NavLink>

        <nav className="app-nav">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) => 'app-nav-link' + (isActive ? ' active' : '')}
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-right">
          {!loading && (
            user ? (
              <>
                {user.email === ADMIN_EMAIL && (
                  <NavLink to="/admin" className={({ isActive }) => 'app-nav-link admin-link' + (isActive ? ' active' : '')}>
                    ⚙ Админ
                  </NavLink>
                )}
                <span className="user-email">{user.email}</span>
                <button className="ghost" onClick={signOut}>Выйти</button>
              </>
            ) : (
              <button className="btn-auth" onClick={openAuthModal}>Войти</button>
            )
          )}
        </div>
      </header>

      <main className="app-main">
        {children}
      </main>

      {showAuthModal && <AuthModal />}
    </div>
  );
}
