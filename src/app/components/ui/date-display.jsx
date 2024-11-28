"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export function DateDisplay() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = useMemo(() => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return currentDate.toLocaleDateString("en-US", options);
  }, [currentDate]);

  return (
    <Card className="md:aspect-video ">
      <CardHeader>
        <CardTitle className="text-2xl font-normal text-start">
          Current Date :
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.p
          key={formattedDate}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-center  text-primary max-w-[65%] m-auto"
        >
          {formattedDate}
        </motion.p>
      </CardContent>
    </Card>
  );
}
