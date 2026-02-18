"use client";

import { motion } from "framer-motion";
import { communityLeadershipData } from "@/src/data/resume";
import { Calendar, Building2, Award, Users, ChevronDown } from "lucide-react";

export function ImplementationSection() {
    return (
        <div className="flex h-full w-full flex-col bg-[#F5F5F7] overflow-hidden relative">
            {/* Safe Area Container - Adjusted padding to respect navigation */}
            <div className="flex-1 flex flex-col pt-20 pb-20 px-4 md:px-20 z-10 h-full">

                {/* Section Header */}
                <div className="mb-4 text-center md:text-left flex-shrink-0">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 mb-2"
                    >
                        <Users className="h-2 w-2" />
                        <span className="text-[8px] font-bold uppercase tracking-widest">Extra Actions</span>
                    </motion.div>
                    <h2 className="font-title text-xl font-black tracking-tight text-[#1d1d1f] md:text-2xl lg:text-3xl">
                        Implementation
                    </h2>
                    <p className="mt-1 text-[10px] md:text-xs text-[#86868b] max-w-2xl font-body leading-relaxed break-keep">
                        다양한 대외활동 참여를 통해 폭넓은 경험을 축적했습니다.
                    </p>
                </div>

                {/* Timeline Container - Scrollable Area */}
                {/* Added substantial bottom padding to allow scrolling past fixed nav */}
                <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin mask-gradient min-h-0 relative z-20">
                    <div className="max-w-xl mx-auto relative pt-10 pb-32">

                        {/* Central Axis Line */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-blue-50 via-slate-200 to-blue-50 -translate-x-1/2 hidden md:block" />

                        <div className="space-y-4 md:space-y-5">
                            {communityLeadershipData.map((item, index) => {
                                // Extract Year for the axis label
                                const yearMatch = item.date.match(/20\d{2}/);
                                const yearLabel = yearMatch ? yearMatch[0] : "";

                                return (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 15 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-20px" }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        className={`relative flex flex-col items-center md:flex-row ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                            }`}
                                    >
                                        {/* Year Marker on Axis */}
                                        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-3 z-20 hidden md:block">
                                            <div className="px-1.5 py-0.5 bg-white border border-slate-200 rounded-full shadow-sm">
                                                <span className="text-[7px] font-bold text-blue-600 font-body">{yearLabel}</span>
                                            </div>
                                        </div>

                                        {/* Timeline Dot */}
                                        <div className={`absolute left-1/2 top-0 h-2 w-2 rounded-full border-[1.5px] border-white bg-blue-500 shadow-sm -translate-x-1/2 z-10 hidden md:block transition-transform duration-300 group-hover:scale-125`} />

                                        {/* Content Card Side */}
                                        <div className={`w-full md:w-[46%] ${index % 2 === 0 ? "md:text-right md:pr-4" : "md:text-left md:pl-4"
                                            }`}>
                                            <div className={`group relative rounded-lg bg-white p-2.5 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] ring-1 ring-slate-100 transition-all duration-300 hover:shadow-md hover:ring-blue-50 hover:-translate-y-0.5`}>

                                                {/* Date & Organization Row */}
                                                <div className={`flex flex-wrap items-center gap-1 mb-0.5 ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"
                                                    }`}>
                                                    <div className="flex items-center gap-0.5 px-1 py-0.5 rounded bg-blue-50/50 text-blue-600">
                                                        <Calendar className="h-1.5 w-1.5" />
                                                        <span className="text-[7px] font-bold tracking-tight">{item.date}</span>
                                                    </div>
                                                    <div className="flex items-center gap-0.5 text-slate-400">
                                                        <Building2 className="h-1.5 w-1.5" />
                                                        <span className="text-[7px] font-medium">{item.organization}</span>
                                                    </div>
                                                </div>

                                                <h3 className="font-title text-xs font-bold text-slate-900 mb-0.5 leading-tight group-hover:text-blue-600 transition-colors">
                                                    {item.title}
                                                </h3>

                                                <p className="font-body text-[8px] text-slate-500 break-keep leading-relaxed opacity-90 whitespace-pre-line">
                                                    {item.description}
                                                </p>

                                                {/* Decorative Icon - Absolute Positioning */}
                                                <div className={`absolute bottom-2 opacity-[0.03] transition-all duration-300 group-hover:opacity-10 group-hover:scale-110 ${index % 2 === 0 ? "right-2 md:right-auto md:left-2" : "right-2"
                                                    }`}>
                                                    {item.title.includes("우수상") || item.title.includes("선정") ? (
                                                        <Award className="h-4 w-4 text-blue-600" />
                                                    ) : (
                                                        <Users className="h-4 w-4 text-blue-600" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Empty Side (Desktop Spacer) */}
                                        <div className="hidden md:block md:w-[46%]" />
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Accent */}
            <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-blue-50 opacity-20 blur-3xl pointer-events-none z-0" />
            <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-indigo-50 opacity-20 blur-3xl pointer-events-none z-0" />

            <style jsx global>{`
                .mask-gradient {
                    mask-image: linear-gradient(to bottom, black 0%, black 85%, transparent 100%);
                }
                
                /* Custom Scrollbar Styling */
                .scrollbar-thin::-webkit-scrollbar {
                    width: 3px;
                }
                .scrollbar-thin::-webkit-scrollbar-track {
                    background: transparent;
                }
                .scrollbar-thin::-webkit-scrollbar-thumb {
                    background-color: rgba(203, 213, 225, 0.4);
                    border-radius: 20px;
                }
                .scrollbar-thin {
                    scrollbar-width: thin;
                    scrollbar-color: rgba(203, 213, 225, 0.4) transparent;
                }
            `}</style>
        </div>
    );
}
