interface IEmployee {
  city?: string;
  street?: string;
  house?: string;
  flat?: string;
}

export class Employee {
  id: number;
  name: string;
  surname: string;
  birthday: Date;
  age: number;
  position: string;
  remoteWork: boolean;
  address: IEmployee;
}
