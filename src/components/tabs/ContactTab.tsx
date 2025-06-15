
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

const contactInfo = [
    {
      title: 'Email',
      value: 'hello@zaidlab.xyz',
      icon: '📧'
    },
    {
      title: 'Location',
      value: 'Available Worldwide',
      icon: '🌍'
    },
    {
      title: 'Response Time',
      value: 'Within 24 hours',
      icon: '⚡'
    }
];

const ContactTab = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. I'll get back to you soon!",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="animate-fade-in">
       <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2 gradient-text">Get In Touch</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Have a project in mind or just want to say hi?
        </p>
      </div>
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="name" value={formData.name} onChange={handleChange} required placeholder="Your Name *" />
            <Input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="Your Email *" />
            <Textarea name="message" value={formData.message} onChange={handleChange} required rows={5} placeholder="Your Message *" />
            <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 transition-all duration-300 hover-glow">
                Send Message
            </Button>
        </form>

        <div className="space-y-6">
            <div className="space-y-4">
              {contactInfo.map((info) => (
                <div key={info.title} className="flex items-center gap-4">
                  <span className="text-2xl">{info.icon}</span>
                  <div>
                    <h4 className="text-foreground font-semibold">{info.title}</h4>
                    <p className="text-muted-foreground">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              {['LinkedIn', 'GitHub', 'Twitter'].map((platform) => (
                <button
                  key={platform}
                  className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white hover:scale-110 transition-transform duration-300"
                >
                  {platform.charAt(0)}
                </button>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ContactTab;
