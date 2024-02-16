import { test, expect } from '@playwright/test';
import { Helpers } from '../helpers';
import posts from '../data/posts.json';

// We can parametrize tests by running off a json file containining the inputs
Object.entries(posts).forEach(([index, post]) => {
  test(`can successfully create a post - ${index}`, async ({ page }) => {
    const postHelper = new Helpers.Post({page});
  
    await page.goto('/');
    await postHelper.createPost(post);
  
    // Using a specific wait here to illustrate how the app needs to indicate a change on the page.
    // This can also be a POST request that we can wait on with waitOnRequest()
    await page.waitForSelector(`h3:has-text("${post.title}")`);

    let currentPosts = await postHelper.getPosts();
    expect(currentPosts).toContainEqual({...post, author: 'by Shad Kihn'});
  });

  // Disabled as the app does not persist posts on reload
  /*
  test(`can successfully open a post - ${index}`, async ({ page }) => {
    const postHelper = new Helpers.Post({page});
  
    await page.goto('/');
    await postHelper.openPost(post);
  });
  */
});

test('can successfully edit a post', async ({ page }) => {
  const postHelper = new Helpers.Post({page});

  await page.goto('/');
  await postHelper.createPost(posts.goodPost);
  await page.waitForSelector(`h3:has-text("${posts.goodPost.title}")`);
  await postHelper.openPost(posts.goodPost);
  await postHelper.clickEditPost();
  await postHelper.editPost({
    title: 'different title',
    content: 'different content'
  });
  expect(await page.locator('h2').textContent()).toEqual('different title');
  expect(await page.locator('p').textContent()).toEqual('different content');
});