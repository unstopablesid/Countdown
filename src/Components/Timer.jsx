import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import Baground from "../assets/Background.jpg";
import Banner from "../assets/Banner.png";

export default function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState({ hours: 28, minutes: 0, seconds: 0 });
    const [isActive, setIsActive] = useState(false);
    const [isOver, setIsOver] = useState(false);
    const [beforeStart, setBeforeStart] = useState(true);

    useEffect(() => {
        const startTime = new Date("2025-03-08T10:59:00").getTime();
        const endTime = startTime + 28 * 60 * 60 * 1000;

        const updateTimer = () => {
            const now = new Date().getTime();
            if (now < startTime) {
                setIsActive(false);
                setBeforeStart(true);
            } else if (now >= startTime && now < endTime) {
                setIsActive(true);
                setBeforeStart(false);
                const difference = endTime - now;
                setTimeLeft({
                    hours: Math.floor(difference / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                });
            } else {
                setIsActive(false);
                setIsOver(true);
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
                gsap.to(".countdown-container", { opacity: 0, scale: 0.5, duration: 1.5 });
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
            <img src={Banner} alt="" className="pb-2" />
    
            {beforeStart && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="bg-white text-black text-xl font-bold px-6 py-3 rounded-lg shadow-lg"
                >
                    Hackathon starts at 11 AM!
                </motion.div>
            )}
    
            {isActive && (
                <motion.h1
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-4xl font-bold mb-6 bg-white text-black bg-opacity-30 px-6 py-3 rounded-lg"
                >
                    Hackathon Countdown
                </motion.h1>
            )}
    
            {isActive ? (
                <div className="countdown-container text-black flex space-x-6 bg-white bg-opacity-30 px-6 py-4 rounded-lg shadow-xl">
                    {renderBox(timeLeft.hours, "Hours")}
                    <span className="font-bold" style={{ fontSize: "80px" }}>:</span>
                    {renderBox(timeLeft.minutes, "Minutes")}
                    <span className="text-10xl font-bold" style={{ fontSize: "80px" }}>:</span>
                    {renderBox(timeLeft.seconds, "Seconds")}
                </div>
            ) :
                !beforeStart && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="bg-red-600 text-white text-xl font-bold px-6 py-3 rounded-lg shadow-lg"
                    >
                        The Hackathon Has Ended!
                    </motion.div>
                )
            }
        </div>
    );
}
