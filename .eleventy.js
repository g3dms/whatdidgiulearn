const htmlmin = require("html-minifier-terser");
const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
    // HTML minification transform
    eleventyConfig.addTransform("htmlmin", function (content) {
        if ((this.page.outputPath || "").endsWith(".html")) {
            return htmlmin.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true,
            });
        }
        return content;
    });

    // Image transform plugin
    eleventyConfig.addPlugin(eleventyImageTransformPlugin);

    // Layout aliasing
    eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

    eleventyConfig.addWatchTarget("/src/assets/styles/index.css");


    eleventyConfig.addCollection("blog", function (collectionApi) {
        return collectionApi.getFilteredByGlob("src/blog/posts/*.md");
    });
    eleventyConfig.addCollection("cpl", function (collectionApi) {
        return collectionApi.getFilteredByGlob("src/cpl/posts/*.md");
    });
    eleventyConfig.addCollection("til", function (collectionApi) {
        return collectionApi.getFilteredByGlob("src/til/posts/*.md");
    });
    eleventyConfig.addCollection("glossary", function (collectionApi) {
        return collectionApi.getFilteredByGlob("src/glossary/posts/*.md");
    });
    eleventyConfig.addCollection("questions", function (collectionApi) {
        return collectionApi.getFilteredByGlob("src/questions/posts/*.md");
    });

    eleventyConfig.addFilter("readableDate", (dateObj) => {
        if (!dateObj) return "";
        return dateObj.toLocaleDateString('en-us', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    });

    eleventyConfig.addFilter("getCurrentYear", () => {
        return new Date().getFullYear();
    });

    eleventyConfig.addFilter("dateIso", (dateObj) => {
        return dateObj.toISOString().split('T')[0];
    });

    eleventyConfig.addFilter("excerpt", (content) => {
        if (!content) return "";
        const excerpt = content.split('</p>')[0] + '</p>';
        return excerpt.replace(/<[^>]*>/g, '');
    });

    eleventyConfig.addFilter("newestFirst", (arr) => {
        return arr.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });
    });

    return {
        dir: {
            input: "src",
            output: "_site",
            includes: "_includes",
            layouts: "_layouts"
        },
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
    };
};