<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
* 
*/
class Site {
	
	public $template;

	function view($pages, $data = null) {
		$_this =& get_instance();

		$data ? $_this->load->view($this->template.'/'.$pages, $data) :
				$_this->load->view($this->template.'/'.$pages);
	}
}

?>