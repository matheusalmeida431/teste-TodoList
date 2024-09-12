package com.example.atividades.task;

import java.util.Date;


public record TaskRequestDTO(Long column_id, String title, String description, Date date) {
}
