import React from 'react'


const markDownComponent = () => {
  h1: ({ childern }) => {
    return <h1 className='text-2xl font-bold text-indigo-700 mt-6 mb-4 border-b pb-2 '>
      {childern}
    </h1>
  }
  h2: ({ childern }) => {
    return <h2 className='text-xl font-semibold text-indigo-600 mt-5 mb-3 '>
      {childern}
    </h2>
  }
  h3: ({ childern }) => {
    return <h3 className='text-lg font-semibold text-gray-800 mt-4 mb-2 '>
      {childern}
    </h3>
  }
  p: ({ childern }) => {
    return <p className='text-gray-700 leading-relaxed mb-3  '>
      {childern}
    </p>
  }
  ul: ({ childern }) => {
    return <ul className='list-disc ml-6 space-y-1 text-gray-700  '>
      {childern}
    </ul>
  }
  li: ({ childern }) => {
    return <li className='marker:text-indigo-500 '>
      {childern}
    </li>
  }
}

const FinalResul = ({ result }) => {

  if (!result ||
    !result.subTopics ||
    !result.questions ||
    !result.questions.short ||
    !result.questions.long ||
    !result.revisionPoints
  ) {
    return null;
  }


  return (
    <div className='mt-6 p-3 space-y-10 bg-white'>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>

        <h2 className='text-3xl font-bold bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
          📘 Generated Notes
        </h2>
        <div className='flex gap-3'>
          <button className=''></button>
          <button></button>
        </div>

      </div>
    </div>
  )
}

export default FinalResul