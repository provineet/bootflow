<?php
/**
 * Theme Setup Class
 *
 * @package WordPress
 * @subpackage Bootflow
 * @since 1.1
 */

namespace BOOTFLOW\CLASSES;

use BOOTFLOW\TRAITS\Example;

/**
 * Theme setup class
 */
class Theme_Setup {

	use Example;

	/**
	 * Constructor
	 */
	public function __construct() {

		// Adds `async` and `defer` support for scripts registered or enqueued by the theme.
		if ( version_compare( $GLOBALS['wp_version'], '6.3', '<' ) ) {
			add_filter( 'script_loader_tag', array( $this, 'filter_script_loader_tag' ), 100, 2 );
		} else {
			add_filter( 'print_scripts_array', array( $this, 'migrate_legacy_strategy_script_data' ), 100 );
		}

		add_action( 'after_setup_theme', array( $this, 'theme_setup' ) );
		add_filter( 'wp_resource_hints', array( $this, 'resource_hints' ), 10, 2 );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_styles' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'gutenberg_default_style' ) );
		add_action( 'widgets_init', array( $this, 'register_sidebars' ) );
	}

	/**
	 * Theme setup
	 *
	 * @since 1.0.0
	 */
	public function theme_setup() {

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );
		add_theme_support( 'title-tag' );
		add_theme_support( 'customize-selective-refresh-widgets' );
		add_theme_support(
			'html5',
			array(
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
				'script',
				'style',
				'navigation-widgets',
			)
		);

		// Custom logo.
		$logo_width  = 120;
		$logo_height = 90;

		// If the retina setting is active, double the recommended width and height.
		if ( get_theme_mod( 'retina_logo', false ) ) {
			$logo_width  = floor( $logo_width * 2 );
			$logo_height = floor( $logo_height * 2 );
		}

		add_theme_support(
			'custom-logo',
			array(
				'height'      => $logo_height,
				'width'       => $logo_width,
				'flex-width'  => true,
				'flex-height' => true,
			)
		);
		// phpcs:ignore
		// add_theme_support('post-formats', array('image', 'video', 'quote', 'link', 'gallery'));

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus(
			array(
				'primary' => esc_html__( 'Primary Menu', 'bootflow' ),
			)
		);

		// Add support for full and wide align images.
		add_theme_support( 'align-wide' );

		// Add support for responsive embeds.
		add_theme_support( 'responsive-embeds' );

		// editor style.
		add_editor_style();

		add_theme_support( 'post-thumbnails' );
		// phpcs:ignore
		// add_image_size('BFL-post-thumb', 446, 250, true); // Archive Post Page Thumbnails
		// add_image_size('BFL-tiny-thumb', 80, 80, true); // Archive Post Page Thumbnails.
		// add_image_size('BFL-sticky-thumb', 540, 462, true); // Archive Post Page Thumbnails.

