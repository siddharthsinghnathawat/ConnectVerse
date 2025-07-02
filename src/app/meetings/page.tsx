// import { DashboardLayout } from "@/components/dashboard-layout";
// import { Card, CardContent } from "@/components/ui/card";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { meetingsData } from "@/lib/data";
// import { MoreVertical } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// export default function MeetingsPage() {
//   return (
//     <DashboardLayout pageTitle="Meeting Monitoring">
//       <h1 className="text-2xl font-semibold mb-6">Meetings</h1>
//       <Card>
//         <CardContent className="p-0">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Participants</TableHead>
//                 <TableHead>Time</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead className="w-[50px]"></TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {meetingsData.map((meeting) => (
//                 <TableRow key={meeting.id}>
//                   <TableCell>
//                     <div className="flex items-center gap-4">
//                       <div className="flex -space-x-4">
//                         <Avatar className="border-2 border-background">
//                           <AvatarImage src={meeting.participants[0].avatar} data-ai-hint="person avatar" />
//                           <AvatarFallback>{meeting.participants[0].name.charAt(0)}</AvatarFallback>
//                         </Avatar>
//                         <Avatar className="border-2 border-background">
//                           <AvatarImage src={meeting.participants[1].avatar} data-ai-hint="person avatar" />
//                           <AvatarFallback>{meeting.participants[1].name.charAt(0)}</AvatarFallback>
//                         </Avatar>
//                       </div>
//                       <div>
//                         <p className="font-medium">{meeting.participants[0].name}</p>
//                         <p className="font-medium">{meeting.participants[1].name}</p>
//                       </div>
//                     </div>
//                   </TableCell>
//                   <TableCell>{meeting.time}</TableCell>
//                   <TableCell>
//                     <Badge variant={
//                         meeting.status === 'Completed' ? 'secondary' :
//                         meeting.status === 'In Progress' ? 'default' :
//                         meeting.status === 'Cancelled' ? 'destructive' :
//                         'outline'
//                     }>
//                       {meeting.status}
//                     </Badge>
//                   </TableCell>
//                    <TableCell>
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" size="icon" className="h-8 w-8">
//                           <MoreVertical className="h-4 w-4" />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end">
//                         <DropdownMenuItem>View Details</DropdownMenuItem>
//                         <DropdownMenuItem>Reschedule</DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </DashboardLayout>
//   );
// }

'use client';

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/lib/supabase";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type Participant = {
  id: string;
  name: string;
  avatar: string;
};

type Meeting = {
  id: string;
  time: string;
  status: string;
  participant1_id: string;
  participant2_id: string;
  participant1?: Participant;
  participant2?: Participant;
};

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeetings = async () => {
      const { data: participantData } = await supabase.from('participants').select('*');
      const { data: meetingData } = await supabase.from('meetings').select('*');

      if (!participantData || !meetingData) {
        console.error("Failed to fetch meetings or participants");
        return;
      }

      const enrichedMeetings = meetingData.map((meeting) => ({
        ...meeting,
        participant1: participantData.find(p => p.id === meeting.participant1_id),
        participant2: participantData.find(p => p.id === meeting.participant2_id),
      }));

      setParticipants(participantData);
      setMeetings(enrichedMeetings);
      setLoading(false);
    };

    fetchMeetings();
  }, []);

  return (
    <DashboardLayout pageTitle="Meeting Monitoring">
      <h1 className="text-2xl font-semibold mb-6">Meetings</h1>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Participants</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">Loading meetings...</TableCell>
                </TableRow>
              ) : meetings.map((meeting) => (
                <TableRow key={meeting.id}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-4">
                        <Avatar className="border-2 border-background">
                          <AvatarImage src={meeting.participant1?.avatar} />
                          <AvatarFallback>{meeting.participant1?.name?.[0]}</AvatarFallback>
                        </Avatar>
                        <Avatar className="border-2 border-background">
                          <AvatarImage src={meeting.participant2?.avatar} />
                          <AvatarFallback>{meeting.participant2?.name?.[0]}</AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <p className="font-medium">{meeting.participant1?.name}</p>
                        <p className="font-medium">{meeting.participant2?.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{meeting.time}</TableCell>
                  <TableCell>
                    <Badge variant={
                      meeting.status === 'Completed' ? 'secondary' :
                      meeting.status === 'In Progress' ? 'default' :
                      meeting.status === 'Cancelled' ? 'destructive' :
                      'outline'
                    }>
                      {meeting.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Reschedule</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
