import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { StudentService } from '../student.service';
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  addStudentForms: FormGroup;
  public classData: any = [];
  public subjectData: any = [];
  public studentData: any = [];
  public editStudent: any = '';

  constructor(private fb: FormBuilder, private studentService: StudentService, private route: ActivatedRoute, private router: Router) { }

  /**
   * On Init
   */
  ngOnInit() {
    // Fetch classes
    this.getClassData();

    // Get the studnet ID
    let sub = this.route.params.subscribe((params: any) => {
      this.editStudent = params["id"];
      if (this.editStudent) {
        this.getStudentDataById(this.editStudent);
      }
    });

    // Create the Form
    this.addStudentForms = this.fb.group({
      firstName: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]
      ],
      lastName: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]
      ],
      marks: this.fb.array([]),
      class: [
        "",
        [
          Validators.required
        ]
      ],
    });
  }

  /**
   * Fetch Single Student by ID
   * @param id 
   */
  getStudentDataById(id: any) {
    this.studentService
      .getStudentById(id)
      .subscribe((res: any) => {
        this.studentData = res.student;

        // Path the Form
        this.addStudentForms.patchValue({
          firstName: this.studentData.firstName,
          lastName: this.studentData.lastName
        });

        // Set the class
        this.addStudentForms.controls["class"].setValue(this.studentData.marks[0].class_subject.classId);

        // Get the subjects for this class
        this.subjectsInUI(this.studentData.marks[0].class_subject.classId, true);
      });
  }

  /**
   * Get the Marks property as FormArray
   */
  get marks(): FormArray {
    return this.addStudentForms.get("marks") as FormArray;
  }

  /**
   * Add new Marks Form to Marks Array
   */
  addMarksForm() {
    this.marks.push(this.fb.group({
      classSubjectId: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]
      ],
      total: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]
      ],
    }));
  }

  /**
   * Get the classes from API
   */
  getClassData() {
    this.studentService
      .getClasses()
      .subscribe((res: any) => {
        this.classData = res.classes;
      });
  }

  /**
   * Get the Subjects by Class ID
   * @param event 
   */
  getSubjects(event: any) {
    this.subjectsInUI(event.value);
  }

  /**
   * Set the subjkects in UI
   * @param value 
   */
  subjectsInUI(id: any, isEdit = false) {
    this.studentService
      .getSubjects(id)
      .subscribe((res: any) => {
        this.subjectData = res.subjects;
        this.marks.clear();
        // Make the form for Marks for each subject
        this.subjectData.forEach((item: any, i: any) => {
          this.addMarksForm();
          if (isEdit && this.studentData.marks[i].classSubjectId == item.id) {
            this.marks.controls[i].setValue({
              total: this.studentData.marks[i].marks,
              classSubjectId: this.studentData.marks[i].classSubjectId
            });
          }
        });
      });
  }

  /**
   * Submit the form
   * @param value 
   */
  onSubmit(value: any) {
    this.subjectData.forEach((item: any, i: any) => {
      value.marks[i].classSubjectId = item.id
      value.marks[i].marks = value.marks[i].total
    });

    if (this.editStudent) {
      this.studentService
        .updateStudent(this.editStudent, value)
        .subscribe((res: any) => {
          this.router.navigate(['']);
        });
    } else {
      this.studentService
        .addStudent(value)
        .subscribe((res: any) => {
          this.router.navigate(['']);
        });
    }
  }
}
