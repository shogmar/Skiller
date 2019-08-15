<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Questions extends CI_Model
{
    function __construct()
    {
        parent::__construct();
    }

    public function set_questions($questions, $answers, $checked)
    {
        $this->load->dbforge();
        $this->dbforge->drop_table('questions', TRUE);
        if($this->db->table_exists('questions') === FALSE) {
            $fields = [
                'id' => [
                    'type' => 'INT',
                    'constraint' => 5,
                    'unsigned' => TRUE,
                    'auto_increment' => TRUE
                ],
                'questions' => [
                    'type' => 'TEXT',
                    'null' => TRUE,
                ],
                'answers' => [
                    'type' => 'TEXT',
                    'null' => TRUE,
                ],
                'checked' => [
                    'type' => 'TEXT',
                    'null' => TRUE,
                ],
            ];
            $this->dbforge->add_field($fields);
            $this->dbforge->create_table('questions', TRUE);
            $date = [
                'questions' => json_encode($questions, JSON_UNESCAPED_UNICODE),
                'answers' => json_encode($answers, JSON_UNESCAPED_UNICODE), 
                'checked' => json_encode($checked, JSON_UNESCAPED_UNICODE)
            ];
            $this->db->insert('questions', $date);
        }
    }

    public function get_questions()
    {
        if($this->db->table_exists('questions') === TRUE) {
            return $this->db->get('questions')->result_array();
        }
        return FALSE;
    }
}