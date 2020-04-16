package org.bsuir.dao.rest;

import com.google.gson.Gson;
import org.bsuir.config.DataServerUrls;
import org.bsuir.dao.common.Dao;
import org.bsuir.dao.common.AbstractDao;
import org.bsuir.dto.Lesson;
import org.bsuir.rowmappers.LessonRowMapper;

import java.util.List;
import java.util.Optional;

/**
 * @author ArtSCactus
 * @version 1.0
 */
public class LessonRestDao extends AbstractDao<Lesson> implements Dao<Lesson> {
    private DataServerUrls config;

    public LessonRestDao() {
       config = new DataServerUrls();
    }

    @Override
    public Optional<Lesson> getById(Long id) {
        String uri = config.getLessonById(id);
        List<Lesson> teacherList = super.executeGet(uri, new LessonRowMapper());
        if (teacherList.isEmpty()) {
            return Optional.empty();
        } else {
            return Optional.of(teacherList.get(0));
        }
    }

    @Override
    public List<Lesson> getAll() {
        return super.executeGet(config.getAllLessons(), new LessonRowMapper());
    }

    @Override
    public int save(Lesson item) {
        Gson gson = new Gson();
        String json = gson.toJson(item);
        return super.executePost(config.getUpdateLesson(), json);
    }

    @Override
    public int removeById(Long id) {
        String uri = config.getLessonById(id);
        return super.executeDelete(uri);
    }
}
