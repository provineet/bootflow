<?php

namespace Bootflow;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

class Theme_Hooks
{

    public function __construct()
    {

        add_action('wp_head', array( $this, 'print_something_in_head' ));
        
    }

    public function print_something_in_head(){

    }

}
