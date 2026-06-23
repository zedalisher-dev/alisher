import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AppShell } from './components/layout/AppShell';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { ExploreDetailPage } from './pages/ExploreDetailPage';
import { ReadPage } from './pages/ReadPage';
import { ReadItemPage } from './pages/ReadItemPage';
import { XkcdPage } from './pages/XkcdPage';
import { XkcdNumPage } from './pages/XkcdNumPage';
import { LibraryPage } from './pages/LibraryPage';
import { NewsPage } from './pages/NewsPage';
import { NewsPostPage } from './pages/NewsPostPage';
import { AdminPage } from './pages/AdminPage';
import { QuizPage } from './pages/QuizPage';
import { ProfilePage } from './pages/ProfilePage';
import { ReviewsPage } from './pages/ReviewsPage';

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <AppShell>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/news/:id" element={<NewsPostPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/explore/:type/:id" element={<ExploreDetailPage />} />
              <Route path="/read" element={<ReadPage />} />
              <Route path="/read/:identifier" element={<ReadItemPage />} />
              <Route path="/xkcd" element={<XkcdPage />} />
              <Route path="/xkcd/:num" element={<XkcdNumPage />} />
              <Route path="/library" element={<LibraryPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </AppShell>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
