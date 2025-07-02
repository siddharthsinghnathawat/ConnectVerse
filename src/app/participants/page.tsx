// import { DashboardLayout } from "@/components/dashboard-layout";
// import { Card, CardContent } from "@/components/ui/card";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { participantsData } from "@/lib/data";
// import { MoreVertical } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import { Input } from "@/components/ui/input";

// export default function ParticipantsPage() {
//   return (
//     <DashboardLayout pageTitle="Participant Management">
//        <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-semibold">Participants</h1>
//         <div className="flex gap-2">
//             <Input placeholder="Search participants..." className="w-64" />
//             <Button>Add Participant</Button>
//         </div>
//       </div>
//       <Card>
//         <CardContent className="p-0">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>
//                   <Checkbox />
//                 </TableHead>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Company</TableHead>
//                 <TableHead>Role</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead className="w-[50px]"></TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {participantsData.map((participant) => (
//                 <TableRow key={participant.id}>
//                   <TableCell>
//                     <Checkbox />
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center gap-3">
//                       <Avatar>
//                         <AvatarImage src={participant.avatar} data-ai-hint="person avatar" />
//                         <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
//                       </Avatar>
//                       <div>
//                         <p className="font-medium">{participant.name}</p>
//                         <p className="text-sm text-muted-foreground">{participant.email}</p>
//                       </div>
//                     </div>
//                   </TableCell>
//                   <TableCell>{participant.company}</TableCell>
//                   <TableCell>{participant.role}</TableCell>
//                   <TableCell>
//                     <Badge variant={participant.status === 'Checked-in' ? 'default' : participant.status === 'Cancelled' ? 'destructive' : 'secondary'}>
//                       {participant.status}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" size="icon" className="h-8 w-8">
//                           <MoreVertical className="h-4 w-4" />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end">
//                         <DropdownMenuItem>View Profile</DropdownMenuItem>
//                         <DropdownMenuItem>Edit</DropdownMenuItem>
//                         <DropdownMenuItem>Send Message</DropdownMenuItem>
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
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/lib/supabase";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

type Participant = {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  avatar: string;
  status: string;
};

export default function ParticipantsPage() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParticipants = async () => {
      const { data, error } = await supabase.from('participants').select('*');
      if (error) console.error("Error fetching participants:", error.message);
      else setParticipants(data || []);
      setLoading(false);
    };

    fetchParticipants();
  }, []);

  return (
    <DashboardLayout pageTitle="Participant Management">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Participants</h1>
        <div className="flex gap-2">
          <Input placeholder="Search participants..." className="w-64" />
          <Button>Add Participant</Button>
        </div>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead><Checkbox /></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">Loading...</TableCell>
                </TableRow>
              ) : participants.length > 0 ? (
                participants.map((participant) => (
                  <TableRow key={participant.id}>
                    <TableCell><Checkbox /></TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={participant.avatar} />
                          <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{participant.name}</p>
                          <p className="text-sm text-muted-foreground">{participant.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{participant.company}</TableCell>
                    <TableCell>{participant.role}</TableCell>
                    <TableCell>
                      <Badge variant={
                        participant.status === 'Checked-in' ? 'default' :
                        participant.status === 'Cancelled' ? 'destructive' :
                        'secondary'
                      }>
                        {participant.status}
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
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Send Message</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">No participants found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
