// Problem 1: Solution
const filterEvenNumbers = (numbers: number[]): number[] => {
  const filteredNumbers = numbers.filter((num) => num % 2 === 0);

  return filteredNumbers;
};

// Problem 2: Solution
const reverseString = (str: string): string => {
  const revStr = str.split("").toReversed().join("");
  return revStr;
};

// Problem 3: Solution
type StringOrNumber = string | number;
const checkType = (strOrNum: StringOrNumber): string => {
  if (typeof strOrNum === "string") {
    return "String";
  } else {
    return "Number";
  }
};

// Problem 4: Solution
const getProperty = <T, Key extends keyof T>(obj: T, key: Key): T[Key] => {
  return obj[key];
};

// Problem 5: Solution
interface Book {
  title: string;
  author: string;
  publishedYear: number;
}

const toggleReadStatus = (book: Book) => {
  return { ...book, isRead: true };
};

// Problem 6: Solution
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

class Student extends Person {
  grade: string;

  constructor(name: string, age: number, grade: string) {
    super(name, age);
    this.grade = grade;
  }

  getDetails(): string {
    return `Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`;
  }
}

const student = new Student("Alice", 20, "A");

// Problem 7: Solution
const getIntersection = (arr1: number[], arr2: number[]): number[] => {
  const newArr = arr1.filter((item1) => arr2.includes(item1));

  return newArr;
};
