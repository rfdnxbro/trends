/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    // 本番環境ではVercel Functionsを使用、開発環境ではlocalhost:3001を使用
    if (process.env.NODE_ENV === 'production') {
      // 本番環境では内部のAPI routesを使用（rewrites不要）
      return [];
    }
    
    // 開発環境では既存のバックエンドサーバーにプロキシ
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;