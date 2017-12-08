
class Person {
    // set default value for name and age
    constructor(name = 'Anonymous', age = 0){
        this.name = name;
        this.age = age;
    }

    getGreeting() {
        return `Hello! My name is ${this.name}!`;
    }

    getDescription() {
        return `${this.name} is ${this.age} year(s) old.`;
    }
}

// SUBCLASS
class Student extends Person {
    constructor(name, age, major){
        // inherit parents name and age
        super(name, age);
        // set major
        this.major = major;
    }

    hasMajor() {
        return !!this.major;
    }
    // override parents getDescrition mathod
    //getDescrition() {
       // retirn `testing`;
   // } or a better way:
   getDescription(){
       let description = super.getDescription();

       //check if major has been passed
       if(this.hasMajor()){
           // override parent's getDescription method
           description += ` Their major is ${this.major}.`;
       }
       return description;
   }
}

// SUBCLASS
class Traveler extends Person {
    constructor(name, age, homeLocation){
        super(name, age);
        this.homeLocation = homeLocation;
    }
    // override parent's getGreeting() method
    getGreeting() {
        let greeting = super.getGreeting();

        if(this.homeLocation){
            greeting += ` I am visiting from ${this.homeLocation}.`;
        }

        return greeting;
    }
}

// create instance of a person
const me = new Person('Marzena Szopinska', 27);
console.log(me.getDescription());

// create another person
const other = new Person();
console.log(other.getDescription());

// create a student
const student = new Student('Andrew Bah', 20, 'Computer Science');
console.log(student.getDescription());

// create a traveler
const traveler = new Traveler(undefined, undefined, 'Nowhere');
console.log(traveler.getGreeting());

const travelerTwo = new Traveler('Monic Vau', 50, 'Poland');
console.log(travelerTwo.getGreeting());