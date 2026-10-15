//components/layout/footer.tsx
"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white py-8 dark:border-gray-800 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Column 1: About */}
          <div>
            <h3 className="mb-4 text-xl font-bold">My Portfolio</h3>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Full-Stack &amp; AI Engineer based in Nairobi, Kenya.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://github.com/wachira7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/emmanuelwaruts77/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaLinkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </motion.a>
              <motion.a
                href="https://x.com/nationalist_ke"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaTwitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </motion.a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="mb-4 text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/"
                  className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/about"
                  className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="/projects"
                  className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact"
                  className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="mb-4 text-xl font-bold">Contact</h3>
            <p className="mb-2 text-gray-600 dark:text-gray-300">
              Feel free to reach out if you have any questions.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Email: <a href="mailto:your.email@example.com" className="text-primary hover:underline">wewaruts@gmail.com</a>
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Phone: <a href="tel:+254700000000" className="text-primary hover:underline">+254705274244/+254756126336</a>

            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-200 pt-8 text-center dark:border-gray-800">
          <p className="text-gray-600 dark:text-gray-400">
            © {currentYear} Warutere. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}