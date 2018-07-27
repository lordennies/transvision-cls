<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Api extends CI_Controller {

	public function __construct() {
		parent::__construct();
	}

	public function login() {
		global $SConfig;
		$this->load->model(array('User_model'));

		header('Access-Control-Allow-Origin: *');
		header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');

		$post = $this->input->post(null, true);
		$user = $this->User_model->get_by(array('email' => @$post['email'], 'group' => 'user'), 1, null, true);

		if (@$user->password == crypt(@$post['password'], @$user->password)) {
			$response = array('status' => 'success', 'user_id' => $user->user_id, 
					'username' => $user->username, 'email' => $user->email, 'has_made_req' => $user->has_made_req);
			echo json_encode($response);
		} else {
			$response = array('status' => 'failed', 'message' => 'Email atau password anda salah.');
			echo json_encode($response);
		}
	}

	public function pinjam() {
		global $SConfig;
		$this->load->model(array('Peminjaman_model', 'User_model'));

		header('Access-Control-Allow-Origin: *');
		header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');

		$get = $this->input->get(null, true);
		$post = $this->input->post(null, true);

		if (isset($post['action'])) {
			$response = array();
			if ($post['action'] == 'create') {
				$data = array(
					'user_id' => $post['user_id'],
					'tujuan' => $post['tujuan'],
					'keperluan' => $post['keperluan'],
					'jum_penumpang' => $post['jum_penumpang'],
					'tgl_pemakaian' => $post['tgl_pemakaian']
				);
				/* insert data ke tabel peminjaman dan update field has_made_req di tabel user */
				if ($this->Peminjaman_model->insert($data)) {
					$has_made_req = array('has_made_req' => 1);
					$this->User_model->update($has_made_req, array('user_id' => $post['user_id']));
					array_push($response, array('status' => 'success'));
				} else {
					array_push($response, array('status' => 'failed'));
				}
				echo json_encode($response);
			} else if ($post['action'] == 'delete') {
				if ($this->Peminjaman_model->delete($post['id'])) {
					array_push($response, array('status' => 'success'));
				} else {
					array_push($response, array('status' => 'failed'));
				}
				echo json_encode($result);
			}
		} else if (isset($post['user_id'])) {
			$record = $this->Peminjaman_model->get_by(array('user_id' => $post['user_id']));
			echo json_encode($record);
		} else {
			$record = $this->Peminjaman_model->get_by();
	 		echo json_encode($record);
		}
	}

	public function hasMadeRequest() {
		global $SConfig;
		$this->load->model(array('User_model'));

		header('Access-Control-Allow-Origin: *');
		header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');

		$post = $this->input->post(null, true);
		$user = $this->User_model->get(4);

		if ($user->has_made_req == 0) {
			echo json_encode(array('status' => 'able'));
		} else {
			echo json_encode(array('status' => 'unable'));
		}
	}

}