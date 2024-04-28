import { fileURLToPath, URL } from 'node:url'

import { vitePluginForArco } from '@arco-plugins/vite-vue'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'

import { prefix } from './src/config/design'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VueDevTools(),
    vitePluginForArco({
      style: 'css'
    }),
    // 按需自动导入
    Components({
      resolvers: [IconsResolver()],
      dts: 'src/types/components.d.ts'
    }),
    // https://github.com/unplugin/unplugin-icons
    // 可使用的相关Icon：https://icones.netlify.app/
    Icons()
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          // 全局公共前缀
          '@prefix-var': prefix
        },
        javascriptEnabled: true
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    // 后缀省略, '.js' 也要加，要不 vitePluginForArco 自动引入图标会出错
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  }
})
