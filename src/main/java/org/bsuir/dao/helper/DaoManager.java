package org.bsuir.dao.helper;

import org.bsuir.dao.rest.*;
import org.bsuir.exceptions.dao.DaoException;

import java.sql.SQLException;

public class DaoManager implements AutoCloseable {


    /**
     * Should be called if no database connection is needed.
     */
    public DaoManager() {
    }

    public StudentRestDao getStudentRestDao() {
        return new StudentRestDao();
    }

    public LessonRestDao getLessonRestDao() {
        return new LessonRestDao();
    }

    public SubjectRestDao getSubjectRestDao() {
        return new SubjectRestDao();
    }

    public GroupRestDao getGroupRestDao() {
        return new GroupRestDao();
    }

    public TeacherRestDao getTeacherRestDao() {
        return new TeacherRestDao();
    }

    @Override
    public void close() throws DaoException {
    }
}
