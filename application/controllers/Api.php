<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH . '/libraries/REST_Controller.php';

class Api extends \Restserver\Libraries\REST_Controller
{
	public function index_post()
	{
		if ($this->post('questions') and $this->post('answers') and $this->post('checked')) {
			$this->load->model('questions');
			$this->questions->set_questions($this->post('questions'), $this->post('answers'), $this->post('checked'));
			$this->response(json_encode(["status" => "done"]), 200);
		} else {
			$this->response(NULL, 500);
		}
	}

	public function index_get()
	{
		$this->load->model('questions');
		$res = $this->questions->get_questions();
		$questions = json_decode($res[0]['questions'], TRUE);
		$answers = json_decode($res[0]['answers'], TRUE);
		$checked = json_decode($res[0]['checked'], TRUE);
		$this->response(json_encode(["status" => "done", "date" => ['questions' => $questions, 'answers' => $answers, 'checked' => $checked]]), 200);
	}
}