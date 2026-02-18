import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    transpilePackages: ["gsap", "@gsap/react", "framer-motion", "lucide-react"],
    experimental: {
        optimizePackageImports: ["lucide-react"],
    },
};

export default nextConfig;
