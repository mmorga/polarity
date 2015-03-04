# Polarity: Builds Polarity Diagrams from a YAML file.

## Install Dependencies

```bash
bundle install
npm install
```

## Make a diagram

Create a YAML file named `polarity.yml` in the root directory containing your polarity description. The yaml file should contain the following:

```yaml
---
title: Diagram Title
gps: Net Positive
deeperFear: Net Negative
leftPole:
  title: Left Pole
  actionSteps:
    - left action 1:
      - sub-action 1
      - sub-action 2
    - left action 2
    - left action 3
  positiveResults:
    - left positive 1
    - left positive 2
    - left positive 3
    - left positive 4
  negativeResults:
    - left negative 1
    - left negative 2
    - left negative 3
  earlyWarnings:
    - left warning 1
    - left warning 2
    - left warning 3
rightPole:
  title: Right Pole
  actionSteps:
    - right action 1
    - right action 2
    - right action 3
  positiveResults:
    - right positive 1
    - right positive 2:
      - sub positive 1
      - sub positive 2
      - sub positive 3
    - right positive 3
  negativeResults:
    - right negative 1
    - right negative 2
  earlyWarnings:
    - right warning 1
    - right warning 2
    - right warning 3
    - right warning 4
```

Check out examples in the `examples/` directory.

To generate the diagram, type `grunt` the generated diagram will be in the `dist/index.html` file. The HTML file is self-contained (all CSS and imagery is embedded in the HTML).

To specify a different YAML file, (for example, `/ideas/conflict.yml`) you'd run:

```bash
grunt default:/ideas/conflict.yml
```
