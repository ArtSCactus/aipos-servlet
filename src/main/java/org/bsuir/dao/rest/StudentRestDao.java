package org.bsuir.dao.rest;

import com.google.gson.Gson;
import org.bsuir.config.DataServerUrls;
import org.bsuir.dao.common.Dao;
import org.bsuir.dao.common.AbstractDao;
import org.bsuir.dto.Student;
import org.bsuir.rowmappers.StudentRowMapper;

import java.util.List;
import java.util.Optional;

/**
 * @author ArtSCactus
 * @version 1.0
 */
public class StudentRestDao extends AbstractDao<Student> implements Dao<Student> {
    private DataServerUrls config;

    public StudentRestDao() {
        config = new DataServerUrls();
    }

    @Override
    public Optional<Student> getById(Long id) {
        String uri = config.getStudentById(id);
        List<Student> studentList = super.executeGet(uri, new StudentRowMapper());
        if (studentList.isEmpty()) {
            return Optional.empty();
        } else {
            return Optional.of(studentList.get(0));
        }
    }

    @Override
    public List<Student> getAll() {
        return super.executeGet(config.getAllStudents(), new StudentRowMapper());
    }

    @Override
    public int save(Student item) {
        Gson gson = new Gson();
        String json = gson.toJson(item);
        return super.executePost(config.getUpdateStudent(), json);
    }

    @Override
    public int removeById(Long id) {
        String uri = config.getStudentById(id);
        return super.executeDelete(uri);
    }
}
