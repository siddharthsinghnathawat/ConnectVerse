export type User = {
  name: string;
  email: string;
  avatar: string;
};

export type Stat = {
  title: string;
  value: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  subValue?: string;
};

export type RankedUser = {
  name: string;
  initial: string;
  color: string;
};

export type ActivityChartData = {
  time: string;
  participantLogin: number;
  meeting: number;
  anotherLine: number;
};

export type Event = {
  id: string;
  name: string;
  date: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  participants: number;
};

export type Participant = {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  avatar: string;
  status: 'Registered' | 'Checked-in' | 'Cancelled';
};

export type Match = {
  id: string;
  participant1: Participant;
  participant2: Participant;
  matchScore: number;
  timestamp: string;
};

export type Meeting = {
  id: string;
  participants: [Participant, Participant];
  time: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
};

export type SatisfactionData = {
  name: string;
  value: number;
};
