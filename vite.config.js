import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

import './motifyManifest.js'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
  ],
})
