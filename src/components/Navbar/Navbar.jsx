"use client";
import React from "react";
import { Button } from "../ui/button";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout/");

      const data = await res.json();
      console.log(data);

      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" shadow-md  ">
      <div className="flex justify-between items-center  py-4 px-6 mx-auto">
        <Link className="font-bold" href="/">
          <img src="/logo.jpeg" className="h-7" />
        </Link>
        <Button onClick={handleLogout} variant={"default"}>
          Sign out
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
