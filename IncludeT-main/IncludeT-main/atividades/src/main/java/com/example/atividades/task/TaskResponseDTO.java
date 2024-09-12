package com.example.atividades.task;


import org.hibernate.type.descriptor.jdbc.TimestampWithTimeZoneJdbcType;

import java.util.Date;


public record TaskResponseDTO(Long id, Long column_id, String title, String description, Date date) {
    public TaskResponseDTO(Task task){
        this(task.getId(), task.getColumn_id(), task.getTitle(), task.getDescription(), task.getDate());
    }
}
