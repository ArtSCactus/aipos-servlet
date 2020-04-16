package org.bsuir.dao.rest;

import com.google.gson.Gson;
import org.bsuir.config.DataServerUrls;
import org.bsuir.dao.common.Dao;
import org.bsuir.dao.common.AbstractDao;
import org.bsuir.dto.Subject;
import org.bsuir.rowmappers.SubjectRowMapper;

import java.util.List;
import java.util.Optional;

/**
 * @author ArtSCactus
 * @version 1.0
 */
public class SubjectRestDao extends AbstractDao<Subject> implements Dao<Subject> {
    private DataServerUrls config;

    public SubjectRestDao() {
        config = new DataServerUrls();
    }
    @Override
    public Optional<Subject> getById(Long id) {
        String uri =config.getStudentById(id);
        List<Subject> teacherList = super.executeGet(uri, new SubjectRowMapper());
        if (teacherList.isEmpty()) {
            return Optional.empty();
        } else {
            return Optional.of(teacherList.get(0));
        }
    }

    @Override
    public List<Subject> getAll() {
        return super.executeGet(config.getAllSubjects(), new SubjectRowMapper());
    }

    @Override
    public int save(Subject item) {
        Gson gson = new Gson();
        String json = gson.toJson(item);
        return super.executePost(config.getUpdateSubject(), json);
    }

    @Override
    public int removeById(Long id) {
        String uri = config.getSubjectById(id);
        return super.executeDelete(uri);
    }
}
