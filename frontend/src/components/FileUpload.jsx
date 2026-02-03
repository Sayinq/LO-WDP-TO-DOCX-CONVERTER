export default function FileUpload({ onChange, fileName }) {
  return (
    <div className='mb-6'>
      <label className='block text-sm font-semibold text-gray-700 mb-3'>
        Upload WordPerfect File
      </label>
      <div className='border-2 border-dashed border-indigo-300 rounded-lg p-6 text-center hover:border-indigo-500 transition'>
        <input
          type='file'
          onChange={onChange}
          accept='.wp,.wpd,.wpc,.wpt,.frm'
          className='hidden'
          id='file-input'
        />
        <label
          htmlFor='file-input'
          className='cursor-pointer block'
        >
          {fileName ? (
            <div>
              <p className='text-green-600 font-semibold'>{fileName}</p>
              <p className='text-gray-500 text-sm mt-1'>Click to change</p>
            </div>
          ) : (
            <div>
              <p className='text-gray-600 font-semibold'>
                Click to upload or drag and drop
              </p>
              <p className='text-gray-500 text-sm'>WP, WPD, WPC, WPT, or FRM files</p>
            </div>
          )}
        </label>
      </div>
    </div>
  )
}
