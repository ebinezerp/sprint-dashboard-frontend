import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Project } from '../model/project';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  projectList: Project[];

  constructor(private projectService: ProjectService) {
    this.projectList = [];
  }

  ngOnInit(): void {
   this.projectService.getProjects().subscribe(
     (data) => {
       this.projectList = data;
     },
     (error) =>{
        console.log(error);
     }
   )
  }


  search(form:NgForm){
    console.log(form);
  }

}
