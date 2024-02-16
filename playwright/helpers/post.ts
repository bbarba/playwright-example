import { Page } from "@playwright/test";

/**
 * @typedef {Object} PostOptions
 * @property {string} [title=''] The title of the post.
 * @property {string} [author=''] The author of the post.
 * @property {string} [content=''] The content of the post.
 */
interface postOptions {
    title?: string, 
    author?: string,
    content?: string
};

/**
 * This class is used to faciliate any action with a post
 */
export class Post {
    readonly page: Page;

    constructor(args) {
        this.page = args.page;
    }

    /**
     * Creates a new post with the given title, author, and content.
     * @param {PostOptions} [options={}] - The options for creating a post.
     * @returns {Promise<void>}
     */
    async createPost({title = '', author = '', content = ''}: postOptions = {}): Promise<void> {
        await this.page.locator('#postTitle').fill(title);
        await this.page.locator('#postAuthor').selectOption(author);
        await this.page.locator('#postContent').fill(content);
        await this.page.getByRole('button', { name: 'Save Post' }).click();
    }

    /**
     * Retrieves a list of posts from the page.
     * @returns {Promise<any[]>} A promise that resolves to an array of post details.
     */
    async getPosts(): Promise<any[]> {
        return this.page.$$eval('section.posts-list .post-excerpt', (elements) => elements.map(el => {
            return {
                title: el.querySelector('h3')?.innerText,
                author: el.querySelector('span:nth-child(1)')?.textContent,
                content: el.querySelector('p')?.textContent
            };
        }));
    }

    /**
     * Opens a post specified by the post object passed through.
     * @param {PostOptions} post - The options of the post to open.
     * @returns {Promise<void>}
     */
    async openPost(post: postOptions): Promise<void> {
        const postIndex = (await this.getPosts()).findIndex((post1) => post1.title === post.title);
        await this.page.click(`section.posts-list > article:nth-child(${postIndex + 2}) a`);
    }
    
    /**
     * Clicks the edit button on the post.
     * @returns {Promise<void>}
     */
    async clickEditPost(): Promise<void> {
        await this.page.locator('article > a').click();
    }

    /**
     * Edits the post's title and content.
     * @param {PostOptions} [options={}] - The options for editing a post.
     * @returns {Promise<void>}
     */
    async editPost({title = '', content = ''}: postOptions = {}): Promise<void> {
        await this.page.locator('#postTitle').fill(title);
        await this.page.locator('#postContent').fill(content);
        await this.page.getByRole('button', { name: 'Save Post' }).click();
    }
}