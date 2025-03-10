'use client';

import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Calendar, Users, Clock, User, DollarSign, ArrowRight } from "lucide-react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { motion, useScroll, useSpring } from "framer-motion";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const features = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "বিখ্যাত স্পট সমূহ",
      description: "কক্সবাজার সমুদ্র সৈকত, বান্দরবান পাহাড়, নীলগিরি, নীলাচল এবং আরও অনেক কিছু"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "সুবিধাজনক সময়",
      description: "আপনার পছন্দের তারিখে ট্যুর প্ল্যান করুন"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "গ্রুপ ট্যুর",
      description: "১০-১৫ জনের গ্রুপের জন্য আকর্ষণীয় প্যাকেজ"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "৩ দিনের ট্যুর",
      description: "পরিপূর্ণ ৩ দিনের ট্যুর প্যাকেজ সকল খরচ সহ"
    }
  ];

  const cards = [
    {
      href: "/user-info",
      icon: <User className="w-6 h-6" />,
      title: "ব্যক্তিগত তথ্য",
      description: "আপনার ব্যক্তিগত তথ্য দেখুন এবং আপডেট করুন",
      color: "purple",
      delay: 0.1
    },
    {
      href: "/upcoming",
      icon: <Calendar className="w-6 h-6" />,
      title: "আমাদের পরবর্তী কার্যক্রম",
      description: "আসন্ন ট্যুর এবং ইভেন্টের তথ্য জানুন",
      color: "green",
      delay: 0.2
    },
    {
      href: "/expenses",
      icon: <DollarSign className="w-6 h-6" />,
      title: "খরচের হিসাব",
      description: "সকল খরচের বিস্তারিত হিসাব দেখুন",
      color: "blue",
      delay: 0.3
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${
      theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900' : 'bg-gradient-to-br from-purple-50 via-white to-blue-50'
    }`}>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-purple-600 transform-origin-0"
        style={{ scaleX }}
      />
      <Navbar />
      <Hero />
      
      <main className="flex-grow relative">
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
          >
            আমাদের বৈশিষ্ট্য সমূহ
          </motion.h2>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Card className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <motion.div 
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="p-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full text-white"
                      >
                        {feature.icon}
                      </motion.div>
                      <h3 className="font-semibold text-xl text-gray-800 dark:text-white">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-24"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              আপনার সুবিধার্থে
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: card.delay }}
                  whileHover={{ y: -10 }}
                >
                  <Link href={card.href}>
                    <Card className="group relative overflow-hidden backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <CardHeader className="relative z-10">
                        <motion.div 
                          whileHover={{ scale: 1.1 }}
                          className={`p-4 bg-gradient-to-br from-${card.color}-500 to-${card.color}-600 rounded-full text-white w-fit`}
                        >
                          {card.icon}
                        </motion.div>
                      </CardHeader>
                      <CardContent className="relative z-10 p-6">
                        <CardTitle className="text-2xl mb-3 text-gray-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                          {card.title}
                        </CardTitle>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {card.description}
                        </p>
                        <motion.div 
                          initial={{ x: -10, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          className="flex items-center text-purple-600 dark:text-purple-400 font-medium"
                        >
                          <span>আরও দেখুন</span>
                          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                        </motion.div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 







