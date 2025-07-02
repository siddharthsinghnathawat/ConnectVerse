// import { DashboardLayout } from "@/components/dashboard-layout";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { matchesData } from "@/lib/data";
// import { ArrowRightLeft } from "lucide-react";

// export default function TrackingPage() {
//   return (
//     <DashboardLayout pageTitle="Matching Tracker">
//       <h1 className="text-2xl font-semibold mb-6">Real-Time Matches</h1>
//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {matchesData.map((match) => (
//           <Card key={match.id}>
//             <CardHeader className="flex flex-row items-center justify-between pb-2">
//               <CardTitle className="text-sm font-medium">Match Score: {match.matchScore}%</CardTitle>
//               <span className="text-xs text-muted-foreground">{match.timestamp}</span>
//             </CardHeader>
//             <CardContent>
//               <div className="flex items-center justify-between space-x-4">
//                 <div className="flex items-center space-x-4">
//                   <Avatar>
//                     <AvatarImage src={match.participant1.avatar} data-ai-hint="person avatar" />
//                     <AvatarFallback>{match.participant1.name.charAt(0)}</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <p className="text-sm font-medium leading-none">{match.participant1.name}</p>
//                     <p className="text-sm text-muted-foreground">{match.participant1.company}</p>
//                   </div>
//                 </div>
//                 <ArrowRightLeft className="h-5 w-5 text-muted-foreground" />
//                 <div className="flex items-center space-x-4">
//                    <div>
//                     <p className="text-sm font-medium leading-none text-right">{match.participant2.name}</p>
//                     <p className="text-sm text-muted-foreground text-right">{match.participant2.company}</p>
//                   </div>
//                   <Avatar>
//                     <AvatarImage src={match.participant2.avatar} data-ai-hint="person avatar" />
//                     <AvatarFallback>{match.participant2.name.charAt(0)}</AvatarFallback>
//                   </Avatar>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </DashboardLayout>
//   );
// }


'use client';

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/lib/supabase";
import { ArrowRightLeft } from "lucide-react";

type Participant = {
  id: string;
  name: string;
  company: string;
  avatar: string;
};

type Match = {
  id: string;
  matchScore: number;
  timestamp: string;
  participant1_id: string;
  participant2_id: string;
  participant1?: Participant;
  participant2?: Participant;
};

export default function TrackingPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      const { data: matchData, error: matchErr } = await supabase.from('matches').select('*');
      const { data: participantData, error: partErr } = await supabase.from('participants').select('*');

      if (matchErr) console.error("Match error:", matchErr.message);
      if (partErr) console.error("Participant error:", partErr.message);

      if (matchData && participantData) {
        const enrichedMatches = matchData.map((match) => ({
          ...match,
          participant1: participantData.find(p => p.id === match.participant1_id),
          participant2: participantData.find(p => p.id === match.participant2_id),
        }));
        setMatches(enrichedMatches);
      }

      setLoading(false);
    };

    fetchMatches();
  }, []);

  return (
    <DashboardLayout pageTitle="Matching Tracker">
      <h1 className="text-2xl font-semibold mb-6">Real-Time Matches</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p className="text-muted-foreground">Loading matches...</p>
        ) : (
          matches.map((match) => (
            <Card key={match.id}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Match Score: {match.matchScore}%</CardTitle>
                <span className="text-xs text-muted-foreground">{match.timestamp}</span>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={match.participant1?.avatar} />
                      <AvatarFallback>{match.participant1?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">{match.participant1?.name}</p>
                      <p className="text-sm text-muted-foreground">{match.participant1?.company}</p>
                    </div>
                  </div>
                  <ArrowRightLeft className="h-5 w-5 text-muted-foreground" />
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-sm font-medium leading-none text-right">{match.participant2?.name}</p>
                      <p className="text-sm text-muted-foreground text-right">{match.participant2?.company}</p>
                    </div>
                    <Avatar>
                      <AvatarImage src={match.participant2?.avatar} />
                      <AvatarFallback>{match.participant2?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}
