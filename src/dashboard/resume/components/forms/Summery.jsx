import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { Brain, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { AIChatSession } from './../../../../../service/AIModal';

const prompt =
  'Job Title: {jobTitle} , Depends on job title give me list of summery for 3 experience level, Mid Level and Fresher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format';

function Summery({ enabledNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState(resumeInfo?.summery || '');
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState();

  useEffect(() => {
    if (summery) {
      setResumeInfo({
        ...resumeInfo,
        summery: summery,
      });
    }
  }, [summery]);

  const GenerateSummeryFromAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle || '');
    console.log('Generated prompt:', PROMPT);

    try {
      const result = await AIChatSession.sendMessage(PROMPT);
      const responseText = await result.response.text();

      console.log('AI Raw Response:', responseText);

      const parsed = JSON.parse(responseText);

      if (parsed && Array.isArray(parsed)) {
        setAiGenerateSummeryList(parsed);
      } else if (parsed && Array.isArray(parsed?.summaries)) {
        setAiGenerateSummeryList(parsed.summaries);
      } else {
        console.error('Unexpected AI response format:', parsed);
        toast('Unexpected AI response. Try again!');
      }
    } catch (error) {
      console.error('Error during AI summary generation:', error);
      toast('Error generating AI summary');
    }

    setLoading(false);
  };

  const onSave = async (e) => {
    e.preventDefault();

    if (!summery || !summery.trim()) {
      toast('Summary cannot be empty!');
      return;
    }

    if (!params?.resumeId) {
      toast('Invalid Resume ID');
      return;
    }

    setLoading(true);

    const data = {
      data: {
        summery: summery,
      },
    };

    try {
      const response = await GlobalApi.UpdateResumeDetail(params.resumeId, data);
      console.log('Saved response:', response);
      toast('Details updated');
      enabledNext(true);
    } catch (error) {
      console.error('Save error:', error?.response?.data || error.message);
      toast('Failed to save summary');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add a summary for your job title</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summary</label>
            <Button
              variant="outline"
              onClick={GenerateSummeryFromAI}
              type="button"
              size="sm"
              className="border-primary text-primary flex gap-2"
            >
              <Brain className="h-4 w-4" /> Generate from AI
            </Button>
          </div>

          <Textarea
            className="mt-5"
            required
            value={summery}
            onChange={(e) => setSummery(e.target.value)}
          />

          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummeryList && (
        <div className="my-5">
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedSummeryList.map((item, index) => (
            <div
              key={index}
              onClick={() => setSummery(item?.summary)}
              className="p-5 shadow-lg my-4 rounded-lg cursor-pointer"
            >
              <h2 className="font-bold my-1 text-primary">
                Level: {item?.experience_level}
              </h2>
              <p>{item?.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Summery;
