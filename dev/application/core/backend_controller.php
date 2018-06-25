<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
* 
*/
class Backend_Controller extends MY_Controller {

	function __construct() {
		parent::__construct();

		$this->load->helper(array('template_helper'));
		$this->load->library(array());
		$this->load->model(array());

		$this->site->template = 'templatevamp';
	}

}

?>