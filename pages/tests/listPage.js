import React from 'react';
import List from '../../components/List';

const ListPage = () => {
  const items = [
    {
      key: '1',
      title: 'Go for a walk',
      duration: '1 hour',
      description: 'Take a leisurely stroll in the park and enjoy the fresh air.',
      label: {
        category: 'LEISURE',
        name: 'Wellness',
      },
    },
    {
      key: '2',
      title: 'Prepare presentation',
      duration: '2 hours',
      description: 'Create a detailed presentation for the upcoming meeting at work.',
      label: {
        category: 'WORK',
        name: 'Promotion',
      },
    },
    {
      key: '3',
      title: 'Hit the gym',
      duration: '1.5 hours',
      description: 'Engage in a workout session to stay fit and healthy.',
      label: {
        category: 'FITNESS',
        name: 'Weightloss',
      },
    },
    {
      key: '4',
      title: 'Read a book',
      duration: '30 minutes',
      description: 'Spend some time reading a captivating novel or informative book.',
      label: {
        category: 'LEISURE',
        name: 'Intellect',
      },
    },
    {
      key: '5',
      title: 'Complete project report',
      duration: '3 hours',
      description: 'Finish writing the project report and submit it before the deadline.',
      label: {
        category: 'WORK',
        name: 'Champion',
      },
    },
    {
      key: '6',
      title: 'Buy groceries',
      duration: '1 hour',
      description: 'Make a pie: \n- Apples \n- Pie crust \n- Sugar \n- Cinnamon \n- Butter',
      label: {
        category: 'LEISURE',
        name: 'Cooking',
      },
    },
    {
      key: '7',
      title: 'Sing a song',
      duration: '15 minutes',
      description: "Sing 'Mary Had a Little Lamb'",
      label: {
        category: 'LEISURE',
        name: 'Singing',
      },
    },
  ];

  return (
    <div>
      <List items={items} />
    </div>
  );
};

export default ListPage;
