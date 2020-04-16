package org.bsuir.spa;

import org.bsuir.dto.PageContent;
import org.bsuir.dto.*;
import org.bsuir.service.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

/**
 * @author ArtSCactus
 * @version 1.0
 */
@Controller
public class SPAController {

    @GetMapping(value ="/app")
    public String firstView(Model model) {
      /*  SubjectRestService subjectService = new SubjectRestService();
        TeacherRestService teacherService = new TeacherRestService();
        LessonRestService lessonService = new LessonRestService();
        GroupRestService groupService = new GroupRestService();
        StudentRestService studentService = new StudentRestService();
        PageContent content = new PageContent();
        List<Group> groups = groupService.getAllGroups();
        List<Lesson> lessons = lessonService.getAllLessons();
        List<Teacher> teacherList = teacherService.getAllTeachers();
        List<Subject> subjectList = subjectService.getAll();
        List<Student> studentsList = studentService.getAllStudents();
        content.setAttribute("teachers", teacherList);
        content.setAttribute("groups", groups);
        content.setAttribute("subjects", subjectList);
        content.setAttribute("lessons", lessons);
        content.setAttribute("students", studentsList);*/
        /*model.addAttribute("PageContent", content);*/
        return "application";
    }
}
