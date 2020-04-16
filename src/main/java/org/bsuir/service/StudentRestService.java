package org.bsuir.service;

import org.bsuir.dao.common.Dao;
import org.bsuir.dao.common.DaoFactory;
import org.bsuir.dao.helper.DaoManager;
import org.bsuir.dto.Student;

import java.util.List;
import java.util.Optional;

/**
 * @author ArtSCactus
 * @version 1.0
 */
public class StudentRestService{
    public List<Student> getAllStudents() {
        try (DaoManager dao = DaoFactory.createRestDaoManager()) {
            Dao<Student> studentDao = dao.getStudentRestDao();
            return studentDao.getAll();
        }
    }

    public void update(Student item) {
        try (DaoManager dao = DaoFactory.createRestDaoManager()) {
            Dao<Student> studentDao = dao.getStudentRestDao();
            studentDao.save(item);
        }
    }

    public void delete(Long id) {
        try (DaoManager dao = DaoFactory.createRestDaoManager()) {
            Dao<Student> studentDao = dao.getStudentRestDao();
            studentDao.removeById(id);
        }
    }

    public Optional<Student> getById(Long id) {
        try (DaoManager dao = DaoFactory.createRestDaoManager()) {
            Dao<Student> studentDao = dao.getStudentRestDao();
            return studentDao.getById(id);
        }
    }
}
