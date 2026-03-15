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
    eleventyConfig.addLayoutAlias("post", "post.njk");

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

    const sections = ['blog', 'cpl', 'til', 'glossary', 'questions'];

    sections.forEach(section => {
        // Generate tag collection for each section
        eleventyConfig.addCollection(`${section}Tags`, function (collectionApi) {
            const posts = collectionApi.getFilteredByGlob(`src/${section}/posts/*.md`);
            const tagsMap = new Map();

            posts.forEach(post => {
                const postTags = post.data.tags || [];
                postTags.forEach(tag => {
                    if (!tagsMap.has(tag)) {
                        tagsMap.set(tag, []);
                    }
                    tagsMap.get(tag).push(post);
                });
            });

            // Convert to array and sort alphabetically
            return Array.from(tagsMap.entries())
                .map(([tag, posts]) => ({
                    tag,
                    posts,
                    count: posts.length,
                    section // Include section for context
                }))
                .sort((a, b) => a.tag.localeCompare(b.tag));
        });
    });

    eleventyConfig.addCollection("allTagsWithSections", function (collectionApi) {
        const allPosts = [];
        sections.forEach(section => {
            const sectionPosts = collectionApi.getFilteredByGlob(`src/${section}/posts/*.md`);
            allPosts.push(...sectionPosts);
        });

        const tagsMap = new Map();

        allPosts.forEach(post => {
            const postTags = post.data.tags || [];
            const section = post.data.section || extractSectionFromPath(post.inputPath);

            postTags.forEach(tag => {
                const key = `${section}:${tag}`; // Unique key per section+tag
                if (!tagsMap.has(key)) {
                    tagsMap.set(key, {
                        tag,
                        section,
                        posts: [],
                        count: 0
                    });
                }
                tagsMap.get(key).posts.push(post);
                tagsMap.get(key).count++;
            });
        });

        return Array.from(tagsMap.values())
            .sort((a, b) => a.section.localeCompare(b.section) || a.tag.localeCompare(b.tag));
    });

    function extractSectionFromPath(filePath) {
        const match = filePath.match(/src\/([^\/]+)\//);
        return match ? match[1] : 'unknown';
    }

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
        if (!dateObj) return "";
        return dateObj.toISOString().split('T')[0];
    });

    eleventyConfig.addFilter("excerpt", (content, limit = 200) => {
        if (!content) return "";

        const text = content.replace(/<[^>]*>/g, ' ');

        const cleanText = text.replace(/\s+/g, ' ').trim();

        if (cleanText.length > limit) {
            return cleanText.substring(0, limit).trim() + '...';
        }
        return cleanText;
    });

    eleventyConfig.addFilter("newestFirst", (arr) => {
        if (!arr || !Array.isArray(arr)) return [];
        return [...arr].sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });
    });

    // ============ NEW: TAG-SPECIFIC FILTERS ============
    eleventyConfig.addFilter("filterByTag", (posts, tag) => {
        if (!posts || !tag) return [];
        return posts.filter(post => post.data.tags && post.data.tags.includes(tag));
    });

    eleventyConfig.addFilter("getTagsForSection", (collection, section) => {
        // This will use the pre-generated section tags
        return collection[`${section}Tags`] || [];
    });

    // ============ NEW: PAGINATION CONFIG FOR TAG PAGES ============
    // This doesn't add collections but makes pagination data available
    eleventyConfig.addGlobalData("sections", sections);

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