import React from "react";
import Card from "../Templates/Card";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.data?.user);
  const capitalize = (str) => str?.charAt(0).toUpperCase() + str?.slice(1).toLowerCase();

  if (!user) return <div>Loading....</div>;

  return (
    <div className="min-h-screen bg-gray-50">
     <div className="flex justify-center">

      <main className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

        <Card
          title={`Welcome Back,  ${capitalize(user.firstName)}`}
          description="Continue your learning journey. Here’s a quick look at your
              progress and recommended courses."
          showButton={false}
        />

        {/* <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">Your Progress</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• JavaScript Essentials - 60%</li>
              <li>• React Basics - 80%</li>
              <li>• Soft Skills 101 - 100%</li>
            </ul>
          </CardContent>
        </Card> */}
        {/* 
        <Card className="md:col-span-3">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recommended Courses</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-blue-100 p-4 rounded-xl shadow">
                <h4 className="font-semibold">Advanced React</h4>
                <p className="text-sm text-gray-600">
                  Level up your frontend skills
                </p>
              </div>
              <div className="bg-green-100 p-4 rounded-xl shadow">
                <h4 className="font-semibold">Effective Communication</h4>
                <p className="text-sm text-gray-600">
                  Master workplace soft skills
                </p>
              </div>
              <div className="bg-yellow-100 p-4 rounded-xl shadow">
                <h4 className="font-semibold">APIs with .NET Core</h4>
                <p className="text-sm text-gray-600">
                  Build robust backend services
                </p>
              </div>
            </div>
          </CardContent>
        </Card> */}
      </main>
    </div>
    </div>
  );
};

export default Dashboard;
