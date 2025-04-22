import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import FormSection from '../../components/FormSection';
import ResumePreview from '../../components/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from './../../../../../service/GlobalApi';

function EditResume() {
  const { resumeId } = useParams();
  const [resumeInfo, setResumeInfo] = useState(null); // Start with null

  // Fetch resume from Strapi
  const GetResumeInfo = useCallback(() => {
    GlobalApi.GetResumeById(resumeId).then((resp) => {
      const apiData = resp.data.data;

      // Extract id and attributes (flatten)
      setResumeInfo({
        id: apiData.id,
        ...apiData.attributes
      });
    }).catch((err) => {
      console.error("Error fetching resume:", err);
    });
  }, [resumeId]);

  useEffect(() => {
    GetResumeInfo(); // 👈 Fetch from backend
  }, [GetResumeInfo]);

  // Optional: show loader while fetching
  if (!resumeInfo) {
    return <div className="p-10 text-center">Loading resume...</div>;
  }

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        {/* Form Section */}
        <FormSection />
        {/* Preview Section */}
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default EditResume;