		// This variable is intended to be overruled from themes.
		// Open WPCS issue: {@link https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards/issues/1043}.
        // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
		$GLOBALS['content_width'] = apply_filters( 'bootflow_content_width', 580 );
	}

	/**
	 * Gutenberg default style
	 */
	public function gutenberg_default_style() {
		$version = DEVELOPMENT_MODE ? time() : BFL_VERSION;
		wp_enqueue_style( 'bfl-gutenberg', get_theme_file_uri( '/assets/css/gutenberg-editor-style.css' ), array(), $version, 'all' );
	}

	/**
	 * Theme CSS
	 *
	 * @since 1.0.0
	 */
	public function enqueue_styles() {

		$version = DEVELOPMENT_MODE ? time() : BFL_VERSION;

		wp_enqueue_style( 'google-fonts', $this->fonts_url(), array(), $version, 'all' );

		wp_enqueue_style( BFL_SLUG . '-vendors', BFL_ASSETS . 'css/vendors.min.css', array(), $version, 'all' );

		wp_enqueue_style( BFL_SLUG . '-theme-style', BFL_ASSETS . 'css/style.min.css', array(), $version, 'all' );

		wp_enqueue_style( BFL_SLUG . '-style', get_stylesheet_uri(), array(), $version, 'all' );
	}

	/**
	 * Theme JS
	 *
	 * @since 1.0.0
	 */
	public function enqueue_scripts() {

		$version = DEVELOPMENT_MODE ? time() : BFL_VERSION;

		// jquery js.
		wp_enqueue_script( 'jquery' );

		// bootstrap-bundle.
		wp_enqueue_script( 'bootstrap-bundle', BFL_ASSETS . 'js/bootstrap.bundle.min.js', array( 'jquery' ), '5.0.0-beta2', true );

		// scripts.
		wp_enqueue_script( BFL_SLUG . 'script', BFL_ASSETS . 'js/scripts.min.js', array( 'jquery' ), $version, true );

		// comment-reply.
		if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
			wp_enqueue_script( 'comment-reply' );
		}

		// Set loading strategy for scripts.
		if ( version_compare( $GLOBALS['wp_version'], '6.3', '<' ) ) {
			wp_script_add_data( 'bootstrap-bundle', 'defer', true );
			wp_script_add_data( BFL_SLUG . 'script', 'defer', true );
		} else {
			wp_script_add_data( 'bootstrap-bundle', 'strategy', 'defer' );
			wp_script_add_data( BFL_SLUG . 'script', 'strategy', 'defer' );
		}
	}

	/**
	 * Load font
	 */
	public function fonts_url() {
		$font_families = array();

		$font_families[] = 'Montserrat:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i';
		$font_families[] = 'Open Sans:300,300i,400,400i,600,600i,700,700i,800,800i';

		$fonts_url = '';

		$query_args = array(
			'family'  => implode( '|', $font_families ),
			'display' => 'swap',
		);

		$fonts_url = add_query_arg( $query_args, 'https://fonts.googleapis.com/css' );

		return esc_url_raw( $fonts_url );
	}

	/**
	 * Add preconnect for Google Fonts.
	 *
	 * @version  1.0.0
	 * @param  array  $urls          URLs to print for resource hints.
	 * @param  string $relation_type The relation type the URLs are printed.
	 * @return array  $urls URLs to print for resource hints.
	 */
	public function resource_hints( $urls, $relation_type ) {

		if ( wp_style_is( 'google-fonts', 'queue' ) && 'preconnect' === $relation_type ) {
			$urls[] = array(
				'href' => 'https://fonts.gstatic.com',
				'crossorigin',
			);
		}
		return $urls;
	}

	/**
	 *  Theme widgets
	 */
	public function register_sidebars() {
		register_sidebar(
			array(
				'name'          => __( 'Primary Sidebar', 'bootflow' ),
				'id'            => 'primary',
				'description'   => __( 'Footer One widget', 'bootflow' ),
				'before_widget' => '<div id="%1$s" class="widget %2$s">',
				'after_widget'  => '</div>',
				'before_title'  => '<h5 class="widget-title">',
				'after_title'   => '</h5>',
			)
		);
	}

	/**
	 * Migrates legacy async/defer script data which might be used by child themes.
	 *
	 * This method is used on the `print_scripts_array` filter.
	 *
	 * @since Twenty Twenty 2.0
	 *
	 * @param string[] $to_do An array of script dependency handles.
	 * @return string[] Unchanged array of script dependency handles.
	 */
	public function migrate_legacy_strategy_script_data( $to_do ) {
		foreach ( $to_do as $handle ) {
			foreach ( array( 'async', 'defer' ) as $strategy ) {
				if ( wp_scripts()->get_data( $handle, $strategy ) ) {
					wp_script_add_data( $handle, 'strategy', $strategy );
				}
			}
		}
		return $to_do;
	}

	/**
	 * Adds async/defer attributes to enqueued / registered scripts.
	 *
	 * Now that #12009 has landed in WordPress 6.3, this method is only used for older versions of WordPress.
	 * This method is used on the `script_loader_tag` filter.
	 *
	 * @since Twenty Twenty 1.0
	 *
	 * @link https://core.trac.wordpress.org/ticket/12009
	 *
	 * @param string $tag    The script tag.
	 * @param string $handle The script handle.
	 * @return string Script HTML string.
	 */
	public function filter_script_loader_tag( $tag, $handle ) {
		$strategies = array(
			'async' => (bool) wp_scripts()->get_data( $handle, 'async' ),
			'defer' => (bool) wp_scripts()->get_data( $handle, 'defer' ),
		);
		$strategy   = wp_scripts()->get_data( $handle, 'strategy' );
		if ( $strategy && isset( $strategies[ $strategy ] ) ) {
			$strategies[ $strategy ] = true;
		}

		foreach ( array_keys( array_filter( $strategies ) ) as $attr ) {

			// Prevent adding attribute when already added in #12009.
			if ( ! preg_match( ":\s$attr(=|>|\s):", $tag ) ) {
				$tag = preg_replace( ':(?=></script>):', " $attr", $tag, 1 );
			}
			// Only allow async or defer, not both.
			break;
		}
		return $tag;
	}
}
