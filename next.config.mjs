/** @type {import('next').NextConfig} */
const nextConfig = {
    allowedDevOrigins: ['http://192.168.0.186:3000', 'localhost:3000'],
    experimental: {
        allowedDevOrigins: ['192.168.0.186'],
    },
};

export default nextConfig;
