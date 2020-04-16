package org.bsuir.service;

import org.bsuir.dao.common.Dao;
import org.bsuir.dao.common.DaoFactory;
import org.bsuir.dao.helper.DaoManager;
import org.bsuir.dto.Lesson;

import java.util.List;
import java.util.Optional;

/**
 * @author ArtSCactus
 * @version 1.0
 */
public class LessonRestService {
    public List<Lesson> getAllLessons() {
        try (DaoManager dao = DaoFactory.createRestDaoManager()) {
            Dao<Lesson> lessonDao = dao.getLessonRestDao();
            return lessonDao.getAll();
        }
    }

    public Optional<Lesson> getById(Long id) {
        try (DaoManager dao = DaoFactory.createRestDaoManager()) {
            Dao<Lesson> lessonDao = dao.getLessonRestDao();
            return lessonDao.getById(id);
        }
    }

    public int update(Lesson lesson) {
        try (DaoManager dao = DaoFactory.createRestDaoManager()) {
            Dao<Lesson> lessonDao = dao.getLessonRestDao();
            return lessonDao.save(lesson);
        }
    }

    public int removeById(Long id) {
        try (DaoManager dao = DaoFactory.createRestDaoManager()) {
            Dao<Lesson> lessonDao = dao.getLessonRestDao();
            return lessonDao.removeById(id);
        }
    }

}
