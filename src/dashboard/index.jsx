// import React, { useEffect, useState } from 'react'
// import AddResume from './components/AddResume'
// import { useUser } from '@clerk/clerk-react'
// import GlobalApi from './../../service/GlobalApi';
// import ResumeCardItem from './components/ResumeCardItem';

// function Dashboard() {

//   const {user}=useUser();
//   const [resumeList,setResumeList]=useState([]);
//   useEffect(()=>{
//     user&&GetResumesList()
//   }, [user, GetResumesList])

//   /**
//    * Used to Get Users Resume List
//    */
//   const GetResumesList = React.useCallback(() => {
//     GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
//     .then(resp => {
//       console.log(resp.data.data)
//       setResumeList(resp.data.data);
//     });
//   }, [user]);
//   return (
//     <div className='p-10 md:px-20 lg:px-32'>
//       <h2 className='font-bold text-3xl'>My Resume</h2>
//       <p>Start Creating AI resume to your next Job role</p>
//       <div className='grid grid-cols-2 
//       md:grid-cols-3 lg:grid-cols-5 gap-5
//       mt-10
//       '>
//         <AddResume/>
//         {resumeList.length>0?resumeList.map((resume,index)=>(
//           <ResumeCardItem resume={resume} key={index} refreshData={GetResumesList} />
//         )):
//         [1,2,3,4].map((item,index)=>(
//           <div key={index} className='h-[280px] rounded-lg bg-slate-200 animate-pulse'>
//           </div>
//         ))
//         }
//       </div>
//     </div>
//   )
// }

// export default Dashboard


import React, { useEffect, useState, useCallback } from 'react';
import AddResume from './components/AddResume';
import { useUser } from '@clerk/clerk-react';
import GlobalApi from './../../service/GlobalApi';
import ResumeCardItem from './components/ResumeCardItem';

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);

  /**
   * Used to Get User's Resume List
   */
  const GetResumesList = useCallback(() => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    GlobalApi.GetUserResumes(user.primaryEmailAddress.emailAddress)
      .then(resp => {
        const data = resp?.data?.data || []; // ✅ Safe fallback
        console.log(data);
        setResumeList(data);
      })
      .catch(err => {
        console.error('Failed to fetch resumes:', err);
        setResumeList([]); // ✅ Reset to empty on error
      });
  }, [user]);

  useEffect(() => {
    if (user) {
      GetResumesList();
    }
  }, [user, GetResumesList]);

  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Start creating AI resume for your next job role</p>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10'>
        <AddResume />
        {resumeList?.length > 0 ? ( // ✅ Optional chaining for safety
          resumeList.map((resume, index) => (
            <ResumeCardItem resume={resume} key={index} refreshData={GetResumesList} />
          ))
        ) : (
          [1, 2, 3, 4].map((_, index) => (
            <div key={index} className='h-[280px] rounded-lg bg-slate-200 animate-pulse'></div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
