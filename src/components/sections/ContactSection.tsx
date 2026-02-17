"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export function ContactSection() {
    const ref = useRef<HTMLDivElement>(null);

    // Mouse position values
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring animation for rotation
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    // Map mouse position to rotation degrees
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div className="flex h-full w-full items-center justify-center perspective-1000">
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative h-[480px] w-full max-w-[420px] rounded-3xl bg-white/40 backdrop-blur-xl shadow-xl border border-white/50 p-8 flex flex-col items-center justify-between"
            >
                {/* Floating Elements for 3D Depth */}
                <div
                    style={{ transform: "translateZ(60px)" }}
                    className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 opacity-20 blur-2xl"
                />
                <div
                    style={{ transform: "translateZ(40px)" }}
                    className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-500 opacity-20 blur-2xl"
                />

                {/* Content Container */}
                <div style={{ transform: "translateZ(50px)" }} className="flex flex-col items-center text-center w-full z-10">
                    <div className="mb-6 h-20 w-20 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 shadow-lg flex items-center justify-center">
                        <Mail className="h-10 w-10 text-white" />
                    </div>

                    <h3 className="mb-2 font-title text-3xl font-bold text-slate-800">
                        Get in Touch
                    </h3>
                    <p className="text-sm text-slate-500 max-w-[280px]">
                        새로운 프로젝트나 협업 제안은 언제나 환영합니다.
                    </p>
                </div>

                {/* Contact Links */}
                <div style={{ transform: "translateZ(30px)" }} className="w-full space-y-4">
                    <a href="mailto:contact@example.com" className="group flex items-center justify-between rounded-xl bg-white/60 p-4 shadow-sm transition-all hover:bg-white hover:shadow-md hover:scale-[1.02]">
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                <Mail size={16} />
                            </div>
                            <span className="text-sm font-medium text-slate-700">contact@example.com</span>
                        </div>
                        <ArrowRight size={16} className="text-slate-400 transition-transform group-hover:translate-x-1" />
                    </a>

                    <div className="group flex items-center justify-between rounded-xl bg-white/60 p-4 shadow-sm transition-all hover:bg-white hover:shadow-md hover:scale-[1.02] cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                                <Phone size={16} />
                            </div>
                            <span className="text-sm font-medium text-slate-700">010-1234-5678</span>
                        </div>
                        <ArrowRight size={16} className="text-slate-400 transition-transform group-hover:translate-x-1" />
                    </div>

                    <div className="group flex items-center justify-between rounded-xl bg-white/60 p-4 shadow-sm transition-all hover:bg-white hover:shadow-md hover:scale-[1.02] cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                                <MapPin size={16} />
                            </div>
                            <span className="text-sm font-medium text-slate-700">Seoul, Korea</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div style={{ transform: "translateZ(20px)" }} className="mt-6 text-xs text-slate-400 font-medium">
                    © 2024 Antigravity Portfolio
                </div>
            </motion.div>
        </div>
    );
}
