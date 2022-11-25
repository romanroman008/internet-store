import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-useprofileextra',
  templateUrl: './useprofileextra.component.html',
  styleUrls: ['./useprofileextra.component.css']
})
export class UseprofileextraComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  register(){
    this.router.navigate(['/register']);
  }

  goOn(){
    this.router.navigate(['orderprep'])
  }
}
