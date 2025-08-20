import TopicItem from './Item';

export default function TopicList({ topics = [] })  {
    return (
        <ul style={{ listStyle: 'none',  paddingLeft: '0' }}>
            {
                topics.map((topic) => <TopicItem key={topic.id} topic={topic} />)
            }
        </ul>
    )
}

