import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";


const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }).max(500, {
    message: "Message cannot be longer than 500 characters."
  }),
});

const ContactTab = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Form submitted:', values);
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. I'll get back to you soon!",
    });
    form.reset();
  }

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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input placeholder="your@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell me about your project..."
                          className="resize-none"
                          rows={5}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 transition-all duration-300 hover-glow">
                  Send Message
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactTab;
