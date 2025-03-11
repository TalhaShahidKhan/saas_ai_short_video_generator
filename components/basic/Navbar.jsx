"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import Authentication from "./Authentication";
import { useAuthContext } from "./theme-provider";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthContext();

  const navLinks = [
    { title: "Home", href: "/" },
    { title: "Contact Us", href: "/contact" },
    { title: "About Us", href: "/about" },
    { title: "Pricing", href: "/pricing" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full backdrop-blur-sm bg-white/75 dark:bg-gray-950/75 border-b border-gray-200 dark:border-gray-800 shadow-sm px-6 py-4 z-50"
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="text-2xl font-bold text-gray-900 dark:text-white"
        >
          Logo
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <motion.div
              key={link.title}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={link.href}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {link.title}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Auth Buttons and Theme Toggle */}
        <div className="hidden md:flex items-center space-x-4">
          <ModeToggle />
          {!user ? (
            <Authentication>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
              >
                Get Started
              </motion.button>
            </Authentication>
          ) : (
            <>
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                >
                  Dashboard
                </motion.button>
              </Link>
              <Image
              src={user?.photoURL}
              alt="UserImage"
              width={40}
              height={40}
              className="rounded-full"
              />
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <ModeToggle />
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 dark:text-gray-300"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          height: isOpen ? "auto" : 0,
        }}
        className="md:hidden"
      >
        <div className="px-4 py-4 space-y-4 backdrop-blur-sm bg-white/75 dark:bg-gray-950/75">
          {navLinks.map((link) => (
            <motion.div
              key={link.title}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={link.href}
                className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {link.title}
              </Link>
            </motion.div>
          ))}
          <div className="space-y-2">
            <Authentication>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
              >
                Get Started
              </motion.button>
            </Authentication>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
