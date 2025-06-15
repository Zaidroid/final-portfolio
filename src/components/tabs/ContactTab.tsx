
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

const ContactTab = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

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
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="mt-6 grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
      <div className="lg:col-span-2">
        <h3 className="text-2xl font-bold text-foreground mb-4">Let's Connect</h3>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Whether you have a project in mind, need technical consultation, 
          or just want to say hello, I'd love to hear from you. Let's create 
          something amazing together!
        </p>
        <div className="space-y-4">
          {[
            { title: 'Email', value: 'hello@zaidlab.xyz', icon: '📧' },
            { title: 'Location', value: 'Available Worldwide', icon: '🌍' },
            { title: 'Response Time', value: 'Within 24 hours', icon: '⚡' }
          ].map((info) => (
            <div key={info.title} className="flex items-center gap-4">
              <span className="text-2xl">{info.icon}</span>
              <div>
                <h4 className="text-foreground font-semibold">{info.title}</h4>
                <p className="text-muted-foreground">{info.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="lg:col-span-3">
        <Card className="glass hover-glow">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-foreground">Send a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">Name *</label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">Email *</label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">Message *</label>
                <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5} className="resize-none" placeholder="Tell me about your project..." />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 transition-all duration-300 hover-glow">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactTab;
