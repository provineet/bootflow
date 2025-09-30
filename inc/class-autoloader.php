<?php
/**
 * Special Class Autoloader
 *
 * @package WordPress
 * @subpackage Bootflow
 * @since 1.1
 */

namespace BOOTFLOW;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Autoloader Class
 */
class Autoloader {

	/**
	 * Holds map of the classes
	 *
	 * @var array
	 */
	private static $classes_map;

	/**
	 * Default path to the classes folder
	 *
	 * @var string
	 */
	private static $default_path;

	/**
	 * Default namespace for the classes
	 *
	 * @var string
	 */
	private static $default_namespace;

	/**
	 * Registers Special Autoloader.
	 *
	 * Register a function as `__autoload()` implementation.
	 *
	 * @param   string $default_path       path of the classes folder.
	 * @param   string $default_namespace  default namespace.
	 */
	public static function run( $default_path = '', $default_namespace = '' ) {
		if ( '' === $default_path ) {
			$default_path = BFL_PATH . '/inc/';
		}

		if ( '' === $default_namespace ) {
			$default_namespace = __NAMESPACE__;
		}

		self::$default_path      = $default_path;
		self::$default_namespace = $default_namespace;

		spl_autoload_register( array( __CLASS__, 'autoload' ) );
	}

	/**
	 * Returns the classes map.
	 *
	 * @return  array  classes map
	 */
	public static function get_classes_map() {
		if ( ! self::$classes_map ) {
			self::init_classes_map();
		}

		return self::$classes_map;
	}

	/**
	 * Initializes a classes map
	 */
	private static function init_classes_map() {
		self::$classes_map = array(
			// Your classmap entry goes here.
			// 'Theme_Setup' => 'inc/classes/theme-setup.php',.
		);
	}

	/**
	 * Loads a class file from the default path.
	 *
	 * Resolves the file path for a given class name using the classes map,
	 * or falls back to a WordPress-style file naming convention, then includes it.
	 *
	 * @since  1.6.2
	 * @access private
	 * @static
	 *
	 * @param string $namespaced_class_name Class name relative to the default namespace.
	 * @return void
	 */
	private static function load_class( $namespaced_class_name ) {

		$classes_map = self::get_classes_map();

		if ( isset( $classes_map[ $namespaced_class_name ] ) ) {
			$filename = self::$default_path . DIRECTORY_SEPARATOR . $classes_map[ $namespaced_class_name ];
		} else {
			$filename = strtolower(
				preg_replace(
					array( '/([a-z])([A-Z])/', '/_/', '/\\\/', '/^(.+)\/(.*)$/' ),
					array( '$1-$2', '-', DIRECTORY_SEPARATOR, '$1/class-$2' ),
					$namespaced_class_name
				)
			);
			$filename = self::$default_path . $filename . '.php';
		}

		if ( is_readable( $filename ) ) {
			include_once $filename;
		}
	}

	/**
	 * Load traits.
	 *
	 * For a given class name, require the class file.
	 *
	 * @since  1.0.0
	 * @access private
	 * @static
	 *
	 * @param string $trait_name Class name with namespaced path.
	 */
	private static function load_trait( $trait_name ) {

		$filename = strtolower(
			preg_replace(
				array( '/([a-z])([A-Z])/', '/_/', '/\\\/', '/^(.+)\/(.*)$/' ),
				array( '$1-$2', '-', DIRECTORY_SEPARATOR, '$1/trait-$2' ),
				$trait_name
			)
		);

		$filename = self::$default_path . $filename . '.php';

		if ( is_readable( $filename ) ) {
			include_once $filename;
		}
	}

	/**
	 * Autoloads the class
	 *
	 * For a given class, check if it exist and load it.
	 *
	 * @since  1.6.0
	 * @access private
	 * @static
	 *
	 * @param string $requested_class Class Name to be loaded.
	 */
	private static function autoload( $requested_class ) {

		// Move to the next autoloader if class doesn't belong to the default_namespace.
		if ( 0 !== strpos( $requested_class, self::$default_namespace . '\\' ) ) {
			return;
		}

		// get the relative classname.
		$class_name = preg_replace( '/^' . self::$default_namespace . '\\\/', '', $requested_class );

		if ( false !== strpos( $class_name, 'TRAITS' ) ) {
			self::load_trait( $class_name );
		} elseif ( ! class_exists( $class_name ) ) {
			self::load_class( $class_name );
		}
	}
}
