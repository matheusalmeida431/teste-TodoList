package com.example.atividades.controller;

import com.example.atividades.task.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("task")
public class TaskController {

    @Autowired
    private TaskRepository repository;


    @PostMapping("/salvartask")
    public String saveTask(@RequestBody TaskRequestDTO data){
        Task taskData = new Task(data);
        repository.save(taskData);
        return "test";
    }

    @GetMapping("/consultartask")
    public List<Task> getAll(){
        List<Task> taskList = repository.findAll();
        return taskList;
    }

    @PostMapping("/edittask")
    public String editTask(@RequestBody TaskEditDTO data){
        Task taskData = new Task(data);

        repository.deleteById( taskData.getId() );

        repository.save(taskData);

        return "editted";
    }

    @PostMapping("/deletetask")
    public String editTask(@RequestBody TaskDeleteDTO data){
        Task taskData = new Task(data);

        repository.deleteById( taskData.getId() );

        return "deleted";
    }
}
