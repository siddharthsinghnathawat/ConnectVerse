import type { Stat, RankedUser, ActivityChartData, Event, Participant, Match, Meeting, SatisfactionData } from './types';
import { Users2, Target, Link, ClipboardCheck, Star } from 'lucide-react';

export const statsData: Stat[] = [
  {
    title: 'Total Participants',
    value: '150',
    icon: Users2,
  },
  {
    title: 'Real-Time Identified',
    value: '29',
    subValue: '(19%)',
    icon: Target,
  },
  {
    title: 'Total Matches',
    value: '160',
    icon: Link,
  },
  {
    title: 'Average Satisfaction',
    value: '78%',
    icon: ClipboardCheck,
  },
  {
    title: 'Total Meetings',
    value: '18',
    icon: Star,
  },
  {
    title: 'Peak',
    value: '4.3',
    icon: Star,
  },
];

export const topMatchesData: RankedUser[] = [
  { name: 'Yeon He Eun', initial: 'Y', color: 'bg-yellow-500' },
  { name: 'Yoon Ji Soo', initial: 'Y', color: 'bg-violet-500' },
  { name: 'Kang Seo Youn', initial: 'K', color: 'bg-green-500' },
  { name: 'Cho Do Yeon', initial: 'C', color: 'bg-sky-500' },
  { name: 'Jo Seo Yeon', initial: 'J', color: 'bg-slate-800' },
];

export const anticipatedMeetingsData: RankedUser[] = [
  { name: 'Choi Seo Youn', initial: 'C', color: 'bg-green-500' },
  { name: 'Kang Min Joon', initial: 'K', color: 'bg-blue-500' },
  { name: 'Lim Seo Youn', initial: 'L', color: 'bg-indigo-500' },
];

export const activityChartData: ActivityChartData[] = [
    { time: '02:00', participantLogin: 35, meeting: 20, anotherLine: 10 },
    { time: '10:00', participantLogin: 60, meeting: 40, anotherLine: 25 },
    { time: '11:00', participantLogin: 100, meeting: 55, anotherLine: 45 },
    { time: '12:30', participantLogin: 90, meeting: 65, anotherLine: 40 },
    { time: '13:00', participantLogin: 110, meeting: 70, anotherLine: 50 },
    { time: '14:00', participantLogin: 130, meeting: 80, anotherLine: 60 },
    { time: '15:00', participantLogin: 115, meeting: 75, anotherLine: 55 },
    { time: '16:00', participantLogin: 100, meeting: 60, anotherLine: 40 },
];


export const eventsData: Event[] = [
  { id: 'EVT001', name: 'Global Tech Summit 2024', date: '2024-10-15', status: 'Upcoming', participants: 500 },
  { id: 'EVT002', name: 'AI in Business Conference', date: '2024-08-20', status: 'Ongoing', participants: 300 },
  { id: 'EVT003', name: 'Future of Work Expo', date: '2024-06-01', status: 'Completed', participants: 800 },
  { id: 'EVT004', name: 'Digital Marketing World', date: '2024-11-05', status: 'Upcoming', participants: 1200 },
  { id: 'EVT005', name: 'SaaS Connect 2024', date: '2024-07-10', status: 'Completed', participants: 450 },
];

export const participantsData: Participant[] = [
  { id: 'USR001', name: 'Alex Johnson', email: 'alex.j@techcorp.com', company: 'TechCorp', role: 'Developer', avatar: 'https://placehold.co/40x40.png', status: 'Checked-in' },
  { id: 'USR002', name: 'Maria Garcia', email: 'maria.g@innovate.io', company: 'Innovate LLC', role: 'Project Manager', avatar: 'https://placehold.co/40x40.png', status: 'Checked-in' },
  { id: 'USR003', name: 'James Smith', email: 'james.s@data.inc', company: 'Data Inc.', role: 'Data Scientist', avatar: 'https://placehold.co/40x40.png', status: 'Registered' },
  { id: 'USR004', name: 'Priya Patel', email: 'priya.p@solutions.co', company: 'Solutions Co.', role: 'UX Designer', avatar: 'https://placehold.co/40x40.png', status: 'Cancelled' },
  { id: 'USR005', name: 'Chen Wei', email: 'chen.w@webweavers.com', company: 'WebWeavers', role: 'Frontend Dev', avatar: 'https://placehold.co/40x40.png', status: 'Checked-in' },
];

export const matchesData: Match[] = [
  { id: 'MCH001', participant1: participantsData[0], participant2: participantsData[1], matchScore: 92, timestamp: '10:30 AM' },
  { id: 'MCH002', participant1: participantsData[2], participant2: participantsData[4], matchScore: 88, timestamp: '10:32 AM' },
  { id: 'MCH003', participant1: participantsData[0], participant2: participantsData[4], matchScore: 85, timestamp: '10:35 AM' },
  { id: 'MCH004', participant1: participantsData[1], participant2: participantsData[2], matchScore: 78, timestamp: '10:40 AM' },
];

export const meetingsData: Meeting[] = [
  { id: 'MET001', participants: [participantsData[0], participantsData[1]], time: '11:00 AM', status: 'Scheduled' },
  { id: 'MET002', participants: [participantsData[2], participantsData[4]], time: '11:30 AM', status: 'Scheduled' },
  { id: 'MET003', participants: [participantsData[1], participantsData[3]], time: '09:00 AM', status: 'Completed' },
  { id: 'MET004', participants: [participantsData[0], participantsData[2]], time: '10:00 AM', status: 'In Progress' },
  { id: 'MET005', participants: [participantsData[3], participantsData[4]], time: '01:00 PM', status: 'Cancelled' },
];

export const satisfactionData: SatisfactionData[] = [
  { name: 'Excellent', value: 45 },
  { name: 'Good', value: 33 },
  { name: 'Average', value: 15 },
  { name: 'Poor', value: 7 },
];
