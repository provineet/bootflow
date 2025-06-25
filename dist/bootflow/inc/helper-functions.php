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
 * @param mix  $var varibale to dump.
 * @param bool $die if die.
 */
function dd( $var, $die = false ) {
	echo '<pre>';
	var_dump( $var );
	echo '</pre>';

	( true === $die ) && die();

}
