<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
* 
*/
class Peminjaman extends Backend_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model(array('Peminjaman_model'));
	}

	public function index() {
		$data = array();
		$this->site->view('peminjaman', $data);
	}

	public function action($param) {
		if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
			if ($param == 'tambah') {
				$rules = $this->Peminjaman_model->rules;
				$this->form_validation->set_rules($rules);

				if ($this->form_validation->run() == true) {
					$post = $this->input->post();
					$data = array(
						'tujuan' => $post['tujuan'],
						'keperluan' => $post['keperluan'],
						'jum_penumpang' => $post['jum_penumpang'],
						'tgl_pemakaian' => $post['tgl_pemakaian']
					);

					if ($this->Peminjaman_model->insert($data)) {
						$result = array('status' => 'success');
					} else {
						$result = array('status' => 'failed');
					}
				} else {
					$result = array('status' => 'failed', 'errors' => $this->form_validation->error_array());
				}

				echo json_encode($result);
			}
		}
	}
}

?>