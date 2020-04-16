package org.bsuir.config;

import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;

import java.io.IOException;
import java.util.Properties;

/**
 * @author ArtSCactus
 * @version 1.0
 */
public class DataServerUrls {
    private static final String PATH = "requests/url.properties";
    private Properties properties;

    public DataServerUrls() {
        init();
    }

    private void init() {
        ResourceLoader loader = new DefaultResourceLoader();
        Resource urls = loader.getResource(PATH);
        properties = new Properties();
        try {
            properties.load(urls.getInputStream());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static final String ALL_TEACHERS = "all-teachers";

    private static final String ALL_STUDENTS = "all-students";

    private static final String ALL_LESSONS = "all-lessons";

    private static final String ALL_SUBJECTS = "all-subjects";

    private static final String ALL_GROUPS = "all-groups";

    private static final String TEACHER_BY_ID = "teacher-by-id";

    private static final String STUDENT_BY_ID = "student-by-id";

    private static final String LESSON_BY_ID = "lesson-by-id";

    private static final String SUBJECT_BY_ID = "subject-by-id";

    private static final String GROUP_BY_ID = "group-by-id";

    private static final String UPDATE_TEACHER = "update-teacher";

    private static final String UPDATE_LESSON = "update-lesson";

    private static final String UPDATE_STUDENT = "update-student";

    private static final String UPDATE_SUBJECT = "update-subject";

    private static final String UPDATE_GROUP = "update-group";

    public String getAllTeachers() {
        return properties.getProperty(ALL_TEACHERS);
    }

    public String getAllStudents() {
        return properties.getProperty(ALL_STUDENTS);
    }

    public String getAllLessons() {
        return properties.getProperty(ALL_LESSONS);
    }

    public String getAllSubjects() {
        return properties.getProperty(ALL_SUBJECTS);
    }

    public String getAllGroups() {
        return properties.getProperty(ALL_GROUPS);
    }

    /**
     * Returns url without appended id.
     *
     * @return String url
     */
    public String getTeacherById() {
        return properties.getProperty(TEACHER_BY_ID);
    }

    /**
     * Returns url with appended id.
     *
     * @param id obj id
     * @return String url
     */
    public String getTeacherById(Number id) {
        return properties.getProperty(TEACHER_BY_ID) +
                id;
    }

    /**
     * Returns url without appended id.
     *
     * @return String url
     */
    public String getStudentById() {
        return properties.getProperty(STUDENT_BY_ID);
    }

    /**
     * Returns url with appended id.
     *
     * @param id obj id
     * @return String url
     */
    public String getStudentById(Number id) {
        return properties.getProperty(STUDENT_BY_ID) + id;
    }

    /**
     * Returns url without appended id.
     *
     * @return String url
     */
    public String getLessonById() {
        return properties.getProperty(LESSON_BY_ID);
    }

    /**
     * Returns url with appended id.
     *
     * @param id obj id
     * @return String url
     */
    public String getLessonById(Number id) {
        return properties.getProperty(LESSON_BY_ID) + id;
    }

    /**
     * Returns url without appended id.
     *
     * @return String url
     */
    public String getSubjectById() {
        return properties.getProperty(SUBJECT_BY_ID);
    }

    /**
     * Returns url with appended id.
     *
     * @param id obj id
     * @return String url
     */
    public String getSubjectById(Number id) {
        return properties.getProperty(SUBJECT_BY_ID) + id;
    }

    /**
     * Returns url without appended id.
     *
     * @return String url
     */
    public String getGroupById() {
        return properties.getProperty(GROUP_BY_ID);
    }

    /**
     * Returns url with appended id.
     *
     * @param id obj id
     * @return String url
     */
    public String getGroupById(Number id) {
        return properties.getProperty(GROUP_BY_ID) + id;
    }

    public String getUpdateTeacher() {
        return properties.getProperty(UPDATE_TEACHER);
    }

    public String getUpdateLesson() {
        return properties.getProperty(UPDATE_LESSON);
    }

    public String getUpdateStudent() {
        return properties.getProperty(UPDATE_STUDENT);
    }

    public String getUpdateSubject() {
        return properties.getProperty(UPDATE_SUBJECT);
    }

    public String getUpdateGroup() {
        return properties.getProperty(UPDATE_GROUP);
    }

}
