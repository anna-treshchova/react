import { useState } from 'react';
import { CITIES } from '@/features/about/constants.js';


const CitySearch = () => {
    const [inputValue, setInputValue] = useState('');

    const filteredDada = CITIES.filter(c =>
        c.label.toLowerCase().includes(inputValue.toLowerCase())
    );

    return (
        <div className='mt-10 relative'>
            <input
                type='text'
                placeholder='Search city...'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className='min-w-[200px] border border-gray-300 rounded-sm px-1 py-[2px] bg-white focus:border-black focus:outline-none'
            />
            { inputValue && (
                <div className='min-w-[200px] py-1 px-3 shadow-lg border border-gray-200 bg-white text-start mt-2 absolute left-[50%] -translate-x-1/2 transform z-1'>
                    {filteredDada.length === 0 && 'No city found'}
                    {filteredDada.map(item => (
                        <div key={item.id} className='py-[2px]'>
                            {item.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default CitySearch;