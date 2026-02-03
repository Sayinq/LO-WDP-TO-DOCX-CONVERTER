export default function FontSelector({ value, onChange }) {
  const fonts = [
    'Arial',
    'Times New Roman',
    'Courier New',
    'Calibri',
    'Verdana',
    'Georgia',
  ]

  return (
    <div className='mb-6'>
      <label className='block text-sm font-semibold text-gray-700 mb-3'>
        Select Font
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
      >
        {fonts.map((font) => (
          <option key={font} value={font}>
            {font}
          </option>
        ))}
      </select>
    </div>
  )
}
