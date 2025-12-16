import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Button, Card } from '../components/UI';

export default function AdminDashboard({ courses, reviews, supabase }) {
  const { theme } = useTheme();
  const [tab, setTab] = useState('courses');
  const [newC, setNewC] = useState({ code: '', name: '', department: '', description: '' });

  const addC = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('courses').insert([newC]);
    if (error) alert(error.message);
    else setNewC({ code: '', name: '', department: '', description: '' });
  };

  const del = async (table, id) => {
    if(confirm('Delete permanently?')) {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) alert(error.message);
    }
  };

  const generateGoogleScript = () => {
    // robustly handle environment variables for the script generation
    // We use a safe check for import.meta.env to prevent runtime crashes if accessed outside Vite
    const url = (import.meta.env && import.meta.env.VITE_SUPABASE_URL) || "INSERT_YOUR_SUPABASE_URL";
    
    // NOTE: We do NOT use the anon key here. We place a placeholder for the SERVICE ROLE key.
    
    return `function onFormSubmit(e) { 
  var SUPABASE_URL = "${url}"; 
  var SUPABASE_KEY = "YOUR_SERVICE_ROLE_KEY"; // Get this from Supabase > Settings > API
  
  var itemResponses = e.response.getItemResponses(); 
  var respondentEmail = e.response.getRespondentEmail() || ""; 
  // Adjust index [7] if your "Post Anonymously" question is in a different position
  var isAnon = itemResponses[7] ? itemResponses[7].getResponse() === "Yes" : false; 
  
  var payload = { 
    "courseCode": itemResponses[0].getResponse(), 
    "profName": itemResponses[1].getResponse(), 
    "grading": itemResponses[2].getResponse(), 
    "difficulty": parseInt(itemResponses[3].getResponse()) || 0, 
    "examPattern": itemResponses[4].getResponse(), 
    "score": parseInt(itemResponses[5].getResponse()) || 0, 
    "comment": itemResponses[6].getResponse(), 
    "userEmail": respondentEmail, 
    "isAnonymous": isAnon 
  }; 
  
  var options = { 
    "method": "post", 
    "contentType": "application/json", 
    "headers": { "apikey": SUPABASE_KEY, "Authorization": "Bearer " + SUPABASE_KEY }, 
    "payload": JSON.stringify(payload) 
  }; 
  
  UrlFetchApp.fetch(SUPABASE_URL + "/rest/v1/reviews", options); 
}`;
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex gap-4 border-b border-opacity-10 border-current pb-1">
        <button onClick={() => setTab('courses')} className={`px-4 py-2 font-bold text-sm ${tab === 'courses' ? `border-b-2 ${theme.text.acc} border-current` : 'opacity-50'}`}>Courses</button>
        <button onClick={() => setTab('reviews')} className={`px-4 py-2 font-bold text-sm ${tab === 'reviews' ? `border-b-2 ${theme.text.acc} border-current` : 'opacity-50'}`}>Reviews</button>
        <button onClick={() => setTab('integration')} className={`px-4 py-2 font-bold text-sm ${tab === 'integration' ? `border-b-2 ${theme.text.acc} border-current` : 'opacity-50'}`}>Integration</button>
      </div>

      {tab === 'courses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <h3 className="font-bold text-lg mb-4">Add Course</h3>
            <form onSubmit={addC} className="space-y-3">
              <input placeholder="Code" className={`w-full p-3 rounded-lg border bg-transparent ${theme.border}`} value={newC.code} onChange={e=>setNewC({...newC, code: e.target.value})}/>
              <input placeholder="Name" className={`w-full p-3 rounded-lg border bg-transparent ${theme.border}`} value={newC.name} onChange={e=>setNewC({...newC, name: e.target.value})}/>
              <input placeholder="Department" className={`w-full p-3 rounded-lg border bg-transparent ${theme.border}`} value={newC.department} onChange={e=>setNewC({...newC, department: e.target.value})}/>
              <input placeholder="Desc" className={`w-full p-3 rounded-lg border bg-transparent ${theme.border}`} value={newC.description} onChange={e=>setNewC({...newC, description: e.target.value})}/>
              <Button type="submit" className="w-full">Add</Button>
            </form>
          </Card>
          <Card className="max-h-96 overflow-y-auto space-y-2">
            {courses.map(c => (
              <div key={c.id} className="flex justify-between items-center text-sm p-2 hover:bg-current hover:bg-opacity-5 rounded"><span>{c.code}</span><button onClick={() => del('courses', c.id)} className="text-red-500"><Trash2 className="h-4 w-4"/></button></div>
            ))}
          </Card>
        </div>
      )}

      {tab === 'reviews' && (
        <Card className="max-h-[600px] overflow-y-auto space-y-2">
          {reviews.map(r => (
            <div key={r.id} className="flex justify-between items-start text-sm p-3 border rounded hover:bg-current hover:bg-opacity-5">
              <div><div className="font-bold">{r.courseCode} <span className="font-normal opacity-50">• {r.score}/10</span></div><div className="opacity-70 truncate max-w-md">"{r.comment}"</div><div className="text-xs opacity-50">{r.userEmail} {r.isAnonymous && '(Anon)'}</div></div>
              <button onClick={() => del('reviews', r.id)} className="text-red-500"><Trash2 className="h-4 w-4"/></button>
            </div>
          ))}
        </Card>
      )}

      {tab === 'integration' && (
        <Card>
          <h3 className="font-bold mb-4">Google Forms Integration</h3>
          <p className="text-sm mb-4 opacity-70">
            Copy this script to your Google Form. You MUST replace <strong className="text-red-500">YOUR_SERVICE_ROLE_KEY</strong> with the secret key from your Supabase Dashboard (Settings &gt; API).
          </p>
          <div className="bg-slate-950 text-slate-300 p-4 rounded-lg font-mono text-xs overflow-x-auto relative">
            <pre>{generateGoogleScript()}</pre>
            <button onClick={() => navigator.clipboard.writeText(generateGoogleScript())} className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 px-2 py-1 rounded text-white">Copy</button>
          </div>
        </Card>
      )}
    </div>
  );
}