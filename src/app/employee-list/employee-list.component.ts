import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      employee-list works!
    </p>
  `,
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {

}
