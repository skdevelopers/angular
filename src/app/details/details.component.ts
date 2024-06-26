import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from "../housing.service";
import { HousingLocation } from "../housingLocation";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: 'app-details',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <article>
            <img [src]="housingLocation?.photo" alt="" class="listing-photo">
            <section class="listing-description">
                <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
                <p class="listing-location">{{ housingLocation?.city }}, {{ housingLocation?.state }}</p>
            </section>
            <section class="listing-features">
                <h2 class="section-heading">About this housing location</h2>
                <ul>
                    <li>Units available: {{ housingLocation?.availableUnits }}</li>
                    <li>Does this location have wifi: {{ housingLocation?.wifi }}</li>
                    <li>Does this location have laundry: {{ housingLocation?.laundry }}</li>
                </ul>
            </section>
            <section class="listing-apply">
                <h2 class="section-heading">Apply now to live here</h2>
                <form [formGroup]="applyForm" (ngSubmit)="submitApplication()">
                    <label for="first-name">First Name</label>
                    <input id="first-name" type="text" formControlName="firstName">

                    <label for="last-name">Last Name</label>
                    <input id="last-name" type="text" formControlName="lastName">

                    <label for="email">Email</label>
                    <input id="email" type="text" formControlName="email">
                    <button class="primary" type="submit">Apply now</button>
                </form>

            </section>
        </article>
    `,
    styleUrls: ['./details.component.css']
})
export class DetailsComponent {
    route: ActivatedRoute = inject(ActivatedRoute);
    housingService = inject(HousingService);
    housingLocation: HousingLocation | undefined;
    applyForm = new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        email: new FormControl(''),
    });
    constructor() {
        this.loadHousingLocation();
    }

    async loadHousingLocation() {
        const housingLocationId = Number(this.route.snapshot.params['id']);
        this.housingLocation = await this.housingService.getHousingLocationById(housingLocationId);
    }
    submitApplication() {
        this.housingService.submitApplication(
            this.applyForm.value.firstName ?? '',
            this.applyForm.value.lastName ?? '',
            this.applyForm.value.email ?? '',
        );
    }
}
