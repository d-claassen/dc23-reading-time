<?php

/**
 * DC23 Reading Time plugin.
 *
 * @author Dennis Claassen
 *
 * @wordpress-plugin
 * Plugin Name: DC23 Reading Time
 * Version: 0.2.2
 * Description: Add more features related to reading time in your WordPress website.
 * Requires at least: 6.2
 * Requires PHP: 8.1
 * Requires Plugins: wordpress-seo
 * Author: Dennis Claassen
 * Author URI: https://www.dennisclaassen.nl/
 * GitHub Plugin URI: https://github.com/d-claassen/dc23-reading-time
 * Primary Branch: main
 * Release Asset: true
 */

declare( strict_types=1 );

require_once 'vendor/autoload.php';

if ( ! function_exists( 'dc23_reading_time_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which runs
	 * before the init hook.
	 */
	function dc23_reading_time_setup(): void {
        register_block_type( __DIR__ . '/build/reading-time' );

		( new \DC23\ReadingTime\Schema_Integration() )->register();
	}
endif;
add_action( 'init', 'dc23_reading_time_setup' );
