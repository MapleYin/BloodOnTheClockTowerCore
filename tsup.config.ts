import { defineConfig } from 'tsup';

export default defineConfig({
    entryPoints: ["src/index.ts"],
    format: ["cjs", "esm"],
    dts: true,
    outDir: "build",
    clean: true,
});