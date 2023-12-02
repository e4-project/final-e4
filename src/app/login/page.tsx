"use client";

import React from "react";
import Button from "@/components/common/Button/index";
const Login = () => {
  const handleSocialLogin = (provider: string) => {
    // Handle social login logic here
  };

  return (
    <div>
      <Button
        text="Google 로그인"
        onClick={() => handleSocialLogin("google")}
      ></Button>
      <Button
        text="Facebook 로그인"
        onClick={() => handleSocialLogin("facebook")}
      ></Button>
      <Button
        text="GitHub 로그인"
        onClick={() => handleSocialLogin("github")}
      ></Button>
    </div>
  );
};

export default Login;
