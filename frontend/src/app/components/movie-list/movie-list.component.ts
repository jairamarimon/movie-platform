import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-list',
  imports: [ReactiveFormsModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent {

    formValue !: FormGroup;
    constructor(private formbuilder: FormBuilder) { }

    ngOnInit(): void {
      this.formValue = this.formbuilder.group({
        title : [''],
        description : [''],
        videoFile: [null]
      })
    }

    onFileChange(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        this.formValue.patchValue({ videoFile: file });
        this.formValue.get('videoFile')?.updateValueAndValidity();
      }
    }

    onSubmit() {
      console.log('submit');
    }
}
