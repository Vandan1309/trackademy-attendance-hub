import { Student, AttendanceRecord, Complaint, LeaveApplication, AttendanceStats } from '../types';

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'John Smith',
    rollNumber: 'CS2021001',
    email: 'john.smith@student.trackademy.edu',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    totalClasses: 45,
    attendedClasses: 42,
    attendancePercentage: 93.3
  },
  {
    id: '2',
    name: 'Emma Wilson',
    rollNumber: 'CS2021002',
    email: 'emma.wilson@student.trackademy.edu',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    totalClasses: 45,
    attendedClasses: 38,
    attendancePercentage: 84.4
  },
  {
    id: '3',
    name: 'Michael Brown',
    rollNumber: 'CS2021003',
    email: 'michael.brown@student.trackademy.edu',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    totalClasses: 45,
    attendedClasses: 41,
    attendancePercentage: 91.1
  },
  {
    id: '4',
    name: 'Sarah Davis',
    rollNumber: 'CS2021004',
    email: 'sarah.davis@student.trackademy.edu',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
    totalClasses: 45,
    attendedClasses: 39,
    attendancePercentage: 86.7
  },
  {
    id: '5',
    name: 'David Johnson',
    rollNumber: 'CS2021005',
    email: 'david.johnson@student.trackademy.edu',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    totalClasses: 45,
    attendedClasses: 43,
    attendancePercentage: 95.6
  }
];

export const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: '1',
    studentId: '1',
    studentName: 'John Smith',
    date: '2024-01-15',
    time: '09:00',
    status: 'present'
  },
  {
    id: '2',
    studentId: '2',
    studentName: 'Emma Wilson',
    date: '2024-01-15',
    time: '09:05',
    status: 'late'
  },
  {
    id: '3',
    studentId: '3',
    studentName: 'Michael Brown',
    date: '2024-01-15',
    time: '09:00',
    status: 'present'
  },
  {
    id: '4',
    studentId: '4',
    studentName: 'Sarah Davis',
    date: '2024-01-15',
    time: '09:00',
    status: 'present'
  },
  {
    id: '5',
    studentId: '5',
    studentName: 'David Johnson',
    date: '2024-01-15',
    time: '09:00',
    status: 'present'
  }
];

export const mockComplaints: Complaint[] = [
  {
    id: '1',
    studentId: '2',
    studentName: 'Emma Wilson',
    title: 'Attendance Marking Error',
    description: 'I was present on January 10th but marked absent. Please review the attendance record.',
    status: 'pending',
    createdAt: '2024-01-12T10:30:00Z'
  },
  {
    id: '2',
    studentId: '4',
    studentName: 'Sarah Davis',
    title: 'Late Entry Not Recorded',
    description: 'I entered the class 5 minutes late but was marked as absent instead of late.',
    status: 'resolved',
    createdAt: '2024-01-10T14:15:00Z',
    resolvedAt: '2024-01-11T09:00:00Z'
  }
];

export const mockLeaveApplications: LeaveApplication[] = [
  {
    id: '1',
    studentId: '1',
    studentName: 'John Smith',
    fromDate: '2024-01-20',
    toDate: '2024-01-22',
    reason: 'Medical appointment and recovery',
    status: 'approved',
    appliedAt: '2024-01-15T16:00:00Z',
    reviewedAt: '2024-01-16T10:00:00Z'
  },
  {
    id: '2',
    studentId: '3',
    studentName: 'Michael Brown',
    fromDate: '2024-01-25',
    toDate: '2024-01-25',
    reason: 'Family emergency',
    status: 'pending',
    appliedAt: '2024-01-18T12:30:00Z'
  }
];

export const mockAttendanceStats: AttendanceStats = {
  totalStudents: 5,
  presentToday: 4,
  absentToday: 1,
  averageAttendance: 90.2,
  weeklyTrend: [
    { date: '2024-01-08', percentage: 88 },
    { date: '2024-01-09', percentage: 92 },
    { date: '2024-01-10', percentage: 85 },
    { date: '2024-01-11', percentage: 95 },
    { date: '2024-01-12', percentage: 90 },
    { date: '2024-01-15', percentage: 93 },
    { date: '2024-01-16', percentage: 87 }
  ]
};

// Helper functions for data manipulation
export function getStudentAttendanceHistory(studentId: string): AttendanceRecord[] {
  return mockAttendanceRecords.filter(record => record.studentId === studentId);
}

export function getStudentComplaints(studentId: string): Complaint[] {
  return mockComplaints.filter(complaint => complaint.studentId === studentId);
}

export function getStudentLeaveApplications(studentId: string): LeaveApplication[] {
  return mockLeaveApplications.filter(application => application.studentId === studentId);
}