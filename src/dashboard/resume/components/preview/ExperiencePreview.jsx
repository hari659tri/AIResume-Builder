import React from 'react'
import PropTypes from 'prop-types'

function ExperiencePreview({resumeInfo}) {
  return (
    <div className='my-6'>
        <h2 className='text-center font-bold text-sm mb-2'
        style={{
            color:resumeInfo?.themeColor
        }}
        >Professional Experience</h2>
        <hr style={{
            borderColor:resumeInfo?.themeColor
        }} />

        {resumeInfo?.Experience?.map((experience,index)=>(
            <div key={index} className='my-5'>
                <h2 className='text-sm font-bold'
                 style={{
                    color:resumeInfo?.themeColor
                }}>{experience?.title}</h2>
                <h2 className='text-xs flex justify-between'>{experience?.companyName}, 
                {experience?.city}, 
                {experience?.state}
                <span>{experience?.startDate} To {experience?.currentlyWorking?'Present':experience.endDate} </span>
                </h2>
                {/* <p className='text-xs my-2'>
                    {experience.workSummery}
                </p> */}
                <div className='text-xs my-2' dangerouslySetInnerHTML={{__html:experience?.workSummery}} />
            </div>
        ))}
    </div>
  )
}
ExperiencePreview.propTypes = {
  resumeInfo: PropTypes.shape({
    themeColor: PropTypes.string,
    Experience: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        companyName: PropTypes.string,
        city: PropTypes.string,
        state: PropTypes.string,
        startDate: PropTypes.string,
        currentlyWorking: PropTypes.bool,
        endDate: PropTypes.string,
        workSummery: PropTypes.string,
      })
    ),
  }),
}

export default ExperiencePreview