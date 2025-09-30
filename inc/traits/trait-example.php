<?php
/**
 * Example Trait
 *
 * @package WordPress
 * @subpackage Bootflow
 * @since 1.0.0
 */

namespace BOOTFLOW\TRAITS;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Provides small reusable helper behavior for classes.
 */
trait Example {
	/**
	 * Returns the trait identifier.
	 *
	 * @since 1.0.0
	 *
	 * @return string
	 */
	public function get_trait_identifier() {
		return 'bootflow/traits/example';
	}
}
