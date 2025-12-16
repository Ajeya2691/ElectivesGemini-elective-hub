import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Button, Card } from '../components/UI';

export default function Login({ onAuth, onCancel }) {
  const { theme } = useTheme();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  return (
    <div className="max-w-md mx-auto mt-20">
      <Card className="p-10 space-y-6 shadow-2xl">
        <h1 className="text-3xl font-bold text-center">{isSignUp ? 'Create Account' : 'Welcome Back'}</h1>
        <form onSubmit={e => { e.preventDefault(); onAuth(email, pass, isSignUp); }} className="space-y-4">
          <input placeholder="College Email (.edu)" className={`w-full p-4 rounded-xl border outline-none ${theme.input.bg} ${theme.input.border} ${theme.input.focus}`} value={email} onChange={e=>setEmail(e.target.value)} />
          <input type="password" placeholder="Password" className={`w-full p-4 rounded-xl border outline-none ${theme.input.bg} ${theme.input.border} ${theme.input.focus}`} value={pass} onChange={e=>setPass(e.target.value)} />
          <Button type="submit" className="w-full py-4">{isSignUp ? 'Sign Up' : 'Login'}</Button>
        </form>
        <button onClick={() => setIsSignUp(!isSignUp)} className={`w-full text-center text-sm hover:underline ${theme.text.sec}`}>{isSignUp ? 'Login' : 'Sign Up'}</button>
        <Button variant="ghost" onClick={onCancel} className="w-full">Cancel</Button>
      </Card>
    </div>
  );
}