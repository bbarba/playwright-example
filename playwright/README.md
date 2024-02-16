# End-to-end testing

## Overview
This document outlines an end-to-end automated test plan for the provided blogging application.

To run automated tests: `npm install && npm run test`

## Tools
- **Playwright**: To test browser interactions.
- **CI/CD Pipeline**: CircleCI, Jenkins, etc. to run tests against latest commits.

## General Requirements
- Tests must be run on multiple browsers (Chrome, Firefox, Safari) to ensure cross-browser compatibility.
- Database should have an expected initial state prior to testing.

## Test Suites

### Posts Tab

#### Create Post
- Verify that users can create a post with text content.
- Validate input fields for text posts.
    - Special Characters
    - JS Injection for security testing
    - Character Limit
- Ensure that the newly created post is visible in the feed.
- Refresh page to ensure new post is visible.

#### View Post
- Check if loading the feed correctly displays existing posts.
- Confirm the proper arrangement of the posts.
- Check all fields for expected content.

#### React to Posts
- Validate the ability to react to a post.
- Validate the limit to reations on a post.
- Validate the user's reaction is reflected with an updated count.

#### Edit Post
- Verify that users can create a post with text content.
- Validate input fields for text posts.
    - Special Characters
    - JS Injection for security testing
    - Character Limit
- Ensure that the newly edited post is visible in the feed.
- Refresh page to ensure changes are kept.

### Users Tab

#### View Users
- Verify the tab successfully lists all the users.

#### User Profile
- Validate that clicking on an author opens their profile with relevant details.
- Check user profile details for expected posts.

### Notifications Tab

#### View Notifications
- Confirm that the tab displays a list of expected notifications.

#### Refresh Notification
- Verify "Refresh Notifications" button fetches new notifications.

## Reporting
- Playwright reports should include:
   - Test case description
   - Execution status (passed, failed, skipped)
   - Browser/environment information
   - Screenshots for failed tests
   
## Continuous Integration
- Integrate tests within a CI pipeline to ensure that they run regularly, whether on a nightly cadence or per commit.