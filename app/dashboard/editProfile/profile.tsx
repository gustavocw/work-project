"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosError } from "axios"
import { toast } from "react-hot-toast";
import Image from "next/image"



type User = {
  image: any;
};

export default function Profile({ image }: User) {
  const [name, setName] = useState("");
  const queryClient = useQueryClient();
  let toastName: string;

  const { mutate } = useMutation(
    async (name: string) =>
      await axios.post("/api/users/editUser", {
        name,
      }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: toastName })
        }
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["posts"])
        toast.success("Name has been changed", { id: toastName })
        setName("")
      },
    }
  )
  const editProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    toastName = toast.loading("Creating your post", { id: toastName })
    mutate(name)
  }

  return (
    <form onSubmit={editProfile}>
      <div className="w-100 flex justify-center">
        <div className="flex justify-center flex-col ">
          <Image
            width={200}
            height={200}
            className="w-100"
            src={image}
            alt=""
            priority
          />
          <label htmlFor="nome">Your Name</label>
          <input
            className="m-2"
            name="nome"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
            type="submit"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </form>
  );
}
