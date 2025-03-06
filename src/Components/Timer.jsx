import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import Baground from "../assets/Background.jpg";

export default function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState({ hours: 28, minutes: 0, seconds: 0 });
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        // Define the start and end time
        const startTime = new Date("2025-03-06T16:39:00").getTime();
        const endTime = startTime + 28 * 60 * 60 * 1000; // 28 hours later

        const updateTimer = () => {
            const now = new Date().getTime();
            if (now < startTime) {
                // Before 11:00 AM on March 8th → Show waiting message
                setIsActive(false);
                setTimeLeft({ hours: 28, minutes: 0, seconds: 0 });
            } else if (now >= startTime && now < endTime) {
                // Between March 8th, 11:00 AM - March 9th, 3:00 PM → Start Countdown
                setIsActive(true);
                const difference = endTime - now;
                setTimeLeft({
                    hours: Math.floor(difference / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                });
            } else {
                // After March 9th, 3:00 PM → Stop Countdown
                setIsActive(false);
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
            }
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        gsap.fromTo(
            ".countdown-container",
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 1.5, ease: "elastic.out(1, 0.5)" }
        );
    }, []);

    const renderBox = (value, label) => (
        <motion.div
            key={label}
            initial={{ rotateX: 90 }}
            animate={{ rotateX: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
        >
            <div className="bg-blue-900 bg-opacity-90 text-white w-36 h-36 flex items-center justify-center text-6xl font-bold rounded-lg shadow-lg">
                {value < 10 ? `0${value}` : value}
            </div>
            <p className="mt-2 text-lg font-medium">{label}</p>
        </motion.div>
    );

    return (
        <div
            className="Baground flex flex-col items-center justify-center min-h-screen bg-cover bg-center text-white"
            style={{ backgroundImage: `url(${Baground})` }}
        >
            <motion.h1
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-4xl font-bold mb-6 bg-white text-black bg-opacity-30 px-6 py-3 rounded-lg"
            >
                Hackathon Countdown
            </motion.h1>

            {!isActive ? (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2 }}
                    className="text-lg text-black font-semibold bg-black bg-opacity-50 px-4 py-2 rounded-md mb-4"
                >
                    Starts on March 8, 11:00 AM
                </motion.p>
            ) : (
                <div className="countdown-container text-black flex space-x-6 bg-white bg-opacity-30 px-6 py-4 rounded-lg shadow-xl">
                    {renderBox(timeLeft.hours, "Hours")}
                    <span className="font-bold" style={{ fontSize: "80px" }}>:</span>
                    {renderBox(timeLeft.minutes, "Minutes")}
                    <span className="text-10xl font-bold" style={{ fontSize: "80px" }}>:</span>
                    {renderBox(timeLeft.seconds, "Seconds")}
                </div>
            )}
        </div>
    );
}
