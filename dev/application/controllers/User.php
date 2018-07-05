<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
* 
*/
class User extends Backend_Controller {
	
	protected $user_detail;

	public function __construct() {
		parent::__construct();
	}

	public function index() {
		$data = array();
		$this->site->view('user', $data);
	}

	public function login()	{
		$post = $this->input->post(null, true);
		
		if (isset($post['username'])) {
			$this->user_detail = $this->User_model->get_by(array('username' => $post['username'], 'group' => 'admin'), 1, null, true);
		}

		$this->form_validation->set_message('required', '%s kosong, tolong diisi!');

		$rules = $this->User_model->rules;
		$this->form_validation->set_rules($rules);	

		if ($this->form_validation->run() == false) {	
			$this->site->view('login');
		} else {
			$login_data = array(
				'user_id' => $this->user_detail->user_id,
				'username' => $post['username'],
				'group' => $this->user_detail->group,
				'email' => $this->user_detail->email,
				'logged_in' => true
			);

			$this->session->set_userdata($login_data);

			redirect(set_url('peminjaman'));
		}
	}

	public function logout() {
		$this->session->sess_destroy();
		redirect(set_url('login'));
	}

	public function password_check($str) {
		$user_detail = $this->user_detail;

    	if (@$user_detail->password == crypt($str, @$user_detail->password)) {
    		return true;
		} else if (@$user_detail->password) {
			$this->form_validation->set_message('password_check', 'Password anda salah.');
			return false;
		} else {
			$this->form_validation->set_message('password_check', 'Anda tidak memiliki hak akses admin.');
			return false;
		}
	}

	public function temporary_register() {
		$data_user_baru = array(
			'username' => 'admin',
			'password' => bCrypt('admin', 12),
			'group' => 'admin',
			'email' => 'admin@gmail.com'
		);

		$this->User_model->insert($data_user_baru);
	}
}

?>