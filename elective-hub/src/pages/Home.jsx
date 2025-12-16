import React, { useState, useRef } from 'react';
import { Search, BookOpen, Star, FileText, Layout } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Button, Card, Badge } from '../components/UI';

export default function Home({ courses, reviews, onSelect, isConfigured }) {
  const { isDark, theme } = useTheme();
  const [term, setTerm] = useState('');
  const filtered = courses.filter(c => c.code.toLowerCase().includes(term.toLowerCase()) || c.name.toLowerCase().includes(term.toLowerCase()));
  const catalogRef = useRef(null);
  const howRef = useRef(null);

  const getStats = (course) => {
    const r = reviews.filter(x => x.courseId === course.id || x.courseCode === course.code);
    if (!r.length) return { avg: 0, count: 0 };
    return { avg: (r.reduce((a, b) => a + (b.score || 0), 0) / r.length).toFixed(1), count: r.length };
  };

  const handleSelectCourse = (course) => {
    onSelect(course);
  };

  return (
    
    <div className="space-y-24">
      <div className="text-center space-y-6 py-12">
        <Badge accent>2026 Spring Semester</Badge>
        <h1 className="text-6xl font-bold tracking-tight">Decide with <span className={`bg-clip-text text-transparent bg-gradient-to-r ${theme.accGrad}`}>Confidence</span></h1>
        <div className="flex justify-center gap-4">
          <Button onClick={() => catalogRef.current?.scrollIntoView({behavior:'smooth'})} className="rounded-full !px-8">Browse Catalog</Button>
          <Button onClick={() => howRef.current?.scrollIntoView({behavior:'smooth'})} variant="secondary" className="rounded-full !px-8">How it Works</Button>
        </div>
        <div className="max-w-md mx-auto relative group mt-8">
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 ${theme.text.sec}`} />
          <input className={`w-full pl-12 pr-6 py-4 rounded-full border bg-transparent outline-none focus:ring-2 focus:ring-opacity-50 ${theme.border} ${theme.isDark ? 'focus:ring-violet-500' : 'focus:ring-orange-500'}`} 
            placeholder="Search courses..." value={term} onChange={e => setTerm(e.target.value)} />
        </div>
      </div>


      <div ref={howRef} className="py-12">
        <div className="text-center mb-12"><h2 className="text-3xl font-bold">How It Works</h2></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" >
            
          {[ 
            
  {icon: Search, t:"1. Search", d:"Find course codes"},
  {icon: BookOpen, t:"2. Read", d:"View honest stats"},
  {icon: Star, t:"3. Rate", d:"Share insights"}
].map((x, i) => (
  <Card
    key={i}
    className={`px-6 py-4 rounded-xl backdrop-blur-xl 
    ${isDark 
      ? "bg-zinc-800/40 shadow-[0_0_30px_rgba(150,100,255,0.25)]" 
      : "bg-white/30 shadow-[0_0_25px_rgba(255,160,60,0.25)]"
    }
  `}
  >
    <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 shadow-lg ${theme.ui.iconBg}`}>
      <x.icon className="text-white h-6 w-6"/>
    </div>
    <h3 className="font-bold text-xl mb-2">{x.t}</h3>
    <p className={theme.text.sec}>{x.d}</p>
  </Card>
))}

        </div>
      </div>
      
      <div ref={catalogRef} className="space-y-8 scroll-mt-24">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-3"><BookOpen className={`h-6 w-6 ${theme.text.acc}`}/> Catalog</h2>
          <span className={`text-sm ${theme.text.sec}`}>{courses.length} courses</span>
        </div>

        {courses.length === 0 ? (
          <div className={`text-center py-32 rounded-3xl border border-dashed ${theme.border}`}>
            <Layout className={`h-12 w-12 mx-auto mb-4 ${theme.text.sec} opacity-50`} />
            <p className={theme.text.sec}>No courses found.</p>
            {!isConfigured && <p className="text-xs text-red-500 mt-2">Database not connected.</p>}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(c => {
              const { avg, count } = getStats(c);
              return (
                <Card key={c.id} onClick={() => handleSelectCourse(c)} className="cursor-pointer group hover:-translate-y-1 hover:shadow-xl">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl transition-transform group-hover:scale-110 ${theme.ui.iconBg}`}><FileText className="h-6 w-6 text-white"/></div>
                    <Badge accent={avg >= 7}>{avg ? `${avg}/10` : 'New'}</Badge>
                  </div>
                  <h3 className="text-xl font-bold">{c.code}</h3>
                  <p className={`text-sm mt-1 line-clamp-2 ${theme.text.sec}`}>{c.name}</p>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}