package org.bsuir.service;

import org.bsuir.dao.common.Dao;
import org.bsuir.dao.common.DaoFactory;
import org.bsuir.dao.helper.DaoManager;
import org.bsuir.dto.Teacher;

import java.util.List;
import java.util.Optional;

/**
 * @author ArtSCactus
 * @version 1.0
 */
public class TeacherRestService {
    public List<Teacher> getAllTeachers() {
        try (DaoManager dao = DaoFactory.createRestDaoManager()) {
            Dao<Teacher> teacherDao = dao.getTeacherRestDao();
            return teacherDao.getAll();
        }
    }

    public void createTeacher(String name, String surname) {
        try (DaoManager dao = DaoFactory.createRestDaoManager()) {
            Dao<Teacher> teacherDao = dao.getTeacherRestDao();
            teacherDao.save(new Teacher(null, name, surname));
        }
    }

    public Optional<Teacher> getById(Long id) {
        try (DaoManager dao = DaoFactory.createRestDaoManager()) {
            Dao<Teacher> teacherDao = dao.getTeacherRestDao();
            return teacherDao.getById(id);
        }
    }

    public int update(Teacher teacher) {
        try (DaoManager dao = DaoFactory.createRestDaoManager()) {
            Dao<Teacher> teacherDao = dao.getTeacherRestDao();
            return teacherDao.save(teacher);
        }
    }

    public void removeById(Long id) {
        try (DaoManager dao = DaoFactory.createRestDaoManager()) {
            Dao<Teacher> teacherDao = dao.getTeacherRestDao();
            teacherDao.removeById(id);
        }
    }
}
