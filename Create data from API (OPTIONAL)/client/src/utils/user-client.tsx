import { UserServiceClient } from "../proto/UserServiceClientPb";
import { Empty } from "../proto/user_pb";
  
  interface DepartmentStats {
    male: number;
    female: number;
    ageRange: string;
    hair: Record<string, number>;
    addressUser: Record<string, string>;
  }
  
  export type DepartmentData = Record<string, DepartmentStats>;
  
  export const createEmptyDepartmentStats = (): DepartmentStats => ({
    male: 0,
    female: 0,
    ageRange: '',
    hair: {},
    addressUser: {},
  });
  
  export const updateGenderCount = (stats: DepartmentStats, gender: string): void => {
    if (gender === 'male') {
      stats.male += 1;
    } else if (gender === 'female') {
      stats.female += 1;
    }
  };
  
  export const calculateAgeRange = (currentRange: string, newAge: number): string => {
    if (!currentRange) return newAge.toString();
  
    const [min, max] = currentRange.split('-').map(Number);
    if (!max) {
      return `${Math.min(newAge, min)}-${Math.max(newAge, min)}`;
    }
    return `${Math.min(newAge, min)}-${Math.max(newAge, max, newAge)}`;
  };
  
  export const updateHairColor = (stats: DepartmentStats, color: string): void => {
    stats.hair[color] = (stats.hair[color] || 0) + 1;
  };
  

  const userClient = async (
    setUserDepartment: (data: DepartmentData) => void
  ): Promise<void> => {
    try {
      const EnvoyURL = 'http://localhost:8000';
      const client = new UserServiceClient(EnvoyURL);
      const request = new Empty();
      const response = await client.getUsers(request, {});
  
      const departmentData: DepartmentData = {};

      response.toObject().usersList.forEach((user) => {
        const { 
          gender, 
          age, 
          hair, 
          firstname, 
          lastname, 
          address, 
          company 
        } = user;
        
        const department = company?.department || 'Unknown';
        const fullName = `${firstname}${lastname}`;
  
        if (!departmentData[department]) {
          departmentData[department] = createEmptyDepartmentStats();
        }
  
        const departmentStats = departmentData[department];
  
        updateGenderCount(departmentStats, gender);
        departmentStats.ageRange = calculateAgeRange(departmentStats.ageRange, age);
        
        if (hair?.color) {
          updateHairColor(departmentStats, hair.color);
        }
  
        departmentStats.addressUser[fullName] = address?.postalcode || '';
      });
      setUserDepartment(departmentData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } 
  };
  
  export default userClient;