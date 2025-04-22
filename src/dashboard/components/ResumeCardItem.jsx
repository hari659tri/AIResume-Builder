import { Loader2Icon, MoreVertical } from 'lucide-react'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import GlobalApi from './../../../service/GlobalApi'
import { toast } from 'sonner'

function ResumeCardItem({ resume, refreshData }) {
  const navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = () => {
    setLoading(true);
    GlobalApi.DeleteResumeById(resume.documentId).then(
      resp => {
        toast('Resume Deleted!');
        refreshData();
        setLoading(false);
        setOpenAlert(false);
      },
      error => {
        setLoading(false);
        toast.error('Failed to delete resume.');
      }
    );
  };

  const documentId = resume.documentId;
  const title = resume.title || resume.attributes?.title || "Untitled";
  const themeColor = resume.themeColor || resume.attributes?.themeColor || "#10b981";

  return (
    <div>
      <Link to={`/dashboard/resume/${documentId}/edit`}>
        <div
          className='p-14 bg-gradient-to-br from-green-100 via-emerald-200 to-cyan-100 h-[280px] rounded-t-lg border-t-4 border-emerald-400'
          style={{ borderColor: themeColor }}
        >
          <div className='flex items-center justify-center h-[180px]'>
            <img src="/cv.png" width={90} height={90} alt="CV icon" />
          </div>
        </div>
      </Link>

      <div
        className='border p-3 flex justify-between text-white rounded-b-lg shadow-lg'
        style={{ background: themeColor }}
      >
        <h2 className='text-sm'>{title}</h2>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button>
              <MoreVertical className='h-4 w-4 cursor-pointer' />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => navigation(`/dashboard/resume/${documentId}/edit`)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigation(`/my-resume/${documentId}/view`)}>
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigation(`/my-resume/${documentId}/view`)}>
              Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your resume and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} disabled={loading}>
                {loading ? <Loader2Icon className='animate-spin' /> : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

ResumeCardItem.propTypes = {
  resume: PropTypes.shape({
    documentId: PropTypes.string.isRequired,
    themeColor: PropTypes.string,
    title: PropTypes.string,
    attributes: PropTypes.object,
  }).isRequired,
  refreshData: PropTypes.func.isRequired,
};

export default ResumeCardItem;
