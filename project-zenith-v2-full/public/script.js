
const container = document.getElementById('blog-container');
const singleView = document.getElementById('single-view');
const form = document.getElementById('post-form');

async function loadPosts() {
  const res = await fetch('/api/posts');
  const posts = await res.json();

  container.innerHTML = posts.map(post => `
    <div class="post-card">
      <h2 onclick="viewPost('${post._id}')">${post.title}</h2>
      <p><strong>${post.category}</strong></p>
      <button onclick="editPost('${post._id}')">Edit</button>
      <button onclick="deletePost('${post._id}')">Delete</button>
    </div>
  `).join('');
}

async function viewPost(id) {
  const res = await fetch('/api/posts/' + id);
  const post = await res.json();

  singleView.classList.remove('hidden');
  singleView.innerHTML = `
    <h2>${post.title}</h2>
    <p><strong>Category:</strong> ${post.category}</p>
    <p>${post.content}</p>
    <button onclick="closeView()">Close</button>
  `;
}

function closeView() {
  singleView.classList.add('hidden');
}

async function editPost(id) {
  const res = await fetch('/api/posts/' + id);
  const post = await res.json();

  document.getElementById('post-id').value = post._id;
  document.getElementById('title').value = post.title;
  document.getElementById('category').value = post.category;
  document.getElementById('author').value = post.author;
  document.getElementById('content').value = post.content;
}

async function deletePost(id) {
  await fetch('/api/posts/' + id, { method: 'DELETE' });
  loadPosts();
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = document.getElementById('post-id').value;
  const data = {
    title: title.value,
    category: category.value,
    author: author.value,
    content: content.value
  };

  if (id) {
    await fetch('/api/posts/' + id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } else {
    await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  }

  form.reset();
  document.getElementById('post-id').value = '';
  loadPosts();
});

document.getElementById('theme-toggle')
  .addEventListener('click', () => {
    document.body.classList.toggle('light');
  });

window.onload = loadPosts;
