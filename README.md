# unpmchart

particle chart

# usage

The data is generated by [npmrank](https://github.com/anvaka/npmrank).

```
# package distribution by name
node collect.js abc
# package distribution by author name
node collect.js author

# package distribution by count of regular dependencies
node collect.js deps-count

# package distribution by count of dev dependencies
node collect.js dev-deps-count

# package distribution by license name
node collect.js license

# package distribution by test, mocha detected
node collect.js test-clean

# package distribution by test, no detection
node collect.js test
```


# license

MIT
