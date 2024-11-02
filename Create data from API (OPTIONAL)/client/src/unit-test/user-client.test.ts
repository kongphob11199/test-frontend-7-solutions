
import { UserServiceClient } from '../proto/UserServiceClientPb';
import userClient, {
  createEmptyDepartmentStats,
  updateGenderCount,
  calculateAgeRange,
  updateHairColor,
} from '../utils/user-client';

jest.mock('../proto/UserServiceClientPb');

describe('Helper Functions', () => {
  describe('createEmptyDepartmentStats', () => {
    it('should create empty department stats with correct initial values', () => {
      const stats = createEmptyDepartmentStats();
      expect(stats).toEqual({
        male: 0,
        female: 0,
        ageRange: '',
        hair: {},
        addressUser: {},
      });
    });
  });

  describe('updateGenderCount', () => {
    it('should increment male count correctly', () => {
      const stats = createEmptyDepartmentStats();
      updateGenderCount(stats, 'male');
      expect(stats.male).toBe(1);
      expect(stats.female).toBe(0);
    });

    it('should increment female count correctly', () => {
      const stats = createEmptyDepartmentStats();
      updateGenderCount(stats, 'female');
      expect(stats.male).toBe(0);
      expect(stats.female).toBe(1);
    });

    it('should not increment counts for invalid gender', () => {
      const stats = createEmptyDepartmentStats();
      updateGenderCount(stats, 'other');
      expect(stats.male).toBe(0);
      expect(stats.female).toBe(0);
    });
  });

  describe('calculateAgeRange', () => {
    it('should return age as string when current range is empty', () => {
      expect(calculateAgeRange('', 25)).toBe('25');
    });

    it('should create range when only one number exists', () => {
      expect(calculateAgeRange('30', 25)).toBe('25-30');
      expect(calculateAgeRange('25', 30)).toBe('25-30');
    });

    it('should update range with new minimum or maximum', () => {
      expect(calculateAgeRange('25-30', 20)).toBe('20-30');
      expect(calculateAgeRange('25-30', 35)).toBe('25-35');
      expect(calculateAgeRange('25-30', 28)).toBe('25-30');
    });
  });

  describe('updateHairColor', () => {
    it('should initialize and increment hair color count', () => {
      const stats = createEmptyDepartmentStats();
      updateHairColor(stats, 'brown');
      expect(stats.hair).toEqual({ brown: 1 });
    });

    it('should increment existing hair color count', () => {
      const stats = createEmptyDepartmentStats();
      stats.hair = { brown: 1 };
      updateHairColor(stats, 'brown');
      expect(stats.hair).toEqual({ brown: 2 });
    });
  });
});

describe('userClient', () => {
  let mockSetUserDepartment: jest.Mock;
  let mockGetUsers: jest.Mock;

  beforeEach(() => {
    mockSetUserDepartment = jest.fn();
    mockGetUsers = jest.fn();

    (UserServiceClient as jest.Mock).mockImplementation(() => ({
      getUsers: mockGetUsers,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should process user data correctly', async () => {
    const mockResponse = {
      toObject: () => ({
        usersList: [
          {
            gender: 'male',
            age: 25,
            hair: { color: 'brown' },
            firstname: 'John',
            lastname: 'Doe',
            address: { postalcode: '12345' },
            company: { department: 'IT' },
          },
          {
            gender: 'female',
            age: 30,
            hair: { color: 'black' },
            firstname: 'Jane',
            lastname: 'Smith',
            address: { postalcode: '67890' },
            company: { department: 'IT' },
          },
        ],
      }),
    };

    mockGetUsers.mockResolvedValueOnce(mockResponse);

    await userClient(mockSetUserDepartment);

    expect(mockSetUserDepartment).toHaveBeenCalledWith({ 
      IT: {
        male: 1,
        female: 1,
        ageRange: '25-30',
        hair: { black: 1, brown: 1, },  
        addressUser: {
          'JohnDoe': '12345',
          'JaneSmith': '67890',
        },
      },
    });
  });

  it('should handle empty response', async () => {
    const mockResponse = {
      toObject: () => ({
        usersList: [],
      }),
    };

    mockGetUsers.mockResolvedValueOnce(mockResponse);

    await userClient(mockSetUserDepartment);

    expect(mockSetUserDepartment).toHaveBeenCalledWith({});
  });

  it('should handle error cases', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockGetUsers.mockRejectedValueOnce(new Error('Network error'));

    await userClient( mockSetUserDepartment);

    expect(consoleError).toHaveBeenCalledWith('Error fetching user data:', expect.any(Error));
    
    consoleError.mockRestore();
  });

  it('should handle users without department', async () => {
    const mockResponse = {
      toObject: () => ({
        usersList: [
          {
            gender: 'male',
            age: 25,
            firstname: 'John',
            lastname: 'Doe',
          },
        ],
      }),
    };

    mockGetUsers.mockResolvedValueOnce(mockResponse);

    await userClient( mockSetUserDepartment);

    expect(mockSetUserDepartment).toHaveBeenCalledWith({
      'Unknown': expect.objectContaining({
        male: 1,
        female: 0,
        ageRange: '25',
      }),
    });
  });
});