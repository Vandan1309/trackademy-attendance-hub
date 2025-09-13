import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { 
  Camera,
  Calendar as CalendarIcon, 
  CheckCircle, 
  XCircle, 
  Clock,
  FileText,
  Plus,
  Upload,
  MessageSquare,
  TrendingUp,
  AlertCircle,
  Users
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from '@/contexts/AuthContext';
import { mockStudents, getStudentAttendanceHistory, getStudentComplaints, getStudentLeaveApplications } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export function StudentDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [complaintTitle, setComplaintTitle] = useState('');
  const [complaintDescription, setComplaintDescription] = useState('');
  const [leaveReason, setLeaveReason] = useState('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  // Get student data (in real app, this would be based on authenticated user)
  const currentStudent = mockStudents.find(s => s.id === user?.id) || mockStudents[0];
  const attendanceHistory = getStudentAttendanceHistory(currentStudent.id);
  const studentComplaints = getStudentComplaints(currentStudent.id);
  const studentLeaves = getStudentLeaveApplications(currentStudent.id);

  const getStatusBadge = (status: string) => {
    const variants = {
      present: 'bg-success text-success-foreground',
      absent: 'bg-destructive text-destructive-foreground',
      late: 'bg-warning text-warning-foreground',
      pending: 'bg-muted text-muted-foreground',
      approved: 'bg-success text-success-foreground',
      rejected: 'bg-destructive text-destructive-foreground',
      resolved: 'bg-success text-success-foreground'
    };
    return variants[status as keyof typeof variants] || 'bg-muted text-muted-foreground';
  };

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, this would submit to backend
    toast({
      title: "Complaint Submitted",
      description: "Your complaint has been submitted and will be reviewed by the administration.",
    });
    setComplaintTitle('');
    setComplaintDescription('');
  };

  const handleLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromDate || !toDate) {
      toast({
        title: "Error",
        description: "Please select both from and to dates.",
        variant: "destructive",
      });
      return;
    }
    // In real app, this would submit to backend
    toast({
      title: "Leave Application Submitted",
      description: "Your leave application has been submitted for approval.",
    });
    setFromDate(undefined);
    setToDate(undefined);
    setLeaveReason('');
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      // In real app, this would upload to backend
      toast({
        title: "Photo Updated",
        description: "Your profile photo has been updated successfully.",
      });
    }
  };

  // Chart data
  const attendanceChartData = [
    { month: 'Jan', percentage: 95 },
    { month: 'Feb', percentage: 88 },
    { month: 'Mar', percentage: 92 },
    { month: 'Apr', percentage: 85 },
    { month: 'May', percentage: 94 },
  ];

  const attendanceBreakdown = [
    { name: 'Present', value: currentStudent.attendedClasses, color: 'hsl(var(--success))' },
    { name: 'Absent', value: currentStudent.totalClasses - currentStudent.attendedClasses, color: 'hsl(var(--destructive))' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <p className="text-muted-foreground">Track your attendance and manage your academic records</p>
        </div>
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={currentStudent.photo} alt={currentStudent.name} />
            <AvatarFallback>
              {currentStudent.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{currentStudent.name}</p>
            <p className="text-sm text-muted-foreground">{currentStudent.rollNumber}</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentStudent.attendancePercentage}%</div>
            <p className="text-xs text-muted-foreground">
              {currentStudent.attendedClasses} of {currentStudent.totalClasses} classes
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classes Attended</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{currentStudent.attendedClasses}</div>
            <p className="text-xs text-muted-foreground">Total present days</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classes Missed</CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {currentStudent.totalClasses - currentStudent.attendedClasses}
            </div>
            <p className="text-xs text-muted-foreground">Total absent days</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={cn(
              "text-2xl font-bold",
              currentStudent.attendancePercentage >= 90 ? "text-success" :
              currentStudent.attendancePercentage >= 75 ? "text-warning" : "text-destructive"
            )}>
              {currentStudent.attendancePercentage >= 90 ? "Excellent" :
               currentStudent.attendancePercentage >= 75 ? "Good" : "Poor"}
            </div>
            <p className="text-xs text-muted-foreground">Performance level</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="complaints">Complaints</TabsTrigger>
          <TabsTrigger value="leaves">Leave Requests</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Attendance Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Attendance Trend</CardTitle>
                <CardDescription>Your attendance percentage over the months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={attendanceChartData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--popover))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '6px'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="percentage" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Attendance Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Attendance Breakdown</CardTitle>
                <CardDescription>Distribution of your class attendance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={attendanceBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {attendanceBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--popover))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '6px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-4">
                  {attendanceBreakdown.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="text-sm">{entry.name}: {entry.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest attendance records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {attendanceHistory.slice(0, 5).map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        record.status === 'present' ? 'bg-success' :
                        record.status === 'late' ? 'bg-warning' : 'bg-destructive'
                      )} />
                      <div>
                        <p className="font-medium">{format(new Date(record.date), 'EEEE, MMM dd')}</p>
                        <p className="text-sm text-muted-foreground">Class at {record.time}</p>
                      </div>
                    </div>
                    <Badge className={getStatusBadge(record.status)}>
                      {record.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance History</CardTitle>
              <CardDescription>Complete record of your class attendance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Day</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendanceHistory.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>{format(new Date(record.date), 'MMM dd, yyyy')}</TableCell>
                        <TableCell>{format(new Date(record.date), 'EEEE')}</TableCell>
                        <TableCell className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          {record.time}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusBadge(record.status)}>
                            {record.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="complaints" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>My Complaints</CardTitle>
                  <CardDescription>Track your submitted attendance complaints</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {studentComplaints.length > 0 ? (
                      studentComplaints.map((complaint) => (
                        <div key={complaint.id} className="p-4 border rounded-lg space-y-2">
                          <div className="flex items-start justify-between">
                            <h4 className="font-medium">{complaint.title}</h4>
                            <Badge className={getStatusBadge(complaint.status)}>
                              {complaint.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{complaint.description}</p>
                          <p className="text-xs text-muted-foreground">
                            Submitted {format(new Date(complaint.createdAt), 'MMM dd, yyyy')}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No complaints submitted yet</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>File a Complaint</CardTitle>
                <CardDescription>Report attendance irregularities</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleComplaintSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="complaint-title">Title</Label>
                    <Input
                      id="complaint-title"
                      placeholder="Brief description of the issue"
                      value={complaintTitle}
                      onChange={(e) => setComplaintTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="complaint-description">Description</Label>
                    <Textarea
                      id="complaint-description"
                      placeholder="Detailed explanation of the attendance issue"
                      value={complaintDescription}
                      onChange={(e) => setComplaintDescription(e.target.value)}
                      required
                      rows={4}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90">
                    <Plus className="h-4 w-4 mr-2" />
                    Submit Complaint
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="leaves" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Leave Applications</CardTitle>
                  <CardDescription>Track your leave request status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {studentLeaves.length > 0 ? (
                      studentLeaves.map((leave) => (
                        <div key={leave.id} className="p-4 border rounded-lg space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium">
                                {format(new Date(leave.fromDate), 'MMM dd')} - {format(new Date(leave.toDate), 'MMM dd, yyyy')}
                              </h4>
                              <p className="text-sm text-muted-foreground">{leave.reason}</p>
                            </div>
                            <Badge className={getStatusBadge(leave.status)}>
                              {leave.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Applied {format(new Date(leave.appliedAt), 'MMM dd, yyyy')}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No leave applications submitted yet</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Apply for Leave</CardTitle>
                <CardDescription>Submit a leave request</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLeaveSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label>From Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !fromDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {fromDate ? format(fromDate, "PPP") : "Select start date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={fromDate}
                          onSelect={setFromDate}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>To Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !toDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {toDate ? format(toDate, "PPP") : "Select end date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={toDate}
                          onSelect={setToDate}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="leave-reason">Reason</Label>
                    <Textarea
                      id="leave-reason"
                      placeholder="Reason for leave"
                      value={leaveReason}
                      onChange={(e) => setLeaveReason(e.target.value)}
                      required
                      rows={3}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-gradient-accent hover:opacity-90">
                    <Plus className="h-4 w-4 mr-2" />
                    Submit Application
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Your personal details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={currentStudent.photo} alt={currentStudent.name} />
                    <AvatarFallback className="text-lg">
                      {currentStudent.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium">{currentStudent.name}</h3>
                    <p className="text-sm text-muted-foreground">{currentStudent.rollNumber}</p>
                    <p className="text-sm text-muted-foreground">{currentStudent.email}</p>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Classes:</span>
                    <span className="text-sm font-medium">{currentStudent.totalClasses}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Classes Attended:</span>
                    <span className="text-sm font-medium">{currentStudent.attendedClasses}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Attendance Rate:</span>
                    <span className="text-sm font-medium">{currentStudent.attendancePercentage}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Update Profile Photo</CardTitle>
                <CardDescription>Upload a new profile picture for face recognition</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                  <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload a clear, front-facing photo for accurate attendance tracking
                  </p>
                  <div className="space-y-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <Label htmlFor="photo-upload" asChild>
                      <Button variant="outline" className="cursor-pointer">
                        <Upload className="h-4 w-4 mr-2" />
                        Choose Photo
                      </Button>
                    </Label>
                    {photoFile && (
                      <p className="text-xs text-muted-foreground">
                        Selected: {photoFile.name}
                      </p>
                    )}
                  </div>
                </div>
                
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    Make sure your photo is well-lit and shows your face clearly. 
                    This helps improve attendance tracking accuracy.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}