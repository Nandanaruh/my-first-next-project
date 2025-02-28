"use client";
import { AvatarImage, Avatar } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function UserTable({ users }) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold"># Cover</TableHead>
            <TableHead className="font-bold">Name</TableHead>
            <TableHead className="font-bold">Email</TableHead>
            <TableHead className="font-bold">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Avatar>
                  <AvatarImage
                    className="h-10 w-10 border-2 border-blue-500 rounded-full"
                    src="https://github.com/shadcn.png"
                  />
                </Avatar>
              </TableCell>
              <TableCell>{user?.name ?? "N/A"}</TableCell>
              <TableCell>{user?.email ?? "N/A"}</TableCell>
              <TableCell className="text-green-500">Active</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
