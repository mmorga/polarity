# Polarity: Builds Polarity Diagrams from a YAML file.

![alt text](https://github.com/mmorga/polarity/raw/master/examples/polarity-coding-test.png "Example Polarity Diagram")

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

## Why did I do this

Ok, I see what you are thinking. You are thinking that your humble friend has finally crossed the line. Finally slipped free of the tenuous final strands of sanity and leapt headlong into the freeing abyss of madness. But no! They all said I was crazy! They all…

Where was I?

Oh – ok well I built a tool to build polarity diagrams as seen on http://polaritymanagement.com/

Why in the “wide, wide world of sports” would I do this?

Well a few reasons:

1. The diagram looked like an interesting challenge from an HTML/CSS perspective (it was – and there’s probably a better way to do it – maybe flexbox).
2. I wanted to see how the node grunt tool compared to Ruby’s rake since grunt is what a project at work uses.
3. I wanted to see how well I could use SVG and CSS to set the backgrounds of HTML elements.
4. I wanted to expand how I’d use SVG in data urls in embedded CSS.
5. I wanted to see how the Jade (NodeJs Templating) works compared to HAML or other Ruby implementations.

## Conclusions

* Grunt is a decent tool – I think Rake is a cleaner tool for this sort of thing
* SVG works well for backgrounds – the key is the top level SVG needs to have:
    * width & height attributes set to 100%
    * A viewBox attribute set to the size of the image
    * A preserveAspectRatio attribute set to “none”
* Compressing SVG into CSS data URLs works fine – Compass includes a helper that makes this super-easy
* Jade is a reasonable templating solution
* Grunt isn’t a very good solution overall for this because the solution (Grunt) requires two Ruby libraries (Compass and Sass) - it would reduce dependencies to use a pure Ruby solution.
