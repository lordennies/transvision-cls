<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
* 
*/
class Peminjaman_model extends MY_Model {
	
	protected $_table_name = 'peminjaman';
	protected $_primary_key = 'peminjaman_id';
	protected $_order_by = 'peminjaman_id';
	protected $_order_by_type = 'DESC';

	public $rules = array(
		'tujuan' => array(
			'field' => 'tujuan',
			'label' => 'Tujuan',
			'rules' => 'trim|required'
		),
		'keperluan' => array(
			'field' => 'keperluan',
			'label' => 'Keperluan',
			'rules' => 'trim|required'
		),
		'tgl_pemakaian' => array(
			'field' => 'tgl_pemakaian',
			'label' => 'Tanggal Pemakaian',
			'rules' => 'trim|required'
		),
		'jum_penumpang' => array(
			'field' => 'jum_penumpang',
			'label' => 'Jumlah Penumpang',
			'rules' => 'trim|required'
		),
	);

	function __construct() {
		parent::__construct();
	}
}

?>