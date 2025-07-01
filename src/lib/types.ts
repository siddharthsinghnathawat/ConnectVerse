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
