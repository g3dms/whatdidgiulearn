---
title: "Moving from Jekyll to 11ty"
date: 2026-03-16
tags: ['static-sites', 'jekyll', '11ty', 'thoughts']
section: blog 
layout: post
---
(WIP...)

## Starting off with Jekyll
When I first started using static site generators, I used Jekyll. While it was my first time even using static site generators in the first place, I quickly learned how to compose Jekyll layouts and its automatic conversion from markdown files to html. I was actually first inspired to use Jekyll from another webmaster, melankorin, when they mentioned Jekyll in their blog. They assembled their website using Jekyll, and I was interested in finding out what it was. However, they've moved to Eleventy (11ty), and like a puppy on a leash, I decided to learn it too (through this site!).

## Major differences
First of all, 11ty was extremely intimidating when I realised that you had to do configuration yourself with Javascript. Now, I learned a bit in high school, but I did not really put it to good use. Thankfully, reading the documentation made everything easier, since, well... I pretty much copied the configuration options. With Jekyll, almost all the configuration was already done for you, it was all in a pretty neat `.yaml` file.

Next up was when I saw 11ty's extensive file options. Now, in Jekyll, all you could pretty much rely on was markdown and liquid. For 11ty, there was liquid, nunjucks (which I'm using now)...

Furthermore, they were not lying when they said 11ty was faster. With Jekyll, I had to basically refresh the page for all the changes I've made, but 11ty automatically refreshes the page with updates once you've saved your file. It's also faster when you run the files in the first place. While speed is not really a gamechanger, if you spend a lot of time building a site, it's good to have a a faster alternative.

