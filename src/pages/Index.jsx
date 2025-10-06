import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RegistrationForm } from "@/components/RegistrationForm";
import { StudentsList } from "@/components/StudentsList";
import { GraduationCap, Users } from "lucide-react";
import heroImage from "@/assets/hero-students.jpg";

const Index = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-hero)] opacity-95" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/20 rounded-full mb-4">
              <GraduationCap className="w-8 h-8 text-primary-foreground" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground leading-tight">
              Student Registration Portal
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Streamline your academic journey with our modern registration system. 
              Quick, secure, and efficient enrollment for all programs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                variant="hero" 
                size="xl"
                onClick={() => setShowForm(true)}
                className="gap-2"
              >
                <GraduationCap className="w-5 h-5" />
                Register Now
              </Button>
              
              <Button 
                variant="outline" 
                size="xl"
                onClick={() => setShowForm(false)}
                className="gap-2 bg-background/10 backdrop-blur-sm border-primary-foreground/20 text-primary-foreground hover:bg-background/20"
              >
                <Users className="w-5 h-5" />
                View Students
              </Button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">5+</div>
              <div className="text-muted-foreground">Departments</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">24/7</div>
              <div className="text-muted-foreground">Registration Access</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Secure Platform</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 container mx-auto px-4">
        <div className="space-y-8">
          {showForm ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <RegistrationForm />
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-top-4 duration-500">
              <StudentsList />
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-90">
            © 2025 Student Registration System. Powered by modern web technologies.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
