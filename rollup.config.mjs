import typescript from '@rollup/plugin-typescript';

// preserveModules: true evita bundlear a un único archivo — mantiene la
// estructura 1:1 (cada .ts fuente -> un .js de salida), necesario para
// soportar subpaths como @zanobijs/common/utils sin declarar cada
// entrada de Rollup a mano. Validado en spike (.plans/plan-perf05-rollup.md).
function build(pkg, format, entries, external) {
  const outDir = `packages/${pkg}/lib/${format === 'es' ? 'esm' : 'cjs'}`;
  return {
    input: entries.map((e) => `packages/${pkg}/${e}.ts`),
    output: {
      dir: outDir,
      format,
      preserveModules: true,
      preserveModulesRoot: `packages/${pkg}`,
      entryFileNames: '[name].js',
    },
    external,
    plugins: [
      typescript({
        tsconfig: `packages/${pkg}/tsconfig.build.json`,
        outDir,
        declaration: false,
        compilerOptions: { composite: false, module: 'ESNext' },
      }),
    ],
  };
}

const COMMON_ENTRIES = [
  'index',
  'utils/index',
  'utils/constants',
  'utils/shared.utils',
  'exceptions/runtime.exception',
];
const COMMON_EXTERNAL = ['reflect-metadata', 'tslib', 'util'];

const CORE_ENTRIES = ['index'];
// nunca bundlear la dependencia entre packages ni awilix — evita duplicar
// código y romper el estado singleton interno de awilix.
const CORE_EXTERNAL = [
  'awilix',
  'reflect-metadata',
  'tslib',
  '@zanobijs/common',
  /^@zanobijs\/common\//,
];

export default [
  build('common', 'cjs', COMMON_ENTRIES, COMMON_EXTERNAL),
  build('common', 'es', COMMON_ENTRIES, COMMON_EXTERNAL),
  build('core', 'cjs', CORE_ENTRIES, CORE_EXTERNAL),
  build('core', 'es', CORE_ENTRIES, CORE_EXTERNAL),
];
