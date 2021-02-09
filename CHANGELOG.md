# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.1.3](https://github.com/tobua/logua/compare/v2.1.2...v2.1.3) (2021-02-09)


### Bug Fixes

* **console:** use warn and error logs when appropriate ([52a5549](https://github.com/tobua/logua/commit/52a5549e9e78a27b28d3e77d603b2d1e1576640b))

### [2.1.2](https://github.com/tobua/logua/compare/v2.1.1...v2.1.2) (2020-11-12)


### Bug Fixes

* **message:** prevent error if used with non-string object ([84b5308](https://github.com/tobua/logua/commit/84b5308fa8c6f67e174521b81431c945dc8a5a92))

### [2.1.1](https://github.com/tobua/logua/compare/v2.1.0...v2.1.1) (2020-09-16)


### Bug Fixes

* **import:** fix for CommonJS import of package ([7ba764f](https://github.com/tobua/logua/commit/7ba764f998b09f143c0847722aa12bf184962f13))

## [2.1.0](https://github.com/tobua/logua/compare/v2.0.1...v2.1.0) (2020-09-16)


### Features

* **group:** messages can be grouped ([9ca9f5d](https://github.com/tobua/logua/commit/9ca9f5d8a99c732a91d08ff421032b2aadadf90a))

### [2.0.1](https://github.com/tobua/logua/compare/v2.0.0...v2.0.1) (2020-09-15)

## [2.0.0](https://github.com/tobua/logua/compare/v1.0.7...v2.0.0) (2020-09-05)


### ⚠ BREAKING CHANGES

* **context:** create(name, color) method needs to be called to get the log

### Features

* **context:** use factory method to store log context ([0ed2893](https://github.com/tobua/logua/commit/0ed28933c2ca05a2481bb5ba377451acc9d6b9ec))

### [1.0.7](https://github.com/tobua/logua/compare/v1.0.6...v1.0.7) (2020-09-01)


### Bug Fixes

* **configure:** package approach won't work in all cases ([9e320a4](https://github.com/tobua/logua/commit/9e320a4512fe9ee4bab76ef0d49b83458dcc3b55))

### [1.0.6](https://github.com/tobua/logua/compare/v1.0.5...v1.0.6) (2020-09-01)


### Bug Fixes

* **package:** best way to get caller with modules and CWD option ([bd5628c](https://github.com/tobua/logua/commit/bd5628c36e75a87e44b478e0ca3f4d6a750d8bd6))

### [1.0.5](https://github.com/tobua/logua/compare/v1.0.4...v1.0.5) (2020-08-31)


### Bug Fixes

* **init:** use CWD by default and go back when init configured ([03a9454](https://github.com/tobua/logua/commit/03a94540097b7a6437dd72c66aaebf53052acd92))
* **types:** manual fix as typescript support still missing ([d8d40fb](https://github.com/tobua/logua/commit/d8d40fb67e771dc9932b8a70c1bf7c206d8ecf0e))

### [1.0.4](https://github.com/tobua/logua/compare/v1.0.3...v1.0.4) (2020-08-30)


### Bug Fixes

* **package:** properties accidentally changed on update ([78c530a](https://github.com/tobua/logua/commit/78c530a185e4ec3ecf30ab6e33ab8f44489eb2fc))

### [1.0.3](https://github.com/tobua/logua/compare/v1.0.2...v1.0.3) (2020-08-30)

### [1.0.2](https://github.com/tobua/logua/compare/v1.0.1...v1.0.2) (2020-08-30)


### Bug Fixes

* **color:** orange not available as shortcut ([904ddca](https://github.com/tobua/logua/commit/904ddcad458eb1a49a64c49270440c1d5f088871))

### [1.0.1](https://github.com/tobua/logua/compare/v1.0.0...v1.0.1) (2020-08-25)


### Bug Fixes

* **process:** get directory of executing package ([8fdbcc5](https://github.com/tobua/logua/commit/8fdbcc594ad0fd3fd5776bdc2882219863c75b7c))

## 1.0.0 (2020-08-25)


### Features

* **general:** create separate package for logging ([69f9b4e](https://github.com/tobua/logua/commit/69f9b4ea3035771e6c185f540ea772a96434aa28))
