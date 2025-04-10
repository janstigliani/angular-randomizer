import { inject, Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  service: StorageService = inject(StorageService)

  save(student: Student) {

    const studentsString = localStorage.getItem("students");
    const studentArray = JSON.parse(studentsString!);
    studentArray.push(student);
    localStorage.setItem("students", JSON.stringify(studentArray));

  }

  async getStorage() {

    const studentsString = localStorage.getItem("students");

    if (studentsString) {
      const studentArray = JSON.parse(studentsString);
      const studentsObj = this.service.createStudentFromRawData(studentArray);
      return studentsObj;
    } else {
      const students = await this.service.getStudentsData()
      const studentArray = [...students!];
      localStorage.setItem("students", JSON.stringify(studentArray));
      const studentsObj = this.service.createStudentFromRawData(studentArray);
      return studentsObj;
    }
  }

  async getShuffledStudents() {

    let students = await this.getStorage();
    const arrayOfStudents = students.slice();
    const shuffledStudents = this.shuffleArray(arrayOfStudents);
    return shuffledStudents;
  };

  shuffleArray(array:Student[]) {
    const cloneArray = array.slice();
    const array1 = [];

    while (cloneArray.length > 0) {
      const randomIndex = Math.floor(Math.random() * cloneArray.length);
      const randomStudent = cloneArray[randomIndex];
      array1.push(randomStudent);
      cloneArray.splice(randomIndex, 1);
    }
    return array1;
  };

  getStudentByNameAndSurname(name:string, surname:string) {
    const studentsString = localStorage.getItem("students");
    const studentArray = JSON.parse(studentsString!);
    const student = studentArray.find((student:Student) => student.name === name && student.surname === surname);
    return student;
  }

  modifyStudent(student:Student, newStudent:Student) {
    this.delete(student);
    this.save(newStudent);
  }

  delete(student:Student) {
    const name = student.name;
    const surname = student.surname;
    const studentsString = localStorage.getItem("students");
    const studentArray = JSON.parse(studentsString!);
    const studentToDeleteIndex = studentArray.findIndex((student1:Student) => student1.name.toLowerCase() === name.toLowerCase() && student1.surname.toLowerCase() === surname.toLowerCase());
    if (studentToDeleteIndex !== -1) {
      studentArray.splice(studentToDeleteIndex, 1);
    }

    localStorage.setItem("students", JSON.stringify(studentArray));
  }

  getCoupleState(student1:Student, student2:Student) {

    const studentCouplesString = localStorage.getItem("studentCouples");
    let studentCouplesArray = studentCouplesString ? JSON.parse(studentCouplesString) : [];

    // Controlla se la coppia esiste già
    const coupleExists = studentCouplesArray.some( (couple:Student[]) =>
      (couple[0].name === student1.name && couple[0].surname === student1.surname &&
        couple[1].name === student2.name && couple[1].surname === student2.surname) ||
      (couple[0].name === student2.name && couple[0].surname === student2.surname &&
        couple[1].name === student1.name && couple[1].surname === student1.surname)
    );

    if (coupleExists) {
      studentCouplesArray = studentCouplesArray.filter( (couple:Student[]) =>
        !((couple[0].name === student1.name && couple[0].surname === student1.surname &&
          couple[1].name === student2.name && couple[1].surname === student2.surname) ||
          (couple[0].name === student2.name && couple[0].surname === student2.surname &&
            couple[1].name === student1.name && couple[1].surname === student1.surname))
      );
    } else {
      studentCouplesArray.push([student1, student2]);
    }

    localStorage.setItem("studentCouples", JSON.stringify(studentCouplesArray));
  }

  getCouples() {
    const studentCouplesString = localStorage.getItem("studentCouples");
    if (studentCouplesString) {
      const studentCouplesArray = JSON.parse(studentCouplesString);
      const allStudents = studentCouplesArray.flat();
      const studentsObj = this.service.createStudentFromRawData(allStudents);
      return studentsObj;
    } else {
      return [];
    }
  }
}