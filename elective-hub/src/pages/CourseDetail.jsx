import React, { useState } from 'react';
import { ArrowRight, Activity, Clock, EyeOff } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Button, Card, Badge } from '../components/UI';

export default function CourseDetail({ course, reviews, session, onBack, onSubmit }) {
  const { theme, isDark } = useTheme();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ profName: '', difficulty: 3, score: 8, examPattern: '', comment: '', isAnonymous: false });
  const avg = reviews.length ? (reviews.reduce((a, b) => a + (b.score||0), 0) / reviews.length).toFixed(1) : '-';

  return (
    <div className="max-w-6xl mx-auto animate-fade-in-up">
      <div className="mb-8"><Button variant="ghost" onClick={onBack} className={`pl-0 hover:bg-transparent justify-start ${theme.text.acc}`}><ArrowRight className="rotate-180 h-4 w-4"/> Back</Button></div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-8 h-fit lg:sticky lg:top-28">
           <div className="space-y-4"><Badge accent>{course.department}</Badge><h1 className="text-5xl font-bold">{course.code}</h1><h2 className={`text-xl ${theme.text.sec}`}>{course.name}</h2></div>
           <p className={`text-base leading-relaxed ${theme.text.sec}`}>{course.description}</p>
           <Card className="space-y-6">
              <div className="flex justify-between border-b pb-4 border-opacity-10 border-current"><span className="text-xs font-bold uppercase opacity-50">Rating</span><span className={`text-3xl font-bold ${theme.text.acc}`}>{avg}</span></div>
              <div className="space-y-4">
                 <div className="flex justify-between"><span className="text-sm font-bold flex gap-2"><Activity className="h-4 w-4 opacity-50"/> Reviews</span><span>{reviews.length}</span></div>
              </div>
           </Card>
        </div>
        <div className="lg:col-span-8 space-y-8">
          <div className="flex justify-between items-end border-b pb-6 border-opacity-10 border-current">
            <h3 className="text-2xl font-bold">Reviews</h3>
            {session ? <Button onClick={() => setShow(!show)}>{show ? 'Cancel' : 'Write Review'}</Button> : <Badge>Login to Review</Badge>}
          </div>
          {show && (
            <Card className={`border-l-4 ${isDark ? 'border-l-violet-500' : 'border-l-orange-500'} animate-fade-in-down`}>
              <form onSubmit={e => { e.preventDefault(); onSubmit(form); setShow(false); }} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="Professor" className={`p-3 rounded-lg border w-full ${theme.input.bg} ${theme.input.border} ${theme.input.focus} outline-none`} required value={form.profName} onChange={e=>setForm({...form, profName: e.target.value})} />
                  <input placeholder="Exam Pattern" className={`p-3 rounded-lg border w-full ${theme.input.bg} ${theme.input.border} ${theme.input.focus} outline-none`} required value={form.examPattern} onChange={e=>setForm({...form, examPattern: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-xs font-bold block mb-1">Score</label><input type="number" min="1" max="10" className={`p-3 rounded-lg border w-full ${theme.input.bg} ${theme.input.border} ${theme.input.focus} outline-none`} value={form.score} onChange={e=>setForm({...form, score: e.target.value})} /></div>
                  <div><label className="text-xs font-bold block mb-1">Difficulty</label><input type="number" min="1" max="5" className={`p-3 rounded-lg border w-full ${theme.input.bg} ${theme.input.border} ${theme.input.focus} outline-none`} value={form.difficulty} onChange={e=>setForm({...form, difficulty: e.target.value})} /></div>
                </div>
                <textarea placeholder="Share your experience..." rows="3" className={`p-3 rounded-lg border w-full ${theme.input.bg} ${theme.input.border} ${theme.input.focus} outline-none`} required value={form.comment} onChange={e=>setForm({...form, comment: e.target.value})} />
                <div className="flex items-center gap-2"><input type="checkbox" checked={form.isAnonymous} onChange={e=>setForm({...form, isAnonymous: e.target.checked})} /><span className="text-sm">Post Anonymously</span></div>
                <Button type="submit" className="w-full">Submit</Button>
              </form>
            </Card>
          )}
          <div className="space-y-6">
            {reviews.length === 0 ? <div className={`text-center py-16 border rounded-2xl border-dashed ${theme.border}`}><p className={theme.text.sec}>No reviews yet.</p></div> : reviews.map(r => (
               <div key={r.id} className={`${theme.card} p-6 rounded-2xl border flex flex-col gap-4 hover:shadow-lg`}>
                  <div className="flex justify-between items-start">
                     <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${isDark ? 'bg-zinc-800' : 'bg-stone-100 text-stone-600'}`}>{r.isAnonymous ? '?' : r.userEmail?.[0]?.toUpperCase()}</div>
                        <div>
                           <div className="font-bold text-sm flex gap-2">{r.isAnonymous ? 'Anonymous' : r.userEmail?.split('@')[0]} {r.isAnonymous && <EyeOff className="h-3 w-3 opacity-50"/>}</div>
                           <div className={`text-xs ${theme.text.sec}`}>{new Date(r.created_at).toLocaleDateString()}</div>
                        </div>
                     </div>
                     <div className={`font-black text-xl ${theme.text.acc}`}>{r.score}/10</div>
                  </div>
                  <p className={`leading-relaxed ${theme.text.sec} pl-1`}>"{r.comment}"</p>
                  <div className="flex gap-2 pt-2"><Badge color="purple">Diff: {r.difficulty}/5</Badge><Badge>Pattern: {r.examPattern}</Badge><Badge color={r.grading === 'Lenient' ? 'success' : 'default'}>{r.grading}</Badge></div>
               </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}