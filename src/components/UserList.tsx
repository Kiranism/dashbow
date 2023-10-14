import User from "@/db/models/userModel";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { dbConnect } from "@/db/dbConfig";

dbConnect();

export async function UserList() {
  const users = await User.find({}).lean();
  console.log("users=>", users);
  return (
    <div className="space-y-8">
      {users?.map((user) => (
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>{user.username.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{user.username}</p>
          </div>
          <div className="ml-auto font-medium">{String(user._id)}</div>
        </div>
      ))}
    </div>
  );
}
