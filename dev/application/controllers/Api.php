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

		$response = array();
		if (@$user->password == crypt(@$post['password'], @$user->password)) {
			array_push($response, array('status' => 'success', 'user_id' => $user->user_id, 
					'username' => $user->username, 'email' => $user->email));
			echo json_encode($response);
		} else {
			array_push($response, array('status' => 'failed', 'message' => 'Email atau password anda salah'));
			echo json_encode($response);
		}
	}

	public function pinjam() {
		global $SConfig;
		$this->load->model(array('Peminjaman_model'));

		header('Access-Control-Allow-Origin: *');
		header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');

		$get = $this->input->get(null, true);
		$post = $this->input->post(null, true);

		if (isset($get['id'])) {
			$record = $this->Peminjaman_model->get_peminjaman(array('peminjaman_id' => $get['id']), null, null, true);
			echo json_encode($record);
		} else if ($post) {
			$response = array();
			if ($post['action'] == 'create' || $post['action'] == 'update') {
				$data = array(
					'user_id' => $post['user_id'],
					'tujuan' => $post['tujuan'],
					'keperluan' => $post['keperluan'],
					'jum_penumpang' => $post['jum_penumpang'],
					'tgl_pemakaian' => $post['tgl_pemakaian']
				);

				if ($post['action'] == 'create') {
					$is_exist = $this->Peminjaman_model->count(
						array('tgl_pemakaian' => $data['tgl_pemakaian'])
					);

					if ($is_exist > 0) {

					}

					if ($this->Peminjaman_model->insert($data)) {
						array_push($response, array('status' => 'success'));
					} else {
						array_push($response, array('status' => 'failed'));
					}
					echo json_encode($response);
				} else {
					$id = (int) $post['id'];
					if ($this->Peminjaman_model->update($data, array('peminjaman_id' => $id) )) {
						array_push($response, array('status' => 'success'));
					} else {
						array_push($response, array('status' => 'failed'));
					}
					echo json_encode($response);
				}
			} else if ($post['action'] == 'delete') {
				if ($this->Peminjaman_model->delete($post['id'])) {
					array_push($response, array('status' => 'success'));
				} else {
					array_push($response, array('status' => 'failed'));
				}
				echo json_encode($result);
			}
		} else {
			$record = $this->Peminjaman_model->get_by();
	 		echo json_encode($record);
		}
	}

}