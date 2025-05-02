import { GalleryVerticalEnd } from "lucide-react";

import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <img src="./logo.jpeg" className="h-7" />
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
        <div className="text-center text-gray-600">
          &#169; 2025, Powered by Yesautomate. All Rights Reserved
        </div>
      </div>
      <div className="bg-white hidden justify-center items-center  lg:flex">
        <img
          src="/login-banner.jpeg"
          alt="Image"
          className=" inset-0 h-[70vh] w-auto object-fit dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
