import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      employee-form works!
    </p>
  `,
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent {

}
