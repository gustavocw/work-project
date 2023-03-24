import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../../pages/api/auth/[...nextauth]"
import { redirect } from "next/navigation"
import MyPosts from "./MyPosts"
import Profile from "./editProfile/profile"

type User = {
  image: any;
}

export default async function Dashboard({ image }: User) {
  const session = await unstable_getServerSession(authOptions)
  if (!session) {
    redirect("/api/auth/signin")
  }
  

  return (
    <main>
      <h1 className="text-2xl font-bold">Welcome back {session?.user?.name}</h1>
      <MyPosts />
      <h2 className="text-4x1 font-bold text-center" >Edit you profile</h2>
      <div className="profile">
        <Profile image={session?.user?.image} />
      </div>
    </main>
  )
}
