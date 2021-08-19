import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Project } from '../model/project';
import { ProjectService } from '../services/project.service';
import { SprintService } from '../services/sprint.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  projectList: Project[];

  constructor(
    private projectService: ProjectService,
    private sprintService: SprintService
    ) {
    this.projectList = [];
  }

  ngOnInit(): void {
  }


  search(form:NgForm){
  }

}
