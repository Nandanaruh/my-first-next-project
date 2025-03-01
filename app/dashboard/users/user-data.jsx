import { db } from "@/app/lib/mongodb";
import UserTable from "./user-table";

export default async function UserData() {
  try {
    const usersQuery = await db
      .collection("user")
      .find({})
      .sort({ metacritic: -1 })
      .limit(5)
      .toArray();

    if (usersQuery) {
      //Refine users query to an array
      const refinedUsers = usersQuery.map((user) => ({
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      }));
      //Pass users refined data to table
      //Return user table
      return <UserTable users={refinedUsers} />;
    }
  } catch (error) {
    console.log(error);
    return (
      <div className="flex items-center justify-center h-[150px]">
        <p className="text-red-700 font-medium animate-pulse duration-1000">
          Users Not Found!
        </p>
      </div>
    );
  }
}
