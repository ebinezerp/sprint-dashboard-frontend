import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sprint-review',
  templateUrl: './sprint-review.component.html',
  styleUrls: ['./sprint-review.component.css']
})
export class SprintReviewComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navgLoc(){
    this.router.navigate(['/loc']);
  }

}
