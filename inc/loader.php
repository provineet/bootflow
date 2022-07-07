<?php
/**
 * Loader Class
 *
 * @package WordPress
 * @subpackage Bootflow
 * @since 1.1
 */

namespace BOOTFLOW;

use \BOOTFLOW\Autoloader;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Loader Class
 */
class Loader {

	/**
	 * Static Instance Holder
	 *
	 * @var Loader
	 */
	public static $instance = null;

	/**
	 * Constructor
	 */
	private function __construct() {

		// registers an autoloader for classes.
		$this->register_classes_autoloader();

		// loads all the files within 0 depth of inc folder.
		$this->include_functions_files();

		// bootstraping our theme.
		$this->bootstrap_theme();

	}

	/**
	 * Instance.
	 *
	 * Singleton instance of our class
	 *
	 * @since 1.0.0
	 * @access public
	 * @static
	 *
	 * @return Loader An instance of our class.
	 */
	public static function instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Register autoloader.
	 *
	 * Loads all the classes.
	 *
	 * @since 1.0.0
	 * @access private
	 */
	private function register_classes_autoloader() {
		require_once BFL_PATH . '/inc/class-autoloader.php';
		Autoloader::run();
	}

	/**
	 * Include Functions Files
	 *
	 * Includes all the files that matches {*-functions.php} glob within inc folder
	 *
	 * @since 1.0.0
	 * @access private
	 */
	private function include_functions_files() {

		$files = glob( BFL_PATH . '/inc/*-functions.php' );
		foreach ( $files as $file ) {

			require_once $file;

		}
	}

	/**
	 * Bootraps our theme
	 *
	 * Creating instances of classes and run functions required to setup our theme
	 *
	 * @return void
	 */
	private function bootstrap_theme() {

		new \BOOTFLOW\CLASSES\Theme_Setup();

		new \BOOTFLOW\CLASSES\Theme_Hooks();

	}

	/**
	 * Clone.
	 *
	 * Disable class cloning and throw an error on object clone.
	 *
	 * @access public
	 * @since 1.0.0
	 */
	public function __clone() {
		// Cloning instances of the class is forbidden.
		_doing_it_wrong( __FUNCTION__, esc_html__( 'Something went wrong.', 'bootflow' ), '1.0.0' );
	}

	/**
	 * Wakeup.
	 *
	 * Disable unserializing of the class.
	 *
	 * @access public
	 * @since 1.0.0
	 */
	public function __wakeup() {
		// Unserializing instances of the class is forbidden.
		_doing_it_wrong( __FUNCTION__, esc_html__( 'Something went wrong.', 'bootflow' ), '1.0.0' );
	}


}
