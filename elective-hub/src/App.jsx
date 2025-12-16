import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Navbar, Footer } from './components/Layout';
import { supabase } from './lib/supabase';

// Components
import StarBackground from './components/StarBackground';

// Pages
import Home from './pages/Home';
import CourseDetail from './pages/CourseDetail';
import Login from './pages/Login';
import AdminDashboard from './pages/Admin';
import { GuidelinesView, WhoAmIView } from './pages/InfoPages';

export default function App() {
  return (
    <ThemeProvider>
      <MainLayout />
    </ThemeProvider>
  );
}

function MainLayout() {
  const { theme, isDark } = useTheme(); // Get isDark for the stars
  const [session, setSession] = useState(null);
  const [userRole, setUserRole] = useState('student');
  const [view, setView] = useState('home');
  const [courses, setCourses] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notify, setNotify] = useState(null);

  // --- Auth & Data Fetching ---
  useEffect(() => {
    // 1. Check Session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
    });

    // 2. Listen for Auth Changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
      else { setUserRole('student'); setView('home'); }
    });

    // 3. Fetch Data
    const fetchData = async () => {
      setLoading(true);
      const { data: c } = await supabase.from('courses').select('*');
      const { data: r } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });
      if (c) setCourses(c);
      if (r) setReviews(r);
      setLoading(false);
    };
    fetchData();

    // 4. Realtime Listeners
    const ch = supabase.channel('public:reviews').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'reviews' }, payload => {
      setReviews(prev => [payload.new, ...prev]);
      showNotify("New review live!");
    }).subscribe();

    return () => { subscription.unsubscribe(); supabase.removeChannel(ch); };
  }, []);

  const fetchProfile = async (uid) => {
    const { data, error } = await supabase.from('profiles').select('role').eq('id', uid).single();
    if (!error && data) setUserRole(data.role);
  };

  const showNotify = (msg, type='success') => {
    setNotify({ msg, type });
    setTimeout(() => setNotify(null), 3000);
  };

  const handleAuth = async (email, password, isSignUp) => {
        
    if ((!email.endsWith('@iitm.ac.in'))) {
      showNotify("Policy: Use college email (@iit.ac.in)", "error");
      return;
    }
    const { data, error } = isSignUp 
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });
    
    if (error) showNotify(error.message, "error");
    else {
      showNotify(isSignUp ? "Account created!" : "Login successful");
      if (!isSignUp && data.session) setView('home');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setView('home');
  };

  if (loading) return <div className={`min-h-screen flex items-center justify-center ${theme.bg}`}><div className={`animate-spin h-8 w-8 border-2 rounded-full border-t-transparent ${isDark ? 'border-violet-500' : 'border-orange-500'}`}></div></div>;

  return (
    <div className={`min-h-screen flex flex-col font-sans ${theme.text.pri} transition-colors duration-300 relative`}>
      {/* Dynamic Background */}
      <StarBackground isDark={isDark} />

      <Navbar session={session} userRole={userRole} setView={setView} handleLogout={handleLogout} />

      {notify && (
        <div className={`fixed bottom-8 right-8 px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 z-[100] border ${theme.card} animate-fade-in-up`}>
          {notify.type === 'error' ? <AlertCircle className="h-5 w-5 text-red-500"/> : <CheckCircle className="h-5 w-5 text-emerald-500"/>}
          <span className="text-sm font-medium">{notify.msg}</span>
        </div>
      )}

      <main className="flex-grow pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
        {view === 'home' && <Home courses={courses} reviews={reviews} onSelect={c => setView({type: 'course', data: c})} isConfigured={true} />}
        
        {view.type === 'course' && (
          <CourseDetail 
            course={view.data} 
            reviews={reviews.filter(r => r.courseId === view.data.id || r.courseCode === view.data.code)} 
            session={session}
            onBack={() => setView('home')} 
            onSubmit={async (data) => {
              const { error } = await supabase.from('reviews').insert([{ ...data, courseId: view.data.id, courseCode: view.data.code, userEmail: session.user.email }]);
              if (error) showNotify("Failed to post", "error"); else showNotify("Review Posted!");
            }}
          />
        )}
        
        {view === 'login' && <Login onAuth={handleAuth} onCancel={() => setView('home')} />}
        
        {view === 'admin' && userRole === 'admin' && <AdminDashboard courses={courses} reviews={reviews} supabase={supabase} isConfigured={true} />}
        
        {view === 'guidelines' && <GuidelinesView onBack={() => setView('home')} />}
        
        {view === 'whoami' && <WhoAmIView onBack={() => setView('home')} />}
      </main>

      <Footer setView={setView} />
    </div>
  );
}