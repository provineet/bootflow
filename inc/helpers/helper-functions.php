<?php
/**
 * Bootflow Helper Functions
 *
 * @package WordPress
 * @subpackage Bootflow
 *
 * @since 1.1
 */

/**
 * Dump & Die
 *
 * @param mix  $dump_var variable to dump.
 * @param bool $terminate if terminate.
 */
function dd( $dump_var, $terminate = false ) {
	echo '<pre>';
	// phpcs:ignore
	var_dump( $dump_var );
	echo '</pre>';

	( true === $terminate ) && die();
}
