"use client"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  HomeIcon, 
  LayoutDashboardIcon, 
  MessageSquareIcon,
  InfoIcon,
  CreditCardIcon,
  PlusCircleIcon,
  VideoIcon,
  Coins
} from "lucide-react"
import { usePathname } from "next/navigation"
import { useAuthContext } from "@/components/basic/theme-provider"

function AppSidebar() {
  const pathname = usePathname()
  const { user, loading } = useAuthContext();
  const mainNavLinks = [
    // { title: "Home", href: "/", icon: HomeIcon },
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboardIcon },
    { title: "Contact Us", href: "/contact", icon: MessageSquareIcon },
    { title: "About Us", href: "/about", icon: InfoIcon },
    { title: "Billing", href: "/pricing", icon: CreditCardIcon },
  ]

  const sidebarVariants = {
    hidden: { x: -300, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  }

  const menuItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: i => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    })
  }

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
      className="flex justify-center h-full"
    >
      <Sidebar className="border-r border-border">
        <SidebarHeader className="p-6">
          <motion.div 
            className="flex justify-center items-center gap-2"
            variants={logoVariants}
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Logo
            </span>
          </motion.div>
        </SidebarHeader>
        
        <SidebarContent className="px-4">
          {/* Create New Video Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <Link href="/create_video">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 px-4 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <PlusCircleIcon className="h-5 w-5" />
                <VideoIcon className="h-5 w-5" />
                <span className="font-medium">Create New Video</span>
              </motion.button>
            </Link>
          </motion.div>

          <SidebarGroup>
            <SidebarMenu>
              {mainNavLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  custom={index}
                  variants={menuItemVariants}
                  className="mb-2"
                >
                  <SidebarMenuItem>
                    <Link href={link.href} passHref>
                      <SidebarMenuButton 
                        className={`w-full transition-colors rounded-xl py-3 ${
                          pathname === link.href 
                            ? "bg-blue-100 dark:bg-blue-900" 
                            : "hover:bg-blue-50 dark:hover:bg-blue-950"
                        }`}
                      >
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-3 px-2"
                        >
                          <link.icon className={`h-5 w-5 ${
                            pathname === link.href 
                              ? "text-blue-700 dark:text-blue-300" 
                              : "text-blue-600 dark:text-blue-400"
                          }`} />
                          <span className={`text-base font-medium ${
                            pathname === link.href 
                              ? "text-blue-700 dark:text-blue-300" 
                              : ""
                          }`}>{link.title}</span>
                        </motion.div>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                </motion.div>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-6 border-t">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center justify-center gap-2 text-sm">
              <Coins className="h-4 w-4 text-blue-500" />
              {loading ? (
                <span className="font-medium">Loading...</span>
              ) : user ? (
                <span className="font-medium">{user.credits || 0} credits left</span>
              ) : (
                <span className="font-medium">0 credits</span>
              )}
            </div>
            
            <Link href="/pricing">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg py-2 px-4 text-sm font-medium shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
              >
                Buy more credits
              </motion.button>
            </Link>

            <div className="text-xs text-center text-muted-foreground mt-4">
              © 2024 Your Company
            </div>
          </motion.div>
        </SidebarFooter>
      </Sidebar>
    </motion.div>
  )
}

export default AppSidebar
