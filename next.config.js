/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [
        'firebasestorage.googleapis.com', 
        'i.ibb.co','res.cloudinary.com'
      ],
    },
  }
  
  module.exports = nextConfig;
  