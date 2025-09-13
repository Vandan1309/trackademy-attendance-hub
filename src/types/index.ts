export interface User {
  id: string;
  name: string;
  email: string;
  role: 'academician' | 'student';
  avatar?: string;
}

export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  email: string;
  photo?: string;
  totalClasses: number;
  attendedClasses: number;
  attendancePercentage: number;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  time: string;
  status: 'present' | 'absent' | 'late';
}

export interface Complaint {
  id: string;
  studentId: string;
  studentName: string;
  title: string;
  description: string;
  status: 'pending' | 'resolved' | 'rejected';
  createdAt: string;
  resolvedAt?: string;
}

export interface LeaveApplication {
  id: string;
  studentId: string;
  studentName: string;
  fromDate: string;
  toDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: string;
  reviewedAt?: string;
}

export interface AttendanceStats {
  totalStudents: number;
  presentToday: number;
  absentToday: number;
  averageAttendance: number;
  weeklyTrend: { date: string; percentage: number }[];
}