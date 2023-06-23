import React from 'react'
import List from '../../components/List'

const ListPage = () => {
  const items = [
    {
      title: 'Go for a walk',
      duration: '1 hour',
      description:
        'Take a leisurely stroll in the park and enjoy the fresh air.',
      category: 'LEISURE',
    },
    {
      title: 'Prepare presentation',
      duration: '2 hours',
      description:
        'Create a detailed presentation for the upcoming meeting at work.',
      category: 'WORK',
    },
    {
      title: 'Hit the gym',
      duration: '1.5 hours',
      description: 'Engage in a workout session to stay fit and healthy.',
      category: 'FITNESS',
    },
    {
      title: 'Read a book',
      duration: '30 minutes',
      description:
        'Spend some time reading a captivating novel or informative book.',
      category: 'LEISURE',
    },
    {
      title: 'Complete project report',
      duration: '3 hours',
      description:
        'Finish writing the project report and submit it before the deadline.',
      category: 'WORK',
    },
    {
      title: 'Sing "Mary Had a Little Lamb"',
      duration: '5 minutes',
      description: `Mary had a little lamb,
      Its fleece was white as snow;
      And everywhere that Mary went,
      The lamb was sure to go.
      
      It followed her to school one day,
      That was against the rule;
      It made the children laugh and play,
      To see a lamb at school.
      
      And so the teacher turned it out,
      But still it lingered near,
      And waited patiently about,
      Till Mary did appear.
      
      "Why does the lamb love Mary so?"
      The eager children cry;
      "Why, Mary loves the lamb, you know,"
      The teacher did reply.`,
      category: 'LEISURE',
    },
  ]

  return (
    <div>
      <List items={items} />
    </div>
  )
}

export default ListPage
