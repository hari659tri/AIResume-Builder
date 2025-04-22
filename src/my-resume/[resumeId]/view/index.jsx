// import Header from '@/components/custom/Header'
// import { Button } from '@/components/ui/button'
// import { ResumeInfoContext } from '@/context/ResumeInfoContext'
// import ResumePreview from '@/dashboard/resume/components/ResumePreview'
// import React, { useEffect, useState, useCallback } from 'react'
// import { useParams } from 'react-router-dom'
// import GlobalApi from './../../../../service/GlobalApi'
// import { RWebShare } from 'react-web-share'

// function ViewResume() {
//   const [resumeInfo, setResumeInfo] = useState()
//   const { resumeId } = useParams()

//   // ✅ Move this up BEFORE useEffect
//   const GetResumeInfo = useCallback(() => {
//     GlobalApi.GetResumeById(resumeId).then((resp) => {
//       console.log(resp.data.data)
//       setResumeInfo(resp.data.data)
//     })
//   }, [resumeId])

//   useEffect(() => {
//     GetResumeInfo()
//   }, [GetResumeInfo])

//   const HandleDownload = () => {
//     window.print()
//   }

//   const baseUrl = import.meta.env.VITE_BASE_URL || window.location.origin

//   return (
//     <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
//       <div id="no-print">
//         <Header />

//         <div className="my-10 mx-10 md:mx-20 lg:mx-36">
//           <h2 className="text-center text-2xl font-medium">
//             Congrats! Your Ultimate AI-generated Resume is ready!
//           </h2>
//           <p className="text-center text-gray-400">
//             Now you are ready to download your resume and you can share the unique
//             resume URL with your friends and family.
//           </p>

//           <div className="flex justify-between px-10 md:px-20 lg:px-44 my-10">
//             <Button onClick={HandleDownload}>Download</Button>

//             <RWebShare
//               data={{
//                 text: 'Hello Everyone, This is my resume. Please open the URL to see it.',
//                 url: import.meta.env.VITE_BASE_URL+"/my-resume/"+resumeId+"/view",
//                 title: `${resumeInfo?.firstName + " " + resumeInfo?.lastName} resume`,
//               }}
//               onClick={() => console.log('shared successfully!')}
//             >
//               <Button>Share</Button>
//             </RWebShare>
//           </div>
//         </div>
//       </div>

//       <div className="my-10 mx-10 md:mx-20 lg:mx-36">
//         <div id="print-area">
//           <ResumePreview />
//         </div>
//       </div>
//     </ResumeInfoContext.Provider>
//   )
// }

// export default ViewResume


import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../service/GlobalApi';
import { RWebShare } from 'react-web-share'

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState(null)
  const { resumeId } = useParams()

  const GetResumeInfo = useCallback(() => {
    if (!resumeId) return
    GlobalApi.GetResumeById(resumeId).then((resp) => {
      console.log("Resume Data:", resp.data.data)
      setResumeInfo(resp.data.data)
    })
  }, [resumeId])

  useEffect(() => {
    GetResumeInfo()
  }, [GetResumeInfo])

  const HandleDownload = () => {
    window.print()
  }

  const baseUrl = import.meta.env.VITE_BASE_URL || window.location.origin

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />

        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <h2 className="text-center text-2xl font-medium">
            Congrats! Your Ultimate AI-generated Resume is ready!
          </h2>
          <p className="text-center text-gray-400">
            Now you are ready to download your resume and share the unique URL.
          </p>

          <div className="flex justify-between px-10 md:px-20 lg:px-44 my-10">
            <Button onClick={HandleDownload}>Download</Button>

            <RWebShare
              data={{
                text: 'Hello Everyone, This is my resume. Please open the URL to see it.',
                url: `${baseUrl}/my-resume/${resumeId}/view`,
                title: `${resumeInfo?.firstName || 'My'} ${resumeInfo?.lastName || 'Resume'}`,
              }}
              onClick={() => console.log('shared successfully!')}
            >
              <Button>Share</Button>
            </RWebShare>
          </div>
        </div>
      </div>

      <div className="my-10 mx-10 md:mx-20 lg:mx-36">
        <div id="print-area">
          <ResumePreview />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  )
}

export default ViewResume
