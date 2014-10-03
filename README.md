# [Suitstrap](http://suitstrap.maartenvanhoof.be)

A [Bootstrap](http://suitstrap.maartenvanhoof.be) clone aiming for a more modular and semantic framework.


It's a combination of:
- **[Bootstrap](getbootstrap.com)**: A sleek, intuitive, and powerful front-end framework for faster and easier web development, created by [Mark Otto](https://twitter.com/mdo) and [Jacob Thornton](https://twitter.com/fat), and maintained by the [core team](https://github.com/twbs?tab=members) with the massive support and involvement of the community.
- **[SUIT](https://github.com/suitcss/suit/blob/master/doc/README.md) principles**:
- **[SMACCS](http://smacss.com/) principles**
- **[Sass](http://sass-lang.com)** instead of the default LESS of Bootstrap

To get started, check out <http://suitstrap.maartenvanhoof.be>!

## Table of contents

- [Quick start](#quick-start)
- [Bugs and feature requests](#bugs-and-feature-requests)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [Community](#community)
- [Versioning](#versioning)
- [Creators](#creators)
- [Copyright and license](#copyright-and-license)

## Quick start

Three quick start options are available:

- [Download the latest release](https://github.com/vanhoofmaarten/suitstrap/archive/v3.2.0.zip).
- Clone the repo: `git clone https://github.com/vanhoofmaarten/suitstrap.git`.
- Install with [Bower](http://bower.io): `bower install suitstrap`.

Read the [Getting started page](http://suitstrap.maartenvanhoof.be/getting-started/) for information on the framework contents, templates and examples, and more.

### What's included

Within the download you'll find the following directories and files, logically grouping common assets and providing both compiled and minified variations. You'll see something like this:

```
suitstrap/
├── css/
│   ├── suitstrap.css
│   ├── suitstrap.min.css
│   ├── suitstrap-theme.css
│   └── suitstrap-theme.min.css
├── js/
│   ├── suitstrap.js
│   └── suitstrap.min.js
└── fonts/
    ├── glyphicons-halflings-regular.eot
    ├── glyphicons-halflings-regular.svg
    ├── glyphicons-halflings-regular.ttf
    └── glyphicons-halflings-regular.woff
```

We provide compiled CSS and JS (`suitstrap.*`), as well as compiled and minified CSS and JS (`suitstrap.min.*`). Fonts from Glyphicons are included, as is the optional Suitstrap theme.



## Bugs and feature requests

Have a bug or a feature request? Please first read the [issue guidelines](https://github.com/vanhoofmaarten/suitstrap/blob/master/CONTRIBUTING.md#using-the-issue-tracker) and search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://github.com/vanhoofmaarten/suitstrap/issues/new).


## Documentation

Suitstrap's documentation, included in this repo in the root directory, is built with [Jekyll](http://jekyllrb.com) and publicly hosted on GitHub Pages at <http://suitstrap.maartenvanhoof.be>. The docs may also be run locally.

### Running documentation locally

1. If necessary, [install Jekyll](http://jekyllrb.com/docs/installation) (requires v2.3.x).
  - **Windows users:** Read [this unofficial guide](http://jekyll-windows.juthilo.com/) to get Jekyll up and running without problems.
2. Install the Ruby-based syntax highlighter, [Rouge](https://github.com/jneen/rouge), with `gem install rouge`.
3. From the root `/suitstrap` directory, run `jekyll serve` in the command line.
4. Open <http://localhost:9001> in your browser, and voilà.

Learn more about using Jekyll by reading its [documentation](http://jekyllrb.com/docs/home/).

## Contributing

Please read through our [contributing guidelines](https://github.com/vanhoofmaarten/suitstrap/blob/master/CONTRIBUTING.md). Included are directions for opening issues, coding standards, and notes on development.

<!-- Moreover, if your pull request contains JavaScript patches or features, you must include relevant unit tests. All HTML and CSS should conform to the [Code Guide](https://github.com/mdo/code-guide), maintained by [Mark Otto](https://github.com/mdo). -->

Editor preferences are available in the [editor config](https://github.com/vanhoofmaarten/suitstrap/blob/master/.editorconfig) for easy use in common text editors. Read more and download plugins at <http://editorconfig.org>.



## Community

At this moment it's a one man, after hour job. You can always contact me via [Twitter](https://twitter.com/vanhoofmaarten)

## Versioning

For transparency into our release cycle and in striving to maintain backward compatibility, Suitstrap is maintained under [the Semantic Versioning guidelines](http://semver.org/). Sometimes we screw up, but we'll adhere to those rules whenever possible.



## Creators

**Maarten Van Hoof**

- <https://twitter.com/vanhoofmaarten>
- <https://github.com/vanhoofmaarten>


## Copyright and license

Code and documentation copyright 2013-2014 Maarten Van Hoof. Code released under [the MIT license](LICENSE). Docs released under [Creative Commons](docs/LICENSE).
