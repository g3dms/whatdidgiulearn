const htmlmin = require("html-minifier-terser");
const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");



module.exports.config = {
  dir: {
    // These are both relative to your input directory!
    includes: "_includes",
    layouts: "_layouts",
    output: "_site"
  }
};

module.exports = function (eleventyConfig) {
	eleventyConfig.addTransform("htmlmin", function (content) {
		// String conversion to handle `permalink: false`
		if ((this.page.outputPath || "").endsWith(".html")) {
			let minified = htmlmin.minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true,
			});

			return minified;
		}

		// If not an HTML output, return content as-is
		return content;
	});
};

// HTML transform
module.exports = function (eleventyConfig) {
	eleventyConfig.addPlugin(eleventyImageTransformPlugin);
};

// Layout aliasing
module.exports = function(eleventyConfig) {
	eleventyConfig.addLayoutAlias("post", "layouts/post.njk");
};