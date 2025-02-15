import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div>
      <footer className="bg-secondary text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>
            &copy; {new Date().getFullYear()} Tembisa Independent Baptist. All
            rights reserved.
          </p>
          {/* <div className="mt-4">
            <Link
              href="/privacy"
              className="text-zinc-400 hover:text-white mr-4"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-zinc-400 hover:text-white">
              Terms of Service
            </Link>
          </div> */}
        </div>
      </footer>
    </div>
  );
};

export default Footer;
