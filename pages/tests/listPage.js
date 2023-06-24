import React from 'react'
import List from '../../components/List'

const ListPage = () => {
  const items = [
    {
      key: '1',
      title: 'Go for a walk',
      duration: '1 hour',
      description:
        'Take a leisurely stroll in the park and enjoy the fresh air.',
      label: {
        category: 'LEISURE',
        name: 'Wellness',
      },
    },
    {
      key: '2',
      title: 'Prepare presentation',
      duration: '2 hours',
      description:
        'Create a detailed presentation for the upcoming meeting at work.',
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
        name: 'Exercise',
      },
    },
    {
      key: '4',
      title: 'Read a book',
      duration: '30 minutes',
      description:
        'Spend some time reading a captivating novel or informative book.',
      label: {
        category: 'LEISURE',
        name: 'Reading',
      },
    },
    {
      key: '5',
      title: 'Complete project report',
      duration: '3 hours',
      description:
        'Finish writing the project report and submit it before the deadline.',
      label: {
        category: 'WORK',
        name: 'Productivity',
      },
    },
    {
      key: '6',
      title: 'Buy groceries',
      duration: '1 hour',
      description:
        'Make a pie: \n- Apples \n- Pie crust \n- Sugar \n- Cinnamon \n- Butter',
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
    {
      key: '8',
      title: 'Learn a new language',
      duration: '45 minutes',
      description: 'Dedicate some time to learn the basics of a new language.',
      label: {
        category: 'LEISURE',
        name: 'Education',
      },
    },
    {
      key: '9',
      title: 'Write a blog post',
      duration: '2 hours',
      description:
        'Share your thoughts and insights by writing a blog post on a topic you are passionate about.',
      label: {
        category: 'WORK',
        name: 'Writing',
      },
    },
    {
      key: '10',
      title: 'Take a yoga class',
      duration: '1 hour',
      description:
        'Join a yoga class to improve flexibility and achieve mental relaxation.',
      label: {
        category: 'FITNESS',
        name: 'Yoga',
      },
    },
    {
      key: '11',
      title: 'Try a New Recipe',
      duration: '2 hours',
      description:
        'Make a delicious Grilled Lemon Herb Chicken:\n\nIngredients:\n- 4 boneless, skinless chicken breasts\n- 2 lemons\n- 3 tablespoons olive oil\n- 2 cloves garlic, minced\n- 1 teaspoon dried oregano\n- 1 teaspoon dried thyme\n- Salt and black pepper, to taste\n\nInstructions:\n1. Preheat your grill to medium-high heat.\n2. In a small bowl, combine the juice of 1 lemon, olive oil, minced garlic, dried oregano, dried thyme, salt, and black pepper. Mix well.\n3. Place the chicken breasts in a shallow dish and pour the marinade over them. Make sure each chicken breast is coated evenly. Let it marinate for about 15 minutes.\n4. Cut the remaining lemon into slices.\n5. Remove the chicken breasts from the marinade and discard the excess marinade. Place the chicken on the preheated grill.\n6. Grill the chicken for about 6-8 minutes per side or until the internal temperature reaches 165°F (74°C) and the chicken is cooked through.\n7. During the last few minutes of grilling, place the lemon slices on the grill and cook until they are slightly charred and juicy.\n8. Remove the chicken from the grill and let it rest for a few minutes.\n9. Serve the grilled lemon herb chicken with the grilled lemon slices on top for added flavor. You can also squeeze some grilled lemon juice over the chicken before serving.\n10. Enjoy your delicious Grilled Lemon Herb Chicken!\n\nNote: Feel free to adjust the seasonings and cooking time according to your taste preferences and the thickness of the chicken breasts. You can also serve this chicken with a side salad, roasted vegetables, or your choice of side dishes.\n',
      label: {
        category: 'LEISURE',
        name: 'Cooking',
      },
    },
    {
      key: '12',
      title: 'Organize your workspace',
      duration: '30 minutes',
      description:
        'Declutter and organize your workspace for improved productivity.',
      label: {
        category: 'WORK',
        name: 'Organization',
      },
    },
  ]

  return (
    <div>
      <List items={items} />
    </div>
  )
}

export default ListPage
