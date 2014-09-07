# Contributing to Suitstrap

Looking to contribute something to Suitstrap? **Here's how you can help.**



## Reporting issues

We only accept issues that are bug reports or feature requests. Bugs must be isolated and reproducible problems that we can fix within the Bootstrap core. Please read the following guidelines before opening any issue.

1. **Search for existing issues.** We get a lot of duplicate issues, and you'd help us out a lot by first checking if someone else has reported the same issue. Moreover, the issue may have already been resolved with a fix available.
2. **Create an isolated and reproducible test case.** Be sure the problem exists in Bootstrap's code with a [reduced test case](http://css-tricks.com/reduced-test-cases/) that should be included in each bug report.
3. **Include a live example.** Make use of jsFiddle, jsBin or Codepen to share your isolated test cases.
4. **Share as much information as possible.** Include operating system and version, browser and version, version of Suitstrap, customized or vanilla build, etc. where appropriate. Also include steps to reproduce the bug.



## Pull requests

- CSS changes must be done in `.scss` files first, never just the compiled `.css` files
- If modifying the `.scss` files, always recompile and commit the compiled files `suitstrap.css` and `suitstrap.min.css`
- Try not to pollute your pull request with unintended changes--keep them simple and small
- Try to share which browsers your code has been tested in before submitting a pull request
- Pull requests should always be against the `master` branch, never against `gh-pages`.



## Coding standards

### HTML

- ALWAYS tabs for indentation
- Double quotes only, never single quotes
- Always use proper indentation
- Use tags and elements appropriate for an HTML5 doctype (e.g., self-closing tags)

### CSS

- Adhere to the [SUIT CSS documentation](https://github.com/suitcss/suit/blob/master/doc/README.md)
- Multiple-line approach (one property and value per line)
- Always a space after a property's colon (.e.g, `display: block;` and not `display:block;`)
- End all lines with a semi-colon
- For multiple, comma-separated selectors, place each selector on its own line
- Attribute selectors, like `input[type="text"]` should always wrap the attribute's value in double quotes, for consistency and safety (see this [blog post on unquoted attribute values](http://mathiasbynens.be/notes/unquoted-attribute-values) that can lead to XSS attacks).

### JS

- No semicolons
- Comma first
- Tabs
- strict mode
- "Attractive"



## License

By contributing your code, you agree to license your contribution under the terms of the APLv2: https://github.com/twbs/suitstrap/blob/master/LICENSE
