const BASE_URL = 'https://jsonplaceholder.typicode.com/posts'

export async function getAllPosts() {
    const res = await fetch(`${BASE_URL}?_limit=10`);

    if (!res.ok) {
        throw new Error('Failed to get posts');
    }

    return await res.json()
}

export async function getPostById(id) {
    try {
        const res = await fetch(`${BASE_URL}/${id}`);

        if (!res.ok) {
            throw new Error('Failed to get post');
        }

        return await res.json()
    } catch (err) {
        console.error(err.message);
    }
}