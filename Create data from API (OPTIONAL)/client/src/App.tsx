import { useEffect, useState } from "react";
import userClient, { DepartmentData } from "./utils/user-client";

function App() {
  const [userDepartment, setUserDepartment] = useState<DepartmentData>({});
  const [isLoad, setIsLoad] = useState<boolean>(true);

  const loadUserClient = async () => {
    try{
      console.log("222 come")
      setIsLoad(true)
      await userClient(setUserDepartment)
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally{
      setIsLoad(false)
    }
  };

  useEffect(() => {
    loadUserClient();
  }, []);

  return (
    <div className="w-screen h-screen bg-[#2e2e32] p-6 overflow-hidden">
      <div className="flex flex-col h-full gap-4">
        <div className=" w-full sm:max-w-[100px] max-w-full">
          <button
            onClick={loadUserClient}
            className="w-full px-4 py-2 h-10 rounded-md font-medium text-white bg-[#1a1a1a] cursor-pointer hover:bg-[#333]"
          >
            Re load
          </button>
        </div>
        <div className="flex flex-col h-full overflow-auto">
          <div className="flex flex-wrap gap-x-4 gap-y-5">
            {Object.entries(userDepartment)?.length && !isLoad ? (
              Object.entries(userDepartment).map(([department, info]) => (
                <div
                  key={department}
                  className="border border-[#98989882] p-4 rounded-lg text-white shadow-lg bg-[#1a1a1a2e] sm:w-fit w-full h-fit"
                >
                  <div className="font-semibold text-xl">{department}</div>
                  <hr className="my-2" />
                  <div className="flex flex-col gap-1.5 text-slate-200">
                    <p>Male : {info.male}</p>
                    <p>Female : {info.female}</p>
                    <p>Age Range : {info.ageRange}</p>
                    <p>Hair Colors :</p>
                    <ul className="ml-8 list-disc">
                      {Object.entries(info.hair).map(([color, count]) => (
                        <li key={color}>
                          {color} : {count}
                        </li>
                      ))}
                    </ul>
                    <p>Address User :</p>
                    <ul className="ml-8 list-disc">
                      {Object.entries(info.addressUser).map(([name, zip]) => (
                        <li key={name}>
                          {name} : {zip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-white">Loading...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
