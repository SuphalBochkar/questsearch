import Link from "next/link";
import { motion } from "framer-motion";

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md border border-white/30 dark:border-white/10 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Title */}
            <motion.div
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/" className="text-xl font-bold tracking-tight">
                SpeakX
              </Link>
            </motion.div>

            {/* Navigation */}
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/"
                  className="text-sm font-medium relative after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-0.5 after:bg-current after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform"
                >
                  Home
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
