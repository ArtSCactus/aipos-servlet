package org.bsuir.dao.rest;

import com.google.gson.Gson;
import org.bsuir.config.DataServerUrls;
import org.bsuir.dao.common.Dao;
import org.bsuir.dao.common.AbstractDao;
import org.bsuir.dto.Teacher;
import org.bsuir.rowmappers.TeacherRowMapper;

import java.util.List;
import java.util.Optional;

/**
 * @author ArtSCactus
 * @version 1.0
 */
public class TeacherRestDao extends AbstractDao<Teacher> implements Dao<Teacher> {
    private DataServerUrls config;

    public TeacherRestDao() {
        config = new DataServerUrls();
    }

    @Override
    public Optional<Teacher> getById(Long id) {
        String uri = config.getTeacherById(id);
        List<Teacher> teacherList = super.executeGet(uri, new TeacherRowMapper());
        if (teacherList.isEmpty()) {
            return Optional.empty();
        } else {
            return Optional.of(teacherList.get(0));
        }
    }

    @Override
    public List<Teacher> getAll() {
        return super.executeGet(config.getAllTeachers(), new TeacherRowMapper());
    }

    @Override
    public int save(Teacher item) {
        Gson gson = new Gson();
        String json = gson.toJson(item);
        return super.executePost(config.getUpdateTeacher(), json);
    }

    @Override
    public int removeById(Long id) {
        String uri = config.getTeacherById(id);
        return super.executeDelete(uri);
    }

}
