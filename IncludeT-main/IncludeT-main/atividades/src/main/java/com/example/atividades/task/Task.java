package com.example.atividades.task;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.type.descriptor.jdbc.TimestampWithTimeZoneJdbcType;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Table(name="tasks")
@Entity(name="tasks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @SequenceGenerator(name = "SEQ_TASK", sequenceName = "id_seq_task", allocationSize = 1)
    @Column(name = "id_task")
    private Long id;
    private Long column_id;
    private String title;
    private String description;
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private Date date;
    public Task(TaskRequestDTO data){
        this.column_id = data.column_id();
        this.title = data.title();
        this.description = data.description();
        this.date = data.date();

    }

    public Task(TaskEditDTO data) {
        this.id = data.id();
        this.column_id = data.column_id();
        this.title = data.title();
        this.description = data.description();
        this.date = data.date();

    }

    public Task(TaskDeleteDTO data){
        this.id = data.id();
        this.column_id = data.column_id();
        this.title = data.title();
        this.description = data.description();
        this.date = data.date();
    }
}
