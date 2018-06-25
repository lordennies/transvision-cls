<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
* 
*/
class Peminjaman extends Backend_Controller {

	public function index() {
		$this->site->view('index');
	}
}

?>