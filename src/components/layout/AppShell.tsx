import { NavLink, Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { AuthModal } from './AuthModal';

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL as string;

const NAV = [
  { to: '/news', labelKey: 'nav.news' },
  { to: '/quiz', labelKey: 'nav.quiz', icon: '🧠' },
  { to: '/reviews', labelKey: 'nav.reviews' },
  { to: '/explore', labelKey: 'nav.explore' },
  { to: '/read', labelKey: 'nav.read' },
  { to: '/xkcd', labelKey: 'nav.xkcd' },
  { to: '/library', labelKey: 'nav.library' },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const { user, loading, showAuthModal, openAuthModal, signOut } = useAuth();
  const { language, languages, languageNames, setLanguage, t } = useLanguage();

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
              {'icon' in n ? `${n.icon} ` : ''}{t(n.labelKey)}
            </NavLink>
          ))}
        </nav>

        <div className="header-right">
          <div className="language-switcher" aria-label="Language">
            {languages.map((item) => (
              <button
                key={item}
                type="button"
                className={item === language ? 'active' : ''}
                onClick={() => setLanguage(item)}
              >
                {languageNames[item]}
              </button>
            ))}
          </div>

          {!loading && (
            user ? (
              <>
                {user.email === ADMIN_EMAIL && (
                  <NavLink to="/admin" className={({ isActive }) => 'app-nav-link admin-link' + (isActive ? ' active' : '')}>
                    ⚙ {t('nav.admin')}
                  </NavLink>
                )}
                <Link to="/profile" className="user-email user-email--link">{user.email}</Link>
                <button className="ghost" onClick={signOut}>{t('auth.signOut')}</button>
              </>
            ) : (
              <button className="btn-auth" onClick={openAuthModal}>{t('auth.signIn')}</button>
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
