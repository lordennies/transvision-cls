<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
* Kelas Kendaraan
*/
class Kendaraan extends Backend_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model(array('Kendaraan_model'));
	}

	public function index() {
		$data = array();
		$this->site->view('kendaraan', $data);
	}

	public function action($param) {
		global $SConfig;
		if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
			if ($param == 'tambah' || $param == 'update') {
				$rules = $this->Kendaraan_model->rules;
				$this->form_validation->set_rules($rules);
				if ($this->form_validation->run() == true) {
					$post = $this->input->post();
					$data = array(
						'nama_kendaraan' => $post['nama_kendaraan'],
						'no_polisi' => $post['no_polisi'],
						'tipe_kendaraan' => $post['tipe_kendaraan']
					);
					if (!empty($post['kendaraan_id'])) {
						$this->Kendaraan_model->update($data, array('kendaraan_id' => $post['kendaraan_id']));
						$result = array('status' => 'success');
					} else {
						if ($this->Kendaraan_model->insert($data)) {
							$result = array('status' => 'success');
						} else {
							$result = array('status' => 'failed');
						}
					}
				} else {
					$result = array('status' => 'failed', 'errors' => $this->form_validation->error_array());
				}
				echo json_encode($result);
			} else if ($param == 'ambil') {
				$post = $this->input->post(null, true);

				if (!empty($post['id'])) {
					echo json_encode(array(
						'status' => 'success',
						'data' => $this->Kendaraan_model->get($post['id'])
					));
				} else {
					$total_rows = $this->Kendaraan_model->count();
					$offset = null;

					if (!empty($post['hal_aktif']) && $post['hal_aktif'] > 1) {
						$offset = ($post['hal_aktif'] - 1) * $SConfig->_backend_perpage;
					}

					$record = $this->Kendaraan_model->get_by(null, $SConfig->_backend_perpage, $offset);

					echo json_encode(
						array(
							'total_rows' => $total_rows,
							'perpage' => $SConfig->_backend_perpage,
							'record' => $record
						)
					);
				}
			} else if ($param == 'hapus') {
				$post = $this->input->post(null, true);
				if (!empty($post['kendaraan_id'])) {
					$this->Kendaraan_model->delete($post['kendaraan_id']);
					$result = array('status' => 'success');
				}
				echo json_encode($result);
			}
		}
	}
}

?>