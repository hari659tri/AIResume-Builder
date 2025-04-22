import React, { useContext, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from './../../../../../service/GlobalApi';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

function Skills() {
  const [skillsList, setSkillsList] = useState([
    {
      name: '',
      rating: 0,
    },
  ]);

  const { resumeId } = useParams();
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  // Load existing skills from resumeInfo
  useEffect(() => {
    if (resumeInfo?.skills && Array.isArray(resumeInfo.skills)) {
      setSkillsList(resumeInfo.skills);
    }
  }, [resumeInfo]);

  // Update a specific skill
  const handleChange = (index, name, value) => {
    const newEntries = [...skillsList];
    newEntries[index][name] = value;
    setSkillsList(newEntries);
  };

  // Add a new empty skill
  const AddNewSkills = () => {
    setSkillsList([
      ...skillsList,
      {
        name: '',
        rating: 0,
      },
    ]);
  };

  // Remove the last skill
  const RemoveSkills = () => {
    if (skillsList.length > 1) {
      setSkillsList((prev) => prev.slice(0, -1));
    }
  };

  // Save updated skills to backend
  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        skills: skillsList.map(({ id, ...rest }) => rest), // Remove any unwanted IDs
      },
    };

    GlobalApi.UpdateResumeDetail(resumeId, data)
      .then((resp) => {
        console.log(resp);
        setLoading(false);
        toast('Details updated!');
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        toast('Server Error, Try again!');
      });
  };

  // Sync skills with global context
  useEffect(() => {
    setResumeInfo((prev) => ({
      ...prev,
      skills: skillsList,
    }));
  }, [skillsList]);

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Skills</h2>
      <p>Add Your top professional key skills</p>

      <div>
        {Array.isArray(skillsList) &&
          skillsList.map((item, index) => (
            <div
              key={index}
              className='flex justify-between items-center mb-2 border rounded-lg p-3 gap-4'
            >
              <div className='w-full'>
                <label className='text-xs'>Name</label>
                <Input
                  className='w-full'
                  value={item.name}
                  onChange={(e) => handleChange(index, 'name', e.target.value)}
                />
              </div>

              <div className='flex flex-col items-center'>
                <label className='text-xs'>Rating</label>
                <Rating
                  style={{ maxWidth: 120 }}
                  value={item.rating}
                  onChange={(v) => handleChange(index, 'rating', v)}
                />
              </div>
            </div>
          ))}
      </div>

      <div className='flex justify-between items-center mt-4'>
        <div className='flex gap-2'>
          <Button variant='outline' onClick={AddNewSkills} className='text-primary'>
            + Add More Skill
          </Button>
          <Button variant='outline' onClick={RemoveSkills} className='text-primary'>
            - Remove
          </Button>
        </div>
        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
        </Button>
      </div>
    </div>
  );
}

export default Skills;