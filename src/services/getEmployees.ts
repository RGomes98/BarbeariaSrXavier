import { collection, getDocs, query, where } from 'firebase/firestore';
import { UserSchema, UsersSchema } from '@/lib/schemas';
import { firestore } from '../firebaseConfig/firebase';

export const getEmployees = async () => {
  const employeesQuery = query(collection(firestore, 'users'), where('accountType', '==', 'EMPLOYEE'));
  const employees = UsersSchema.safeParse((await getDocs(employeesQuery)).docs.map((doc) => doc.data()));
  if (!employees.success || !employees.data.length) return [];
  return employees.data;
};

export const getEmployee = async (id: string) => {
  const employeeQuery = query(
    collection(firestore, 'users'),
    where('accountType', '==', 'EMPLOYEE'),
    where('id', '==', id),
  );

  const employeeData = (await getDocs(employeeQuery)).docs[0]?.data();
  const employee = UserSchema.safeParse(employeeData);

  if (!employee.success) throw new Error('invalid employee structure');
  return employee.data;
};
