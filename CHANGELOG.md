# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0-beta.1](https://github.com/devdroide/ZanobiJS/compare/v2.0.0-beta.0...v2.0.0-beta.1) (2026-09-16)

### Bug Fixes

- **ci:** remove dead git add/commit step from publish workflow ([7f00f52](https://github.com/devdroide/ZanobiJS/commit/7f00f52e3941b04d3a74d3f9dbfa7f00ce86544b))
- **commons:** correct stale maxDepth doc comment after logger-user extraction ([26e06b5](https://github.com/devdroide/ZanobiJS/commit/26e06b5d70f2776c5aa6b5006e10a642e0e566be))

# [2.0.0-beta.0](https://github.com/devdroide/ZanobiJS/compare/v1.2.0-beta.2...v2.0.0-beta.0) (2026-09-16)

### Bug Fixes

- **build:** stop deleting CHANGELOG.md in clean:ts ([77e9cdf](https://github.com/devdroide/ZanobiJS/commit/77e9cdfcdc10bdbba0c09349175885674a783cbb))
- **commons,core:** :bug: respect operator env vars and contain masker failures (SEC-05) ([62f13a4](https://github.com/devdroide/ZanobiJS/commit/62f13a4dee32f87902623e361c7c30a9cfcb1e2f))
- **commons,test:** 🐛 make masker fail-closed instead of fail-open ([cada4c7](https://github.com/devdroide/ZanobiJS/commit/cada4c7f8121c50663503882995d084701f2b171))
- **commons:** :bug: fix isClass() detection broken under esbuild bundling ([b74fd38](https://github.com/devdroide/ZanobiJS/commit/b74fd3869cd9941bbc9ad623d1f8c49869ce1de8))
- **commons:** :lock: bound masker recursion and log inspect depth (SEC-06) ([b0c5e80](https://github.com/devdroide/ZanobiJS/commit/b0c5e803dffaa3fdeb041d8e90df9332df8b4a6b))
- **core,test:** 🐛 stop wrapping non-awilix errors in Factory.get() ([11b1873](https://github.com/devdroide/ZanobiJS/commit/11b1873a6e2a2fde93a78388a6c58f1a70148cb8))
- **core,test:** 🐛 throw MissingInjectTokenException instead of silently logging ([ed7c33c](https://github.com/devdroide/ZanobiJS/commit/ed7c33cd63000cdbbbf4bc700c71ebe0d23e6ee7))
- **core:** :bug: export exceptions from @zanobijs/core public entrypoint ([30b796d](https://github.com/devdroide/ZanobiJS/commit/30b796d516b9eab82fcda724f7c0ebe8c6faf4c6))
- **test:** prioritize .ts over .js in Vitest module resolution ([dac487a](https://github.com/devdroide/ZanobiJS/commit/dac487a233bbb0a2a62fa09a9db44040c1225a84))

### Features

- **common:** remove user logger + masker (moving to @zanobijs/logger-user) ([7df011a](https://github.com/devdroide/ZanobiJS/commit/7df011a9159610369c2002ead784789f068f7aad))
- **commons,test:** :sparkles: cache getConstructorParamNames per class ([4ac5ea3](https://github.com/devdroide/ZanobiJS/commit/4ac5ea376a046f8838e6136f9c33254767c99f05))
- **core,common:** :sparkles: add awilix strict mode and request lifetime ([ef2f633](https://github.com/devdroide/ZanobiJS/commit/ef2f633a3bbabb587cf929ce50a9ea4eecd9bd6c))
- **core,test:** :sparkles: memoize module traversal, detect import cycles ([3c9f9b0](https://github.com/devdroide/ZanobiJS/commit/3c9f9b07e32d81e96e302eedd8191190fbf0bdd8))

### Performance Improvements

- **build:** :zap: dual CJS/ESM build via Rollup (PERF-05) ([6398b2d](https://github.com/devdroide/ZanobiJS/commit/6398b2d402858dbcd58b4f40edb289ccc16f4e8a))

### BREAKING CHANGES

- **common:** LoggerUser, ILoggerUserService, ABSPattern, IPattern,
  TPattern/TPatternByKey/TPatternBySchema/TConfigSchemaMasker, TClass
  and PatternException are no longer exported from @zanobijs/common.
  This functionality is moving to a new package, @zanobijs/logger-user
  (not yet published). The system logger (Logger(), ILoggerService)
  is unaffected.

  ABSBaseLoggerService is now a public export (new subpath
  @zanobijs/common/services/base.logger.service) so the new package
  can extend it from outside the monorepo. IOptionsLog split: base
  interface keeps only withColor/maxDepth, masker-specific fields
  (activeMasker, configSchemaMasker, maxStringLength) move to the new
  package's own IOptionsLogUser.

  Also removed: MSG_PATTERN_EXIST/MSG_SCHEMA_PATTERN_EXIST,
  isObjectString/isArrayString, PatternException — dead code left over
  once the masker was removed, no remaining references anywhere.

# [1.2.0-beta.2](https://github.com/devdroide/ZanobiJS/compare/v1.2.0-beta.1...v1.2.0-beta.2) (2025-06-08)

### Bug Fixes

- **core,test:** The injection of provider asValue and asFunction that is done in entities was corrected ([83ae3c1](https://github.com/devdroide/ZanobiJS/commit/83ae3c164b28cdc9747c524b8595a1b86257a957))

# [1.2.0-beta.1](https://github.com/devdroide/ZanobiJS/compare/v1.2.0-beta.0...v1.2.0-beta.1) (2025-06-05)

### Bug Fixes

- **core,test:** Change in provider scanning and dependency search ([cd0858b](https://github.com/devdroide/ZanobiJS/commit/cd0858b1437c4470003f574baa34bc7a4f3db817))

# [1.2.0-beta.0](https://github.com/devdroide/ZanobiJS/compare/v1.1.1-beta.0...v1.2.0-beta.0) (2025-05-28)

### Features

- **core,test:** Added the ability to use useClass and useFactory as providers ([bff63e2](https://github.com/devdroide/ZanobiJS/commit/bff63e2d73fa03ef72f38b3c7c6f5a51ad9ddf80))
- **core,test:** Added type validation to prevent errors in providers with useClass ([6e64d3b](https://github.com/devdroide/ZanobiJS/commit/6e64d3b6a46965ad9affa697980b6862b1ae8be0))
- **core:** ✨ new provider with useClass ([668d981](https://github.com/devdroide/ZanobiJS/commit/668d981890e2a43f615ae8f78f025e3c33db9707))

## [1.1.1-beta.0](https://github.com/devdroide/ZanobiJS/compare/v1.1.0...v1.1.1-beta.0) (2025-05-27)

**Note:** Version bump only for package root

# [1.1.0](https://github.com/devdroide/ZanobiJS/compare/v1.1.0-beta.74...v1.1.0) (2025-05-27)

**Note:** Version bump only for package root

# [1.1.0-beta.74](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.74) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.73](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.73) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.72](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.72) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.71](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.71) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.70](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.70) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.69](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.69) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.68](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.68) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.67](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.67) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.66](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.66) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.65](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.65) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.64](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.64) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.63](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.63) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.62](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.62) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.61](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.61) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.60](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.60) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.59](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.59) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.58](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.58) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.57](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.57) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.56](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.56) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.55](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.55) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.54](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.54) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.53](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.53) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.52](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.52) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.51](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.51) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.50](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.50) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.49](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.49) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.48](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.48) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.47](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.47) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.46](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.46) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.45](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.45) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.44](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.44) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.43](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.43) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.42](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.42) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.41](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.41) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.40](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.40) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.39](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.39) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.38](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.38) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.37](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.37) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.36](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.36) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.35](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.35) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.34](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.34) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.33](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.33) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.32](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.32) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.31](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.31) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.30](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.30) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.29](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.29) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.28](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.28) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.27](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.27) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.26](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.26) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.25](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.25) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.24](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.24) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.23](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.23) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.22](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.22) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.21](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.21) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.20](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.20) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.19](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.19) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.18](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.18) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.17](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.17) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.16](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.16) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.15](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.15) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.14](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.14) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.13](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.13) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.12](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.12) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.11](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.11) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.10](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.10) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.9](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.9) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.8](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.8) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.7](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.7) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.6](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.6) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.5](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.5) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.4](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.4) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.3](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.3) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.2](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.2) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.1](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.1) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))

# [1.1.0-beta.0](https://github.com/devdroide/ZanobiJS/compare/v1.0.2...v1.1.0-beta.0) (2025-05-04)

### Features

- **commons:** :sparkles: masker log was added ([8e26512](https://github.com/devdroide/ZanobiJS/commit/8e2651280bda205d3babb0970707df18a8af5f99))
