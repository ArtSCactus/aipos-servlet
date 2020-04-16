package org.bsuir.dao.rest;

import com.google.gson.Gson;
import org.bsuir.config.DataServerUrls;
import org.bsuir.dao.common.Dao;
import org.bsuir.dao.common.AbstractDao;
import org.bsuir.dto.Group;
import org.bsuir.rowmappers.GroupRowMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

/**
 * @author ArtSCactus
 * @version 1.0
 */
public class GroupRestDao extends AbstractDao<Group> implements Dao<Group> {
    private DataServerUrls config;

    public GroupRestDao() {
        config = new DataServerUrls();
    }

    @Override
    public Optional<Group> getById(Long id) {
        String uri = config.getGroupById(id);
        List<Group> teacherList = super.executeGet(uri, new GroupRowMapper());
        if (teacherList.isEmpty()) {
            return Optional.empty();
        } else {
            return Optional.of(teacherList.get(0));
        }
    }

    @Override
    public List<Group> getAll() {
        return super.executeGet(config.getAllGroups(), new GroupRowMapper());
    }

    @Override
    public int save(Group item) {
        Gson gson = new Gson();
        String json = gson.toJson(item);
        return super.executePost(config.getUpdateGroup(), json);
    }

    @Override
    public int removeById(Long id) {
        String uri = config.getGroupById(id);
        return super.executeDelete(uri);
    }
}
