package com.example.atividades.task;

import java.util.Date;

public record TaskEditDTO(Long id, Long column_id, String title, String description, Date date) {
}
