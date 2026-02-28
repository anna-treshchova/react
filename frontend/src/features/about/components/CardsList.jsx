import { Card } from 'antd';
import { CARDS } from '@/features/about/constants.js';

const CardsList = () => {
    return (
        <div className='flex flex-wrap gap-4 justify-center my-20'>
            {CARDS.map(card => (
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
    )
}

export default CardsList;