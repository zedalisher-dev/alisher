import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

export type Language = 'ru' | 'en' | 'kk';

type TranslationKey =
  | 'nav.news'
  | 'nav.quiz'
  | 'nav.reviews'
  | 'nav.explore'
  | 'nav.read'
  | 'nav.xkcd'
  | 'nav.library'
  | 'nav.admin'
  | 'auth.signIn'
  | 'auth.signOut'
  | 'auth.signUp'
  | 'auth.google'
  | 'auth.or'
  | 'auth.password'
  | 'auth.passwordPlaceholder'
  | 'auth.createAccount'
  | 'auth.checkEmail'
  | 'auth.googleError'
  | 'auth.genericError'
  | 'home.subtitle'
  | 'home.comicVine.subtitle'
  | 'home.comicVine.desc'
  | 'home.comicVine.badge'
  | 'home.reader.title'
  | 'home.reader.subtitle'
  | 'home.reader.desc'
  | 'home.reader.badge'
  | 'home.xkcd.subtitle'
  | 'home.xkcd.desc'
  | 'home.xkcd.badge'
  | 'reviews.loadError'
  | 'reviews.saveSuccess'
  | 'reviews.saveError'
  | 'reviews.authTitle'
  | 'reviews.authText'
  | 'reviews.kicker'
  | 'reviews.title'
  | 'reviews.subtitle'
  | 'reviews.ratingLabel'
  | 'reviews.ratingAria'
  | 'reviews.outOf'
  | 'reviews.commentLabel'
  | 'reviews.placeholder'
  | 'reviews.saving'
  | 'reviews.update'
  | 'reviews.submit'
  | 'reviews.myReview'
  | 'reviews.updated'
  | 'reviews.noComment';

