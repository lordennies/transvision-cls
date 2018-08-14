<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
* 
*/
class Peminjaman extends Backend_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model(array('Peminjaman_model', 'Kendaraan_model'));
	}

	public function index() {
		$data = array();
		$this->site->view('peminjaman', $data);
	}

	public function action($param) {
		global $SConfig;

		if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
			if ($param == 'tambah' || $param == 'update') {
				$rules = $this->Peminjaman_model->rules;
				$this->form_validation->set_rules($rules);

				if ($this->form_validation->run() == true) {
					$post = $this->input->post();
					$data = array(
						'tujuan' => $post['tujuan'],
						'keperluan' => $post['keperluan'],
						'jum_penumpang' => $post['jum_penumpang'],
						'tgl_pemakaian' => $post['tgl_pemakaian'],
						'kendaraan_id' => $post['kendaraan_parent'],
						'status_req' => $post['status']
					);

					if (!empty($post['peminjaman_id'])) {
						$this->Peminjaman_model->update($data, array('peminjaman_id' => $post['peminjaman_id']));
						$result = array('status' => 'success');
					} else {
						if ($this->Peminjaman_model->insert($data)) {
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
						'data' => $this->Peminjaman_model->get_peminjaman_detail($post['id'])
					));
				} else {
					$total_rows = $this->Peminjaman_model->count();
					$offset = null;

					if (!empty($post['hal_aktif']) && $post['hal_aktif'] > 1) {
						$offset = ($post['hal_aktif'] - 1) * $SConfig->_backend_perpage;
					}

					$record = $this->Peminjaman_model->get_peminjaman(null, $SConfig->_backend_perpage, $offset);

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
				if (!empty($post['peminjaman_id'])) {
					$this->Peminjaman_model->delete($post['peminjaman_id']);
					$result = array('status' => 'success');
				}

				echo json_encode($result);
			}
		}
	}

	public function get_kendaraan() {
		global $SConfig;
		if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
			$record = $this->Kendaraan_model->get_by();

			echo json_encode(array('record' => $record));
		}
	}

	public function showMap() {
		$get = $this->input->get(null, true);

		if (!empty($get['id'])) {
			$pos = $this->Peminjaman_model->get_loc($get['id']);
			$data = array(
				'pos' => $pos,
				'jum_titik' => sizeof($pos)
			);
			$this->site->view('map', $data);
		}
	}
}

?>