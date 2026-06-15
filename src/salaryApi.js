const BASE_URL = 'https://687cc83d918b6422432f7281.mockapi.io/posts/salary';

export async function fetchPosts() {
	const res = await fetch(BASE_URL);
	if (!res.ok) throw new Error('Failed to fetch posts');
	return res.json();
}

export async function createPost(data) {
	const res = await fetch(BASE_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});
	if (!res.ok) throw new Error('Failed to create post');
	return res.json();
}

export async function deletePost(id) {
	const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
	if (!res.ok) throw new Error('Failed to delete post');
	return res.json();
}
