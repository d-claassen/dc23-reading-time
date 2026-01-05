/**
 * WordPress dependencies
 */
const { test, expect } = require( '@wordpress/e2e-test-utils-playwright' );

const SHORT_STORY = `
Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live 
the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large 
language ocean.
`;

const LONG_STORY = `
    Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live 
the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large 
language ocean. A small river named Duden flows by their place and supplies it with the necessary
regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.
Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic
life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for
the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands
of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t
listen. She packed her seven versalia, put her initial into the belt and made herself on the
way. When she reached the first hills of the Italic Mountains, she had a last view back on
the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline
of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then she
continued her way. On her way she met a copy. The copy warned the Little Blind Text, that
where it came from it would have been rewritten a thousand times and everything that was left
from its origin would be the word "and".
`;

test.describe('Reading time block', () => {
    test('can be inserted and defaults', async ({ admin, editor }) => {
      await admin.createNewPost({
        title: "Test Post",
      });

    	// Insert the reading time block
    	await editor.insertBlock({ name: 'dc23-reading-time/reading-time' });

    	// Check that the block was inserted
    	const block = editor.canvas.locator('[data-type="dc23-reading-time/reading-time"]');
    	await expect(block).toContainText('Estimated reading time: 0 minutes' );
    });

    test('can be inserted and updates', async ({ admin, editor }) => {
      await admin.createNewPost({
        title: "Test Post",
        content: LONG_STORY,
      });

      // Insert the reading time block
    	await editor.insertBlock({ name: 'dc23-reading-time/reading-time' });

      // Check that the block was inserted
    	const block = editor.canvas.locator('[data-type="dc23-reading-time/reading-time"]');
    	await expect(block).toContainText('Estimated reading time: 2 minutes' );
    });

    test('it saves and displays correctly on frontend', async ({ admin, context, editor, page }) => {
      await admin.createNewPost({
        title: "Test Post",
        content: SHORT_STORY,
      });

      // Insert the reading time block
      await editor.insertBlock({ name: 'dc23-reading-time/reading-time' });
      // Wait for the reading time to be calculated.
      const block = editor.canvas.locator('[data-type="dc23-reading-time/reading-time"]');
      await expect(block).toContainText('Estimated reading time: 1 minute' );

      // Save the post
      await editor.publishPost();

const pagePromise = context.waitForEvent('page');
      await page.getByText('View Post').first().click();
const newPage = await pagePromise;
      const body = await newPage.textContent('body');
      expect(body).toContain('Estimated reading time: 2 minutes');
      await expect(newPage.locator('body')).toContainText('Estimated reading time: 1 minute');
    });

    test('custom prefix', async ({ admin, editor, page }) => {
      await admin.createNewPost({
        title: "Test Post",
        content: SHORT_STORY,
      });

      // Insert the reading time block
      await editor.insertBlock({ name: 'dc23-reading-time/reading-time' });
      // Wait for the reading time to be calculated.
      const block = editor.canvas.locator('[data-type="dc23-reading-time/reading-time"]');
      await expect(block).toContainText('Estimated reading time: 1 minute' );
      // Change the prefix
      const prefixField = block.locator('.reading-time-prefix');
      prefixField.fill('Time to read:');
      await expect(block).toContainText('Time to read: 1 minute' );
    
      // Save the post
      await editor.publishPost();
      await page.getByText('View Post').first().click();

      const body = await page.textContent('body');
      expect(body).toContain('Time to read: 1 minute');
      await expect(page.locator('body')).toContainText('Time to read: 1 minute');
    });

    test('it saves with initial reading time when skipping editor', async ({ page, requestUtils }) => {
      const { id: postId } = await requestUtils.createPost({
        title: 'Event Test Post',
        content: '<!-- wp:dc23-reading-time/reading-time /-->'
            + '<!-- wp:paragraph -->'
            + `<p>${ LONG_STORY }</p>`
            + '<!-- /wp:paragraph -->',
        status: 'publish',
      });

      await page.goto(`/index.php?p=${postId}`);
      const body = await page.textContent('body');
      expect(body).toContain('Estimated reading time: 1 minute');
    });
    
    test(
        'defaults in site editor',
        async ( { page, editor, admin, requestUtils } ) => {
            const newPost = await requestUtils.createPost( {
                title: 'Test Post',
                status: 'publish',
            } );
            
            await admin.visitSiteEditor( {
                postId: newPost.id,
                postType: 'post',
                canvas: 'edit',
            } );

            await editor.insertBlock({ name: 'dc23-reading-time/reading-time' });
        
            await expect(editor.canvas.locator('body')).not.toContainText('This block has encountered an error');
            await expect(editor.canvas.locator('body')).toContainText('Estimated reading time: 42 minutes');
        }
    );
});
