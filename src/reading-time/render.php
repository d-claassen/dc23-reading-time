<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$minutes = YoastSEO()->meta->for_current_page()->estimated_reading_time_minutes;
$prefix = $attributes['prefix'] ?? '';
?>

<p <?php echo get_block_wrapper_attributes(); ?>>
	<?php if ( ! empty( $prefix ) ) : ?>
		<span class="reading-time-prefix"><?php echo esc_html( $prefix ); ?></span>
		<?php echo ' '; ?>
		<?php echo esc_html( $minutes ); ?>
		<?php echo ' '; ?>
		<?php echo esc_html( $minutes === 1 ? __( 'minute', 'reading-time' ) : __( 'minutes', 'reading-time' ) ); ?>
	<?php else : ?>
		<?php echo esc_html(
			sprintf(
				_n( 'Estimated reading time: %d minute', 'Estimated reading time: %d minutes', $minutes, 'reading-time' ),
				$minutes
			)
		); ?>
	<?php endif; ?>
</p>