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

const AboutUs = () => {
    return (
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
    )
}

export default AboutUs