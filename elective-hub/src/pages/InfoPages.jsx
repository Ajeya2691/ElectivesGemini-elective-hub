import React from 'react';
import { ArrowRight, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Button, Card } from '../components/UI';

export const GuidelinesView = ({ onBack }) => {
  const { theme } = useTheme();
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
      <Button variant="ghost" onClick={onBack} className={`pl-0 hover:bg-transparent justify-start ${theme.text.acc}`}><ArrowRight className="rotate-180 h-4 w-4"/> Back</Button>
      <Card className="p-10 space-y-6">
        <h1 className="text-4xl font-bold">Community Guidelines</h1>
        <div className={`space-y-4 leading-relaxed ${theme.text.sec}`}>
          <p>Welcome to Elective Discussion! To ensure a helpful and respectful environment for everyone, please adhere to the following guidelines:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Be Respectful:</strong> Constructive criticism is welcome, but personal attacks, hate speech, or harassment of professors or students will not be tolerated.</li>
            <li><strong>Be Honest:</strong> Share your genuine experience. Misleading information hurts the entire community.</li>
            <li><strong>Stay Relevant:</strong> Keep reviews focused on the course content, teaching style, grading, and difficulty.</li>
            <li><strong>No Spam:</strong> Do not post advertisements or irrelevant links.</li>
          </ul>
          {/* Add content here */}
          <p>Violations of these guidelines may result in the removal of your reviews or suspension of your account.</p>
        </div>
      </Card>
    </div>
  );
};

export const WhoAmIView = ({ onBack }) => {
  const { theme } = useTheme();
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
      <Button variant="ghost" onClick={onBack} className={`pl-0 hover:bg-transparent justify-start ${theme.text.acc}`}><ArrowRight className="rotate-180 h-4 w-4"/> Back</Button>
      <Card className="p-10 space-y-6 text-center">
        <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 ${theme.ui.iconBg}`}>
          <User className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold">Who am I?</h1>
        <div className={`max-w-2xl mx-auto space-y-4 leading-relaxed ${theme.text.sec}`}>
          <p>
            Hi! I created Elective Discussion to help students navigate the complex world of course selection. 
            Having struggled myself to find reliable information about electives, I wanted to build a platform 
            where we can all share our experiences transparently.
          </p>
          {/* Add content here */}
          <p>
            This project is open for feedback and contributions. 
            Stay tuned for more exciting updates!
          </p>
        </div>
      </Card>
    </div>
  );
};