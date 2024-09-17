import Link from "next/link";
import React from "react";
import "./Navbar.css";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <nav className="nav">
      <h2>Bank</h2>
      <div>
        <Button variant="ghost" asChild>
          <Link href="/">Home</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/about">About</Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
