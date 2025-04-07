import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StudentCardComponent } from '../student-card/student-card.component';

@Component({
  selector: 'app-home',
  imports: [RouterModule, StudentCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
