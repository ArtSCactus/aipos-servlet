package org.bsuir.service;

import org.bsuir.dao.common.Dao;
import org.bsuir.dao.common.DaoFactory;
import org.bsuir.dao.helper.DaoManager;
import org.bsuir.dto.Group;

import java.util.List;

/**
 * @author ArtSCactus
 * @version 1.0
 */
public class GroupRestService{
    public List<Group> getAllGroups() {
        try(DaoManager dao = DaoFactory.createRestDaoManager()){
            Dao<Group> groupDao = dao.getGroupRestDao();
            return groupDao.getAll();
        }
    }
}
