import { useState } from 'react';
import { Card } from 'antd';

const cards = [
    {
        id: 1,
        title: 'Card 1',
        description: 'Card 1 description',
        buttonLabel: 'Get more'
    },
    {
        id: 2,
        title: 'Card 2',
        description: 'Card 2 description',
        buttonLabel: 'Get more'
    },
    {
        id: 3,
        title: 'Card 3',
        description: 'Card 3 description',
        buttonLabel: 'Get more'
    },
]

const cities = [
    { id: 1, label: 'Kyiv' },
    { id: 2, label: 'Lviv' },
    { id: 3, label: 'Odesa' },
    { id: 4, label: 'Kharkiv' },
    { id: 5, label: 'Dnipro' },
    { id: 6, label: 'Poltava' },
];

const AboutUs = () => {
    const [inputValue, setInputValue] = useState('');

    const filteredDada = cities.filter( c => c.label.toLowerCase().includes(inputValue.toLowerCase()));

    return (
        <div>
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
            <div className='flex flex-wrap gap-4 justify-center my-20'>
                {cards.map(card => (
                    <Card
                        key={card.id}
                        className='bg-white rounded-lg shadow-md hover:shadow-lg transition w-full max-w-xs'
                    >
                        <h2 className='text-[18px] font-semibold mb-2'>{card.title}</h2>
                        <p className='text-gray-600 mb-4'>{card.description}</p>
                        <button className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition'>
                            {card.buttonLabel}
                        </button>
                    </Card>
                ))}
            </div>
        </div>

    )
}

export default AboutUs