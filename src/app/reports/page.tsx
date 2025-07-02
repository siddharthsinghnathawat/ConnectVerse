// import { DashboardLayout } from "@/components/dashboard-layout";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { SatisfactionChart } from "@/components/satisfaction-chart";
// import { MatchingActivityChart } from "@/components/matching-activity-chart";
// import { activityChartData, satisfactionData } from "@/lib/data";

// export default function ReportsPage() {
//   return (
//     <DashboardLayout pageTitle="Reports">
//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         <Card className="lg:col-span-2">
//           <CardHeader>
//             <CardTitle>Matching Activity</CardTitle>
//             <CardDescription>A summary of matching activity over time.</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <MatchingActivityChart data={activityChartData} />
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Participant Satisfaction</CardTitle>
//             <CardDescription>Overall satisfaction rate from post-event surveys.</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <SatisfactionChart data={satisfactionData} />
//           </CardContent>
//         </Card>
//          <Card className="lg:col-span-3">
//            <CardHeader>
//             <CardTitle>Upcoming Report</CardTitle>
//             <CardDescription>More reports and analytics will be available here soon.</CardDescription>
//            </CardHeader>
//            <CardContent>
//             <div className="flex items-center justify-center h-48 bg-secondary rounded-md">
//               <p className="text-muted-foreground">Report data will be displayed here.</p>
//             </div>
//            </CardContent>
//          </Card>
//       </div>
//     </DashboardLayout>
//   );
// }

'use client';

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SatisfactionChart } from "@/components/satisfaction-chart";
import { MatchingActivityChart } from "@/components/matching-activity-chart";
import { supabase } from "@/lib/supabase";

type ActivityChartData = {
  time: string;
  participantLogin: number;
  meeting: number;
  anotherLine: number;
};

type SatisfactionData = {
  name: string;
  value: number;
};

export default function ReportsPage() {
  const [activityData, setActivityData] = useState<ActivityChartData[]>([]);
  const [satisfactionData, setSatisfactionData] = useState<SatisfactionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharts = async () => {
      const { data: activity, error: actErr } = await supabase.from('activity_data').select('*');
      const { data: satisfaction, error: satErr } = await supabase.from('satisfaction_data').select('*');

      if (actErr) console.error("Activity fetch error:", actErr.message);
      else setActivityData(activity || []);

      if (satErr) console.error("Satisfaction fetch error:", satErr.message);
      else setSatisfactionData(satisfaction || []);

      setLoading(false);
    };

    fetchCharts();
  }, []);

  return (
    <DashboardLayout pageTitle="Reports">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Matching Activity</CardTitle>
            <CardDescription>A summary of matching activity over time.</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-center text-muted-foreground">Loading activity data...</p>
            ) : (
              <MatchingActivityChart data={activityData} />
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Participant Satisfaction</CardTitle>
            <CardDescription>Overall satisfaction rate from post-event surveys.</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-center text-muted-foreground">Loading satisfaction data...</p>
            ) : (
              <SatisfactionChart data={satisfactionData} />
            )}
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Report</CardTitle>
            <CardDescription>More reports and analytics will be available here soon.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-48 bg-secondary rounded-md">
              <p className="text-muted-foreground">Report data will be displayed here.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
