<?php
/**
 * Theme Hooks Class
 *
 * @package WordPress
 * @subpackage Bootflow
 * @since 1.1
 */

namespace BOOTFLOW\CLASSES;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Class for theme hooks
 */
class Theme_Hooks {


	/**
	 * Constructor
	 */
	public function __construct() {

		add_action( 'wp_head', array( $this, 'print_something_in_head' ) );

	}

	/**
	 * Prints in Head
	 */
	public function print_something_in_head() {

	}

}
