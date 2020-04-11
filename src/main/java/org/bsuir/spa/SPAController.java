package org.bsuir.spa;

import org.bsuir.commands.result.PageContent;
import org.bsuir.dto.*;
import org.bsuir.service.*;
import org.bsuir.service.rest.*;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

import java.util.List;

/**
 * @author ArtSCactus
 * @version 1.0
 */
@Controller
@RequestMapping("/app")
public class SPAController {
    @GetMapping("/get")
    public String firstView(Model model)
    {
        SubjectService subjectService = new SubjectRestService();
        TeacherService teacherService = new TeacherRestService();
        LessonService lessonService = new LessonRestService();
        GroupService groupService = new GroupRestService();
        StudentService studentService = new StudentRestService();
        PageContent content = new PageContent();
        List<Group> groups = groupService.getAllGroups();
        List<Lesson> lessons = lessonService.getAllLessons();
        List<Teacher> teacherList = teacherService.getAllTeachers();
        List<Subject> subjectList =  subjectService.getAll();
        List<Student> studentsList = studentService.getAllStudents();
        content.setAttribute("teachers", teacherList);
        content.setAttribute("groups", groups);
        content.setAttribute("subjects", subjectList);
        content.setAttribute("lessons", lessons);
        content.setAttribute("students", studentsList);
        model.addAttribute("PageContent", content);
        return "application";
    }
}
