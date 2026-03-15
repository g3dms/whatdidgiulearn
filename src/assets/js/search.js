document.getElementById('search-input').addEventListener('input', function(e) {
    const term = e.target.value.toLowerCase();
    const posts = document.querySelectorAll('.searchable-post');
    
    posts.forEach(post => {
        const title = post.querySelector('.post-title').textContent.toLowerCase();
        const content = post.querySelector('.post-excerpt').textContent.toLowerCase();
        const tags = post.dataset.tags?.toLowerCase() || '';
        
        if (title.includes(term) || content.includes(term) || tags.includes(term)) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
});