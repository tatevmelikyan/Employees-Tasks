export interface IEmployee {
  id: string;
  name: string;
  surname: string;
  email: string;
  position: string;
}

export interface INewEmployee {
  name: string;
  surname: string;
  email: string;
  position: string;
}

export interface ITask {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  employeeId: string;
}

export interface INewTask {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  employeeId: string;
}


export interface ISearchTaskParams {
  name_like: string;
  description_like: string;
  startDate: string;
  endDate: string;
}

