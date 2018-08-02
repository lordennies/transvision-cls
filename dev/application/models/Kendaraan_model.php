<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
* Kendaraan Model
*/
class Kendaraan_model extends MY_Model {
	
	protected $_table_name = 'kendaraan';
	protected $_primary_key = 'kendaraan_id';
	protected $_order_by = 'kendaraan_id';
	protected $_order_by_type = 'DESC';

	public $rules = array(
		'nama_kendaraan' => array(
			'field' => 'nama_kendaraan',
			'label' => 'Nama Kendaraan',
			'rules' => 'trim|required'
		), 
		'no_polisi' => array(
			'field' => 'no_polisi', 
			'label' => 'No Polisi', 
			'rules' => 'trim|required'
		), 
		'tipe_kendaraan' => array(
			'field' => 'tipe_kendaraan', 
			'label' => 'Tipe Kendaraan', 
			'rules' => 'trim|required'
		)
	);

	function __construct() {
		parent::__construct();
	}
}

?>