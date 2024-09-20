import Link from "next/link";
import React from "react";
import "./Navbar.css";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  return (
    <nav className="nav">
      <h2>Your Bank</h2>
      <div className="nav-right">
        <Button variant="ghost" asChild>
          <Link href="/">Home</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/about">About</Link>
        </Button>
        <div className="inputs-container">
          <Input type="email" placeholder="Email" className="m-1" />
          <Input type="password" placeholder="Password" className="m-1" />
          <Button className="m-1">Log In</Button>
        </div>
        <Button className="acceder-btn">LogIn</Button>
      </div>
    </nav>
  );
};

export default Navbar;
