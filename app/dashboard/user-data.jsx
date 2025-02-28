import { db } from "@/app/lib/mongodb";
import UserTable from "./user-table";
export default async function UserData() {
  try {
    const randomUser = await db
      .collection("user")
      .aggregate([{ $sample: { size: 3 } }])
      .toArray();

    if (randomUser) {
      //Refine users query to an array
      const refinedUsers = randomUser.map((user) => ({
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
