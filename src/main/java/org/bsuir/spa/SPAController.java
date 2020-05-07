package org.bsuir.spa;

import org.bsuir.dto.PageContent;
import org.bsuir.dto.*;
import org.bsuir.service.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author ArtSCactus
 * @version 1.0
 */
@Controller
public class SPAController {

    @GetMapping(value = {"/", "/app"})
    public String getUnauthorizedApp(Model model){
        return "application";
    }
}
