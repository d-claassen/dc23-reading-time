<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>
<p <?php echo get_block_wrapper_attributes(); ?>>
	<?php 
    $minutes = YoastSEO()->meta->for_current_page()->estimated_reading_time_minutes;
    echo esc_html(
        sprintf(
            _n( 'Estimated reading time: %d minute', 'Estimated reading time: %d minutes', $minutes, 'reading-time' ),
            $minutes
        )
    );
    ?>
</p>
