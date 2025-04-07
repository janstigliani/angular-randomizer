import { Injectable } from '@angular/core';
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  getStudentsData() {

    const devUrl = `/assets/students.json`
    const prodUrl = `/studentRandomizerWeb/assets/students.json`

    const studentPromise = fetch(prodUrl).then((response) => response.json())
      .then((jsonData) => {

        const students = this.createStudentFromRawData(jsonData);
        students.forEach(student => {
          this.getStudentAvatar(student);
        });

        return students;

      })
      .catch((error) => console.log(error));

    return studentPromise;

  };

  createStudentFromRawData(data:Student[]) {
    const students = [];
    for (const studentOBJ of data) {
      const newStudent = new Student(studentOBJ.name, studentOBJ.surname, studentOBJ.yob, studentOBJ.gender, studentOBJ.nationality, studentOBJ.avatar);
      students.push(newStudent);
    }
    return students;
  };

  getStudentByName() {
    return this.getStudentsData().then(students => {
      const arrayOfStudents = students!.slice();
      arrayOfStudents.sort((s1:Student, s2:Student) => s1.compareByName(s2));
      return arrayOfStudents
    })
  };

  getStudentByAge() {
    return this.getStudentsData().then(students => {
      const arrayOfStudents = students!.slice();
      arrayOfStudents.sort((s1, s2) => s1.compareByAge(s2));
      return arrayOfStudents;
    })
  };

  getStudentAvatar(student:Student) {
    const avatarMaleImages = [
      "./assets/avatar1.jpeg",
      "./assets/avatar2.jpeg",
      "./assets/avatar3.jpeg",
      "./assets/avatar4.jpeg",
      "./assets/avatar5.jpeg",
      "./assets/avatar6.jpeg",
      "./assets/avatar7.jpeg",
      "./assets/avatar8.jpeg",
      "./assets/avatar12.jpeg",
      "./assets/avatar22.jpg",
      "./assets/avatar23.jpg",
      "./assets/avatar24.jpg"
    ];

    const avatarFemaleImages = [
      "./assets/avatar4.jpeg",
      "./assets/avatar6.jpeg",
      "./assets/avatar18.jpeg",
      "./assets/avatar19.jpeg",
      "./assets/avatar20.jpeg"
    ];

    const avatarDiversityImages = [
      "./assets/avatar2.jpeg",
      "./assets/avatar4.jpeg",
      "./assets/avatar7.jpeg",
      "./assets/avatar14.jpeg",
      "./assets/avatar15.jpeg",
      "./assets/avatar16.jpeg",
      "./assets/avatar17.jpeg",
      "./assets/avatar21.jpg"
    ];

    const avatarAgeImages = [
      "./assets/avatar1.jpeg",
      "./assets/avatar4.jpeg",
      "./assets/avatar7.jpeg",
      "./assets/avatar9.jpeg",
      "./assets/avatar10.jpeg",
      "./assets/avatar11.jpeg",
      "./assets/avatar12.jpeg",
      "./assets/avatar13.jpeg"
    ];

    if (student.gender === "M" && student.nationality === "Italiana" && student.getAge() > 35) {
      student.avatar = avatarAgeImages[Math.floor(Math.random() * avatarAgeImages.length)];
    } else if (student.gender === "M" && (student.nationality === "Italiana" || student.nationality === "Albanese")) {
      student.avatar = avatarMaleImages[Math.floor(Math.random() * avatarMaleImages.length)];
    } else if (student.gender === "M" && student.nationality !== "Italiana") {
      student.avatar = avatarDiversityImages[Math.floor(Math.random() * avatarDiversityImages.length)];
    } else if (student.gender !== "M") {
      student.avatar = avatarFemaleImages[Math.floor(Math.random() * avatarFemaleImages.length)];
    } else {
      student.avatar = avatarMaleImages[Math.floor(Math.random() * avatarMaleImages.length)];
    }
  }

}
