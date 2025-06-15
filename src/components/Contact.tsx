
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. I'll get back to you soon!",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

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

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Get In Touch</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to start your next project? Let's discuss how we can work together 
            to bring your ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="glass hover-glow animate-slide-in-left">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                    placeholder="Project inquiry"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 transition-all duration-300 hover-glow"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="animate-slide-in-right">
            <div className="space-y-8">
              <div className="glass p-8 rounded-2xl hover-glow">
                <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  Whether you have a project in mind, need technical consultation, 
                  or just want to say hello, I'd love to hear from you. Let's create 
                  something amazing together!
                </p>
                
                <div className="space-y-4">
                  {contactInfo.map((info) => (
                    <div key={info.title} className="flex items-center gap-4">
                      <span className="text-2xl">{info.icon}</span>
                      <div>
                        <h4 className="text-white font-semibold">{info.title}</h4>
                        <p className="text-gray-300">{info.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="glass p-8 rounded-2xl hover-glow">
                <h3 className="text-xl font-bold text-white mb-6">Follow Me</h3>
                <div className="flex gap-4">
                  {['LinkedIn', 'GitHub', 'Twitter', 'Instagram'].map((platform) => (
                    <button
                      key={platform}
                      className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white hover:scale-110 transition-transform duration-300"
                    >
                      {platform.charAt(0)}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Availability */}
              <div className="glass p-6 rounded-2xl hover-glow text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 font-semibold">Available for new projects</span>
                </div>
                <p className="text-gray-300 text-sm">
                  Currently accepting new clients for 2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
