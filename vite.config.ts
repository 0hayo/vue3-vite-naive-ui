import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
// import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { svgBuilder } from './src/plugins/svgBuilder';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    vue(),
    // 配置 svg
    // createSvgIconsPlugin({
    //   // 指定要缓存的图标文件夹
    //   iconDirs: [path.resolve(process.cwd(), '@/assets/svg')],
    //   // 执行icon name的格式
    //   symbolId: 'icon-[dir]-[name]',
    // })
    svgBuilder('./src/assets/svg/')
  ],
  // 强制预构建插件包
  optimizeDeps: {
    include: ['axios'],
  },
  // 打包配置
  build: {
    target: 'modules',
    outDir: 'dist', //指定输出路径
    assetsDir: 'assets', // 指定生成静态资源的存放路径
    minify: 'terser', // 混淆器，terser构建后文件体积更小
  },
  // 本地运行配置，及反向代理配置
  server: {
    cors: true, // 默认启用并允许任何源
    open: false, // 在服务器启动时自动在浏览器中打开应用程序
    //反向代理配置，注意rewrite写法，开始没看文档在这里踩了坑
    proxy: { // 代理配置
      '/admin/api': {
        target: 'http://192.168.1.155', //代理接口
        ws: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    host: '192.168.1.123',
    port: 80
  },
});