const translations: Record<Language, Record<TranslationKey, string>> = {
  ru: {
    'nav.news': 'Новости',
    'nav.quiz': 'Викторина',
    'nav.reviews': 'Отзывы',
    'nav.explore': 'Comic Vine',
    'nav.read': 'Архив',
    'nav.xkcd': 'xkcd',
    'nav.library': 'Библиотека',
    'nav.admin': 'Админ',
    'auth.signIn': 'Войти',
    'auth.signOut': 'Выйти',
    'auth.signUp': 'Регистрация',
    'auth.google': 'Войти через Google',
    'auth.or': 'или',
    'auth.password': 'Пароль',
    'auth.passwordPlaceholder': 'минимум 6 символов',
    'auth.createAccount': 'Создать аккаунт',
    'auth.checkEmail': 'Проверь почту для подтверждения!',
    'auth.googleError': 'Не удалось открыть Google.',
    'auth.genericError': 'Что-то пошло не так.',
    'home.subtitle': 'Ищи комиксы. Читай публичный архив. Смотри xkcd.',
    'home.comicVine.subtitle': 'Поиск метаданных',
    'home.comicVine.desc': 'Персонажи, выпуски, серии и издатели из крупнейшей базы данных комиксов.',
    'home.comicVine.badge': 'Только метаданные',
    'home.reader.title': 'Читалка',
    'home.reader.subtitle': 'Публичный архив',
    'home.reader.desc': 'Читай комиксы в открытом доступе из Internet Archive: PDF, изображения, текст.',
    'home.reader.badge': 'Публичный доступ',
    'home.xkcd.subtitle': 'Демо-режим',
    'home.xkcd.desc': 'Веб-комикс xkcd: научный юмор, математика и жизнь программиста.',
    'home.xkcd.badge': 'Веб-комикс',
    'reviews.loadError': 'Не получилось загрузить отзыв. Попробуйте обновить страницу.',
    'reviews.saveSuccess': 'Спасибо! Отзыв сохранён.',
    'reviews.saveError': 'Не получилось сохранить отзыв. Попробуйте ещё раз.',
    'reviews.authTitle': 'Войдите, чтобы оставить отзыв',
    'reviews.authText': 'Оценка сохранится в вашем профиле.',
    'reviews.kicker': 'Обратная связь',
    'reviews.title': 'Оцените Comics Geek',
    'reviews.subtitle': 'Поставьте оценку и напишите, что сделать лучше. Отзыв можно обновить в любой момент.',
    'reviews.ratingLabel': 'Ваша оценка',
    'reviews.ratingAria': 'Оценка приложения',
    'reviews.outOf': 'из 5',
    'reviews.commentLabel': 'Комментарий',
    'reviews.placeholder': 'Что понравилось? Чего не хватает?',
    'reviews.saving': 'Сохраняем...',
    'reviews.update': 'Обновить отзыв',
    'reviews.submit': 'Оставить отзыв',
    'reviews.myReview': 'Ваш отзыв',
    'reviews.updated': 'Обновлён',
    'reviews.noComment': 'Без комментария',
  },
  en: {
    'nav.news': 'News',
    'nav.quiz': 'Quiz',
    'nav.reviews': 'Reviews',
    'nav.explore': 'Comic Vine',
    'nav.read': 'Archive',
    'nav.xkcd': 'xkcd',
    'nav.library': 'Library',
    'nav.admin': 'Admin',
    'auth.signIn': 'Sign in',
    'auth.signOut': 'Sign out',
    'auth.signUp': 'Sign up',
    'auth.google': 'Sign in with Google',
    'auth.or': 'or',
    'auth.password': 'Password',
    'auth.passwordPlaceholder': 'at least 6 characters',
    'auth.createAccount': 'Create account',
    'auth.checkEmail': 'Check your email to confirm!',
    'auth.googleError': 'Could not open Google.',
    'auth.genericError': 'Something went wrong.',
    'home.subtitle': 'Find comics. Read the public archive. Explore xkcd.',
    'home.comicVine.subtitle': 'Metadata search',
    'home.comicVine.desc': 'Characters, issues, series, and publishers from a huge comics database.',
    'home.comicVine.badge': 'Metadata only',
    'home.reader.title': 'Reader',
    'home.reader.subtitle': 'Public archive',
    'home.reader.desc': 'Read public comics from Internet Archive: PDFs, images, and text.',
    'home.reader.badge': 'Public access',
    'home.xkcd.subtitle': 'Demo mode',
    'home.xkcd.desc': 'The xkcd webcomic: science humor, math, and programmer life.',
    'home.xkcd.badge': 'Webcomic',
    'reviews.loadError': 'Could not load your review. Try refreshing the page.',
    'reviews.saveSuccess': 'Thanks! Your review was saved.',
    'reviews.saveError': 'Could not save your review. Please try again.',
    'reviews.authTitle': 'Sign in to leave a review',
    'reviews.authText': 'Your rating will be saved in your profile.',
    'reviews.kicker': 'Feedback',
    'reviews.title': 'Rate Comics Geek',
    'reviews.subtitle': 'Choose a rating and write what could be improved. You can update your review anytime.',
    'reviews.ratingLabel': 'Your rating',
    'reviews.ratingAria': 'App rating',
    'reviews.outOf': 'out of 5',
    'reviews.commentLabel': 'Comment',
    'reviews.placeholder': 'What did you like? What is missing?',
    'reviews.saving': 'Saving...',
    'reviews.update': 'Update review',
    'reviews.submit': 'Leave review',
    'reviews.myReview': 'Your review',
    'reviews.updated': 'Updated',
    'reviews.noComment': 'No comment',
  },
  kk: {
    'nav.news': 'Жаңалықтар',
    'nav.quiz': 'Викторина',
    'nav.reviews': 'Пікірлер',
    'nav.explore': 'Comic Vine',
    'nav.read': 'Архив',
    'nav.xkcd': 'xkcd',
    'nav.library': 'Кітапхана',
    'nav.admin': 'Админ',
    'auth.signIn': 'Кіру',
    'auth.signOut': 'Шығу',
    'auth.signUp': 'Тіркелу',
    'auth.google': 'Google арқылы кіру',
    'auth.or': 'немесе',
    'auth.password': 'Құпиясөз',
    'auth.passwordPlaceholder': 'кемінде 6 таңба',
    'auth.createAccount': 'Аккаунт құру',
    'auth.checkEmail': 'Растау үшін поштаңызды тексеріңіз!',
    'auth.googleError': 'Google ашылмады.',
    'auth.genericError': 'Бірдеңе дұрыс болмады.',
    'home.subtitle': 'Комикстерді ізде. Ашық архивті оқы. xkcd қара.',
    'home.comicVine.subtitle': 'Метадеректерді іздеу',
    'home.comicVine.desc': 'Комикстер базасындағы кейіпкерлер, шығарылымдар, сериялар және баспалар.',
    'home.comicVine.badge': 'Тек метадерек',
    'home.reader.title': 'Оқу',
    'home.reader.subtitle': 'Ашық архив',
    'home.reader.desc': 'Internet Archive ішіндегі ашық комикстерді оқы: PDF, суреттер және мәтін.',
    'home.reader.badge': 'Ашық қолжетім',
    'home.xkcd.subtitle': 'Демо режим',
    'home.xkcd.desc': 'xkcd веб-комиксі: ғылым әзілі, математика және программист өмірі.',
    'home.xkcd.badge': 'Веб-комикс',
    'reviews.loadError': 'Пікір жүктелмеді. Бетті жаңартып көріңіз.',
    'reviews.saveSuccess': 'Рақмет! Пікір сақталды.',
    'reviews.saveError': 'Пікір сақталмады. Қайта көріңіз.',
    'reviews.authTitle': 'Пікір қалдыру үшін кіріңіз',
    'reviews.authText': 'Бағаңыз профильде сақталады.',
    'reviews.kicker': 'Кері байланыс',
    'reviews.title': 'Comics Geek-ті бағалаңыз',
    'reviews.subtitle': 'Баға қойып, нені жақсартуға болатынын жазыңыз. Пікірді кез келген уақытта жаңартуға болады.',
    'reviews.ratingLabel': 'Сіздің бағаңыз',
    'reviews.ratingAria': 'Қолданба бағасы',
    'reviews.outOf': '5-тен',
    'reviews.commentLabel': 'Пікір',
    'reviews.placeholder': 'Не ұнады? Не жетіспейді?',
    'reviews.saving': 'Сақталуда...',
    'reviews.update': 'Пікірді жаңарту',
    'reviews.submit': 'Пікір қалдыру',
    'reviews.myReview': 'Сіздің пікіріңіз',
    'reviews.updated': 'Жаңартылды',
    'reviews.noComment': 'Пікір жоқ',
  },
};

const languageNames: Record<Language, string> = {
  ru: 'Рус',
  en: 'Eng',
  kk: 'Қаз',
};

interface LanguageContextValue {
  language: Language;
  languages: Language[];
  languageNames: Record<Language, string>;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getSavedLanguage(): Language {
  const saved = window.localStorage.getItem('language');
  return saved === 'en' || saved === 'kk' || saved === 'ru' ? saved : 'ru';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getSavedLanguage);

  useEffect(() => {
    window.localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    languages: ['ru', 'en', 'kk'],
    languageNames,
    setLanguage: setLanguageState,
    t: (key) => translations[language][key],
  }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
