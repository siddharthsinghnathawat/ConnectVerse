import type { Stat, RankedUser, ActivityChartData } from './types';
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
