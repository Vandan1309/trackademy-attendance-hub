import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useAuth } from '@/contexts/AuthContext';
import { GraduationCap, BookOpen, Users, TrendingUp } from 'lucide-react';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(email, password);
    if (!success) {
      setError('Invalid email or password. Try: sarah.johnson@trackademy.edu or john.smith@student.trackademy.edu (password: password)');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4 relative">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100/25 dark:bg-grid-slate-700/25 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      
      <div className="w-full max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding & Features */}
          <div className="space-y-8 animate-fade-in">
            {/* Logo Space & Branding */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <GraduationCap className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    Trackademy
                  </h1>
                  <p className="text-sm text-muted-foreground">Track your academics with Trackademy</p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Modern Attendance Management</h2>
              <div className="grid gap-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-card border hover:shadow-md transition-shadow">
                  <BookOpen className="h-6 w-6 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Smart Tracking</h3>
                    <p className="text-sm text-muted-foreground">
                      Real-time attendance monitoring with analytics
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-card border hover:shadow-md transition-shadow">
                  <Users className="h-6 w-6 text-accent mt-0.5" />
                  <div>
                    <h3 className="font-medium">Role-Based Access</h3>
                    <p className="text-sm text-muted-foreground">
                      Separate dashboards for students and academicians
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-card border hover:shadow-md transition-shadow">
                  <TrendingUp className="h-6 w-6 text-success mt-0.5" />
                  <div>
                    <h3 className="font-medium">Detailed Analytics</h3>
                    <p className="text-sm text-muted-foreground">
                      Comprehensive reports and attendance trends
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="flex justify-center lg:justify-end animate-scale-in">
            <Card className="w-full max-w-md shadow-custom-lg border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
                <CardDescription className="text-center">
                  Sign in to your Trackademy account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@trackademy.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  
                  {error && (
                    <Alert variant="destructive" className="animate-fade-in">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary hover:opacity-90 transition-all duration-200 transform hover:scale-[1.02]" 
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>

                {/* Demo Credentials */}
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <p className="text-xs font-medium text-center mb-2">Demo Credentials:</p>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p><strong>Academician:</strong> sarah.johnson@trackademy.edu</p>
                    <p><strong>Student:</strong> john.smith@student.trackademy.edu</p>
                    <p><strong>Password:</strong> password</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}