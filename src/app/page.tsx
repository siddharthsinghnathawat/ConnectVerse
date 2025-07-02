// import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { statsData, activityChartData, topMatchesData, anticipatedMeetingsData } from '@/lib/data';
// import { MatchingActivityChart } from '@/components/matching-activity-chart';
// import { DashboardLayout } from '@/components/dashboard-layout';

// export default function DashboardPage() {
//   return (
//     <DashboardLayout pageTitle="REAL-TIME KPI DASHBOARD">
//       <div className="space-y-6">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//           {statsData.map((stat, index) => (
//             <Card key={index}>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
//                 <stat.icon className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold flex items-baseline gap-1">
//                   {stat.value}
//                   {stat.subValue && <span className="text-sm font-normal text-muted-foreground">{stat.subValue}</span>}
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         <div className="grid gap-6 lg:grid-cols-5">
//           <Card className="lg:col-span-3">
//             <CardHeader>
//               <CardTitle>Activity by Time</CardTitle>
//             </CardHeader>
//             <CardContent className="pl-2">
//               <MatchingActivityChart data={activityChartData} />
//             </CardContent>
//           </Card>
//           <div className="lg:col-span-2 space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Matching TOP 5</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <ol className="space-y-4">
//                   {topMatchesData.map((match, index) => (
//                     <li key={index} className="flex items-center gap-3">
//                       <span className="w-6 text-center text-sm text-muted-foreground">{index + 1}.</span>
//                       <Avatar className="h-9 w-9">
//                         <AvatarFallback className={`${match.color} border-border text-white`}>{match.initial}</AvatarFallback>
//                       </Avatar>
//                       <div className="font-medium text-sm">{match.name}</div>
//                     </li>
//                   ))}
//                 </ol>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader>
//                 <CardTitle>Meeting in Anticipation</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <ol className="space-y-4">
//                   {anticipatedMeetingsData.map((match, index) => (
//                     <li key={index} className="flex items-center gap-3">
//                       <span className="w-6 text-center text-sm text-muted-foreground">{index + 1}.</span>
//                       <Avatar className="h-9 w-9">
//                         <AvatarFallback className={`${match.color} border-border text-white`}>{match.initial}</AvatarFallback>
//                       </Avatar>
//                       <div className="font-medium text-sm">{match.name}</div>
//                     </li>
//                   ))}
//                 </ol>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }

'use client';

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MatchingActivityChart } from "@/components/matching-activity-chart";
import { supabase } from "@/lib/supabase";
import { Users2, Target, Link, ClipboardCheck, Star } from 'lucide-react';

// Icon Mapping
const icons: Record<string, any> = {
  Users2,
  Target,
  Link,
  ClipboardCheck,
  Star,
};

export default function DashboardPage() {
  const [stats, setStats] = useState<any[]>([]);
  const [activityChart, setActivityChart] = useState<any[]>([]);
  const [topMatches, setTopMatches] = useState<any[]>([]);
  const [anticipated, setAnticipated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: statsData } = await supabase.from("statsdata").select("*");
      const { data: activityData } = await supabase.from("activity_data").select("*");
      const { data: topData } = await supabase.from("top_matches").select("*");
      const { data: anticipatedData } = await supabase.from("anticipated_meetings").select("*");

      setStats(statsData || []);
      setActivityChart(activityData || []);
      setTopMatches(topData || []);
      setAnticipated(anticipatedData || []);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <DashboardLayout pageTitle="REAL-TIME KPI DASHBOARD">
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, index) => {
            const Icon = icons[stat.icon as string] || Star;
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold flex items-baseline gap-1">
                    {stat.value}
                    {stat.subValue && <span className="text-sm font-normal text-muted-foreground">{stat.subValue}</span>}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Activity by Time</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <MatchingActivityChart data={activityChart} />
            </CardContent>
          </Card>
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Matching TOP 5</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  {topMatches.map((match, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <span className="w-6 text-center text-sm text-muted-foreground">{index + 1}.</span>
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className={`${match.color} border-border text-white`}>
                          {match.initial}
                        </AvatarFallback>
                      </Avatar>
                      <div className="font-medium text-sm">{match.name}</div>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Meeting in Anticipation</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  {anticipated.map((match, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <span className="w-6 text-center text-sm text-muted-foreground">{index + 1}.</span>
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className={`${match.color} border-border text-white`}>
                          {match.initial}
                        </AvatarFallback>
                      </Avatar>
                      <div className="font-medium text-sm">{match.name}</div>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
