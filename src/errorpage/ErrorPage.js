import React from "react";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-white">
      <div className="w-[400px] h-[400px] mr-20">
        <img
          src="https://media.istockphoto.com/id/1182268423/vector/spy-icon.jpg?s=612x612&w=0&k=20&c=zzG_DmM5dVezK4CbOYtxxTFyJFAmtO22W-ZcZrprLko="
          alt=""
          className="w-full h-full animate-spin25s"
        />
      </div>
      <div>
        <h1 className="font-bold text-9xl text-[#2b2a28]">404</h1>
        <h3 className="text-3xl font-bold">PAGE NOT FOUND</h3>
      </div>
    </div>
  );
};

export default ErrorPage;
