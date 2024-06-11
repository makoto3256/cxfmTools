import { defineConfig, UserConfig, ConfigEnv } from 'vite';
import path from 'path';
import { createVitePlugins } from './config/vite/plugins';
import { VITE_DROP_CONSOLE, VITE_PORT } from './config/constant';
import { generateModifyVars } from './config/themeConfig';
import gradient from 'gradient-string';


const encodedMessage = 'SSBjYW4gYmUg5qGcIPCfkq7igJhzIGxhcGRvZ++8ge+8ge+8gQ==';

function resolvePath(paths: string) {
  return path.resolve(__dirname, paths);
}

function printGradientMessage() {
  
  const decodedMessage = Buffer.from(encodedMessage, 'base64').toString('utf-8');
  
  const gradientMessage = gradient.retro(decodedMessage);
  console.log(gradientMessage);
}

export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build';
  console.log(command, mode);

  const viteConfig: UserConfig = {
    resolve: {
      alias: {
        "@": resolvePath('./src'),
        '@config': resolvePath('./config'),
        "@components": resolvePath('./src/components'),
        '@utils': resolvePath('./src/utils'),
        '@api': resolvePath('./src/api'),
      }
    },
    base: "./",
    plugins: [
      ...createVitePlugins(isBuild),
      {
        name: 'custom-logger',
        configureServer(server) {
          if (!isBuild) {
            server.httpServer?.on('listening', () => {
              const address = server.httpServer?.address();
              if (typeof address === 'object' && address !== null) {
                
                setTimeout(() => {
                  printGradientMessage();
                }, 0);
              }
            });

            server.middlewares.use((req, res, next) => {
              console.log(`Request: ${req.method} ${req.url}`);
              next();
            });
          }
        },
        
        buildEnd() {
          if (isBuild) {
            printGradientMessage();
          }
        }
      }
    ],
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: generateModifyVars(),
          javascriptEnabled: true,
          additionalData: `@import "${resolvePath('src/assets/styles/base.less')}";`
        },
      },
    },
    server: {
      hmr: { overlay: false },
      port: VITE_PORT,
      open: false,
      cors: true,
      host: '0.0.0.0',
    },
    build: {
      target: 'es2015',
      minify: 'terser',
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: VITE_DROP_CONSOLE,
        },
      },
      rollupOptions: {
        external: [],
      },
      watch: {},
      chunkSizeWarningLimit: 2000,
    },
    logLevel: 'info',
  };

  
  if (isBuild) {
    printGradientMessage();
  }

  return viteConfig;
});
