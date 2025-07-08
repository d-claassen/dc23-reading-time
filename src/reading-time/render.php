<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>
<p <?php echo get_block_wrapper_attributes(); ?>>
	<?php 
    $minutes = 11;
    esc_html_e(
        sprintf(
            _n( 'Estimated reading time: %n minute', 'Estimated reading time: %n minutes', $minutes, 'reading-time' ),
            $minutes
        )
    );
    ?>
</p>
