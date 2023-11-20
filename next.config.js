/** @type {import('next').NextConfig} */


const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },// 要讓next認得這個圖片的src網址
};

module.exports = nextConfig
